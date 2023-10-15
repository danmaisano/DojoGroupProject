import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function Home() {
  return (
    <Container fluid style={{  minHeight: '100vh', paddingTop: '5rem' }}>
      <div className="text-center">
        <h1>Welcome to Dojo CRM!</h1>
        <p className="lead">Join our community or sign in to continue.</p>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-3 text-center">
          <h3>Returning user?</h3>
          <Link to="/login" className='btn btn-secondary m-3'>Login</Link>
        </div>
        <div className="col-md-3 text-center">
          <h3>Are you new here?</h3>
          <Link to="/register" className='btn btn-primary m-3'>Register</Link>
        </div>
      </div>
    </Container>
  )
}

export default Home;






