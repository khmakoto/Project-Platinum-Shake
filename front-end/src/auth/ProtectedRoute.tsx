import React, { ComponentType } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

interface ProtectedRouteProps {
  component: ComponentType;
}

export const ProtectedRoute : React.FC<ProtectedRouteProps> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      // TODO: Use a loading component instead.
      <div>Redirecting...</div>
    ),
  });

  return <Component />;
};