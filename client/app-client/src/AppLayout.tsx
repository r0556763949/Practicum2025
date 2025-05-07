import { Outlet } from "react-router";
import Header from "./components/centeral/Header";
import Footer from "./components/centeral/Footer";
const AppLayout = () => {
    return (

        <>
            <div className="app-container">
                <Header />
                <main className="main-content">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
}
export default AppLayout;