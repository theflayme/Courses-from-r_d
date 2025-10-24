import { Link } from "react-router-dom";

const Header = () => {

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/CreateTask"><button>Створити задачу</button></Link></li>
                    <li><Link to="/TaskList"><button>Мої задачі</button></Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;