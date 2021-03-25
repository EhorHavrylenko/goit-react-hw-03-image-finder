import React, { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from 'react-loader-spinner';
import styles from './App.module.css';
import Modal from './components/Modal/Modal';
import fetchImages from './services/fetchImages';

class App extends Component {
	state = {
		images: [],
		currentPage: 1,
		searchQuery: '',
		isLoading: false,
		showModal: false,
		idClickPhoto: '',
		largeImageURL: '',
		clickOnButton: false
	};

	componentDidUpdate(prevProps, prevState) {
		const { currentPage, searchQuery, clickOnButton } = this.state;

		if (prevState.searchQuery !== this.state.searchQuery || clickOnButton) {
			fetchImages(searchQuery, currentPage)
				.then((res) =>
					this.setState((prevState) => ({
						images: [ ...prevState.images, ...res.data.hits ],
						currentPage: prevState.currentPage + 1
					}))
				).then(() => {
					window.scrollTo({
						top: document.documentElement.scrollHeight,
						behavior: 'smooth',
					  });
				})
				.finally(() => this.setState({ isLoading: false, clickOnButton: false }));
		}

		// if (prevState.images !== this.state.images) {
		// 	window.scrollTo({
		// 	  top: document.documentElement.scrollHeight,
		// 	  behavior: 'smooth',
		// 	});
		//   }
	}

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

	handleClickOnButton = () => {
		this.setState({ clickOnButton: true });
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
						images={images}
						onClick={() => {
							fetchImages();
							this.handleClickOnButton();
						}}
					/>
				)}

				{showModal && <Modal src={largeImageURL} onClose={this.toggleModal} />}
			</div>
		);
	}
}

export default App;
