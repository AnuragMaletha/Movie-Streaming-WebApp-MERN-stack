import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios";

export default function WidgetSm() {

  const [newUsers, setNewUsers] = useState([])

  useEffect(()=>{
    const getNewUsers = async ()=>{
      try{
        const res = await axios.get("/users",{
          headers:{
            authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2RkNmU2NDNkYjg2MDJmZDNjMGU5ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4OTQyNDYxNSwiZXhwIjoxNjg5ODU2NjE1fQ.Z2CgEObHIY_IvNDbww5BRc7ojZeCozkpClGKcv0WSEc"
        },
      });
        setNewUsers(res.data);
      }catch(err){
        console.log(err);
      }
    };
    getNewUsers();
  },[])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
      {newUsers.map(user=>(
        <li className="widgetSmListItem">
          <img
            src={user.profilePic || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
      ))}
      </ul>
    </div>
  );
}
