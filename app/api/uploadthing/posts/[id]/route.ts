// app/api/posts/[id]/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        
        // Verifique se o ID é válido e se o post existe
        const post = await db.post.delete({
            where: { id }
        });

        return NextResponse.json(post, { status: 200 });
        
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.error();
    }
}