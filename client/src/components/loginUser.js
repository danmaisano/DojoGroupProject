import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';


const loginUser = (email, password, setUser, navigate) => {
  axios.post("http://localhost:8081/users/login", { email, password }, { withCredentials: true })
    .then((res) => {

      const token = res.data.token;

      // Decode the token
      const decodedToken = jwtDecode(token);

      // Set user information using decoded token
      const userData = ({
        id: decodedToken.id,
        first_name: decodedToken.first_name,
        last_name: decodedToken.last_name,
        email: decodedToken.email,
        company: decodedToken.company,
        role: decodedToken.role,
      });
      // console.log(userData) 

      Cookies.set("userData", JSON.stringify(userData), { expires: 30 });
      setUser(userData);

      navigate("/dashboard");
    })
    .catch((err) => {
      console.error("Login failed", err);
    });
};

export default loginUser;