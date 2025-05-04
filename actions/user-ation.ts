'use server'

import { createUser, deleteUser, updateUser } from "@/services/user-service"
import { Role } from "@prisma/client"
import { redirect } from "next/navigation"

export async function createUserAction(formData:FormData){
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const userName = formData.get('userName') as string
    const type = formData.get('type') as Role

    if(!email || !userName || !password || type === undefined){
        return redirect(`/users/create?flash=${encodeURIComponent('All fields required!')}&type=error`)
    }
    try{
        await createUser({email,userName,password,type})
    }catch(error){
        console.error(error)
        return redirect(`/users/create?flash=${encodeURIComponent('Something went wrong!')}&type=error`)
    }
     return redirect(`/users?flash=${encodeURIComponent('User created!')}&type=success`)
}
export async function updateUserAction(id:string,formData:FormData){
    const userName = formData.get('userName') as string
    const type = formData.get('type') as Role

    if(!userName || type === undefined ){
        return redirect(`/users/${id}/edit?flash=${encodeURIComponent('All fields required!')}&type=error`)
    }
    try{
        await updateUser(id,{userName,type})
    }catch(error){
        console.error(error)
        return redirect(`/users/${id}/edit?flash=${encodeURIComponent('Something went wrong!')}&type=error`)
    }
    return redirect(`/users?flash=${encodeURIComponent('User updated!')}&type=success`)
}
export async function deleteUserAction(id:string){
    try{
        await deleteUser(id)
    }catch(error){
        console.error(error)
        return redirect(`/users?flash=${encodeURIComponent('Something went wrong !')}&type=error`)
    }
    return redirect(`/users?flash=${encodeURIComponent('User deleted! ')}&type=success`)
}