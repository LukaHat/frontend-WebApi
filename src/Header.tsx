import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to="/" className="header">
      <h1 className="header title">Movie API</h1>
    </Link>
  );
};

export default Header;
