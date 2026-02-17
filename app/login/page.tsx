import { signInWithGoogle } from "../auth/actions";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="p-8 border border-gray-200 rounded-xl shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900">
          Smart Bookmark App
        </h1>
        <form action={signInWithGoogle}>
          <button
            type="submit"
            className="w-full cursor-pointer flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all font-medium"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}
