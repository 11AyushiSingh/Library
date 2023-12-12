

import { useState, useEffect } from "react";
import "./Book.css";
import axios from 'axios';

import {Button, Dialog,DialogTitle,DialogContent,Stack,DialogActions,TextField} from "@mui/material";
function Book({ id, Name, Author, Publisher,Image,Availability,Ledger,deleteBook,editBook,}) {
  const initialState = {
    id: "",
    Image: "",
    Name: "",
    Author: "",
    Publisher: "",
    Availability: "",
    Ledger: "",
  };
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState(initialState);
  const [editableBook, setEditableBook] = useState(null);
  const [videos, setVideos] = useState([]);

  
  
  const fetchBook = () => {
    axios.get(`http://localhost:8000/book/${id}`)
      .then((response) => {
        console.log(response.data);
        setVideos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchBook();
  }, []);

  

  const handleClickOpen = () => {
    setOpen(true);
    editBook(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function editBook(id) {
    setEditableBook(videos.find((video) => video.id === id));
    console.log(id);
    console.log(video);
  }


function updateBook(updatedBook) {
  const index = videos.findIndex((v) => v.id === updatedBook.id);
  const newBooks = [...videos];
  newBooks.splice(index, 1, updatedBook);

  axios.put(`http://localhost:8000/book/${updatedBook.id}`, updatedBook, {
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((response) => {
    console.log(response.data);
    setVideos(newBooks);
    fetchBook()
    window.location.reload();
    
  })
  .catch((error) => {
    console.error(error);
  });
}

  function handleSubmit(e) {
    e.preventDefault();
    if (editableBook) {
      updateBook(video);
    }
    setVideo(initialState);
    handleClose()
    
  }
  function handleChange(e) {
    setVideo({ ...video, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    if (editableBook) {
      

      setVideo(editableBook);
    }
  }, [editableBook]);

  
  return (
    <>
      <div className="grid-container">
        <div className="box">
          <div className="Pic">
            <img src={Image} alt="A book" />
          </div>
          <div className="book">{Name}</div>
          <div className="Author">Author: {Author}</div>
          <div className="Publisher">Publication: {Publisher}</div>
          <div className="Availability">Avability: {Availability}</div>
          <div className="Ledger">Ledger: {Ledger}</div>
          <button className="delete" onClick={() => deleteBook(id)}>
            Delete
          </button>
          <button
            color="primary"
            variant="contained"
            onClick={handleClickOpen}
          >
            Update
          </button>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>UserScreen</DialogTitle>
            <DialogContent>
              <Stack spacing={2} margin={2}>
                <TextField variant="outlined" label="Update Book Name" name="Name" onChange={handleChange} value={video.Name}></TextField>
                <TextField variant="outlined" label="Update Author Name" name="Author" onChange={handleChange}value={video.Author}></TextField>
                <TextField variant="outlined" label="Update Publisher Name" name="Publisher"onChange={handleChange}value={video.Publisher} ></TextField>
                <TextField variant="outlined" label="Update Availability" name="Availability" onChange={handleChange} value={video.Availability} ></TextField>
                <TextField variant="outlined" label="Update Ledger" name="Ledger"onChange={handleChange}value={video.Ledger} ></TextField>
                <Button color="primary" variant="contained" onClick={handleSubmit}>Update</Button>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button color="error" variant="contained" onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}
export default Book;