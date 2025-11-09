import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { Header } from './components/ui/AppHeader';
import BabyDetails from './pages/BabyDetails';
import { AuthPage } from './pages/AuthPage';
import { PublicRoute } from './components/routes/PublicRoute';
import { ProtectedRoute } from './components/routes/ProtectedRoute';
import { PageNotFound } from './pages/Page404';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/baby/:babyId"
          element={
            <ProtectedRoute>
              <BabyDetails />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
