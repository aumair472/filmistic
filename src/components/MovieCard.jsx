import PropTypes from 'prop-types';
import { useMovieContext } from '../contexts/MovieContext';
import '../css/MovieCard.css';

function MovieCard({ movie }) {
    const { isFavorite, addFavorite, removeFavorite } = useMovieContext();
    const favorite = isFavorite(movie.id);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        favorite ? removeFavorite(movie) : addFavorite(movie);
    };

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                />
                <div className="movie-overlay">
                    <button 
                        className={`favorite-btn ${favorite ? 'active' : ''}`} 
                        onClick={handleFavoriteClick}
                    >
                        {favorite ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split('-')[0]}</p>
            </div>
        </div>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        release_date: PropTypes.string,
    }).isRequired,
};

export default MovieCard;
