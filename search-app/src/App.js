import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/layout";
import Login from "./pages/login";
import Page404 from "./pages/page404";
import Search from "./pages/search";
import Signup from "./pages/signup";
import useAuth from "./hooks/useAuth";
import PersistLogin from "./components/login/PersistLogin";
import RequireAuth from "./components/login/RequireAuth";

// App component (Main)
function App() {
  // For validating whether user is logged in or not
  const { auth } = useAuth();

  return (
    <main className="app">
      {/* Layout component for attaching navigation bar to the remaining app */}
      <Layout>
        <Routes>
          {/* For home (/) route, if user is logged in, then navigated to search app and if not logged in, then navigated to login page */}
          <Route
            exact
            path="/"
            element={
              auth?.email && auth?.accessToken ? (
                <Navigate to="/search" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Global paths - login and signup */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Route - search */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/search" element={<Search />} />
            </Route>
          </Route>

          {/* Invalid Paths */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Layout>
    </main>
  );
}

export default App;
