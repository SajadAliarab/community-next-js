import {prisma} from '@/lib/prisma'


export async function createTag(title:string,slug:string){
    const newTag = await prisma.tag.create({
        data:{
            title,
            slug
        }
    })
}