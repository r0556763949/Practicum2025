import { Outlet } from "react-router";
import Header from "./components/centeral/Header";
import Footer from "./components/centeral/Footer";
const AppLayout = () => {
    return (

        <>

            <Header />
            <main style={{
                marginTop: "70px", // גובה ההדר
                marginBottom: "80px", // גובה הפוטר
                height: "calc(100vh - 70px - 80px)", // חישוב הגובה הפנוי
                overflow: "hidden", // מונע גלילה פנימית
            }}>
                <Outlet />
            </main>
            <Footer />
</>
    );
}
export default AppLayout;