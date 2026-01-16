import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./login";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Login />
    </GoogleOAuthProvider>
  );
}

export default App;
