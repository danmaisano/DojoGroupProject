import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function OppDashboard() {
  const [opportunities, setOpportunities] = useState([]);
  const [editing, setEditing] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8081/opportunities/')
      .then(res => {
        setOpportunities(res.data.opportunities);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDoubleClick = (id, field) => {
    setEditing({ id, field });
  };

	const handleChange = (e, id, field) => {
		let value = e.target.value;
		if (field === 'pot_rev' || field === 'chance_of_winning') {
			value = parseFloat(value);
		}
		setOpportunities(opportunities.map(opp => opp.id === id ? { ...opp, [field]: value } : opp));
	};
	

	const handleBlur = (id, field) => {
		// Make a copy of the opportunity object to be updated
		const oppToUpdate = opportunities.find(opp => opp.id === id);
		
		// Clear editing state
		setEditing({});
	
		// If the field being updated is 'status', use the specialized updateStatus function
		if (field === 'status') {
			updateStatus(id, oppToUpdate.status);
		} else {
			axios.put(`http://localhost:8081/opportunities/${id}`, { [field]: oppToUpdate[field] })
				.then(res => {
					setOpportunities(opportunities.map(opp => opp.id === id ? { ...opp, [field]: oppToUpdate[field] } : opp));
				})
				.catch(err => console.log(err));
		}
	};

	const updateStatus = (id, newStatus) => {
		axios.put(`http://localhost:8081/opportunities/${id}`, { status: newStatus })
			.then(res => {
				setOpportunities(opportunities.map(opp => opp.id === id ? { ...opp, status: newStatus } : opp));
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
      <h1>Opportunity Dashboard</h1>
      <Link to="/newOpp" className="btn btn-success mb-3">Create New Opportunity</Link>
	  <Link to="/projectBudgets" className="btn btn-success mb-3">Project Budgets</Link>
	  <hr></hr>
      <table className="table">
        <thead>
          <tr>
            <th>Opportunity Name</th>
            <th>Prospect Name</th>
            <th>Potential Revenue</th>
            <th>Chance of Winning (%)</th>
            <th>Opportunity Win Date</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
				<tbody>
				{opportunities.map((opp, index) => (
					<tr key={index}>
						{['opportunity_name', 'prospect_name', 'pot_rev', 'chance_of_winning', 'opportunity_win_date', 'start_date', 'end_date'].map((field, i) => (
							<td key={i} onDoubleClick={() => handleDoubleClick(opp.id, field)}>
								{editing.id === opp.id && editing.field === field ? (
									<input
										value={opp[field]}
										onChange={(e) => handleChange(e, opp.id, field)}
										onBlur={() => handleBlur(opp.id, field)}
										onKeyDown={handleKeyDown}
										autoFocus
									/>
								) : (
									field === 'pot_rev' ? `$${opp[field].toLocaleString()}` :
									field === 'chance_of_winning' ? `${opp[field]}%` :
									(field === 'opportunity_win_date' || field === 'start_date' || field === 'end_date') ? new Date(opp[field]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) :
									opp[field]
								)}
							</td>
						))}
						<td>
						<select
							value={opp.status || ""}
							onChange={(e) => {
								opp.status = e.target.value;
								handleBlur(opp.id, 'status');
							}}
						>
								<option value="identified">Identified</option>
								<option value="prospecting">Prospecting</option>
								<option value="meeting scheduled">Meeting Scheduled</option>
								<option value="proposal sent">Proposal Sent</option>
								<option value="agreement sent">Agreement Sent</option>
								<option value="won">Won</option>
								<option value="lost">Lost</option>
							</select>
						</td>
					</tr>
				))}
        </tbody>
      </table>
    </div>
  );
}

export default OppDashboard;
