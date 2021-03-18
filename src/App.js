import React, { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import axios from 'axios';
import Button from './components/Button/Button';
import Loader from 'react-loader-spinner';
import styles from './App.module.css';
import Modal from './components/Modal/Modal';

class App extends Component {
	state = {
		images: [],
		currentPage: 1,
		searchQuery: '',
		isLoading: false,
		showModal: false,
		idClickPhoto: '',
		largeImageURL: '',
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevState.searchQuery !== this.state.searchQuery) {
			this.fetchImages();
		}

		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: 'smooth'
		});

	}

	
	onChangeQuery = (query) => {
		this.setState({ searchQuery: query, currentPage: 1, images: [] });
	};

	fetchImages = () => {
		const { currentPage, searchQuery } = this.state;

		this.setState({ isLoading: true });

		axios
			.get(
				`https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=19920161-2470b7440ca60025ed5778af0&image_type=photo&orientation=horizontal&per_page=12
				`
			)
			.then((res) =>
				this.setState((prevState) => ({
					images: [ ...prevState.images, ...res.data.hits ],
					currentPage: prevState.currentPage + 1
				}))
			)
			.finally(() => this.setState({ isLoading: false }));
	};

	handleClickImg = (e) => {
		this.setState({ showModal: true });        
		const {largeImageURL} = this.state.images.find(img => img.id === Number(e.target.id))
		this.setState({
			largeImageURL
		})
	};

	toggleModal = () => {
		this.setState(({ showModal }) => ({
			showModal: !showModal
		}));
	};

	render() {
		const { images, isLoading, largeImageURL } = this.state;
		const showModal = this.state.showModal;
	
		return (
			<div>
				<SearchBar onSubmit={this.onChangeQuery} />

				<ImageGallery images={images} onClick={this.handleClickImg} />

				<div className={styles.LoaderContainer}>
					{isLoading && <Loader type="ThreeDots" color="#f18723" height={60} width={60} />}
				</div>

				{images.length > 0 && !isLoading && <Button images={images} onClick={this.fetchImages} />}

				{showModal && <Modal src={largeImageURL} onClose={this.toggleModal} />}
			</div>
		);
	}
}

export default App; 
