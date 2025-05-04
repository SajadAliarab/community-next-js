import { createUserAction } from "@/actions/user-ation";
import UserForm from "@/app/ui/user/UserForm";
import FlashMessage from "@/components/FlashMessage";

export default function Page(){
    return(
         <div className="max-w-md mx-auto p-6">
              <FlashMessage/>
              <h1 className="text-2xl font-bold mb-4">Create Tag</h1>
        <UserForm action="create" submitText="Create User" />
        </div>
    )
}