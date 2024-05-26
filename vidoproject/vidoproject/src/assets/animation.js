import axios from 'axios';

const fetchAnimationData = async () => {
    try {
        const response = await axios.get('http://localhost:8081/api/animation/bring');
        return response.data;
    } catch (error) {
        console.error('Error fetching animation data:', error);
        return [];
    }
};

export default fetchAnimationData;