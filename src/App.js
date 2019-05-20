import React, { Component } from "react";
import Header from "./components/header/header";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
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
import { registered } from "./actions/auth/auth";
import Purchases from "./containers/auth/purchases";
import MediaEdit from "./containers/auth/albumEdit";
import allAlbum from "./containers/auth/AllAlbum";


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

const PrivateRoute = ({ component: Component, redirectto: RetirectTo, isAuth, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuth ? <Component {...props} /> : <Redirect to={RetirectTo} />
        }
    />
);

class App extends Component {
    componentDidMount = () => {
        this.props.registered();
        // this.props.history.push("/adminpanel/purchases")
    };
    render() {
        console.log(this.props.isAuth);
        return (
            <div className="App">
                <div className="container-wrapper">
                    <Router history={history}>
                        <Switch>
                            <Route
                                path="/adminpanel/login"
                                component={AuthForm}
                            />
                            <PrivateRoute
                                isAuth={localStorage.getItem("token")}
                                path="/adminpanel/purchases"
                                component={Purchases}
                                redirectto="/adminpanel/login"
                            />
                            <PrivateRoute
                                isAuth={localStorage.getItem("token")}
                                path="/adminpanel/media/:album"
                                component={allAlbum}
                                redirectto="/adminpanel/login"
                            />
                            <PrivateRoute
                                isAuth={localStorage.getItem("token")}
                                path="/adminpanel/media"
                                component={MediaEdit}
                                redirectto="/adminpanel/login"
                            />

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

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
