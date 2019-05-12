import React, { Component } from 'react';
import { getMedia } from '../../actions/nonauth/getMedia'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const mapStateToProps = state => {
    return {
        medias: state.getMediasReducer.medias,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMedia: () => dispatch(getMedia())
    }
}

class Media extends Component {
    componentDidMount() {
        this.props.getMedia()
    }

    render() {
        console.log(this.props.media)
        const { medias } = this.props
        return (
            <div className="Media">
                <div className="bg-wrapper">
                    <div className="content-wrapper">
                        {medias[0] &&
                            medias.map(alboum => {
                                return (
                                    <div className="alboum">
                                        <div className="name-wrapper">
                                            <div className="short-line"></div>
                                            <div className="name">{alboum.name}</div>
                                            <div className="short-line"></div>
                                        </div>
                                        <div className="pics-wrapper">
                                            {
                                                alboum.pics.slice(0, 4).map(pic => {
                                                    return (
                                                        <div className="pic">
                                                            <img src={`http://localhost:8080/${pic}`} alt="" />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="show-more">
                                            <button>
                                                <Link to={`/media/${alboum._id}`}>
                                                    show more
                                                </Link>
                                            </button>
                                        </div>
                                        <div className="line"></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Media);