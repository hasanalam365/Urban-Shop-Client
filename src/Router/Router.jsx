import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Products from "../Pages/Products";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/products',
                element: <Products></Products>
            },
        ]
    },
]);

export default router