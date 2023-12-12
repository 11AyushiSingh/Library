// import SideNavBar from "../Components/SideNavBar";
// import NavBar from "../Components/NavBar";
// import axios from 'axios';
// import Box from "@mui/material/Box";
// import { Button, Dialog, DialogTitle, DialogContent, Stack, DialogActions,TextField } from '@mui/material';
// import { useState,useEffect } from "react";

// import BookList from "./BookList";


// function Books() {
//     const [open, setOpen] = useState(false);
//     const[videos, setVideos] = useState([]);
  

//     const[Name,setName] = useState("");
//     const[Author,setAuthor] = useState("");
//     const[Publisher,setPublisher] = useState("");
//     const[Availability,setAvailability] = useState("");
//     const[Ledger,setLedger] = useState("");
//     const[file, setfile] = useState("");

    
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleClick = () => {
//     const formData = new FormData();
//     formData.append("Name",Name);
//     formData.append("Author",Author);
//     formData.append("Publisher",Publisher);
//     formData.append("Ledger",Ledger);
//     formData.append("Availability",Availability);
//     formData.append("file",file);
//     // axios.post('http://localhost:8000/book',formData)
//     // .then((response)=>{console.log(response)})
//     // .catch((error)=>{console.log(error)})

//     axios.post("http://localhost:8000/book", formData)
//     .then((response) => {
//       console.log(response);
//       fetchBooks(); 
//       handleClose(); 
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

  
    
//   function deleteBook(id){
//     //yha delete ki api call hogi
//     setVideos( videos.filter(video=>video.id !== id))
//     fetch(`http://localhost:8000/book/${id}`,{
//       method: 'DELETE'
//     }).then((result)=>{
//       result.json().then((response)=>{
//           console.log(response)
//       })
//     })
   
//      console.log(id)
//   }

  
//   const fetchBooks = () => {
//     axios.get('http://localhost:8000/book')
//       .then((response) => {
//         setVideos(response.data); 
//       })
//       .catch((error) => {
//         console.error('Error fetching books:', error);
//       });
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

  

//     return(
//         <>
//             <NavBar />
//       <Box height={30} />
//       <Box sx={{ display: "flex" }}>
//         <SideNavBar />

//           <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <h1>Books</h1>
//           <Button color="primary" variant="contained" onClick={handleClickOpen} style={{ position: 'fixed', top: '90px',left: '90%'}} >AddBook</Button>
//           <Dialog open={open} onClose={handleClose} fullWidth>
//             <DialogTitle>UserScreen</DialogTitle>
//             <DialogContent>
                
//                 <Stack spacing={2} margin={2}>
//                  <TextField variant="outlined" label = "Book Name" onChange={(e)=>setName(e.target.value)}></TextField>
//                  <TextField variant="outlined" label = "Author Name" onChange={(e)=>setAuthor(e.target.value)}></TextField>
//                  <TextField variant="outlined" label = "Publisher Name"onChange={(e)=>setPublisher(e.target.value)}></TextField>
//                  <TextField variant="outlined" label = "Availability"onChange={(e)=>setAvailability(e.target.value)}></TextField>
//                  <TextField variant="outlined" label = "Ledger"onChange={(e)=>setLedger(e.target.value)}></TextField>
//                  <TextField variant="outlined" label = "Book Image" type="file"onChange={(e)=>setfile(e.target.files[0])}></TextField>
//                  <Button color="primary" variant="contained" onClick={handleClick}>AddBook</Button>
//                 </Stack>
//             </DialogContent>
//             <DialogActions>
               
//                 <Button color="error" variant="contained" onClick={handleClose}>Close</Button>
//             </DialogActions>
//           </Dialog>
          
//           {/* <AddVideo editableBook = {editableBook} updateBook={updateBook}></AddVideo> */}

//           <BookList deleteBook={deleteBook} 
//           //editBook={editBook} 
//           videos= {videos}></BookList>

          



//         </Box>
//       </Box>
//         </>
//     )
// }
// export default Books;


import SideNavBar from "../Components/SideNavBar";
import Box from "@mui/material/Box";
import NavBar from "../Components/NavBar";
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, Stack, DialogActions, TextField } from '@mui/material';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import BookList from "./BookList";

