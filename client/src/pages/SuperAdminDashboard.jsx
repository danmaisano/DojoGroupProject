import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Table } from 'react-bootstrap';
import Cookies from "js-cookie";


function SuperAdminDashboard(props) {
  const {user, setUser} = props;
  const [allCompanies, setAllCompanies] = useState([]); // Declare state for companies
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = Cookies.get("token");
    if (user.role == "superAdmin"){
    axios.get("http://localhost:8081/company/companies/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then(res => {
        setAllCompanies(res.data.companies);
      })
      .catch(err => console.log("Error fetching companies:", err));
    }
    else {
      navigate("/dashboard")
    }
  }, []); 
  
  return (
    <div className="container card pb-3 pt-3">
      <h1>List of All Companies</h1>
      <hr></hr>
      <div className="table-responsive mt-3">
        <Table className="table" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th className="text-center">Company ID</th>
              <th className="text-center">Company Name</th>
            </tr>
          </thead>
          <tbody>
            {allCompanies.map((company, index) => {
              return (
                <tr key={company.id}>
                  <td className="text-center">
                    <Link to={`/company/${company.id}`}>{company.id}</Link>
                  </td>
                  <td className="text-center">
                    <Link to={`/company/${company.id}`}>{company.company_name}</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
