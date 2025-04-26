import {prisma} from '@/lib/prisma'


export async function createTag(title:string,slug:string){
    return await prisma.tag.create({
        data:{
            title,
            slug
        }
    })
}
export async function deleteTag(id:string){
    return await prisma.tag.delete({
        where:{id}
    })
}
export async function updateTag(id:string,data:{title:string,slug:string}){
    return await prisma.tag.update({
        where:{id},
        data
    })
}
export async function getTag(){
    return await prisma.tag.findMany({
        select:{
            id:true,
            title:true,
            slug:true,
            createdAt:true
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
}