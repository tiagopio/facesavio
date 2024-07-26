"use client"

import { ChevronDown, Send } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { postCreateSchema, PostCreateSchema } from "./schema";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";


export function PostCreate({ className }: {
    className?: string
}) {
    const router = useRouter()
    const form = useForm<z.infer<typeof postCreateSchema>>({
        resolver: zodResolver(postCreateSchema),
        defaultValues: {
            title: "",
            message: "",
        },
    })

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
        <Collapsible className="bg-white rounded-lg">
            <CollapsibleTrigger className="p-5 font-semibold flex justify-between w-full text-neutral-600 transition-colors duration-200 rounded-lg [&>svg]:data-[state=open]:rotate-180">
                Crie um post
                <ChevronDown className="transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="gap-3 flex flex-col">
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
                                                placeholder="Digite seu post aqui..."
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
                            <span className="text-neutral-400 text-small-medium">
                                Limite de 500 caracteres
                            </span>
                        </CardFooter>
                    </form>
                </Form>
            </CollapsibleContent>
        </Collapsible>
    )
}