'use client'

import { useFormState } from "react-dom"

export type TagFormState = {
  success?: string
  error?: string
}

type TagFormProps = {
  action: (prevState: TagFormState | null, formData: FormData) => Promise<TagFormState>
  initialData?: {
    title: string
    slug: string
  }
  submitText: string
}

export default function TagForm({ action, initialData, submitText }: TagFormProps) {
  const [state, formAction] = useFormState(action, null)

  return (
    <form action={formAction} className="flex flex-col gap-4 text-black">
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          name="title"
          defaultValue={initialData?.title || ''}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Slug</label>
        <input
          name="slug"
          defaultValue={initialData?.slug || ''}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {submitText}
      </button>

      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-500">{state.success}</p>}
    </form>
  )
}
