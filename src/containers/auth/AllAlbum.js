import React, { Component } from 'react'
import { getOneMedia } from '../../actions/nonauth/getMedia'
import { connect } from 'react-redux'
import AuthHeader from '../../components/header/authHeader';
import Footer from '../../components/footer/footer';
import API from '../../services/api';
import ModalPic from '../media/media-album/modalPic';
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

class AllAlbum extends Component {

    state = {
        open: false,
        file: '',
        selected: "",
    }
    componentDidMount() {
        // console.log(this.props.location.pathname.split("/")[this.props.location.pathname.split("/").length - 1])
        // this.props.a()
        // console.log(this.props)
        this.props.getOneMedia(this.props.match.params.album)
    };

    close = () => {
        this.setState({ open: false, selected: "" })
    }

    add = e => {
        e.preventDefault()
        if (this.state.file !== '') {
            let formData = new FormData();
            formData.append('id', this.props.match.params.album);
            formData.append('file', this.state.file);
            API.post('/adminactions/media/download', formData).then(result => {
                this.props.getOneMedia(this.props.match.params.album)
                this.setState({ file: null })
            })
        } else {
            console.log("no")
        }
    }

    delete = pic => {
        API.put("/adminactions/media/download", { id: this.props.match.params.album, pic }).then(res => {
            this.props.getOneMedia(this.props.match.params.album)
        })
    }

    setChanges = e => {
        switch (e.target.name) {
            case 'file':
                this.setState({
                    [e.target.name]: e.target.files[0],
                    isFileUploaded: true
                })
                break
            default: this.setState({ [e.target.name]: e.target.value })
        }
    }

    render() {
        console.log(this.props)
        const { media } = this.props
        return (
            <div className="AllAlbum">
                <AuthHeader />
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
                                            <div key={id} className="pic" >
                                                <div className="delete" onClick={() => this.delete(pic)}>✕</div>
                                                <img onClick={() => this.setState({ selected: pic, open: true })} src={`http://localhost:8080/${pic}`} alt="" />
                                            </div>
                                        )
                                    })}
                                    <div className="last">
                                        <form onSubmit={this.add}>
                                            <>
                                                <input type="file" id="file" name="file" onChange={this.setChanges} style={{ display: 'none' }} />
                                                <label id="file_label" htmlFor="file" >
                                                    <div className="pic add">{this.state.file ? '✔' : "+"}</div>
                                                </label>
                                            </>
                                            <button type="submit">submit</button>
                                        </form>
                                        {/* <div className="pic add" onClick={this.add}>
                                            +
                                        </div>
                                        <button>Submit</button> */}
                                    </div>
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
                <Footer />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAlbum)
