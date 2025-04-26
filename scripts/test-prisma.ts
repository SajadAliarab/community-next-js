import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const newTag = await prisma.tag.create({
        data:{
            title:'Premier League',
            slug:'premier-league'
        }
    })
    console.log("This Tag Created:",newTag);
    
}
main()
.catch((e)=>{
    console.error(e);
    process.exit(1)
})
.finally(async()=>{
    await prisma.$disconnect()
})