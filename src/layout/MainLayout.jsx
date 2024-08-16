import { Outlet } from "react-router-dom";
import Navber from "../Shared/Navber";
import Footer from "../Shared/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navber></Navber>
            <div className="min-h-[calc(100vh-300px)] mb-[80px]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;