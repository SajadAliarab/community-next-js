'use client'

import Link from 'next/link'
import { deleteTagAction } from '@/actions/tag-action'

export default function TagsTable({
  tags,
}: {
  tags: { id: string; title: string; slug: string; createdAt: Date }[]
}) {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b">
          <th>#</th>
          <th>Title</th>
          <th>Slug</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tags.map((t, i) => (
          <tr key={t.id} className="border-b">
            <td className="py-2">{i + 1}</td>
            <td className="py-2">{t.title}</td>
            <td className="py-2">{t.slug}</td>
            <td className="py-2">{new Date(t.createdAt).toLocaleDateString()}</td>
            <td className="py-2 flex gap-2">
              <Link
                href={`/tags/${t.id}/edit`}
                className="text-blue-500 hover:underline"
              >
                Edit
              </Link>
              <form action={deleteTagAction.bind(null, t.id)} method="post">
                <button
                  type="submit"
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}