import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import RequiredAuth from "./pages/auth/requiredAuth";
function App() {
  return (
    <Routes>
      <Route element={<RequiredAuth />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
