import React from "react";

const Dashboard = () => {
  const userId = sessionStorage.getItem("user_id");
  const setLogout = () => {
    sessionStorage.removeItem("user_id");
    window.location.href = "/"; // Redirect to login page
  };
  return (
    <div>
      <header>
        <h1 className="login-heading">Dashboard</h1>
      </header>
      <main>
        <div className="main-content">
          <h1 className="welcome-heading">
            Welcome to the Dashboard! {userId}
          </h1>
          <button type="button" onClick={setLogout} className="submit-btn">
            Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
