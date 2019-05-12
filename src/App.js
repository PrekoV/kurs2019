import React, { Component } from 'react';
import Header from './components/header/header';
import { getProdOne } from './actions/nonauth/getProducts'
import { getMedia } from './actions/nonauth/getMedia'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { history } from './store'
import { connect } from 'react-redux'
import News from './containers/news/News';
import Tour from './containers/tour/Tour.js'
import Media from './containers/media/Media';
import Shop from './containers/shop/Shop';
import Footer from './components/footer/footer';
import Album from './containers/media/media-album/album';
import notFound from './notFound';


const mapStateToProps = state => {
	return {
		prods: state.getProductsReducer,
		media: state.getMediasReducer,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getMedia: () => dispatch(getMedia()),
		//	getProdOne: (name) => dispatch(getProdOne(name))
	}
}

class App extends Component {
	// componentDidMount = () => {
	// 	this.props.getProdOne("cups");
	// 	this.props.getMedia()
	// }
	render() {
		//	console.log(this.props)
		return (
			<div className="App">
				<div className="container-wrapper">
					<Router history={history}>
						<div>
							<Header></Header>
							<div className="container">
								<Switch>
									<Route exact path="/" component={News} />
									<Route path="/tours" component={Tour} />
									<Route path="/media/:album/*" component={notFound}></Route>
									<Route path="/media/:album" component={Album}></Route>
									<Route path="/media" component={Media}></Route>
									<Route path="/shop" component={Shop} />
									<Route component={notFound}></Route>
								</Switch>
							</div>
							<Footer />
						</div>
					</Router>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
