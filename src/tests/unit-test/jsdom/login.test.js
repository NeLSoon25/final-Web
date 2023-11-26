import renderer from 'react-test-renderer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../../../hooks/ProtectedRoute';

const Login = () => <div>Login Page</div>;

const Home = () => <div>Home Page</div>;

describe('Protected route component testings', () => {
  it('protected route redirects unidentified user', () => {
    const user = null;

    const component = renderer.create(
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    setTimeout(() => {
      expect(window.location.href).toBe('http://localhost:5173/login');
    }, 5000);
  });

  it('protected route allows identified user access home page', () => {
    const user = { msg: 'hello world' };

    const component = renderer.create(
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    setTimeout(() => {
      expect(window.location.href).toBe('http://localhost:5173/');
    }, 5000);
  });
});