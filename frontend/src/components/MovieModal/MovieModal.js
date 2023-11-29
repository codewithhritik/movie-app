// MovieModal.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function MovieModal({ open, movie, onClose, onSave }) {
  // Local state for form fields, initialized with props
  const [form, setForm] = useState({
    title: '',
    picture: '',
    description: '',
    releaseDate: '',
    duration: '',
    theatres: []
  });

  useEffect(() => {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Simplified date formatting
    };

    // Check if `movie` is not null or undefined before accessing its properties
    if (movie) {
      setForm({
          title: movie.title || '',
          picture: movie.picture || '',
          description: movie.description || '',
          releaseDate: formatDate(movie.releaseDate),
          duration: movie.duration || '',
          theatres: movie.theatres?.map(t => ({
              ...t,
              timings: t.timings.join(', '), // Convert timings array to string
              // Ensure seatingCapacity is a number
              seatingCapacity: t.seatingCapacity ?? 0 // Use nullish coalescing operator
          })) || []
      });
    } else {
      // If `movie` is null or undefined, initialize the form with default values
      setForm({
          title: '',
          picture: '',
          description: '',
          releaseDate: '',
          duration: '',
          theatres: []
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTheatreChange = (index, e) => {
    const updatedTheatres = form.theatres.map((theatre, i) => {
      if (index === i) {
        return { ...theatre, [e.target.name]: e.target.value };
      }
      return theatre;
    });
    setForm(prev => ({ ...prev, theatres: updatedTheatres }));
  };

  const handleAddTheatre = () => {
    setForm(prev => ({
      ...prev,
      theatres: [...prev.theatres, { name: '', location: '', timings: [], seatingCapacity: 0 }]
    }));
  };

  const handleRemoveTheatre = (index) => {
    setForm(prev => ({
      ...prev,
      theatres: prev.theatres.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // Convert timings back to an array of strings if they were edited as a single string
    const movieToSave = {
      ...form,
      theatres: form.theatres.map(theatre => ({
        ...theatre,
        timings: typeof theatre.timings === 'string' ? theatre.timings.split(',').map(t => t.trim()) : theatre.timings,
        seatingCapacity: parseInt(theatre.seatingCapacity, 10)
      })),
      _id: movie?._id
    };
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
        {/* Theatres section */}
        {form.theatres.map((theatre, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TextField
              margin="dense"
              name="name"
              label="Theater Name"
              type="text"
              fullWidth
              value={theatre.name}
              onChange={(e) => handleTheatreChange(index, e)}
            />
            <TextField
              margin="dense"
              name="location"
              label="Theater Location"
              type="text"
              fullWidth
              value={theatre.location}
              onChange={(e) => handleTheatreChange(index, e)}
            />
            <TextField
              margin="dense"
              name="timings"
              label="Theater Timings (comma separated)"
              type="text"
              fullWidth
              value={theatre.timings.join ? theatre.timings.join(', ') : theatre.timings}
              onChange={(e) => handleTheatreChange(index, {
                target: {
                  name: e.target.name,
                  value: e.target.value
                }
              })}
            />
            <IconButton onClick={() => handleRemoveTheatre(index)}>
              <RemoveCircleOutlineIcon />
            </IconButton>
            <TextField
              margin="dense"
              name="seatingCapacity"
              label="Seating Capacity"
              type="number"
              fullWidth
              value={theatre.seatingCapacity}
              onChange={(e) => handleTheatreChange(index, e)}
            />
          </div>
        ))}
        <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddTheatre}>
          Add Theater
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MovieModal;