import React, { Component } from 'react'
import API from '../../services/api';

export default class EditModal extends Component {
    state = {
        name: "",
        isFileUploaded: false,
        file: ''
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
    sendFile = e => {
        e.preventDefault()
        if (this.state.file !== '' && this.state.name !== '') {
            let formData = new FormData();
            formData.append('name', this.state.name);
            formData.append('file', this.state.file);
            API.post('/adminactions/create/media/download', formData).then(result => {
                this.props.getMedia(result)
                this.props.close()
            })
        } else {
            console.log("no")
        }
    }
    render() {
        const { edit, close } = this.props
        return (
            <div className={`EditModal ${edit ? 'openmodal' : ''}`}>
                <div className="wrappermodal">
                    <div className="close" onClick={close}>⌦</div>
                    <form onSubmit={e => this.sendFile(e)}>
                        <div className="input-wrapper">
                            <input type="text" name="name" placeholder="input name for new album" value={this.state.name} onChange={this.setChanges}></input>
                        </div>
                        <div className="desc">
                            <div className="short-line"></div>
                            <p>You have to upload almost one picture</p>
                            <div className="short-line"></div>
                        </div>
                        <div className="file_label_wrapper">
                            <input type="file" id="file" name="file" onChange={this.setChanges} style={{ display: 'none' }} />
                            <label id="file_label" htmlFor="file" >
                                {this.state.isFileUploaded ?
                                    'Your file is ' + this.state.file.name
                                    : 'Click here to upload the file'}
                            </label>
                        </div>
                        <button type="submit">submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
