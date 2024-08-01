// src/app/api/posts/[id]/route.ts

import { deletePost } from "../../../components/post/action"; 

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    const { error, message } = await deletePost(id);

    if (error) {
        return new Response(message, { status: 500 });
    }

    return new Response(message, { status: 200 });
}