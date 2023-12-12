import SideNavBar from "../Components/SideNavBar";
import Box from "@mui/material/Box";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { Avatar, Rating, Stack } from "@mui/material";
import i2 from "../image/i2.PNG";
import i3 from "../image/i3.PNG";
import i4 from "../image/i4.PNG";
import i5 from "../image/i5.PNG";
import i6 from "../image/i6.PNG";
import i7 from "../image/i7.PNG";
import i8 from "../image/i8.PNG";
import i9 from "../image/i9.PNG";
import { useState, useEffect} from "react";
import axios from 'axios';




function Author() {

  const[videos, setVideos] = useState([]);

const fetchBooks = () => {
  axios.get('http://localhost:8000/Author')
    .then((response) => {
      setVideos(response.data); 
    })
    .catch((error) => {
      console.error('Error fetching books:', error);
    });
};

const fetchAuthor = () => {
  axios.get(`http://localhost:8000//book/author/${Author}`)
    .then((response) => {
      setVideos(response.data); 
    })
    .catch((error) => {
      console.error('Error fetching books:', error);
    });
};




  const navigate = useNavigate();
  const handleClick = (authorName) => {
    navigate("/Books", { state: { author: authorName } });
  };
  
  
  const [value, setValue] = useState();
  return (
    <>
      <NavBar />
      <Box>
        <Box height={30} />
        <Box sx={{ display: "flex" }}>
          <SideNavBar />

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <h1>Author</h1>
            <Stack spacing={10} direction="row">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={i2}
                  alt="Pic not found"
                  sx={{ bgcolor: "secondary.main", width: 160, height: 160 }}
                  onClick={() => handleClick('Joseph Murphy')}
                />
                <h3 style={{ marginBottom: 0 }}>Joseph Murphy</h3>
                <Rating value={value} onChange={(e, val) => setValue(val)} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={i3}
                  alt="Pic not found"
                  sx={{ bgcolor: "secondary.main", width: 160, height: 160 }}
                  onClick={() => handleClick('Robin Sharma')}
                />
                <h3 style={{ marginBottom: 0 }}>Robin Sharma</h3>
                <Rating value={value} onChange={(e, val) => setValue(val)} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={i4}
                  alt="Pic not found"
                  sx={{ bgcolor: "secondary.main", width: 160, height: 160 }}
                  onClick={() => handleClick('Darius Foroux')}
                />
                <h3 style={{ marginBottom: 0 }}> Darius Foroux</h3>
                <Rating value={value} onChange={(e, val) => setValue(val)} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={i5}
                  alt="Pic not found"
                  sx={{ bgcolor: "secondary.main", width: 160, height: 160 }}
                  onClick={() => handleClick('Stephen Edwin King')}
                />
                <h3 style={{ marginBottom: 0 }}>Stephen Edwin King</h3>
                <Rating value={value} onChange={(e, val) => setValue(val)} />
              </div>
            </Stack>
            <Stack spacing={10} direction="row" sx={{ marginTop: 3 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={i6}
                  alt="Pic not found"
                  sx={{ bgcolor: "secondary.main", width: 160, height: 160 }}
                  onClick={() => handleClick('Hilary Mantel')}
                />
                <h3 style={{ marginBottom: 0 }}>Hilary Mantel</h3>
                <Rating value={value} onChange={(e, val) => setValue(val)} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={i7}
                  alt="Pic not found"
                  sx={{ bgcolor: "secondary.main", width: 160, height: 160 }}
                  onClick={() => handleClick('Shashi Tharoor')}
                />
                <h3 style={{ marginBottom: 0 }}>Shashi Tharoor</h3>
                <Rating value={value} onChange={(e, val) => setValue(val)} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={i8}
                  alt="Pic not found"
                  sx={{ bgcolor: "secondary.main", width: 160, height: 160 }}
                  onClick={() => handleClick('Kiran Desai')}
                />
                <h3 style={{ marginBottom: 0 }}>Kiran Desai</h3>
                <Rating value={value} onChange={(e, val) => setValue(val)} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={i9}
                  alt="Pic not found"
                  sx={{ bgcolor: "secondary.main", width: 160, height: 160 }}
                  onClick={() => handleClick('Madhuri Banerjee')}
                />
                <h3 style={{ marginBottom: 0 }}>Madhuri Banerjee</h3>
                <Rating value={value} onChange={(e, val) => setValue(val)} />
                {/* <Typography>Rating {value!==undefined ? value: 0} Star</Typography> */}
              </div>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default Author;
