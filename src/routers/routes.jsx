import { Routes, Route, BrowserRouter } from "react-router-dom"; //! unused import
import { Login, Home, ProtectedRoute, UserAuth, Configuration, Categories, Movements, Informs } from "../index";
export function MyRoutes() {
  // user data
  const { user } = UserAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/movements" element={<Movements />} />
        <Route path="/informs" element={<Informs />} />
      </Route>
    </Routes>
  );
}