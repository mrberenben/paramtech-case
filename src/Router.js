import { BrowserRouter, Routes, Route } from "react-router-dom";

// layout
import AppLayout from "src/components/layout";

// pages
import SignUp from "src/pages/SignUp";
import HomePage from "src/pages/Home";
import PaymentPage from "src/pages/Payment";
import PaymentSuccess from "src/pages/PaymentSuccess";

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
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
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
