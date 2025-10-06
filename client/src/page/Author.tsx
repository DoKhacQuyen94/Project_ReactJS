import { Outlet } from "react-router-dom";
import "../scss/AuthLayout.scss";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-content">
        <Outlet /> {/* render Login / Register */}
      </div>
    </div>
  );
}
