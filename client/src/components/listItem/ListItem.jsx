import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined, ThumbUpAltSharp } from '@material-ui/icons'
import {useEffect, useState} from 'react'
import "./listItem.scss";
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';

export default function ListItem({index,item}) {
  const[isHovered,setIsHovered]= useState(false);
  const[movie,setMovie]= useState({});
  let ans;
  const navigate= useNavigate();
  useEffect(()=>{
    const getMovie= async()=>{
      try{
        const res= await axios.get("/api/movies/find/"+item,
          {
            headers:{
              authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2RkNmU2NDNkYjg2MDJmZDNjMGU5ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4OTYxOTU3MSwiZXhwIjoxNjkwMDUxNTcxfQ.04OiLzsBDZzrbp7Rj04bRy7LoPYJa2Dj9d-IRSvBbaM"
            }
          });
          ans=res.data;
          setMovie(res.data);

      }catch(err){
        console.log(err);
      }
    }
    getMovie();
  },[item]);
  return (
    //<Link to={{ pathname: "/watch", movie: movie }}>
    <div className='listItem' onClick={()=>{navigate("/watch",{replace:true,state:{movie:movie}})}}
         style={{left: isHovered && index*225-50 + index*2.5}}
         onMouseEnter={()=>setIsHovered(true)} 
         onMouseLeave={()=>setIsHovered(false)}>

        <img src={movie.img} alt="" />
      {isHovered && (
        <>
        
        <video src={movie.trailer} autoPlay={true} loop/>
        <div className="itemInfo">
          <div className="icons">
            <PlayArrow className='icon'/>
            <Add className='icon'/>
            <ThumbUpAltOutlined className='icon'/>
            <ThumbDownAltOutlined className='icon'/>
          </div>

          <div className="itemInfoTop">
            <span>{movie.duration}</span>
            <span className='limit'>{movie.limit}</span>
            <span>{movie.year}</span>
            <span className="title">{movie.title}</span>
          </div>

          <div className="desc"> {movie.desc} </div>
          

          <div className="genre">{movie.genre}</div>
          

        </div> 

        </>
      )}

    </div>
    //</Link>  
  )
}
