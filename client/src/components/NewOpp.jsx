import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";


function NewOpportunityForm(props) {
  const {user, afterSubmit} = props;
  const [formData, setFormData] = useState({
    opportunity_name: '',
    prospect_name: '',
    opportunity_address: 'your moms house', // need to set to empty when live
    pot_rev: 1000, // need to set to empty when live
    chance_of_winning: 50, // need to set to empty when live
		status: 'identified', // most likely the default value and also the first in the list.
    opportunity_win_date: '2023-09-16', // need to set to empty when live
    start_date: '2023-09-16', // need to set to empty when live
    end_date: '2023-09-16' // need to set to empty when live
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
    // console.log(formData)
    e.preventDefault();
    axios.post('http://localhost:8081/opportunities/create', formData, {
      withCredentials: true
    })
      .then(res => {
        console.log("Opportunity created: ", res.data);
        if (afterSubmit) afterSubmit();
      })
      .catch(err => console.log(err));
  };  

  return (
    <div className="container">
      {/* <h1>Create a New Opportunity</h1> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Opportunity Name</label>
          <input type="text" name="opportunity_name" className="form-control" required value={formData.opportunity_name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Prospect Name</label>
          <input type="text" name="prospect_name" className="form-control" required value={formData.prospect_name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Opportunity Address</label>
          <input type="text" name="opportunity_address" className="form-control" value={formData.opportunity_address} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Potential Revenue</label>
          <input type="number" name="pot_rev" className="form-control" value={formData.pot_rev} onChange={handleChange} />
        </div>
				<div className="mb-3">
					<label className="form-label">Status</label>
					<select 
						name="status" 
						className="form-control" 
						value={formData.status} 
						onChange={handleChange}
					>
						<option value="identified">Identified</option>
						<option value="prospecting">Prospecting</option>
						<option value="meeting scheduled">Meeting Scheduled</option>
						<option value="proposal sent">Proposal Sent</option>
						<option value="agreement sent">Agreement Sent</option>
						<option value="won">Won</option>
						<option value="lost">Lost</option>
					</select>
				</div>
        <div className="mb-3">
          <label className="form-label">Chance of Winning (%)</label>
          <input type="number" name="chance_of_winning" className="form-control" value={formData.chance_of_winning} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Opportunity Win Date</label>
          <input type="date" name="opportunity_win_date" className="form-control" value={formData.opportunity_win_date} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input type="date" name="start_date" className="form-control" value={formData.start_date} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input type="date" name="end_date" className="form-control" value={formData.end_date} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Create Opportunity</button>
      </form>
        <a href="/dashboard"><button type="submit" className="btn btn-warning mt-5">Back to Dashboard</button></a>
    </div>
  );
}

export default NewOpportunityForm;
