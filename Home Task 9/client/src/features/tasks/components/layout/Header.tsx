import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/tasks">
              <button>Мої задачі</button>
            </Link>
          </li>
          <li>
            <Link to="/tasks/create">
              <button>Створити задачу</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
