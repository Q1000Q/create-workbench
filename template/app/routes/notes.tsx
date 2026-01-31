import type { Route } from "./+types/notes";
import { prisma } from "../db.server";
import { Link } from "react-router";
import BackButton from "../components/BackButton";

export const loader = async ({ params }: Route.LoaderArgs) => {
    const latesNotes = await prisma.note.findMany({
        orderBy: { publishedAt: "desc" },
    });
    return latesNotes;
};

export default ({ loaderData }: Route.ComponentProps) => {
    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <BackButton />
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <header>
                    <h1 className="text-center text-6xl font-bold">
                        All notes
                    </h1>
                </header>
                <div className="flex flex-col gap-4 max-w-[100vw] w-300 mt-10">
                    <Link to="/newNote" className="w-full flex justify-center items-center rounded-3xl border border-gray-200 p-6 dark:border-gray-700 my-4 space-y-4 text-7xl hover:bg-gray-500/30 transition-all">
                        +
                    </Link>
                    {loaderData.map(({ title, content, publishedAt }) => (
                        <div className="w-full rounded-3xl border border-gray-200 p-6 dark:border-gray-700 my-4 space-y-4">
                            <h3 className="font-bold text-2xl">{ title }</h3>
                            <p>{ content }</p>
                            <p className="text-gray-500">{ publishedAt.toUTCString() }</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};
