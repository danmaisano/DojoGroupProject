import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

function Home() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081/users/')
      .then(res => {
        console.log(res.data);
        if (res.data.Status === "Success") {
          setAuth(true);
          setUser(res.data.user);
        } else {
          setAuth(false);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8081/users/logout')
      .then(res => {
        location.reload(true);
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      {
        auth ?
          <div>
            {/* <h3>{user.first_name} is logged in!</h3> */}
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </div>
          :
          <div>
            <h3>Login Now</h3>
            <Link to="/login" className='btn btn-primary m-3'>Login</Link>
            <Link to="/register" className='btn btn-primary'>Register</Link>
          </div>
      }
    </div>
  )
}

export default Home;
