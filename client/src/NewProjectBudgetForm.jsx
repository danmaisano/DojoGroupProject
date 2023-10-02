import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewProjectBudgetForm() {
  const [formData, setFormData] = useState({
    task_code: '',
    item_name: '',
    job_code: '',
    phase_code: '',
    category_code: '',
    est_quantity: 0,
    est_price: 0,
    est_amount: 0,
    rev_quantity: 0,
    rev_price: 0,
    rev_amount: 0
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/projectBudgets/', formData)
      .then(res => {
        console.log("Project budget created: ", res.data);
        navigate("/projectBudgets");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <h1>Create a New Project Budget</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Task Code</label>
          <input type="text" name="task_code" className="form-control" required value={formData.task_code} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Item Name</label>
          <input type="text" name="item_name" className="form-control" required value={formData.item_name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Job Code</label>
          <input type="text" name="job_code" className="form-control" required value={formData.job_code} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Phase Code</label>
          <input type="text" name="phase_code" className="form-control" required value={formData.phase_code} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Category Code</label>
          <input type="text" name="category_code" className="form-control" required value={formData.category_code} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Estimated Quantity</label>
          <input type="number" name="est_quantity" className="form-control" value={formData.est_quantity} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Estimated Price</label>
          <input type="number" name="est_price" className="form-control" value={formData.est_price} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Estimated Amount</label>
          <input type="number" name="est_amount" className="form-control" value={formData.est_amount} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Revised Quantity</label>
          <input type="number" name="rev_quantity" className="form-control" value={formData.rev_quantity} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Revised Price</label>
          <input type="number" name="rev_price" className="form-control" value={formData.rev_price} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Revised Amount</label>
          <input type="number" name="rev_amount" className="form-control" value={formData.rev_amount} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Create Project Budget</button>
      </form>
      <a href="/projectBudgets"><button type="button" className="btn btn-warning mt-5">Back to Dashboard</button></a>
    </div>
  );
}

export default NewProjectBudgetForm;
