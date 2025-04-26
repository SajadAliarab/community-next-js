'use client'

import { createTagAction } from "@/actions/create-tag-action"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function page(){
    const [title,setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [message,setMessage] = useState<{
        type: 'success' | 'error',
        text: string
    } |null >(null)
    const router = useRouter()
    async function handlerSubmit (e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)
        setMessage(null)
        try{
            const formData = new FormData()
            formData.append('title',title)
            formData.append('slug',slug)
            await createTagAction(formData)
            setTitle('')
            setSlug('')
            setMessage({type:'success',text:'Tag is created'})
            setTimeout(()=>router.push('/tags'),3000)
        }catch{
            setMessage({type:'error' , text:'something went wrong! please try again'})
        }finally{
            setIsLoading(false)
        }
        
    } 

    return(
        <>
        <div className="p-8 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">Create New Tag</h1>
            {message && <p className={`p-2 mb-4 text-lg rounded-md ${message.type==='success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message.text}</p>}
            <form className="flex flex-col gap-4 text-black" onSubmit={handlerSubmit}>
                <input
                type="text"
                 className="p-2 border rounded-md"
                 placeholder="Title"
                 value={title}
                 onChange={(e)=>setTitle(e.target.value)}
                 required/>
                <input
                type="text"
                 className="p-2 border rounded-md"
                 placeholder="Slug"
                 value={slug}
                 onChange={(e)=>setSlug(e.target.value)}
                 required/>
                 <button 
                 type="submit"
                 disabled={isLoading}
                 className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 disabled:bg-gray-700">{isLoading? 'saving ...' : 'create Tag'}</button>
                
            </form>
        </div>
        </>
    )
}