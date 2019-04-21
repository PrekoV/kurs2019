import React, { Component } from 'react';
//  import { Link } from 'react-router-dom'

class Header extends Component {
    state = {
        nav: [
            "news", "", "tours", "", "media", "", "shop"
        ]
    }
    render() {
        return (
            <header className="Header">
                <div className="header-wrapper">
                    <div className="logo">
                        <img src="http://localhost:8080/logo1.jpg" alt="" />
                    </div>
                    <nav>
                        <ul>
                            {this.state.nav.map((item, id) => {
                                return (
                                    <li className={`${id % 2 === 0 ? 'item' : 'line'}`}>
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