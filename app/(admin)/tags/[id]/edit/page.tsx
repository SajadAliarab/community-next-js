import { getTagById } from "@/services/tag-service";
import { updateTagAction } from "@/actions/tag-action";
import TagForm, { TagFormState } from "@/app/ui/tag/TagForm";
import { notFound } from "next/navigation";

type EditTagPageProps = {
  params: {
    id: string
  }
}

export default async function EditTagPage({ params }: EditTagPageProps) {
  const tag = await getTagById(params.id);

  if (!tag) {
    notFound();
  }

  const updateTagWithState = async (_prevState: TagFormState | null, formData: FormData): Promise<TagFormState> => {
    'use server'
    try {
      await updateTagAction(params.id, formData);
      return { success: 'Tag updated successfully!' }
    } catch (error) {
      return { error: 'Failed to update tag.' }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Tag</h1>
      <TagForm
        action={updateTagWithState}
        initialData={{
          title: tag.title,
          slug: tag.slug
        }}
        submitText="Update Tag"
      />
    </div>
  );
}