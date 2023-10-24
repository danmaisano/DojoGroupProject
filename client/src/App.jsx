import Layout from './components/Layout'
import { useState, useEffect   } from 'react'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import NewOpportunityForm from './components/NewOpp'
import Dashboard from './pages/Dashboard'
import Cookies from 'js-cookie'
import CompanyDetails from './pages/CompanyDetails'
import ContactCard from './components/Contacts/ContactCard'
import ViewOpportunity from './pages/ViewOpportunity'
import ContactsList from './components/Contacts/ContactsList'
import SuperAdminDashboard from './pages/SuperAdminDashboard'
import TestTable from './components/Contacts/testTable'

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const savedUserData = Cookies.get("userData");
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      setUser(userData);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/register" element={<Register user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        
        {/* Layout wraps the routes below */}
        <Route element={<Layout user={user} setUser={setUser} />}>
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
          <Route path="/company/:id" element={<CompanyDetails user={user} setUser={setUser} />} />
          <Route path="/newOpp" element={<NewOpportunityForm user={user} setUser={setUser} />} />
          <Route path="/view-opportunity/:id" element={<ViewOpportunity />} />
          <Route path="/contacts" element={<ContactsList user={user} setUser={setUser} />} />
          <Route path="/superAdminDashboard" element={<SuperAdminDashboard user={user} setUser={setUser} />} />
  
          <Route path="/test" element={<TestTable user={user} setUser={setUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

