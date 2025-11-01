import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { Header } from './components/ui/Header';
import BabyDetails from './pages/BabyDetails';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/baby/:babyId" element={<BabyDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
