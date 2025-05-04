'use client'

import Link from 'next/link'
import { deleteUserAction } from '@/actions/user-ation'
import { UserListItems } from '@/services/user-service'

type UserTableProps = {
  users: UserListItems[]
}

export default function UserTable({ users }: UserTableProps) {
  return (
    <div>
      <table className="table-auto w-full divide-y divide-border bg-card shadow-md rounded-lg overflow-hidden">
        <thead className="bg-primary">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-background">#</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-background">Email</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-background">Username</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-background">Role</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-background">Created At</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-background">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {users.map((data, i) => (
            <tr
              key={data.id}
              className="hover:bg-muted transition-colors"
            >
              <td className="px-4 py-3 text-sm text-foreground">{i + 1}</td>
              <td className="px-4 py-3 text-sm text-foreground">{data.email}</td>
              <td className="px-4 py-3 text-sm text-foreground">{data.userName}</td>
              <td className="px-4 py-3 text-sm text-foreground">{data.type}</td>
              <td className="px-4 py-3 text-sm text-foreground">
                {new Date(data.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-sm text-foreground space-x-3">
                <Link
                  href={`/users/${data.id}/edit`}
                  className="text-primary hover:text-primary-foreground"
                >
                  Edit
                </Link>
                <form
                  action={deleteUserAction.bind(null, data.id)}
                  method="post"
                  className="inline"
                >
                  <button
                    type="submit"
                    className="text-destructive hover:text-destructive-foreground"
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
