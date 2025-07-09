import "./App.css";
import React from "react";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import LoaderProvider from "./context/Loader";
import { store } from "./store/configureStore";
import PublicRoute from "./routes/PublicRoute";
import { ToastProvider } from "./context/Toast";
import { UserProvider } from "./context/UserRole";
import PublicLayout from "./components/PublicLayout";
import { ErrorBoundary } from "react-error-boundary";
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorFallback from "./components/ErrorFallback";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <LoaderProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<PublicLayout />}>
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/create-an-account"
                    element={
                      <PublicRoute>
                        <Register />
                      </PublicRoute>
                    }
                  />
                  {/* Catch-all redirect */}
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Route>
                {/* Protected routes under /app */}
                <Route
                  path="/app"
                  element={
                    <ProtectedRoute>
                      <UserProvider>
                        <Layout />
                      </UserProvider>
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </LoaderProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
