"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  created_at: string;
  user_id: string;
};

export default function BookmarkList({ userId }: { userId: string }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [supabase, setSupabase] = useState<any>(null);

  useEffect(() => {
    setSupabase(createClient());
  }, []);

  useEffect(() => {
    if (!supabase) return;

    const checkUserAndSubscribe = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user?.id !== userId) {
        console.warn("Mismatch between client session and server prop user!");
      }

      const fetchBookmarks = async () => {
        const { data } = await supabase
          .from("bookmarks")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });
        if (data) setBookmarks(data as Bookmark[]);
      };

      fetchBookmarks();

      const channel = supabase
        .channel(`realtime_bookmarks_${userId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookmarks",
          },
          () => fetchBookmarks(),
        )
        .subscribe();

      return channel;
    };

    const channelPromise = checkUserAndSubscribe();

    return () => {
      channelPromise.then((channel) => {
        if (channel) supabase.removeChannel(channel);
      });
    };
  }, [supabase, userId]);

  const deleteBookmark = async (id: string) => {
    if (!supabase) return;
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  if (!supabase) return null;

  return (
    <div className="grid gap-4 mt-8">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        >
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100">
              {bookmark.title}
            </h3>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm underline dark:text-blue-400"
            >
              {bookmark.url}
            </a>
          </div>
          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="text-red-500 cursor-pointer hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