function Books() {
  const [open, setOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [Name, setName] = useState("");
  const [Author, setAuthor] = useState("");
  const [Publisher, setPublisher] = useState("");
  const [Availability, setAvailability] = useState("");
  const [Ledger, setLedger] = useState("");
  const [file, setFile] = useState("");

  let headers = {};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Author", Author);
    formData.append("Publisher", Publisher);
    formData.append("Ledger", Ledger);
    formData.append("Availability", Availability);
    formData.append("file", file);

    axios.post("http://localhost:8000/book", formData,{ headers })
      .then((response) => {
        console.log(response);
        fetchBooks();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function deleteBook(id) {
    setVideos(videos.filter(video => video.id !== id))
    fetch(`http://localhost:8000/book/${id}`, { headers },{
      method: 'DELETE'
    }).then((result) => {
      result.json().then((response) => {
        console.log(response)
      })
    })
    console.log(id)
  }

  const fetchToken = () => {
    axios.post('http://localhost:8000/signup') 
      .then((response) => {
        const token = response.data.token;
        
        fetchBooks(token);
      })
      .catch((error) => {
        console.error('Error fetching token:', error);
      });
  };
  
  const fetchBooks = (token) => {
    const headers = {
      'Authorization': `Bearer ${token}`
    };
  
    axios.get('http://localhost:8000/book', { headers })
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  };
  

  // const fetchBooks = () => {
  // //   var headers =  {
  // //     'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5dXNoaXNpbmdocmFqcHV0OTZAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTcwMjM2NTYwM30.ZbGSTKeZGGX0Crcj8awe-w6awin90H8wiHWGiBBuTBg'
  // // }
  //   axios.get('http://localhost:8000/book', {
  //     // headers: headers
  //   })
  //     .then((response) => {
  //       setVideos(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching books:', error);
  //     });
  // };

  useEffect(() => {
    fetchBooks();
  }, []);

  const location = useLocation();
  const authorName = location.state && location.state.author;
  const publisherName = location.state && location.state.publisher;

  

  useEffect(() => {
    if (authorName) {
      axios.get(`http://localhost:8000/book/author/${authorName}`,{ headers })
        .then((response) => {
          setVideos(response.data);
        })
        .catch((error) => {
          console.error('Error fetching books:', error);
        });
    } 
    else if (publisherName) {
      axios.get(`http://localhost:8000/book/publisher/${publisherName}`,{ headers })
        .then((response) => {
          setVideos(response.data);
        })
        .catch((error) => {
          console.error('Error fetching books:', error);
        });
    }
    
    else {
      fetchBooks();
    }
  }, [authorName, publisherName]);

  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideNavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Books</h1>
          <Button color="primary" variant="contained" onClick={handleClickOpen} style={{ position: 'fixed', top: '90px', left: '90%' }}>AddBook</Button>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>UserScreen</DialogTitle>
            <DialogContent>
              <Stack spacing={2} margin={2}>
                <TextField variant="outlined" label="Book Name" onChange={(e) => setName(e.target.value)}></TextField>
                <TextField variant="outlined" label="Author Name" onChange={(e) => setAuthor(e.target.value)}></TextField>
                <TextField variant="outlined" label="Publisher Name" onChange={(e) => setPublisher(e.target.value)}></TextField>
                <TextField variant="outlined" label="Availability" onChange={(e) => setAvailability(e.target.value)}></TextField>
                <TextField variant="outlined" label="Ledger" onChange={(e) => setLedger(e.target.value)}></TextField>
                <TextField variant="outlined" label="Book Image" type="file" onChange={(e) => setFile(e.target.files[0])}></TextField>
                <Button color="primary" variant="contained" onClick={handleClick}>AddBook</Button>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button color="error" variant="contained" onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
          <BookList deleteBook={deleteBook} videos={videos}></BookList>
        </Box>
      </Box>
    </>
  );
}
export default Books;
