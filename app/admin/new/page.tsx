import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/supabase/server";
import PostEditor from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return <PostEditor />;
}
