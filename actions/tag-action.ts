"use server";
import { createTag, deleteTag, updateTag } from "@/services/tag-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// CREATE
export async function createTagAction(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;

  if (!title || !slug) {
    throw new Error("Title and slug field is require");
  }
  try {
    const newTag = await createTag(title, slug);
    setTimeout(()=>redirect('/tags'),3000)
    return newTag;
    
  } catch (error) {
    console.error("create tag error", error);
    throw new Error("could not create tag");
  }
}

//DELETE
export async function deleteTagAction(id: string) {
  if (!id) {
    throw new Error("The tag Id does not recieve");
  }
  try {
    await deleteTag(id);
    revalidatePath("/tags");
  } catch (error) {
    console.error("could not delete tag", error);
    throw new Error("Could not delete tag");
  }
}

//UPDATE
export async function updateTagAction(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  if (!title || !slug) {
    throw new Error("Title and slug field is require");
  }
  try {
    const newTag = await updateTag(id, { title, slug });
    revalidatePath("/tags");
  } catch (error) {
    console.error("could not update tag", error);
    throw new Error("Could not update tag");
  }
}
