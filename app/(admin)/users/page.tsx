import UserTable from "@/app/ui/user/UserTable";
import FlashMessage from "@/components/FlashMessage";
import { getUsers } from "@/services/user-service";

export default async function page(){
const users = await getUsers()
return(
    <div className="max-w-md mx-auto p-6">
        <FlashMessage/>
     <h1 className="text-2xl font-bold md-4">Users</h1>
     <UserTable users = {users}/>   
    </div>
)
}