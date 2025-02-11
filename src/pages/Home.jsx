import MovieCard from "../components/MovieCard"
import { useState, useEffect} from "react";
import { searchMovie, getPopularMovies } from "../services/api";
import '../css/Home.css';

function Home () {

    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const [error,setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchMovies = async () => {
            try {
                const data = await getPopularMovies();
                setMovies(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchMovies();
    } , []);

    const handleSearch =  async (e) => {
        e.preventDefault();
        
        if(!searchQuery.trim()) return
        if(loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovie(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (error) {
            console.log(error);
            setError("failed to search for movies");
        }
        finally {
            setLoading(false);
        }
        setSearchQuery('');
    };

    return ( 
    <div className="home">
        <div className="search-container">
        <form onSubmit={handleSearch} className="search-form" action="">
            <input type="text"  placeholder="Search for Moives ...." className="search-input" value={searchQuery} onChange={e=> setSearchQuery(e.target.value)}/>
            <button type="submit" className="search-button">Search</button>
        </form>
        </div>

        {error && <div className="error">{error}</div>}

        {loading ? <div className="loading">Loading...</div> : <div className="movies-container">
            {movies.map( (movie) => movie.title.toLowerCase().startsWith(searchQuery) &&  ( <MovieCard key={movie.id} movie={movie} />) ) }
        </div>}
        
    </div>
    );
}

export default Home;