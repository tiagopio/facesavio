"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { UserValidation } from '@/lib/validations/user';
import * as z from 'zod'
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { initials, isBase64Image } from "@/lib/utils";
import { useUploadThing } from '@/lib/uploadthing'
import { onboard } from "./action";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { Loader, Send } from "lucide-react";
import { Toaster } from "../ui/sonner";
import { useUser } from "@clerk/nextjs";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  user: {
    id: string;
    username: string | null;
    name: string | null;
    image: string;
    bio: string | null;
  }
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const { user: clerkUser } = useUser();

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user.bio || "",
    }
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes('image')) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || '';

        fieldChange(imageDataUrl);
      }

      fileReader.readAsDataURL(file);
    }
  }

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    setLoading(true);
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    const { message, error } = await onboard(values);
    console.log(await clerkUser?.reload());
    if (error) {
      toast.error(message);
      setLoading(false);
      return;
    }

    toast.success(message, {
      description: "Redirecionando..."
    });

    router.push('/');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 bg-white rounded-lg"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={field.value ?? "/assets/user.svg"} alt="user-logo" className="rounded-full" />
                <AvatarFallback>{initials(user.name || user.username)}</AvatarFallback>
              </Avatar>

              <FormControl className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Username</FormLabel>
              <FormControl >
                <Input
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="flex gap-2 w-min mx-auto" disabled={loading}>
          {loading
            ? <Loader className="animate-spin" />
            : <Send />
          }
          Enviar
        </Button>
      </form>
    </Form>
  )
}

export default AccountProfile;