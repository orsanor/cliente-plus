import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Clients from "./views/Clients";
import List from "./views/List";
import NotFound from "./views/NotFound";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Profile from "./views/Profile";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/list/" />,
            },
            {
                path: "/list",
                element: <List />,
            },
            {
                path: "/clients",
                element: <Clients />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/users/new",
                element: <UserForm key={"userCreate"} />,
            },
            {
                path: "/users/:id",
                element: <UserForm key={"userEdit"} />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
