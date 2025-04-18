import axios from 'axios';
//애니메이션을 가져옴
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