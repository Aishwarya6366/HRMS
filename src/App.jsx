import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
//import { validators } from "../utils/validation";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Register setIsRegister={setIsLoggedIn} />
      )}
    </>
  );
}
