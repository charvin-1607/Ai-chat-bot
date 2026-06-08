import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  // const {employee} = useSelector((state) => state.auth);
  const { user, authChecked, fetchMyDetailsRequest } = useSelector((state) => state.auth);
  
  // Wait until auth check complete
  if (!authChecked) {

    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );

  }

  // ✅ STEP 2: now check login
  if (!user) {
    return <Navigate to="/login" />;
  }

 // console.log("in ProtectedRoute component employee = ", employee); 

  //  Allowed
  return children;
}

export default ProtectedRoute;