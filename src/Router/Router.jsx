import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Products from "../Pages/Products";
import PrivateRoute from "../Routes/PrivateRoute";
import ProductDetails from "../Pages/ProductDetails";

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
                element: <PrivateRoute>
                    <Products></Products>
                </PrivateRoute>,

            },
            {
                path: '/product-details/:id',
                element: <ProductDetails></ProductDetails>,
                // loader: ({ params }) => fetch(`https://urban-shop-server.vercel.app/product-details/${params.id}`)
                loader: ({ params }) => fetch(`http://localhost:5000/product-details/${params.id}`)
            }
        ]
    },
]);

export default router