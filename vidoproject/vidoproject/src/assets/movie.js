import axios from 'axios';

const fetchMovieData = async () => {
    try {
        const response = await axios.get('http://localhost:8081/api/movie/bring');
        return response.data;
    } catch (error) {
        console.error('Error fetching movie data:', error);
        return [];
    }
};

export default fetchMovieData; // ✅ 괄호 절대 없이 이렇게!
