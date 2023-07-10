import React from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { Container } from "@mui/material";

function App() {
  const URL_PASS = process.env.REACT_APP_URL_PASS;
  console.log(URL_PASS);
  return (
    <AuthProvider>
      <Container maxWidth="sm">
        <BrowserRouter  basename={URL_PASS}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route element={<PublicRoute />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </AuthProvider>
  );
}

export default App;
