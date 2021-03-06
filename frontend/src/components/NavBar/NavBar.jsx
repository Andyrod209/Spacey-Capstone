import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul className="navul">
      {user ? (
        <li><button onClick={() => navigate("/profile")}>Profile</button></li>
      ) : (
        <button onClick={() => navigate("/login")}>Profile</button>
      )}
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white", textAlign: "center" }}>
            <b>Spacey</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
