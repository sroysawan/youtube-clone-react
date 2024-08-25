import "./navStyle.css";
import SearchBox from "../Search/SearchBox";
import { FaBars } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";


function Nav() {
  return (
    <section id="nav">
      <div className="-brand">
        <div className="-ham">
          {/* <img src="https://via.placeholder.com/24x24" alt="" /> */}
          {/* <FontAwesomeIcon icon="fas fa-bars" /> */}
          <FaBars size={24}/>
        </div>
        <Link to="/">
          <div className="-logo">
            <img src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Logo.png" alt="" />
          </div>
        </Link>

      </div>
    <SearchBox></SearchBox>
      <div className="-end">
        <div className="-end-item"><RiVideoAddLine size={25} /></div>
        <div className="-end-item"><IoMdNotificationsOutline size={25}/></div>
        <div className="-end-item"><FaRegUserCircle size={25}/></div>
      </div>
    </section>
  );
}

export default Nav;
