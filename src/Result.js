import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';

export class Result extends Component {
	isDataLoaded = false;
	constructor(props) {
		super(props);
		this.state = {
			page: 0,
			data: [],
			rowsPerPage: 9,
		};
	}
	componentDidMount = () => {
		this.isDataLoaded = true;
		this.GetData();
	};

	GetData = async () => {
		axios.get(`https://api.github.com/search/users?q=${this.props.searchValue}`).then((result) => {
			if(this.isDataLoaded) {
				this.setState({ data: result.data.items});
			}
		});
	};

	handleChangePage = (event, newPage) => {
		this.setState({ page: newPage });
	};

	handleChangeRowsPerPage = (event) => {
		this.setState({ rowsPerPage: +event.target.value });
		this.setState({ page: 0 });
	};

	render() {

		return (
			<Paper key={this.props.searchValue}>
				<TableContainer>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell>Avatar Image</TableCell>
								<TableCell>Login</TableCell>
								<TableCell>Type</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.data
								.slice(
									this.state.page * this.state.rowsPerPage,
									this.state.page * this.state.rowsPerPage +
										this.state.rowsPerPage
								)
								.map((row) => {
									return (
										<TableRow>
											<TableCell>
												<Avatar alt="Remy Sharp" src={`${row.avatar_url}`} />
											</TableCell>
											<TableCell>{row.login}</TableCell>
											<TableCell>{row.type}</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[9, 15, 20]}
					component="div"
					count={this.state.data.length}
					rowsPerPage={this.state.rowsPerPage}
					page={this.state.page}
					onChangePage={this.handleChangePage}
					onChangeRowsPerPage={this.handleChangeRowsPerPage}
				/>
			</Paper>
		);
	}
}

export default Result;
