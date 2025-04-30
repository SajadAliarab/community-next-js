import TagForm from '@/app/ui/tag/TagForm'
import { createTagAction } from '@/actions/tag-action'
import FlashMessage from '@/components/FlashMessage'

export default function CreateTagPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <FlashMessage />
      <h1 className="text-2xl font-bold mb-4">Create Tag</h1>
      <TagForm action={createTagAction} submitText="Create Tag" />
    </div>
  )
}