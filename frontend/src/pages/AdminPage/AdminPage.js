import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import getMovies from '../../utility/getMovies'
import AdminMovieTable from '../../components/AdminMovieTable/AdminMovieTable';

function AdminPage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies()
        .then((data) => {
            console.log(data)
            setMovies(data)
        })
    }, [])

    return (
        <div>
        <Navbar />
        <AdminMovieTable movies={movies} />
        </div>
    )
}

export default AdminPage
