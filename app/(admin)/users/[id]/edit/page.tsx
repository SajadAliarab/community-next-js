import UserForm from "@/app/ui/user/UserForm"
import FlashMessage from "@/components/FlashMessage"
import { getUserById } from "@/services/user-service"


export default async function Page({
  params,
}: {
  params: { id: string }
}) {
  const user = await getUserById(params.id)
  if (!user) return <p>Tag not found</p>

  return (
    <div className="max-w-md mx-auto p-6">
      <FlashMessage />
      <h1 className="text-2xl font-bold mb-4">Edit Tag</h1>
      <UserForm
        action="edit"
        submitText="Update Tag"
        initialData={{ id:user.id,email:user.email,userName:user.userName,type:user.type}}
      />
    </div>
  )
}