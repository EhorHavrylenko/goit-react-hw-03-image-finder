import axios from 'axios';

const API_KEY = '19920161-2470b7440ca60025ed5778af0';
const BASE_URL = 'https://pixabay.com/api/';

axios.defaults.baseURL = BASE_URL;

axios.defaults.params = {
	key: API_KEY,
	image_type: 'photo',
	orientation: 'horizontal',
	per_page: 12
};

// const fetchImages = async ( q , page ) => {

// 	const images = await axios.get(`https://pixabay.com/api/?q=${q}&page=${page}&key=19920161-2470b7440ca60025ed5778af0&image_type=photo&orientation=horizontal&per_page=12`
// 		)

// 	return images;
// };

const fetchImages = async ( q, page ) => {
	try {
		const images = await axios.get('', { params: { q, page } });
		return images;
	} catch (error) {
		console.log('error', { error });
		return [];
	}
};

export default fetchImages;
