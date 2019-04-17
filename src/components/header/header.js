import React, { Component } from 'react';
//import { Link } from 'react-router-dom'

class Header extends Component {
    state = {
        nav: [
            "news", "nours", "nedia"
        ]
    }
    render() {
        return (
            <header className="Header">
                <div className="header-wrapper">
                    <div className="logo">
                        <img src="http://localhost:8080/My_Chemical_Romance_logo1.png" alt="" />
                    </div>
                    <nav>
                        <ul>
                            {this.state.nav.map((item, id) => {
                                return (
                                    <li className={`item ${id === this.state.nav.length - 1 ? 'last' : ''}`}>
                                        {/* <Link to={`/${item === "news" ? '':item}`}>{item}</Link> */}
                                        {item}
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;