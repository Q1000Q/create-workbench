import type { Route } from "./+types/home";
import { prisma } from "../db.server";
import { Link } from "react-router";

export const meta = ({}: Route.MetaArgs) => {
    return [
        { title: "New Workbench Stack App" },
        { name: "description", content: "Welcome to Workbench Stack! The combination of React Router, SQLite and Prisma, that's it, everything simple and in one place." },
    ];
}

export const loader = async ({ params }: Route.LoaderArgs) => {
    const latesNotes = await prisma.note.findMany({
        orderBy: { publishedAt: 'desc' },
        take: 5
    })
    return latesNotes;
}

export default ({ loaderData }: Route.ComponentProps) => {
    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <header className="w-150 max-w-[100vw] p-4">
                    <h1 className="text-center text-6xl font-bold">
                        Welcome to Workbench Stack
                    </h1>
                </header>
                <h2 className="text-center text-4xl font-bold">Notes:</h2>
                <div className="w-300 space-y-6 px-4 justify-center gap-4 grid grid-cols-3 grid-rows-2">
                    <Link to="/newNote" className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 my-4 space-y-4 flex justify-center items-center text-7xl hover:bg-gray-500/30 transition-all w-full h-full">
                        +
                    </Link>
                    {loaderData.map(({ title, content, publishedAt }) => (
                        <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 my-4 space-y-4 w-full h-full">
                            <h3 className="font-bold text-2xl">{ title }</h3>
                            <p>{ content?.length! > 150 ? (content?.slice(0, 150) + "...") : content }</p>
                            <p className="text-gray-500">{ publishedAt.toUTCString() }</p>
                        </div>
                    ))}
            </div>
                <Link to="/notes" className="text-blue-700 hover:underline dark:text-blue-500">See all notes...</Link>
            </div>
        </main>
    );
}
