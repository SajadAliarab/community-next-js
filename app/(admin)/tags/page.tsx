import { getTags } from '@/services/tag-service'
import TagsTable from '@/app/ui/tag/TagsTable'
import FlashMessage from '@/components/FlashMessage'

export default async function TagsPage() {
  const tags = await getTags()
  return (
    <div className="max-w-5xl mx-auto p-6">

      <FlashMessage />
     
      <h1 className="text-2xl font-bold mb-4">Tags</h1>
      <TagsTable tags={tags} />
    </div>
  )
}
