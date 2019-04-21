import React, { Component } from 'react';
import Header from './components/header/header';
import { getProdOne } from './actions/nonauth/getProducts'
import { getMedia } from './actions/nonauth/getMedia'

import { connect } from 'react-redux'
import News from './containers/news/News';

const mapStateToProps = state => {
	return {
		prods: state.getProductsReducer,
		media: state.getMediasReducer,

	}
}

const mapDispatchToProps = dispatch => {
	return {
		getMedia: () => dispatch(getMedia()),
		getProdOne: (name) => dispatch(getProdOne(name))
	}
}

class App extends Component {
	componentDidMount = () => {
		this.props.getProdOne("cups");
		this.props.getMedia()
	}
	render() {
		console.log(this.props)
		return (
			<div className="App">
				<Header></Header>
				<News />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
