import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

function Home() {

  return (
    <div>
      {
          <div>
            <h3>Login Here</h3>
            <Link to="/login" className='btn btn-primary m-3'>Login</Link>
            <Link to="/register" className='btn btn-primary'>Register</Link>
          </div>
      }
    </div>
  )
}

export default Home;
