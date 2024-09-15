"use server"

import prisma from "@/libs/prisma";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');

    if (!tag) {
        return NextResponse.json({ error: "Tag is required" }, { status: 400 });
    }

    try {
        const data = await prisma.product.findMany({
            where: {
                tags: {
                    some: {
                        tags: {
                            name: tag
                        }
                    }
                }
            },
            include: {
                tags: {
                    include: {
                        tags: true
                    }
                }
            }
        });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
}