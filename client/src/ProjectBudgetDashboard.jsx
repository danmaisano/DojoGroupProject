import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProjectBudgetDashboard() {
  const [projectBudgets, setProjectBudgets] = useState([]);
  const [editing, setEditing] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8081/projectBudgets/')
      .then(res => {
        console.log(res.data);
        setProjectBudgets(res.data.projectBudgets);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDoubleClick = (id, field) => {
    setEditing({ id, field });
  };

  const handleChange = (e, id, field) => {
    const value = parseFloat(e.target.value) || e.target.value;
    setProjectBudgets(projectBudgets.map(budget => budget.id === id ? { ...budget, [field]: value } : budget));
  };

  const handleBlur = (id, field) => {
    const budgetToUpdate = projectBudgets.find(budget => budget.id === id);
    setEditing({});
    
    axios.put(`http://localhost:8081/projectBudgets/${id}`, { [field]: budgetToUpdate[field] })
      .then(res => {
        setProjectBudgets(projectBudgets.map(budget => budget.id === id ? { ...budget, [field]: budgetToUpdate[field] } : budget));
      })
      .catch(err => console.log(err));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  return (
    <div className="container">
      <h1>Project Budget Dashboard</h1>
      <Link to="/newProjectBudget" className="btn btn-success mb-3">Create New Budget</Link>
      <Link to="/opportunities" className="btn btn-success mb-3">Return to Opportunities</Link>
      <hr></hr>
      <table className="table">
        <thead>
          <tr>
            <th>Task Code</th>
            <th>Item Name</th>
            <th>Job Code</th>
            <th>Phase Code</th>
            <th>Category Code</th>
            <th>Estimated Quantity</th>
            <th>Estimated Price</th>
            <th>Estimated Amount</th>
            <th>Revised Quantity</th>
            <th>Revised Price</th>
            <th>Revised Amount</th>
          </tr>
        </thead>
        <tbody>
          {projectBudgets.map((budget, index) => (
            <tr key={index}>
              {['task_code', 'item_name', 'job_code', 'phase_code', 'category_code', 'est_quantity', 'est_price', 'est_amount', 'rev_quantity', 'rev_price', 'rev_amount'].map((field, i) => (
                <td key={i} onDoubleClick={() => handleDoubleClick(budget.id, field)}>
                  {editing.id === budget.id && editing.field === field ? (
                    <input
                      value={budget[field]}
                      onChange={(e) => handleChange(e, budget.id, field)}
                      onBlur={() => handleBlur(budget.id, field)}
                      onKeyDown={handleKeyDown}
                      autoFocus
                    />
                  ) : (
                    (field.includes('quantity') || field.includes('price') || field.includes('amount')) ? `$${budget[field].toLocaleString()}` : budget[field]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectBudgetDashboard;
