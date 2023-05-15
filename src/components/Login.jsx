import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { login } from "../services/profileService";
import { useState } from "react";

export default function Login() {
  const queryClient = useQueryClient();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { isLoading, isError, error, data, mutate } = useMutation("login", () =>
    login(loginData)
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    mutate();
  };

  useEffect(() => {
    if (data) {
      console.log("Data changed: " + JSON.stringify(data));    
    }}, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
        <label>Password</label>
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <button type="submit">Login</button>
      </form>
    </div>
   
    
  );
}
