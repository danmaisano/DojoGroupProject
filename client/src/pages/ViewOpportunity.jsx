import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ViewOpportunity() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState({});
  const [contact, setContact] = useState(null);
  const [notes, setNotes] = useState("");
  const [opportunityNotes, setOpportunityNotes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/opportunities/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setOpportunity(res.data.opportunity);

        // Ensure that res.data.opportunity.notes is an array before setting it
        if (Array.isArray(res.data.opportunity.notes)) {
          setOpportunityNotes(res.data.opportunity.notes);
        } else {
          setOpportunityNotes([]); // Set it to an empty array if it's not an array
        }

        if (res.data.opportunity.contact_id) {
          axios
            .get(
              `http://localhost:8081/contacts/${res.data.opportunity.contact_id}`,
              {
                withCredentials: true,
              }
            )
            .then((contactRes) => {
              setContact(contactRes.data.contact);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleAddNote = () => {
    if (!notes.trim()) {
      return;
    }

    const newNote = {
      text: notes,
    };

    axios
      .post(`http://localhost:8081/opportunities/${id}/notes`, newNote, {
        withCredentials: true,
      })
      .then((res) => {
        setNotes("");
        setOpportunityNotes([...opportunityNotes, newNote.text]);
      })
      .catch((err) => console.log(err));
  };

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
};

// Open default email client and prefil address
const sendEmail = () => {
  window.location.href = 'mailto:johndoe@companyname.com';
};

  return (
    <div className="container">
      <h2>{opportunity.opportunity_name}</h2>
      <hr></hr>
      <div className="row">
        <div className="col-md-6">
        <h4><u>Opportunity Information</u></h4>
          <p>
            <strong>Potential Revenue: </strong> ${opportunity.pot_rev ? opportunity.pot_rev.toLocaleString() : ''}
          </p>
          <p>
            <strong>Chance of Winning:</strong> {opportunity.chance_of_winning}%
          </p>
          <p>
            <strong>Status:</strong> {opportunity.status}
          </p>
        </div>
        <div className="col-md-6">
          <h4><u>Contact Information</u></h4>
          {contact ? (
            <>
              <p>
                <strong>Name:</strong>{" "}
                {`${contact.first_name} ${contact.last_name}`}
              </p>
              <p>
                <strong>Email:</strong> <a href="#" onClick={sendEmail}>{contact.email}</a>
              </p>
              <p>
                <strong>Cell Phone:</strong> {formatPhoneNumber(contact.cell_phone)}
              </p>
            </>
          ) : (
            <p>No contact information available.</p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h4><u>Notes and Activities</u></h4>
        {opportunityNotes && opportunityNotes.length > 0 ? (
          <ul>
            {opportunityNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        ) : (
          <p>No notes or activities yet</p>
        )}
        <textarea
          className="form-control"
          rows="4"
          name="note"
          placeholder="Add a note..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        <button className="btn btn-primary mt-3" onClick={handleAddNote}>
          Add Note
        </button>
      </div>
      <Link to="/dashboard" className="btn btn-primary mt-5">
        Return to Dashboard
      </Link>
    </div>
  );
}

export default ViewOpportunity;
