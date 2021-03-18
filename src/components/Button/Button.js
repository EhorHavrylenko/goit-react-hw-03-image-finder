import React, { Component } from 'react';
import styles from './Button.module.css';

class Button extends Component {
	render() {
		return (
			<div className={styles.ContainerBtn}>
				<button className={styles.Button} type="button" onClick={this.props.onClick}>
					Load More
				</button>
			</div>
		);
	}
}

export default Button;
