import { deleteTagAction } from "@/actions/tag-action";
import { getTag } from "@/services/tag-service";
import Link from "next/link";

export default async function page(){
  const tags = await getTag()
    return(
        <>
<div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tags</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2">Num</th>
            <th className="py-2">Title</th>
            <th className="py-2">Slug</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag, index) => (
            <tr key={tag.id} className="border-b">
              <td className="py-2">{index+1}</td>
              <td className="py-2">{tag.title}</td>
              <td className="py-2">{tag.slug}</td>
              <td className="py-2 flex gap-2">
              <Link href={`/tags/${tag.id}/edit`} className="text-blue-500 hover:underline">
                Edit
              </Link>
                <form action={deleteTagAction.bind(null, tag.id)}>
                  <button type="submit" className="text-red-500 hover:underline">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </>
    )
}