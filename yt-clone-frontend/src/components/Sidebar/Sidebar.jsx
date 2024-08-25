import { useEffect, useState } from "react";
import "./sideStyle.css";
import { GoHome } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { PiYoutubeLogoFill } from "react-icons/pi";
function Sidebar() {

  const [subscribe, setSubscribe] = useState([])

  useEffect(() => {
    const fetchSubscribe = async ()=> {
      const data = await fetch("http://localhost:3000/subscribe?user_id=2");
      const json = await data.json();
      setSubscribe(json);
      console.log("sidebar",json)
    }
    fetchSubscribe();
  }, []);
  return (
    <section id="side">
      <div className="-side-pmr">
        <a href="#!" className="-item">
          <div className="-icon">
            {/* <img src="https://via.placeholder.com/24x24" alt="" /> */}
            <GoHome size={24}/>
          </div>
          <div className="-text">หน้าแรก</div>
        </a>
        <a href="#!" className="-item">
          <div className="-icon">
            {/* <img src="https://via.placeholder.com/24x24" alt="" /> */}
            <SiYoutubeshorts size={24}/>
          </div>
          <div className="-text">Shorts</div>
        </a>
        <a href="#!" className="-item">
          <div className="-icon">
            {/* <img src="https://via.placeholder.com/24x24" alt="" /> */}
            <PiYoutubeLogoFill size={24}/>
          </div>
          <div className="-text">การติดตาม</div>
        </a>
      </div>
      <div className="-side-sec">
        <div className="-text">การติดตาม</div>
        {subscribe.map((sub) => (
          <a href="#!" className="-item">
          <div className="-icon">
            <img src={sub.channel_profile_picture}/>
          </div>
          <div className="-text">{sub.channel_name}</div>
          <div className="-status"></div>
        </a>
        ))}
      </div>
    </section>
  );
}

export default Sidebar;
