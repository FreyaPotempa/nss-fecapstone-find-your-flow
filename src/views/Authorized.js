import { Navigate, useLocation } from "react-router-dom";

export const Authorized = ({ children, token, setToken }) => {
  const location = useLocation();

  if (token) {
    return children;
  } else {
    return (
      <Navigate to={`/login/${location.search}`} replace state={{ location }} />
    );
  }
};
