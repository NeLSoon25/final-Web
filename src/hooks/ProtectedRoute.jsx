import { Navigate, Outlet } from "react-router-dom";
/**
 * redirects user to specified route if no user data is provided.
 * components are implicitly declarated over this component child elements.
 * @param (Object<Object, String, Array<Component>>)   user auth data, default route, child components (implicit)
 * @returns Component                                  the component to render (based url)
 */
export const ProtectedRoute = ({ user, redirectTo, children }) => {
  if (user == null) return <Navigate replace to={redirectTo} />;
  return children ? children : <Outlet />;
};
