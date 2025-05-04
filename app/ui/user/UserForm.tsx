'use client'
import { createUserAction, updateUserAction } from "@/actions/user-ation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCreateSchema, UserFormData, UserUpdateFormData, UserUpdateSchema } from "@/schemas/user";
import {CreateUserInput, type UpdateUserInput } from "@/services/user-service";
import { useState } from "react";
import {  z } from "zod";

type UserFormProps = {
  action:'create' | 'edit'
  submitText: string
  initialData?: UpdateUserInput 
}

export default function UserForm({action , submitText , initialData}:UserFormProps){
 const [form , setForm] = useState<CreateUserInput & {confirmPassword:string}>({
  email:initialData?.email || '',
  userName:initialData?.userName || '',
  password:'',
  confirmPassword:'',
  type: initialData?.type || 'USER'
 })
 const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})
 function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
  const { name, value } = e.target
  setForm(f => ({ ...f, [name]: value as any }))
  setErrors(err => ({ ...err, [name]: undefined }))

  if (name !== 'confirmPassword') {
    const singleSchema = z.object({ [name]: (UserCreateSchema.shape as any)[name] })
    const result = singleSchema.safeParse({ [name]: value })
    if (!result.success) {
      setErrors(err => ({ ...err, [name]: result.error.issues[0].message }))
    }
  }
}

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  setErrors({})
  switch (action){
    case 'create':
      const parsed = UserCreateSchema.safeParse(form)
      if (!parsed.success) {
        const fieldErrors: typeof errors = {}
        for (const issue of parsed.error.issues) {
          const key = issue.path[0] as keyof UserFormData
          fieldErrors[key] = issue.message
        }
        setErrors(fieldErrors)
        return
      }
      if (form.password !== form.confirmPassword) {
        setErrors({ confirmPassword: 'Passwords do not match' })
        return
      }
    
      const fd = new FormData()
      Object.entries(parsed.data).forEach(([k,v]) => fd.append(k, v.toString()))
      return await createUserAction(fd)
    case 'edit':
      const parsedEdit = UserUpdateSchema.safeParse(form)
      if(!parsedEdit.success){
        const fieldErrors: typeof errors ={}
        for (const issue of parsedEdit.error.issues) {
          const key = issue.path[0] as keyof UserUpdateFormData
          fieldErrors[key] = issue.message
        }
        setErrors(fieldErrors)
        return
        }
        const fdEdit= new FormData()
        Object.entries(parsedEdit.data).forEach(([k,v])=>fdEdit.append(k,v.toString()))
        return await updateUserAction(initialData!.id,fdEdit)
  }

}

 
 return(
  <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-4">
  <label className="font-medium">Email</label>
  <input
    name="email"
    type="email"
    onChange={handleChange}
    value={form.email}
    required
    placeholder="example@example.com"
    className="border rounded p-2 bg-input text-primary"
  />
  {errors.email&&(
    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
  )}

    <label className="font-medium">User Name</label>
  <input
    name="userName"
    onChange={handleChange}
    value={form.userName}
    required
    placeholder="Using this name as your name "
    className="border rounded p-2 bg-input text-primary"
  />
  {errors.userName &&(
    <p className="mt-1 text-sm text-red-600">{errors.userName}</p>
  )}
 {action==='create' && (
  <>
  <label className="font-medium"> Password </label>
  <input
  name="password"
  type="password"
  onChange={handleChange}
  value={form.password}
  required
  className="border rounded p-2 bg-input text-primary"
/>
  <label className="font-medium">Confirm Password</label>
    <input
      name="confirmPassword"
      type="password"
      onChange={handleChange}
      value={form.confirmPassword}
      required
      className="border rounded p-2 bg-input text-primary"
    />
    {errors.confirmPassword && (
      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
    )}
</>
 )}
{errors.password &&(
    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
  )}
  
   <label className="font-medium">Role</label>
        <Select
          name="type"
          value={form.type}
          onValueChange={val =>
            handleChange({ target: { name: 'type', value: val } } as any)
          }
        >
          <SelectTrigger className="w-full border rounded p-2 bg-input text-primary">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="MODERATOR">Moderator</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type}</p>
        )}
  <button type="submit" className="bg-accent text-white p-2 rounded">
    {submitText}
  </button>
</form>
  
 )
}