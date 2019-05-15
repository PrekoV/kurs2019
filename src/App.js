import React, { Component } from "react";
import Header from "./components/header/header";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { history } from "./store";
import { connect } from "react-redux";
import News from "./containers/news/News";
import Tour from "./containers/tour/Tour.js";
import Media from "./containers/media/Media";
import Shop from "./containers/shop/Shop";
import Footer from "./components/footer/footer";
import Album from "./containers/media/media-album/album";
import notFound from "./notFound";
import AuthForm from "./containers/auth/authForm";
import {registered} from "./actions/auth/auth"
import { withRouter } from 'react-router'

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.isAuth
    };
};

const mapDispatchToProps = dispatch => {
    return {
       // getMedia: () => dispatch(getMedia())
        //	getProdOne: (name) => dispatch(getProdOne(name))
        registered: () => dispatch(registered())
    };
};

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
	<Route {...rest} render={() => (isAuth? <Component /> : <Redirect to='/' />)} />
)

class App extends Component {
    componentDidMount = () => {
        localStorage.getItem("id") && localStorage.getItem("token") && this.props.registered()
    }
    render() {
        console.log(this.props)
        return (
            <div className="App">
                <div className="container-wrapper">
                    <Router history={history}>
                        <Switch>
                        <Route path="/adminpanel/login" component={AuthForm} />
                        {/* <PrivateRoute path="/adminpanel/purchases" component={}/> */}
                            <Router history={history}>
                                <div>
                                    <Header />
                                    <div className="container">
                                        <Switch>
                                            <Route
                                                exact
                                                path="/"
                                                component={News}
                                            />
                                            <Route
                                                path="/tours"
                                                component={Tour}
                                            />
                                            <Route
                                                path="/media/:album/*"
                                                component={notFound}
                                            />
                                            <Route
                                                path="/media/:album"
                                                component={Album}
                                            />
                                            <Route
                                                path="/media"
                                                component={Media}
                                            />
                                            <Route
                                                path="/shop"
                                                component={Shop}
                                            />
                                            <Route component={notFound} />
                                        </Switch>
                                    </div>
                                    <Footer />
                                </div>
                            </Router>
                            <Route component={notFound} />
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
