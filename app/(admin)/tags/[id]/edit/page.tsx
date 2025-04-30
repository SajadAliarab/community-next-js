import TagForm from '@/app/ui/tag/TagForm'
import { getTagById } from '@/services/tag-service'
import { updateTagAction } from '@/actions/tag-action'
import FlashMessage from '@/components/FlashMessage'

export default async function EditTagPage({
  params,
}: {
  params: { id: string }
}) {
  const tag = await getTagById(params.id)
  if (!tag) return <p>Tag not found</p>

  return (
    <div className="max-w-md mx-auto p-6">
      <FlashMessage />
      <h1 className="text-2xl font-bold mb-4">Edit Tag</h1>
      <TagForm
        action={updateTagAction.bind(null, params.id)}
        submitText="Update Tag"
        initialData={{ title: tag.title, slug: tag.slug }}
      />
    </div>
  )
}