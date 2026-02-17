"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${siteUrl}/auth/callback` },
  });
  if (error) redirect("/login?error=Could not authenticate user");
  if (data.url) redirect(data.url);
}

export async function handleLogout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
