import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends Component {
    state = {
        contacts: [
            {
                link: "https://facebook.com/MyChemicalRomance",
                text: "Facebook"
            },
            {
                link: "https://twitter.com/mcrofficial",
                text: "Twitter"
            },
            {
                link: "https://youtube.com/mychemicalromance",
                text: "YouTube"
            }
        ]
    }
    render() {
        return (
            <footer className="Footer">
                <div className="footer-wrapper">
                    <ul>
                        {
                            this.state.contacts.map(cont => {
                                return (
                                    <li>
                                        <a href={cont.link}>{cont.text}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="created">© Created by Victoria Predko, НУЗП, КНТ-516</div>
                </div>
            </footer>
        )
    }
}
