// components/delete-button.tsx

"use client";

import { Button, ButtonProps } from "../ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { MouseEvent, useState } from "react";
import { deletePost } from "./action";

type DeleteButtonProps = {
    postId: string;
} & ButtonProps;

export function DeleteButton({ postId, ...props }: DeleteButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (loading) {
            toast.info("Aguarde um momento...");
            return;
        }

        setLoading(true);
        const { error, message } = await deletePost(postId);

        if (error) {
            toast.error(message);
        } else {
            toast.success(message);
        }

        setLoading(false);
    };

    return (
        <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleDelete}
            disabled={loading}
            {...props}
        >
            <Trash2 />
        </Button>
    );
}