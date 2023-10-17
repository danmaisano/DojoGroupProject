import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Modal, Button } from 'react-bootstrap';
import NewOpportunityForm from "./components/NewOpp";
import ContactModal from "./components/Contacts/ContactCard";
import NewContactModal from './components/Contacts/CreateContact';


function Dashboard(props) {
  const { user, setUser } = props;
  const [opportunities, setOpportunities] = useState([]);
  const [editing, setEditing] = useState({});
  const navigate = useNavigate();


  // State for the contact modal
  const [showContactModal, setShowContactModal] = useState(false);
  // const [selectedContact, setSelectedContact] = useState(null);
  const [contactModals, setContactModals] = useState([]);
  const contactModalsRefs = {};

  // Close the contact modal
  const closeContactModal = (modalId) => {
    setContactModals((modals) => modals.filter((modal) => modal.key !== modalId));
    setShowContactModal(false);
    // window.location.reload();
  };

  // Open the contact modal
  const openContactModal = (selectedContact) => {
    const modalId = Date.now(); // Generate a unique ID for the modal
    const contactModal = (
      <ContactModal
        key={modalId}
        contact={selectedContact}
        handleClose={() => closeContactModal(modalId, closeContactModal)}
      />
    );
    setContactModals((modals) => [...modals, contactModal]);
    contactModalsRefs[modalId] = contactModal;
  };

  const openCreateContactModal = (oppId) => {  // Receive oppId and selectedContact
    const modalId = Date.now(); // Generate a unique ID for the modal
    const contactModal = (
        <NewContactModal
            user={user}
            show={true}
            handleClose={() => closeContactModal(modalId, closeContactModal)}
            afterSubmit={(contactId) => {
              setShowContactModal(false); // Close the modal
              window.location.reload(); // Refresh the page
  
              // Add contact ID to the opportunity represented by oppId
              axios.put(`http://localhost:8081/opportunities/${oppId}`, { contact_id: contactId }, {
                withCredentials: true
              })
              .then(() => {
                // Update the state to reflect the changes
                setOpportunities((opportunities) => {
                  return opportunities.map((opportunity) => {
                    if (opportunity.id === oppId) {
                      return {
                        ...opportunity,
                        contact_id: contactId,
                      };
                    } else {
                      return opportunity;
                    }
                  });
                });
              })
              .catch((err) => console.log(err));
            }}
        />
    );
    setContactModals((modals) => [...modals, contactModal]);
    contactModalsRefs[modalId] = contactModal;
  };
  

  useEffect(() => {
    if (user && user.company) {
      // Use Promise.all to make both API calls in parallel
      Promise.all([
        axios.get(`http://localhost:8081/opportunities/company/${user.company}`, { withCredentials: true }),
        axios.get(`http://localhost:8081/contacts/company/${user.company}`, { withCredentials: true }),
      ])
        .then(([opportunitiesRes, contactsRes]) => {
          // Process the opportunities and contacts responses
          const updatedOpportunities = opportunitiesRes.data.opportunities;

          const contacts = contactsRes.data.contacts;
          // Create a map of contact IDs to contacts for easier lookup
          const contactMap = {};
          contacts.forEach((contact) => {
            contactMap[contact.id] = contact;
          });

          // Update opportunities with contact information
          const opportunitiesWithContacts = updatedOpportunities.map((opp) => {
            const contact = contactMap[opp.contact_id];
            opp.contact = contact || null;
            return opp;
          });

          // Set the updated opportunities in the state
          setOpportunities(opportunitiesWithContacts);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleDoubleClick = (id, field) => {
    if (field !== "contact_id") {
      setEditing({ id, field });
    }
  };

  const handleChange = (e, id, field) => {
    let value = e.target.value;
    if (field === "pot_rev" || field === "chance_of_winning") {
      value = parseFloat(value);
    }
    setOpportunities(
      opportunities.map((opp) =>
        opp.id === id ? { ...opp, [field]: value } : opp
      )
    );
  };

  const handleBlur = (id, field) => {
    // Make a copy of the opportunity object to be updated
    const oppToUpdate = opportunities.find((opp) => opp.id === id);

    // Clear editing state
    setEditing({});

    // If the field being updated is 'status', handle special cases
    if (field === "status") {
      if (oppToUpdate.status === "won") {
        // Set the opportunity_win_date to the current date
        oppToUpdate.opportunity_win_date = new Date().toISOString();
        oppToUpdate.chance_of_winning = 100; // Set chance_of_winning to 100% for "won"
      } else if (oppToUpdate.status === "lost") {
        oppToUpdate.chance_of_winning = 0; // Set chance_of_winning to 0% for "lost"
      }
    }

    const token = Cookies.get("token");

    axios
      .put(
        `http://localhost:8081/opportunities/${id}`,
        {
          [field]: oppToUpdate[field],
          status: oppToUpdate.status, // Include the status field in the request body
          opportunity_win_date: oppToUpdate.opportunity_win_date, // Include opportunity_win_date in the request body
          chance_of_winning: oppToUpdate.chance_of_winning, // Include chance_of_winning in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        setOpportunities((opps) =>
          opps.map((opp) =>
            opp.id === id
              ? {
                ...opp,
                [field]: oppToUpdate[field],
                status: oppToUpdate.status,
                opportunity_win_date: oppToUpdate.opportunity_win_date,
                chance_of_winning: oppToUpdate.chance_of_winning,
              }
              : opp
          )
        );
      })
      .catch((err) => console.log(err));
  };




  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const afterOpportunitySubmit = (contact) => {
    setShowModal(false); // Close the modal
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="container">
      <h1>Opportunity Dashboard</h1>
      <h2 className="my-3">Welcome {user.first_name}</h2>
      <Button variant="success" onClick={handleShow}>
        Create New Opportunity
      </Button>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create a New Opportunity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Pass the callback to the form */}
          <NewOpportunityForm user={user} afterSubmit={afterOpportunitySubmit} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <hr></hr>
      <h4 className="my-3">Current Opportunities</h4>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Opportunity Name</th>
              <th>Prospect Name</th>
              <th>Potential Revenue</th>
              <th>Chance of Winning (%)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opp, index) => {
              // console.log("Opportunity object:", opp);
              return (
                <tr key={index}>
                  {[
                    "opportunity_name",
                    "contact_id",
                    "pot_rev",
                    "chance_of_winning",
                  ].map((field, i) => (
                    <td key={i} onDoubleClick={() => handleDoubleClick(opp.id, field)}>
                      {editing.id === opp.id && editing.field === field ? (
                        <input
                          value={opp[field]}
                          onChange={(e) => handleChange(e, opp.id, field)}
                          onBlur={() => handleBlur(opp.id, field)}
                          onKeyDown={handleKeyDown}
                          autoFocus
                        />
                      ) : field === "contact_id" ? (
                        opp.contact ? (
                          // Use an anchor tag to open the contact modal
                          <a href="#" disabled={showContactModal} onClick={() => openContactModal(opp.contact)}>
                            {`${opp.contact.first_name} ${opp.contact.last_name}`}
                          </a>
                        ) : (
                          <a href="#" onClick={() => openCreateContactModal(opp.id)}>+ Add Contact</a>
                        )
                      ) : field === "pot_rev" ? (
                        `$${opp[field].toLocaleString()}`
                      ) : field === "chance_of_winning" ? (
                        `${opp[field]}%`
                      ) : (
                        opp[field]
                      )}
                    </td>
                  ))}
                  <td>
                    <select
                      value={opp.status || ""}
                      onChange={(e) => {
                        opp.status = e.target.value;
                        handleBlur(opp.id, "status");
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
              );
            })}
          </tbody>
        </table>
      </div>
      {contactModals}
    </div>
  );
}

export default Dashboard;
