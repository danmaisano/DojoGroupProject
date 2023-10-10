import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Dashboard(props) {
  const { user, setUser } = props;
  const [users, setUsers] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [editing, setEditing] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    if (user && user.company) {
      axios
        .get(`http://localhost:8081/opportunities/company/${user.company}`, { withCredentials: true })
        .then((res) => {
          setOpportunities(res.data.opportunities);
        })
        .catch((err) => console.log(err));
      
      if (user.role === "admin") {
        axios
          .get(`http://localhost:8081/users/company/${user.company}`, { withCredentials: true })
          .then((res) => {
            setUsers(res.data.users);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [user]);

  const handleDoubleClick = (id, field) => {
    setEditing({ id, field });
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

    // If the field being updated is 'status', use the specialized updateStatus function
    if (field === "status") {
      updateStatus(id, oppToUpdate.status);
    } else {
      axios
        .put(`http://localhost:8081/opportunities/${id}`,  { withCredentials: true, 
          [field]: oppToUpdate[field],
        })
        .then(() => {
          setOpportunities(
            opportunities.map((opp) =>
              opp.id === id ? { ...opp, [field]: oppToUpdate[field] } : opp
            )
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const updateStatus = (id, newStatus) => {
    axios
      .put(`http://localhost:8081/opportunities/${id}`, { status: newStatus, withCredentials: true  })
      .then(() => {
        setOpportunities(
          opportunities.map((opp) =>
            opp.id === id ? { ...opp, status: newStatus } : opp
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

  const handleUserChange = (e, id, field) => {
    const value = e.target.value;
    setUsers(users.map((u) => (u.id === id ? { ...u, [field]: value } : u)));
  };

  const handleUserBlur = (id, field) => {
    const userToUpdate = users.find((u) => u.id === id);

    // Clear editing state for users
    setEditing({});

    console.log('ID:', id, 'User to Update:', userToUpdate);

    // Update the backend (assuming you have an API endpoint to update users)
    axios
      .put(`http://localhost:8081/users/update/${id}`, 
        {
          [field]: userToUpdate[field]
        }, 
        {
          withCredentials: true 
        }
      )
      .then(() => { 
        setUsers(
          users.map((u) =>
            u.id === id ? { ...u, [field]: userToUpdate[field] } : u
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleUserRoleChange = (e, id) => {
    const newRole = e.target.value;
    const userToUpdate = users.find((u) => u.id === id);
    userToUpdate.role = newRole;
    handleUserBlur(id, "role");
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/users/logout")
      .then((res) => {
        Cookies.remove("token");
        Cookies.remove("userData");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1>Opportunity Dashboard</h1>
      <h2 className="my-3">Welcome {user.first_name}</h2>
      <Link to="/newOpp" className="btn btn-success mb-3">
        Create New Opportunity
      </Link>
      <hr></hr>
      <h4 className="my-3">Current Opportunities</h4>
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
              {[
                "opportunity_name",
                "prospect_name",
                "pot_rev",
                "chance_of_winning",
                "opportunity_win_date",
                "start_date",
                "end_date",
              ].map((field, i) => (
                <td
                  key={i}
                  onDoubleClick={() => handleDoubleClick(opp.id, field)}
                >
                  {editing.id === opp.id && editing.field === field ? (
                    <input
                      value={opp[field]}
                      onChange={(e) => handleChange(e, opp.id, field)}
                      onBlur={() => handleBlur(opp.id, field)}
                      onKeyDown={handleKeyDown}
                      autoFocus
                    />
                  ) : field === "pot_rev" ? (
                    `$${opp[field].toLocaleString()}`
                  ) : field === "chance_of_winning" ? (
                    `${opp[field]}%`
                  ) : field === "opportunity_win_date" ||
                    field === "start_date" ||
                    field === "end_date" ? (
                    new Date(opp[field]).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
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
          ))}
        </tbody>
      </table>
      {user.role === "admin" && (
        <div>
          <h4 className="mb-2 mt-5">Company Users</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={index}>
                  <td onDoubleClick={() => handleDoubleClick(u.id, "name")}>
                    {editing.id === u.id && editing.field === "name" ? (
                      <input
                        value={`${u.first_name} ${u.last_name}`}
                        onChange={(e) => handleUserChange(e, u.id, "name")}
                        onBlur={() => handleUserBlur(u.id, "name")}
                        autoFocus
                      />
                    ) : (
                      `${u.first_name} ${u.last_name}`
                    )}
                  </td>
                  <td onDoubleClick={() => handleDoubleClick(u.id, "email")}>
                    {editing.id === u.id && editing.field === "email" ? (
                      <input
                        value={u.email}
                        onChange={(e) => handleUserChange(e, u.id, "email")}
                        onBlur={() => handleUserBlur(u.id, "email")}
                        autoFocus
                      />
                    ) : (
                      u.email
                    )}
                  </td>
                  <td>
                    <select
                      value={u.role || ""}
                      onChange={(e) => handleUserRoleChange(e, u.id)}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
