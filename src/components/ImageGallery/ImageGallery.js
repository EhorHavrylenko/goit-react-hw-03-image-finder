import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './StyleImageGallery.module.css';

class ImageGallery extends Component {
	handleClickPhoto = (e) => {
		this.props.onClick(e);
	};

	render() {
		const images = this.props.images;

		return (
			<div className={styles.GalleryContainer} onClick={this.handleClickPhoto}>
				<ul className={styles.ImageGallery}>
					{images.map(({ id, webformatURL, largeImageURL }) => (
						<ImageGalleryItem key={id} id={id} webformatURL={webformatURL} largeimageurl={largeImageURL} />
					))}
				</ul>
			</div>
		);
	}
}

export default ImageGallery;
