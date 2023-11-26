import { Navigate, Outlet } from "react-router-dom";
/**
 * redirects user to an specific route if he is not logged in
 * @param {Object<Object, String, Array<Component>>}   user auth data, default route, child components
 * @returns Component                                  the component to render (based url)
 */
export const ProtectedRoute = ({ user, redirectTo, children }) => {
  if (user == null) {
    let redirect = <Navigate replace to={redirectTo} />
    console.log("redirect", redirect)
    return redirect;
  }
  let routes = children ? children : <Outlet />
  console.log("routes", routes);
  return routes;
};
