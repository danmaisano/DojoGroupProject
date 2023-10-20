import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams} from "react-router-dom";
import Cookies from "js-cookie";

function CompanyDetails(props) {
  const { user, setUser } = props;
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState({});
  const [company, setCompany] = useState({})
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
    userToUpdate.role = newRole;
    handleUserBlur(id, "role");
  };

  return (
    <div className="container">
    <h1>Details for {company ? company.company_name : "Loading..."}</h1>
        <div>
          <h4 className="mb-2 mt-5">Company Users</h4>
          <table className="table">
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
          </table>
        </div>
      <Link to="/dashboard" className="btn btn-primary me-5">Dashboard</Link>
    </div>
  );
}

export default CompanyDetails;
