import type {User as PrismaUser } from '@prisma/client'
import {prisma} from '@/lib/prisma'
import bcrypt from 'bcrypt'
export type CreateUserInput = Omit<PrismaUser , 'id' | 'createdAt' | 'updatedAt' | 'detail' | 'articles' | 'topiscs' | 'comments' | 'replies'>
export type UpdateUserInput = Pick<PrismaUser , 'email' | 'userName' | 'type' >
export type UserListItems = Pick<PrismaUser, 'id' | 'email' | 'userName' | 'type' | 'createdAt'>
export async function createUser(data : CreateUserInput):Promise<PrismaUser>{
    const{password, ...rest} = data
    const hashPassword = await bcrypt.hash(password,Number(process.env.SALT_ROUNDS) | 10)
    return await prisma.user.create({
        data:{
            password:hashPassword,
            ...rest
        }})
}
export async function deleteUser(id:string){
    return await prisma.user.delete({
        where:{id}
    })
}
export async function updateUser(id:string,data:UpdateUserInput):Promise<PrismaUser>{
    return await prisma.user.update({
        where:{id},
        data
    })
}
export async function getUsers():Promise<UserListItems[]>{
    return await prisma.user.findMany({
        select:{
            id:true,
            email:true,
            userName:true,
            type:true,
            createdAt:true
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
}
export async function getUserById(id:string):Promise<PrismaUser | null>{
    return await prisma.user.findFirst({
        where:{id}
    })
}