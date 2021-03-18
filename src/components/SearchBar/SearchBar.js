import { Component } from 'react';
import styles from './StyleSearchBar.module.css';

class SearchBar extends Component {
	state = {
		query: ''
	};

	handleChangeQuery = (e) => {
		this.setState({ query: e.currentTarget.value });
	};

	handeleSubmit = (e) => {
		e.preventDefault();

		this.props.onSubmit(this.state.query)
		this.setState({query: ''})
	}; 

	render() {
		return (
			<header className={styles.Searchbar}>
				<form className={styles.SearchForm} onSubmit={this.handeleSubmit }>
					<button type="submit" className={styles.SearchFormButton}>
						<span className={styles.SearchFormButtonLabel}>Search</span>
					</button>

					<input
						className={styles.SearchFormInput}
						value={this.state.query}
						type="text"
						autoComplete="off"
						autoFocus
						placeholder="Search images and photos"
                        onChange={this.handleChangeQuery}
					/>
				</form>
			</header>
		);
	}
}

export default SearchBar;
