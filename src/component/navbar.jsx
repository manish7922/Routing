import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import React, {Component} from "react";
import {Link} from "react-router-dom"
class Navbar extends Component {


    render(){
 
  
return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand"  to="/">Courses</Link>
    <div className="" id="navbarSupportedContent">
    <ul className="navbar-nav">
    
     
    <li className="nav-item">
    <Link className="navbar-brand"  to="/emps">All</Link>
    </li>
    
    <li className="nav-item">
<Link className="navbar-brand"  to="/emps/New Delhi">New Delhi</Link>
    </li>
    <li className="nav-item">
    <Link className="navbar-brand"  to="/emps/Noida">Noida</Link>
    </li>
    </ul>
    </div>
        </nav>
)
    }
}
export default Navbar;