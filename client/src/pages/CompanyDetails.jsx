import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams} from "react-router-dom";
import Table from "react-bootstrap/Table";
import Cookies from "js-cookie";

function CompanyDetails(props) {
  const { user, setUser } = props;
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState({});
  const [company, setCompany] = useState({})
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  
useEffect(() => {
  axios
      .get(`http://localhost:8081/company/${id}`, { withCredentials: true })
      .then((res) => {
          setCompany(res.data.company)
      })
      .catch((err) => console.log("Error fetching company:", err));
      axios
      .get(`http://localhost:8081/users/${id}`, { withCredentials: true })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => console.log(err));
}, [id]);

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
    console.log(field)
    const userToUpdate = users.find((u) => u.id === id);
    if(user.id == id && userToUpdate.role !== "admin"){
      console.log("can't make yourself a non-admin") 
      return
    }

    // Clear editing state for users
    setEditing({});

    // console.log('ID:', id, 'User to Update:', userToUpdate);

    // Update the backend
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

  const handleDelete = (id) => {
    if (id === user.id) {
      console.log("You cannot delete yourself.");
      alert("You cannot delete yourself.");
      return;
    }
    axios
      .delete(`http://localhost:8081/users/delete/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        setUsers((users) =>
          users.filter((user) => user.id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  const handleUserRoleChange = (e, id) => {
    const newRole = e.target.value;
    const userToUpdate = users.find((u) => u.id === id);
  
    const updatedUsers = users.map((u) => (u.id === id ? { ...u, role: newRole } : u));
    
    const adminCount = updatedUsers.reduce((count, u) => (u.role === 'admin' ? count + 1 : count), 0);
  
    if (adminCount > 0) {
      userToUpdate.role = newRole;
      handleUserBlur(id, 'role');
      setErrorMessage("");  // Clear any existing error messages
    } else {
      setErrorMessage("There must be at least one admin.");
    }
  };
  

  return (
    <div className="container card pb-3 pt-3">
      <h1> {company ? company.company_name : "Loading..."}</h1>
      <hr />
        <div className="">
          <h4 className="mb-4 mt-2">Company Users</h4>
          <div className="table-responsive">
            <Table className="table"  striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
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
                      disabled={user.role !== "admin" && user.role !== "superAdmin"} // Only allow admins to change roles
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                  <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(u.id)} 
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="position-relative mb-5">
        {errorMessage && 
          <div className="text-danger alert position-absolute">
            {errorMessage}
          </div>
        }
      </div>
      <hr />
      <div className='d-flex justify-content-left'>
        <Link to="/addAUser" className="btn btn-success m-1">Add a User</Link>
      </div>
      <div>
        {user.role === "superAdmin" ? (
          <Link to="/superAdminDashboard" className="btn btn-primary m-1 mt-5">
            Back to Super Admin Dashboard
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default CompanyDetails;
