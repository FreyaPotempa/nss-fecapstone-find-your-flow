import { Link, useNavigate } from "react-router-dom";

export const UserNav = () => {
  const navigate = useNavigate();

  return (
    <ul>
      <li className="navbar__item active">
        <Link className="navbar_link" to="/">
          Home
        </Link>
      </li>
      <li className="navbar__item active">
        <Link className="navbar__link" to="/saved">
          Saved Flows
        </Link>
      </li>
      <li className="navbar__item active">
        <Link className="navbar__link" to="/profile">
          My Profile
        </Link>
      </li>
      {localStorage.getItem("yoga_user") ? (
        <li className="navbar__item navbar_logout">
          <Link
            className="navbar_link"
            to=""
            onClick={() => {
              localStorage.removeItem("yoga_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
