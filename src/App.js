import './App.css';
import Layout from './components/layout/Layout';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import LoginPage from './components/login/LoginPage';

function App() {
  const currentuser = false;
  const RequireAuth = ({ children }) => {
    return currentuser ? (children) : <Link to="/dashboard" />
  }

  return (
    <>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </Layout>


    </>
  );
}

export default App;
