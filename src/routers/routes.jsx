import { Routes, Route, BrowserRouter } from "react-router-dom"; //! unused import
import { Login, Home, ProtectedRoute, UserAuth, Configuracion, Categorias, Movimientos, Informes } from "../index";
export function MyRoutes() {
  // user data
  //* const { user } = UserAuth();
  const user = {
    picture: "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg?w=170&h=170",
    name: "tester"
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configurar" element={<Configuracion />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/movimientos" element={<Movimientos />} />
        <Route path="/informes" element={<Informes />} />
      </Route>
    </Routes>
  );
}