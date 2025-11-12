import { Link } from "react-router-dom";

const Header = () => {

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/create-task"><button>Створити задачу</button></Link></li>
                    <li><Link to="/task-list"><button>Мої задачі</button></Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;