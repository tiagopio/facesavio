"use client"

import { ChevronDown, PencilLine, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { post } from "./action";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { postCreateSchema, PostCreateSchema } from "./schema";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { useEffect, useRef, useState } from "react";


export function PostCreate({ className }: {
    className?: string
}) {
    const router = useRouter()
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof postCreateSchema>>({
        resolver: zodResolver(postCreateSchema),
        defaultValues: {
            title: "",
            message: "",
        },
    })

    useEffect(() => {
        if (searchParams.has("create-post")) {
            setOpen(true)

            setTimeout(() => {
                form.setFocus("message")
            }, 100);

            const params = new URLSearchParams(searchParams)
            params.delete("create-post")

            router.push(`${pathname}?${params.toString()}`)
        }
    }, [searchParams, form, router, pathname])

    async function onSubmit(values: PostCreateSchema) {
        try {
            await post(values)
            form.reset()
            router.refresh()
        }
        catch (err) {
            console.error(err)
            toast.error("Erro ao enviar post")
        }
    }

    return (
        <Card>
            <Collapsible open={open} onOpenChange={setOpen}>
                <CardHeader>
                    <CollapsibleTrigger className="w-full flex justify-between items-center [&>svg]:data-[state=open]:rotate-180">
                        <CardTitle>
                            <PencilLine />
                            Crie um post
                        </CardTitle>
                        <Button size="icon-sm" variant="ghost" asChild>
                            <ChevronDown className="transition-transform" />
                        </Button>
                    </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="gap-3 flex flex-col pt-1">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Título" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    className="resize-none h-20"
                                                    placeholder="O que você está pensando..."
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button size="sm">
                                    <Send />
                                    Post
                                </Button>
                                <span className="text-neutral-400 text-sm font-medium">
                                    Limite de 500 caracteres
                                </span>
                            </CardFooter>
                        </form>
                    </Form>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    )
}