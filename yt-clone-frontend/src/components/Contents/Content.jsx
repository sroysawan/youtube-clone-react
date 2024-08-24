import { useEffect, useState } from "react";
import Tags from "../Tags/Tags";
import "./contentStyle.css";
import CardVideo from "../Card/CardVideo";
import CardShost from "../Card/CardShost";
function Content() {
  const [videos,setVideos] = useState([]);
  const [shorts,setShorts] = useState([]);


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await fetch("http://localhost:3000");
        if (!data.ok) {
          throw new Error(`HTTP error! status: ${data.status}`);
        }
        const json = await data.json();
        setVideos(json);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    const fetchShosts = async ()=> {
      const data = await fetch("http://localhost:3000/short");
      const json = await data.json();
      setShorts(json);
      // console.log(json)
    }
    fetchVideos();
    fetchShosts();
  }, []);
  
  return (
    <section id="content">
      <Tags></Tags>
      <section id="-the-cards">
        {videos.map((video,index) => (
          <CardVideo key={index} content={video}></CardVideo>
        ))}
      </section>
      <section id="shorts">
          <div className="-section-title">[] Shorts</div>
          <div className="-short-wrap">
            {shorts.map((short,index) => (
              <CardShost key={index} content={short}></CardShost>
            ))}
          </div>
        </section>
    </section>
  );
}

export default Content;
