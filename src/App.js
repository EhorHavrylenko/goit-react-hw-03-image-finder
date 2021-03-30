import React, { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from 'react-loader-spinner';
import styles from './App.module.css';
import Modal from './components/Modal/Modal';
import ImagesApi from './services/ImagesApi';

class App extends Component {
	state = {
		images: [],
		currentPage: 1,
		searchQuery: '',
		isLoading: false,
		showModal: false,
		idClickPhoto: '',
		largeImageURL: ''
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.searchQuery !== this.state.searchQuery) {
			this.fetchImages();
		}

		if (prevState.images !== this.state.images) {
			window.scrollTo({
				top: document.documentElement.scrollHeight,
				behavior: 'smooth'
			});
		}
	}

	fetchImages = () => {
		const { currentPage, searchQuery } = this.state;

		this.setState({ isLoading: true });

		ImagesApi(searchQuery, currentPage)
			.then((images) =>
				this.setState((prevState) => ({
					images: [ ...prevState.images, ...images ],
					currentPage: prevState.currentPage + 1
				}))
			)
			.catch((error) => console.log(error))
			.finally(() => this.setState({ isLoading: false }));
	};

	onChangeQuery = (query) => {
		this.setState({ searchQuery: query, currentPage: 1, images: [], isLoading: true });
	};

	handleClickImg = (e) => {
		this.setState({ showModal: true });
		const { largeImageURL } = this.state.images.find((img) => img.id === Number(e.target.id));
		this.setState({
			largeImageURL
		});
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

				{images.length > 0 &&
				!isLoading && (
					<Button
						onClick={() => {
							this.fetchImages();
						}}
					/>
				)}

				{showModal && <Modal src={largeImageURL} onClose={this.toggleModal} />}
			</div>
		);
	}
}

export default App;
