import { Link } from "react-router-dom";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          movies
        </Link>
        <Search />
      </div>
    </nav>
  );
};

export default Navbar;
