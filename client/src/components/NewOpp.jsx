import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NewContactModal from './Contacts/CreateContact';
import Cookies from "js-cookie";


function NewOpportunityForm(props) {
  const { user, afterSubmit } = props;
  console.log("Initial value of user: ", user);
  const [formData, setFormData] = useState({
    opportunity_name: '',
    // prospect_name: '',
    opportunity_address: 'your moms house', // need to set to empty when live
    pot_rev: 1000, // need to set to empty when live
    chance_of_winning: 50, // need to set to empty when live
    status: 'identified', // most likely the default value and also the first in the list.
    opportunity_win_date: '2023-09-16', // need to set to empty when live
    start_date: '2023-09-16', // need to set to empty when live
    end_date: '2023-09-16', // need to set to empty when live
    user_id: user.id,
  });

  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const handleContactModalClose = () => setShowContactModal(false);
  const handleContactModalShow = () => setShowContactModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log("handleChange: ", formData);
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
    console.log("handleSubmit .catch: ", formData);
  };

  // Handle Adding a Contact
  const handleSelectContact = (contactId) => {
    setFormData((prevData) => ({
      ...prevData,
      contact_id: contactId,
    }));
    // Close the contact creation modal
    setShowContactModal(false);
  };

  const handleClose = () => {
    setShowContactModal(false); // This should hide the modal
};

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Opportunity Name</label>
          <input type="text" name="opportunity_name" className="form-control" required value={formData.opportunity_name} onChange={handleChange} />
        </div>
        <div className="mb-3">

          {/* Link to CreateContact Modal and set contact_id in Opportunity Form */}
          <div className="mb-3">
            <label className="form-label">Contact</label>
            <Button onClick={() => setShowContactModal(true)}>Create or Select Contact</Button>
          </div>

          {/* <label className="form-label">Prospect Name</label>
          <input type="text" name="prospect_name" className="form-control" required value={formData.prospect_name} onChange={handleChange} /> */}
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
        <input type="hidden" name="user_id" value={user.id} />
        <input type="hidden" name="contact_id" value={1} />
      </form>

      {/* Render the contact creation modal */}
      <NewContactModal
        show={showContactModal}
        handleClose={() => setShowContactModal(false)}
        handleSelectContact={handleSelectContact}
        user={user}
        setFormData={setFormData}
      />

    </div>
  );
}

export default NewOpportunityForm;
