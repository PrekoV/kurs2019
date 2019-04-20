import React, { Component } from 'react';
import Header from './components/header/header';
import { getProdOne, getProds } from './actions/getProducts'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		prods: state.getProductsReducer
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getProds: () => dispatch(getProds()),
		getProdOne: (url) => dispatch(getProdOne(url))
	}
}

class App extends Component {
	componentDidMount = () => {
		this.props.getProdOne("cups");
	}
	render() {
		console.log(this.props.prods)
		return (
			<div className="App">
				<Header></Header>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
