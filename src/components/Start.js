import React, { Component } from 'react';

class Start extends Component {

	render() {

		return (
			<div className="jumbotron my-auto mx-auto bg-dark text-light">
				<h1>Simple Anime Database</h1>
				<hr style={{ borderTopColor: '#f75136' }} />
				<a href={'http://docs.kitsu.apiary.io/'} target="_blank" className="text-light btn btn-dark btn-block">
					<img style={{ height: '2rem' }} src={'https://avatars1.githubusercontent.com/u/7648832'} alt="Kitsu API" />
					<span style={{ marginLeft: '1rem' }}>Powered by Kitsu API</span>
				</a>
			{/* TROCAR O LINK */}
				<a href={'http://docs.kitsu.apiary.io/'} target="_blank" className="text-light btn btn-dark btn-block">
					<img src={require('../GitHub-Mark-32px.png')} alt="Github repo" />
					<span style={{ marginLeft: '1rem' }}>View Code</span>
				</a>
			</div>
		);
	}

}

export default Start;