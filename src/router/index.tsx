import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Create from "../pages/Create";
import Layout from "../layout/Layout";
import NotFound from "../pages/NotFound";
import UserEdit from "../components/UserEdit";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/create",
                element: <Create />,
            },
            {
                path: "/edit/:id",
                element: <UserEdit />,
            },
        ]
    },
])