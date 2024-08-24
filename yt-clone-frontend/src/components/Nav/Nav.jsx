import "./navStyle.css";
import SearchBox from "../Search/SearchBox";
function Nav() {
  return (
    <section id="nav">
      <div className="-brand">
        <div className="-ham">
          <img src="https://via.placeholder.com/24x24" alt="" />
        </div>
        <div className="-logo">
          <img src="https://via.placeholder.com/97x20" alt="" />
        </div>
      </div>
    <SearchBox></SearchBox>
      <div className="-end">
        <div className="-end-item">x</div>
        <div className="-end-item">x</div>
        <div className="-end-item">x</div>
      </div>
    </section>
  );
}

export default Nav;
