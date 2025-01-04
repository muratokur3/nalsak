import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ClientLayout from "../Layout";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import ChangePassword from "../Auth/ChangePassword";

function LayoutRoute() {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
}

export default LayoutRoute;