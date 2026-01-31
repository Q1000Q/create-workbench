import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/notes", "routes/notes.tsx"),
    route("/newNote", "routes/newNote.tsx"),
] satisfies RouteConfig;
