'use server'

import { createTag, updateTag, deleteTag } from '@/services/tag-service'
import { redirect } from 'next/navigation'

export async function createTagAction(formData: FormData) {
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  if (!title || !slug) {
    return redirect(
      `/tags/create?flash=${encodeURIComponent(
        'Title and slug are required'
      )}&type=error`
    )
  }
  try{
    await createTag(title, slug)
  }catch(error){
    console.error(error);
    return redirect(`/tags/create?flash=${encodeURIComponent('Something went wrong!')}&type=error`) 
  }
  return redirect(`/tags?flash=${encodeURIComponent('Tag created successfully!')}&type=success`)
}

export async function updateTagAction(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  if (!title || !slug) {
    return redirect(
      `/tags/${id}/edit?flash=${encodeURIComponent(
        'Title and slug are required'
      )}&type=error`
    )
  }
  try{
    await updateTag(id, { title, slug })
  }catch(error){
    console.error(error);
    return redirect(`/tags?flash=${encodeURIComponent('Something went wrong!')}&type=error`)
  }
  return redirect(`/tags?flash=${encodeURIComponent('Tag updated successfully!')}&type=success`)

}

export async function deleteTagAction(id: string) {
   try{
    await deleteTag(id)
  
   }catch(error){
        console.error(error);
    return redirect(`/tags?flash=${encodeURIComponent('Something went wrong!')}&type=error`)
   }
 
   return redirect(`/tags?flash=${encodeURIComponent('Tag deleted')}&type=success`)

}