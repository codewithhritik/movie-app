import React, { useState, useEffect } from 'react'
import './AdminMovieTable.css'
import { TableContainer, Table, TableHead, TableBody, TableRow, Paper, TableCell, IconButton, AppBar, Toolbar, Typography, TablePagination } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MovieModal from '../MovieModal/MovieModal';
import { API_BASE_URL } from '../../utility/apiConfig.js'

function AdminMovieTable({ movies }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentMovie, setCurrentMovie] = useState(null);
    const [allMovies, setAllMovies] = useState(movies);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        setAllMovies(movies);
    }, [movies]);
      

    const handleEditClick = (movie) => {
        setCurrentMovie(movie);
        setModalOpen(true);
    };

    const handleAddClick = () => {
        setCurrentMovie(null); // No current movie for an add operation
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleDeleteClick = (movieId) => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            const url = `${API_BASE_URL}/api/movies/deleteMovie/${movieId}`;
    
            fetch(url, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setAllMovies(allMovies.filter(movie => movie._id !== movieId));
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    };
    

    const handleSaveMovie = (movieData) => {
        const isUpdating = !!movieData._id;
        const url = isUpdating 
            ? `${API_BASE_URL}/api/movies/updateMovie/${movieData._id}` 
            : `${API_BASE_URL}/api/movies/addMovie`;
    
        // If adding a new movie, remove the _id property
        if (!isUpdating) {
            delete movieData._id;
        }
    
        fetch(url, {
            method: isUpdating ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add other headers like authorization if required
            },
            body: JSON.stringify(movieData),
        })
        .then(resp => resp.json())
        .then(data => {
            if (!isUpdating) {
                setAllMovies(prevMovies => [...prevMovies, data]);
            } else {
                setAllMovies(prevMovies => prevMovies.map(movie => movie._id === data._id ? data : movie));
            }
            handleCloseModal();
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    };
    
    
    return (
        <div>
        
        <TableContainer component={Paper} className='table-container'>
        <AppBar position="static" style={{ background: "#fff" }} elevation={0}>
            <Toolbar>
                <Typography variant="h6" color="black" noWrap>
                    Movies
                </Typography>
                <div style={{ flexGrow: 1 }} /> {/* This pushes the icon to the right */}
                <IconButton color="black" onClick={handleAddClick}>
                    <AddIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Cover</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        allMovies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((movie, index) => (
                            <TableRow
                                key={movie._id || index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <img src={movie.picture} alt={movie.title} className='movie-cover'></img>
                                </TableCell>
                                <TableCell style={{ width: '15%' }}>{movie.title}</TableCell>
                                <TableCell className="description-column">{movie.description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditClick(movie)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(movie._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={allMovies.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </TableContainer>
        
        <MovieModal
            open={modalOpen}
            movie={currentMovie}
            onClose={handleCloseModal}
            onSave={handleSaveMovie}
        />
        </div>
    )
}

export default AdminMovieTable
