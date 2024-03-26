import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "./constants";

type Props = {
  children: React.ReactNode;
  authenticationRequired?: boolean;
};

const AuthenticationRedirectProvider = ({ children, authenticationRequired }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticationRequired && !localStorage.getItem(ACCESS_TOKEN)) {
      navigate('/login', { replace: true });
    }
  }, [authenticationRequired]);

  return children;
};

export default AuthenticationRedirectProvider;
