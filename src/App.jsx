import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout.jsx";
import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";
import ActivitiesPage from "./activities/ActivitiesPage.jsx";
import Error404 from "./Error404.jsx";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ActivitiesPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
