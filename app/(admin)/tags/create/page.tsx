import { createTagAction } from "@/actions/tag-action"
import TagForm, { TagFormState } from "@/app/ui/tag/TagForm"

export default function page(){

    const createTagWithState = async (_prevState:TagFormState | null , formData:FormData): Promise<TagFormState> =>{
        'use server'
        try {
            await createTagAction.bind(formData);
            return { success: 'Tag created successfully!' }
          } catch (error) {
            return { error: 'Failed to create tag.' }
          }
    }
    return(
      <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create Tag</h1>
      <TagForm
      action={createTagWithState}
      submitText="Create Tag"
      />
      </div>
    )
    
}