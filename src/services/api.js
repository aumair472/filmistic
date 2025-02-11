const API_KEY = "7bce7815fb43f78163b3f17fe5f44dc4";

const baseUrl = "https://api.themoviedb.org/3";


export const getPopularMovies = async () => {
    const response = await fetch(`${baseUrl}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}   

export const searchMovie = async (query) => {
    const response = await fetch(`${baseUrl}/search/movie/?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}