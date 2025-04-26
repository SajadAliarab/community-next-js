'user server'
import {createTag} from '@/services/tag-service'

export async function createTagAction(formData:FormData) {
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string

    if(!title || !slug){
        throw new Error('Title and slug field is require')
    }

    const newTag = createTag(title,slug)

    return newTag
    
}