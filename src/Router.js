import { BrowserRouter, Routes, Route } from "react-router-dom";

// layout
import AppLayout from "src/components/layout";

// pages
import AuthPage from "src/pages/Auth";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
