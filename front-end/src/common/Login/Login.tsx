import { useAuth0 } from "@auth0/auth0-react";
import { Button, ButtonProps } from "@fluentui/react-components";

export const LoginButton = (props: ButtonProps) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      {...props}
      onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

export const SignUpButton = (props: ButtonProps) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      {...props}
      onClick={() => loginWithRedirect({ screen_hint: "signup" })}>
      Sign Up
    </Button>
  );
}

export const LogoutButton = (props: ButtonProps) => {
  const { logout } = useAuth0();

  return (
    <Button
      {...props}
      onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out      
    </Button>
  );
};

export const AuthenticationButton = (props: ButtonProps) => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LogoutButton {...props} /> : <LoginButton {...props} />;
}