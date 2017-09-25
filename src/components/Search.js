import React, { Component } from 'react';
import '../../node_modules/react-dropdown/style.css';

class Search extends Component {
	constructor(props) {
		super(props);
		this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
	}

	handleFilterTextInputChange(e) {
		this.props.onFilterTextInput(e.target.value);
	}

	render() {
		return (
			<div>
				<input type="text" className="typeahead form-control" aria-label="Text input" placeholder="Search title"
					value={this.props.searchTxt}
					onChange={this.handleFilterTextInputChange}
				/>
			</div>
		);
	}
}

export default Search;
