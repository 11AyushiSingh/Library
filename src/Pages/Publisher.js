import SideNavBar from "../Components/SideNavBar";
import Box from "@mui/material/Box";
import NavBar from "../Components/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Rating, Stack } from "@mui/material";
import axios from 'axios';
import i10  from '../image/i10.PNG'
import i11  from '../image/i11.PNG'
import i12  from '../image/i12.PNG'
import i13 from '../image/i13.PNG'
import i14  from '../image/i14.PNG'
import i15 from '../image/i15.PNG'


function Publisher() {

  const[videos, setVideos] = useState([]);

const fetchBooks = () => {
  axios.get('http://localhost:8000/Publisher')
    .then((response) => {
      setVideos(response.data); 
    })
    .catch((error) => {
      console.error('Error fetching books:', error);
    });
};

const fetchPublisher = () => {
  axios.get(`http://localhost:8000//book/publisher/${Publisher}`)
    .then((response) => {
      setVideos(response.data); 
    })
    .catch((error) => {
      console.error('Error fetching books:', error);
    });
};




  const navigate = useNavigate();
  const handleClick = (publisherName) => {
    navigate("/Books", { state: { publisher: publisherName } });
  };
  const[value,setValue] = useState();
  return (
    <>
    <NavBar />
    <Box >
      <Box height={30}/>
      <Box sx={{ display: "flex" }}>
        <SideNavBar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Publisher</h1>
          <Stack spacing={10} direction="row">
          <div  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          < Avatar src={i10} alt="Pic not found" sx={{ width:160, height:160}} onClick={() => handleClick('Alpha Publication')}/>
          <h3>Alpha Publication</h3>
          <Rating value={value} onChange={(e,val)=>setValue(val)}/>
          </div>
          <div  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
           <Avatar src={i11} alt="Pic not found" sx={{ width:160, height:160}} onClick={() => handleClick('Finger Print Publication')}/>
           <h3>Finger Print Publication</h3>
           <Rating value={value} onChange={(e,val)=>setValue(val)}/>
           </div>
           <div  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
           <Avatar src={i12} alt="Pic not found" sx={{ width:160, height:160}} onClick={() => handleClick('Penguin Publishing Group')}/>
           <h3> Penguin Publishing Group</h3>
           <Rating value={value} onChange={(e,val)=>setValue(val)}/>
           </div>
          </Stack>
          <Stack spacing={10} direction="row" sx={{marginTop: 6}}>
          <div  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          < Avatar src={i13} alt="Pic not found" sx={{ width:160, height:160}} onClick={() => handleClick('Clever Fox Publishing')}/>
          <h3>Clever Fox Publishing</h3>
          <Rating value={value} onChange={(e,val)=>setValue(val)}/>
          </div>
          <div  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
           <Avatar src={i14} alt="Pic not found" sx={{ width:160, height:160}} onClick={() => handleClick('BigFoot Publications')}/>
           <h3> BigFoot Publications</h3>
           <Rating value={value} onChange={(e,val)=>setValue(val)}/>
           </div>
           <div  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
           <Avatar src={i15} alt="Pic not found" sx={{ width:160, height:160}} onClick={() => handleClick('Rajmangal Publishers')}/>
           <h3>Rajmangal Publishers</h3>
           <Rating value={value} onChange={(e,val)=>setValue(val)}/>
           </div>
          </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default Publisher;
