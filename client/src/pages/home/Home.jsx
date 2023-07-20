import React from 'react'
import List from '../../components/list/List'
import Featured from '../../components/featured/Featured'
import Navbar from '../../components/navbar/Navbar'
import "./home.scss"
import { useEffect,useState } from 'react'
import axios from "axios"

export default function Home({type}){
  const [lists,setLists]=useState([]);
  const [genre,setGenre]=useState(null);

  useEffect(()=>{
    const getRandomLists= async()=>{
      try{
        const res= await axios.get(
          `/api/lists${type ? "?type="+type : " "}${ (genre && genre!=="all") ? "&genre=" + genre : " "}`,
          {
            headers:{
              authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2RkNmU2NDNkYjg2MDJmZDNjMGU5ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4OTYxOTU3MSwiZXhwIjoxNjkwMDUxNTcxfQ.04OiLzsBDZzrbp7Rj04bRy7LoPYJa2Dj9d-IRSvBbaM"
            }
          });
        setLists(res.data);
        
      }catch(err){
        console.log(err)
      }
    };
    getRandomLists();
  },[type,genre]);
  return (
    <div className="home">
        <Navbar />

        <Featured type={type} setGenre={setGenre} />

        {lists.map((list)=>{
          return(<List list={list}/>)
        })}

        
        
   </div>
  )
}
