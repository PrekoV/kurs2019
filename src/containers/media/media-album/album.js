import React, { Component } from 'react'
import { getOneMedia } from '../../../actions/nonauth/getMedia'
import { connect } from 'react-redux'
import ModalPic from './modalPic';


const mapStateToProps = state => {
    return {
        media: state.getMediasReducer.media,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOneMedia: (id) => dispatch(getOneMedia(id)),
    }
}

class Album extends Component {

    state = {
        selected: "",
        open: false
    }
    componentDidMount() {
        // console.log(this.props.location.pathname.split("/")[this.props.location.pathname.split("/").length - 1])

        this.props.getOneMedia(this.props.match.params.album)
    }

    close = () => {
        this.setState({ open: false, selected: "" })
    }

    render() {
        console.log(this.props)
        const { media } = this.props
        return (
            <div className="Album">
                <div className="bg-wrapper">
                    <div className="wrapper">
                        {media.name ?
                            <>
                                <div className="name-wrapper">
                                    <div className="short-line"></div>
                                    <div className="name">{media.name}</div>
                                    <div className="short-line"></div>
                                </div>
                                <div className="album">
                                    {media.pics.map((pic, id) => {
                                        return (
                                            <div key={id} className="pic" onClick={() => this.setState({ selected: pic, open: true })}>
                                                <img src={`http://localhost:8080/${pic}`} alt="" />
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                            : <div>No album like that</div>
                        }
                        {
                            this.state.selected &&
                            <ModalPic close={this.close} img={this.state.selected} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album)
