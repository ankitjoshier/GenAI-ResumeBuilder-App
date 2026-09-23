import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  // <-- accept children as a prop
  const { loading, user } = useAuth();

  if (loading) {
    return <main>Loading.....</main>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
    // 'replace' prevents aback navigation to protected route
  }

  return children; // <-- now children will render properly
}

export default Protected;
