import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
    toast.success("Logout Successful");
  };
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <p className="navbar-brand text-light m-1">ExpenseTracker</p>
            <button
              className="navbar-toggler bg-light "
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/Dashboard" className="nav-link text-light">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link to="Transactions" className="nav-link text-light">
                  Transactions
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-end mr-4">
            <li className="nav-item d-flex justify-content-center">
              <a
                className="nav-link text-light "
                role="button"
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
          </div>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
export default Navbar;
