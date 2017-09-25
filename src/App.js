import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import Details from './components/Details';
import $ from 'jquery';
import Bloodhound from 'typeahead.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTxt: '',
			selectedId: '',
			animeData: {},
			bgImg: '',
			posterImg: ''
		};
		this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
	}

	handleFilterTextInput(filterText) {
		this.setState({ searchTxt: filterText });
	}

	clearSelectedId() {
		this.setState({ selectedId: '' });
	}

	render() {
		return (
			<div className="App">

				<div className="navbar navbar-dark bg-dark mb-4">
					<a href="#" className="navbar-brand mr-auto" onClick={() => this.clearSelectedId()}>
						<h2 style={{ lineHeight: '1.7rem' }}>SA<br/>Db</h2>
					</a>
					<form className="form-inline">
						<Search searchTxt={this.state.searchTxt}
							onFilterTextInput={this.handleFilterTextInput}
						/>
					</form>
				</div>

				<div className="container-fluid mainCont">
					<Details animeData={this.state.animeData}
						selectedId={this.state.selectedId}
						bgImg={this.state.bgImg}
						posterImg={this.state.posterImg}
					/>
				</div>

			</div>
		);
	}

	componentDidMount() {
		// Bloodhound
		let bloodh = new Bloodhound({
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			datumTokenizer: Bloodhound.tokenizers.whitespace,
			remote: {
				url: `https://kitsu.io/api/edge/anime?filter[text]=%QUERY&fields[anime]=canonicalTitle`,
				wildcard: '%QUERY',
				filter: x => {
					return $.map(x.data, (item) => {
						return {
							title: item.attributes.canonicalTitle,
							id: item.id
						}
					})
				}
			}
		});
		bloodh.initialize();

		// Typeahead
		$('.typeahead').typeahead({
			minLength: 3,
			highlight: true,
			hint: false
		},
			{
				display: 'title',
				limit: 8,
				source: bloodh
			});

		$('.typeahead').bind('typeahead:select', (e, sug) => {
			this.setState({
				selectedId: sug.id,
				searchTxt: sug.title
			});
			this.fetchData();
			$('.typeahead').blur();
		});
	}

	fetchData() {
		let url = `https://kitsu.io/api/edge/anime/${this.state.selectedId}`;
		fetch(url, {
			method: 'GET',
			headers: {
				'Accept': 'application/vnd.api+json',
				'Content-Type': 'application/vnd.api+json'
			}
		}).then(res => res.json()).then(resJson => {
			this.setState({ animeData: resJson.data.attributes });
			if (resJson.data.attributes.coverImage !== null) {
				this.setState({ bgImg: resJson.data.attributes.coverImage.original });
			} else this.setState({ bgImg: '' });

			if (resJson.data.attributes.posterImage !== null) {
				this.setState({ posterImg: resJson.data.attributes.posterImage.small });
			} else this.setState({ posterImg: '' });
		}).catch((error) => { console.error(error); });
	}

}

export default App;
