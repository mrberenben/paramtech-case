import { BrowserRouter, Routes, Route } from "react-router-dom";

// layout
import AppLayout from "src/components/layout";

// pages
import SignUp from "src/pages/SignIn";
import HomePage from "src/pages/Home";

// utils
import ProtectedRoute from "src/utils/ProtectedRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
