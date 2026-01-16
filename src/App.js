import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./login";

function App() {
  return (
    <GoogleOAuthProvider clientId="188770635170-726qfsa74mh2ojve27imv8ivghc3na0k.apps.googleusercontent.com">
      <Login />
    </GoogleOAuthProvider>
  );
}

export default App;
