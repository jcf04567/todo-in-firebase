import React from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import { TodoProvider } from "./context/TodoContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { Container } from "@mui/material";
import NotFound from "./components/NotFound";

function App() {
  const URL_PASS = process.env.REACT_APP_URL_PASS;
  return (
    <TodoProvider>
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
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </TodoProvider>
  );
}

export default App;
