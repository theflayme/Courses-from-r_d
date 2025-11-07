import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Header />
            <main><Outlet /></main>
        </div>
    )
}

export default Home;