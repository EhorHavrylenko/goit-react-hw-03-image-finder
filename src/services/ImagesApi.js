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

const ImagesApi = async (q, page) => {
	try {
		const { data } = await axios.get('', { params: { q, page } });
		return data.hits;
	} catch (error) {
		console.log('error', { error });
		return [];
	}
};

export default ImagesApi;
