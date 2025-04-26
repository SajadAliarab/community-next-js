import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main(){
    const updateTag = await prisma.tag.update({
        where:{
            id:"d36902f5-3349-4ae3-bd10-273e2dee1e8e"
        },
        data:{
            title:'Champion Ship',
            slug:'chanpion-ship'
        }
    })
    console.log('Tag Updated:', updateTag);
}
main()
.catch((e)=>{
    console.error(e)
    process.exit(1)
})
.finally(async()=>{
   await prisma.$disconnect
})