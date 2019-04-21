import React, { Component } from 'react';
import { getNews } from '../../actions/nonauth/getNews'
import { connect } from 'react-redux'
//  import { Link } from 'react-router-dom'

const mapStateToProps = state => {
    return {
        messages: state.getNewsReducer.messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getNews: () => dispatch(getNews())
    }
}

class News extends Component {
    componentDidMount = () => {
        this.props.getNews()
    }
    render() {
        console.log('render', this.props.messages)
        return (
            <div className="News">
                <div className="news-wrapper">
                    <div className="main">
                        {
                            !this.props.messages ?
                                <div className="loading">Loading...</div>
                                :
                                <ul className="messages">
                                    {this.props.messages.map((elem) => {
                                        return (
                                            <li>
                                                <div className="user"><img src={`http://localhost:8080/${elem.img}`} alt="" /></div>
                                                <div className="text"><p>{elem.message}</p></div>
                                            </li>
                                        )
                                    })}
                                </ul>
                        }
                    </div>
                    <div className="sidebar"></div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News);