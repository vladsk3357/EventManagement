import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "./constants";
import UserContext from "./UserContext";

type Props = {
  children: React.ReactNode;
  authenticationRequired?: boolean;
};

const AuthenticationRedirectProvider = ({ children, authenticationRequired }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { tokens } = useContext(UserContext);

  useEffect(() => {
    if (authenticationRequired && !tokens && pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [authenticationRequired, pathname, tokens, navigate]);

  return children;
};

export default AuthenticationRedirectProvider;
