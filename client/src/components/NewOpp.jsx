import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NewContactModal from './Contacts/CreateContact';
import Cookies from "js-cookie";


function NewOpportunityForm(props) {
  const { user, afterSubmit } = props;
  console.log('user from newopp', user)
  console.log("Initial value of user: ", user);
  const [formData, setFormData] = useState({
    opportunity_name: '',
    opportunity_address: '', // need to set to empty when live
    pot_rev: 0, // need to set to empty when live
    chance_of_winning: 10, // need to set to empty when live
    status: 'identified', // most likely the default value and also the first in the list.
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
    validateField(name, value);
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
        navigate("/dashboard");
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
  const [validation, setValidation] = useState({
    opportunity_name: null,
    opportunity_address: null,
    pot_rev: null,
    chance_of_winning: null,
    status: null
  });

  const validateField = (name, value) => {
    let valid = null;
    if (value === '') {
      valid = false;
    } else {
      valid = true;
    }

    if (name === 'chance_of_winning') {
      const numberValue = Number(value);
      if (isNaN(numberValue) || numberValue < 0 || numberValue > 100) {
        valid = false;
      } else {
        valid = true;
      }
    }

    if (name === 'pot_rev') {
      const numberValue = Number(value);
      if (isNaN(numberValue) || numberValue < 0 || numberValue > 10000000000) {
        valid = false;
      } else {
        valid = true;
      }
    }

    setValidation(prevState => ({
      ...prevState,
      [name]: valid
    }));
  };

  return (
    <div className="container pb-3 pt-3 card">
      <h1>New Opportunity</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Opportunity Name</label>
          <input 
            type="text" 
            name="opportunity_name" 
            className={`form-control ${validation.opportunity_name === false ? 'is-invalid' : ''}`} 
            required 
            value={formData.opportunity_name} 
            onChange={handleChange} 
          />
          {validation.opportunity_name === false && <div className="invalid-feedback">Required</div>}
        </div>
        <div className="mb-3">
          {/* Link to CreateContact Modal and set contact_id in Opportunity Form */}
          <div className="mb-3">
            <label className="form-label">Contact</label>
            <Button className="mx-3 btn-success" onClick={() => setShowContactModal(true)}>Create or Select Contact</Button>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Opportunity Address</label>
          <input 
            type="text" 
            name="opportunity_address" 
            className={`form-control ${validation.opportunity_address === false ? 'is-invalid' : ''}`}
            value={formData.opportunity_address} 
            onChange={handleChange} />
          {validation.opportunity_address === false && <div className="invalid-feedback">Required</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Potential Revenue</label>
          <input 
            type="number" 
            name="pot_rev" 
            className={`form-control ${validation.pot_rev=== false ? 'is-invalid' : ''}`}
            value={formData.pot_rev} 
            onChange={handleChange} />
            {validation.pot_rev === false && <div className="invalid-feedback">Please enter a number bewteen (0-10000000000).</div>}
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
          <input type="number" 
          name="chance_of_winning" 
          className={`form-control ${validation.chance_of_winning === false ? 'is-invalid' : ''}`}
          value={formData.chance_of_winning} 
          onChange={handleChange} />
          {validation.chance_of_winning === false && <div className="invalid-feedback">Please enter a valid percentage (0-100).</div>}
        </div>
        <button type="submit" className="btn btn-success">Create Opportunity</button>
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
