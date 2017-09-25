import React, { Component } from 'react';
import Start from './Start';

class Details extends Component {

	render() {
		let data = this.props.animeData;
		let titles = data.titles;
		var jpTitle = '';

		if (titles !== undefined && titles !== null)
			jpTitle = titles.ja_jp;

		let bgStyle;
		if (this.props.bgImg !== null && this.props.bgImg !== '') {
			bgStyle = {
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75)), url(${this.props.bgImg})`
			};
		}
		else {
			bgStyle = {
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75)), url(${require('../bg.jpg')})`
			};
		}

		return (
			<div className="detBg container-fluid no-padding" style={bgStyle}>
				{this.props.selectedId !== '' ? (
					<div className="card detCard">
						<div className="card-body">
							<div className="grid">
								<div className="row">
									<div className="col-md-4 col-12">
										<img src={this.props.posterImg} alt="cover" className="img-fluid img-thumbnail" />
									</div>
									<div className="col-md-8 col-12">
										<div className="row">
											<h2>{data.canonicalTitle}</h2>
										</div>
										<div className="row d-flex justify-content-between">
											<div className="col col-9 text-left">
												<h5 className="text-muted">{jpTitle}</h5>
											</div>
											<div className="col-3 text-right">
												<div><span className="badge badge-default">{data.subtype}</span></div>
											</div>
										</div>
										<div className="row">
											<ul className="list-group">
												<li className="d-flex list-group-item justify-content-between">
													Episodes
													<div><span className="badge badge-default">{data.episodeCount}</span></div>
												</li>
												<li className="d-flex list-group-item justify-content-between">
													Episode duration
													<div><span className="badge badge-default">{data.episodeLength} min.</span></div>
												</li>
												<li className="d-flex list-group-item justify-content-between">
													Status
													<div><span className="badge badge-default">{data.status}</span></div>
												</li>
												<li className="d-flex list-group-item justify-content-between">
													Start date
													<div><span className="badge badge-default">{data.startDate}</span></div>
												</li>
												<li className="d-flex list-group-item justify-content-between">
													End date
													<div><span className="badge badge-default">{data.endDate}</span></div>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="row" style={{ marginTop: 15 }}>
									<div className="col-12 list-group-item">
										<p style={{ float: "left", fontSize: "0.93rem" }}>Synopsis: </p>
										<br />
										<p className="text-justify">{data.synopsis}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
						<Start />
					)}
			</div>
		);
	}

}

export default Details;