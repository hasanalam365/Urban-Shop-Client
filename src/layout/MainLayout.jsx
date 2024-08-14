import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <h1 className="text-2xl">Nav</h1>
            <Outlet></Outlet>
            <h1>Footer</h1>
        </div>
    );
};

export default MainLayout;