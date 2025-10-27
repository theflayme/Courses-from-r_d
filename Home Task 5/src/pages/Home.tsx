import Header from "../component/Header";
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