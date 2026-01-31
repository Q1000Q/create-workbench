import type { Route } from "./+types/notes";
import { prisma } from "../db.server";
import { redirect } from "react-router";
import BackButton from "../components/BackButton";

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const title = formData.get("title")?.toString() ?? "";
    const content = formData.get("content")?.toString();
    await prisma.note.create({
        data: {
            title,
            content
        }
    });
    return redirect("/");
};

export default ({ actionData }: Route.ComponentProps) => {
    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <BackButton />
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <header>
                    <h1 className="text-center text-6xl font-bold">
                        All notes
                    </h1>
                </header>
                <form method="POST" className="flex flex-col gap-4 max-w-[100vw] w-300 mt-10">
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="Content"
                        rows={10}
                        name="content"
                        className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <button type="submit" className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors">
                        Create note
                    </button>
                </form>
            </div>
        </main>
    );
};
