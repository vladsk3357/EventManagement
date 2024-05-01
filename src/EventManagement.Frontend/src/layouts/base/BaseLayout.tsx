import { useNavigate } from "react-router-dom";
import { AuthenticationRedirectProvider, UserContext } from "../../components/user";
import { useContext, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  authenticationRequired?: boolean;
};

const BaseLayout = ({ children, authenticationRequired = true }: Props) => {
  const { user, requestUser } = useContext(UserContext);

  useEffect(() => {
    if (authenticationRequired && !user) {
      requestUser();
    }
  }, []);

  if (authenticationRequired) {
    return (
      <AuthenticationRedirectProvider authenticationRequired={authenticationRequired}>
        {children}
      </AuthenticationRedirectProvider>
    );
  } else {
    return <>{children}</>;
  }
};

export default BaseLayout;
