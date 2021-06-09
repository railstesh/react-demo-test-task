import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import Result from './Result';

export class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			showResult: false
		};
	}

	handleSubmit = () => {
		this.setState({
			showResult: true
		});
	}

	handleTextFieldChange = (e) => {
		this.setState({
			searchValue: e.target.value,
			showResult: false
		});
	};

	render() {
		console.log(this.state.searchValue);
		return (
			<div className='card p-4'>
				<div className='d-block'>
					<div className='d-flex justify-content-center align-items-center'><h1>React Test</h1></div>
					<div className='d-flex justify-content-center align-items-center'>
						<TextField
							id="outlined-basic"
							label="Outlined"
							variant="outlined"
							className='w-50 m-4'
							value={this.state.searchValue}
							onChange={this.handleTextFieldChange}
						/>
						<button variant="contained" className='ml-3 btn btn-success' onClick={this.handleSubmit}>Submit</button>
					</div>
					<div>
						{this.state.showResult && <Result searchValue={this.state.searchValue}></Result>}
					</div>
				</div>
			</div>
		);
	}
}

export default Search;
