import { InfoOutlined, PlayArrow } from "@material-ui/icons"
import"./featured.scss"
import { useEffect,useState } from "react";
import axios from "axios";

export default function Featured({type,setGenre}) {
  const [content,setContent] = useState({});

  useEffect(()=>{
    const getRandomContent = async()=>{
      try{
        const res = await axios.get(`/api/movies/random?type=${type}`,
        {
          headers:{
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2RkNmU2NDNkYjg2MDJmZDNjMGU5ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4OTYxOTU3MSwiZXhwIjoxNjkwMDUxNTcxfQ.04OiLzsBDZzrbp7Rj04bRy7LoPYJa2Dj9d-IRSvBbaM"
          }
        });
        setContent(res.data[0]);
      }catch(err){
        console.log(err);
      }
    };
    getRandomContent();
  },[type]);
  
  return (
    <div className="featured">
      { type && (
        <div className="category">
          <span>{type === "movies" ? "Movies":"Series"}</span>
          <select name="genre" id="genre" onChange={e=>setGenre(e.target.value)}>
            
            <option value="all" >All</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="suspense">Suspense</option>

          </select>
        </div>
      )}
        <img src={content.img} alt="" />
        <div className="info">
            <img  className="small" src={content.imgTitle} alt="sad" />
            <span className="desc">{content.desc}</span>
            <div className="buttons"><button className="play"><PlayArrow/>
                <span>Play</span>
            </button>
            <button className="more"><InfoOutlined/>
                <span>Info</span>
            </button>
            </div>
        </div>
    </div>
  )
}
