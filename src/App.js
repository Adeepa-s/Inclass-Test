import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./login";

function App() {
  return (
    <GoogleOAuthProvider clientId="620344024622-u500oqlom5blrkf5abr3533bpa2g4h1t.apps.googleusercontent.com">
      <Login />
    </GoogleOAuthProvider>
  );
}

export default App;
