import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

function MovieModal({ open, movie, onClose, onSave }) {
  // Local state for form fields, initialized with props
  const [form, setForm] = useState({
    title: '',
    picture: '',
    description: '',
    releaseDate: '',
    duration: ''
  });

  // Effect to reset the form when the movie prop changes
  useEffect(() => {
    // Function to format the date to YYYY-MM-DD
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    setForm({
      title: movie?.title || '',
      picture: movie?.picture || '',
      description: movie?.description || '',
      releaseDate: formatDate(movie?.releaseDate),
      duration: movie?.duration || ''
    });
  }, [movie]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Include the _id if it exists
    const movieToSave = { ...form, _id: movie?._id };
    onSave(movieToSave);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{movie ? 'Edit Movie' : 'Add Movie'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          value={form.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="picture"
          label="Cover URL"
          type="text"
          fullWidth
          value={form.picture}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={form.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="releaseDate"
          label="Release Date"
          type="date"
          fullWidth
          value={form.releaseDate}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="duration"
          label="Duration (minutes)"
          type="number"
          fullWidth
          value={form.duration}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MovieModal;