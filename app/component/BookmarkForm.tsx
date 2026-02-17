"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function BookmarkForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supabase, setSupabase] = useState<any>(null);

  useEffect(() => {
    setSupabase(createClient());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    setIsSubmitting(true);
    const { error } = await supabase
      .from("bookmarks")
      .insert([{ title, url, user_id: userId }]);

    if (!error) {
      setTitle("");
      setUrl("");
    } else {
      alert("Error adding bookmark");
      console.error(error);
    }
    setIsSubmitting(false);
  };

  if (!supabase) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 border rounded-xl bg-white shadow-sm dark:bg-gray-900 dark:border-gray-700"
    >
      <input
        type="text"
        placeholder="Website Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-600"
        required
      />
      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="p-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-600"
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black cursor-pointer text-white p-2 rounded hover:bg-gray-800 transition disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
      >
        {isSubmitting ? "Adding..." : "Add Bookmark"}
      </button>
    </form>
  );
}
