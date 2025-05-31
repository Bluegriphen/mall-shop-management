import { NavLink } from "react-router-dom";
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className="navbar">
      <div>Mall Directory</div>
      <div>
        <NavLink to="/"
        className={({isActive}) => isActive? "active": ""}>
          Home
        </NavLink>
        <NavLink to="/admin"
        className={({isActive}) => isActive? "active": ""}>
          Admin
        </NavLink>
        <NavLink to="/admin_login"
        className={({isActive}) => isActive? "active": ""}>
          Login
        </NavLink>

        
        
      </div>
    </div>
  );
};

export default Navbar;
