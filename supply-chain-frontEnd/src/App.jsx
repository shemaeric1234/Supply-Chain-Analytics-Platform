import React from "react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Inventory from "./pages/Inventory";
import Order from "./pages/order";
import Neworder from "./pages/NewOrder";
import MainLayout from "./pages/mainLoyout";
import Dashboards from "./pages/Dashboards";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Inventory />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Order />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/neworder"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Neworder />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Charts"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboards />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
