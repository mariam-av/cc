import React, { useState } from "react";

const Login = ({ setToken, setUser }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const login = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    //TODO on ruby, send back userInfo and token (JWT)
    // const response = await fetch("http://localhost:5000/login", requestOptions);
    // const result = await response.json();
    const result = {
      data: {
        token: {
          token: "someExpiringToken",
          expired: new Date() + 4 * 60 * 60 * 1000,
        },
        user: {
          username: "mariam",
        },
      },
    };
    setToken(result.data?.token);
    setUser(result.data);
  };

  return (
    <>
      <input name="username" onChange={(e) => setUsername(e.target.value)} />
      <input name="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </>
  );
};

export default Login;
