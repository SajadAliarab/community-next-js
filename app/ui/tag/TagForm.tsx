'use client'

type TagFormProps = {
  action: (formData: FormData) => Promise<void>
  submitText: string
  initialData?: { title: string; slug: string }
}

export default function TagForm({ action, submitText, initialData }: TagFormProps) {
  return (
    <form action={action} method="post" className="flex flex-col gap-4 text-black">
      <label className="font-medium">Title</label>
      <input
        name="title"
        defaultValue={initialData?.title}
        required
        className="border rounded p-2"
      />

      <label className="font-medium">Slug</label>
      <input
        name="slug"
        defaultValue={initialData?.slug}
        required
        className="border rounded p-2"
      />

      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        {submitText}
      </button>
    </form>
  )
}