import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
    
    return (
        <div className="home-page">
            <div className="home-content">
                <h1>HOME</h1>
            </div>
        </div>

    );
};


export default Home;

const styles = `
    body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }

    .home-page {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%; /* מבטיח שהעמוד יתפרס על כל הרוחב */
    }

    .home-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100%;
    }
`;


const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

