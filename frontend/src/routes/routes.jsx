import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Chat from "../pages/Chat";

import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "../pages/LandingPage";


const router = createBrowserRouter([
    
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    },


    {
        path: "/chat",
        element: <ProtectedRoute>
                     <Chat />
            </ProtectedRoute>
    }

]);


function AppRoute() {

    return (
        <RouterProvider router={router} />
    );

}

export default AppRoute;