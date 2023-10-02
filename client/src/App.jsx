import React, { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import NewOpportunityForm from './NewOpp'
import OppDashboard from './OppDashboard'
import ProjectBudgetDashboard from './ProjectBudgetDashboard';
import NewProjectBudgetForm from './NewProjectBudgetForm';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/opportunities' element={<OppDashboard/>}></Route>
        <Route path='/newOpp' element={<NewOpportunityForm/>}></Route>
        <Route path='/projectBudgets' element={<ProjectBudgetDashboard />} /> 
        <Route path='/newProjectBudget' element={<NewProjectBudgetForm />} /> 

      </Routes>
    </BrowserRouter>
  )
}

export default App
