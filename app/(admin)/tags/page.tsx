import { prisma } from "@/lib/prisma";

export default async function page(){
    const tags = await prisma.tag.findMany({
        orderBy:{createdAt:'desc'}
    })
    return(
        <>
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Tags List</h1>
            <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="border p-2">Title</th>
            <th className="border p-2">Slug</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td className="border p-2">{tag.title}</td>
              <td className="border p-2">{tag.slug}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
        </>
    )
}