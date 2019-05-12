import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo1 from '../../style/logo1.png'

class Header extends Component {
    state = {
        nav: [
            "home", "", "tours", "", "media", "", "shop"
        ],
        isSmall: false
    }
    render() {
        console.log(document.URL.split("/")[document.URL.split("/").length - 1])
        // history
        return (
            <header className="Header">
                <div className="header-wrapper">

                    <nav className="small">
                        <div className="logo">
                            <img src={logo1} alt="" />
                        </div>
                        <div className="wrapper">
                            <div className="show" onClick={() => this.setState({ isSmall: !this.state.isSmall })}>☰</div>
                            <ul className={`show_small ${this.state.isSmall ? 'open' : ''}`}>
                                {
                                    this.state.nav.map((li, id) => {
                                        return (
                                            <li
                                                key={id}
                                                onClick={() => this.setState({ isSmall: false })}
                                                className="item">
                                                <Link to={`/${li === "home" ? '' : li}`}>{li}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                    </nav>

                    <nav className="big">
                        <ul>
                            <li className={`item ${document.URL.split("/")[document.URL.split("/").length - 1] === '' ? 'on' : ''}`}>
                                <Link to="/">home</Link>
                            </li>

                            <li className={`item ${document.URL.split("/")[document.URL.split("/").length - 1] === 'tours' ? 'on' : ''}`}>
                                <Link to="/tours">tours</Link>
                            </li>
                        </ul>
                        <div className="logo">
                            <img src={logo1} alt="" />
                        </div>
                        <ul>
                            <li className={`item ${document.URL.split("/")[document.URL.split("/").length - 1] === 'media' ? 'on' : ''}`}>
                                <Link to="/media">media</Link>
                            </li>

                            <li className={`item ${document.URL.split("/")[document.URL.split("/").length - 1] === 'shop' ? 'on' : ''}`}>
                                <Link to="/shop">shop</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;