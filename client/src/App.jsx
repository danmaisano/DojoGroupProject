import Layout from './components/Layout'
import { useState, useEffect   } from 'react'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import NewOpportunityForm from './components/NewOpp'
import Dashboard from './Dashboard'
import Cookies from 'js-cookie'
import CompanyDetails from './CompanyDetails'
import ContactCard from './components/Contacts/ContactCard'




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
          {/* <Route path="/test" element={<ContactCard user={user} setUser={setUser} />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

