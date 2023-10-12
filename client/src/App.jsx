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
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route path='/' element={<Home user={user} setUser={setUser}/>}></Route>
          <Route path='/register' element={<Register user={user} setUser={setUser}/>}></Route>
          <Route path='/login' element={<Login user={user} setUser={setUser}/>}></Route>
          <Route path='/dashboard' element={<Dashboard user={user} setUser={setUser}/>}></Route>
          <Route path='/company/:id' element={<CompanyDetails user={user} setUser={setUser}/>}></Route>
          <Route path='/newOpp' element={<NewOpportunityForm user={user} setUser={setUser}/>}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}


export default App;
