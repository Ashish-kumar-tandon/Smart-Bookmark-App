import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { handleLogout } from "./auth/actions";
import BookmarkForm from "./component/BookmarkForm";
import BookmarkList from "./component/BookmarkList";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Smart Bookmark App</h1>
        <form action={handleLogout}>
          <button
            suppressHydrationWarning={true}
            type="submit"
            className="bg-red-50 cursor-pointer text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
          >
            Logout
          </button>
        </form>
      </div>
      <BookmarkForm userId={user.id} />
      <BookmarkList userId={user.id} />
    </main>
  );
}
