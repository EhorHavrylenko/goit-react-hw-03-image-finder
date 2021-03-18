import React, { Component } from 'react';
import styles from './StyleImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
	render() {
		const { id, webformatURL, largeimageurl } = this.props;
		return (
			<li className={styles.ImageGalleryItem}>
				<img id={id} src={webformatURL} alt="img" className={styles.ImageGalleryItemImage} largeimageurl={largeimageurl}/>
			</li>
		);
	}
}

export default ImageGalleryItem;
