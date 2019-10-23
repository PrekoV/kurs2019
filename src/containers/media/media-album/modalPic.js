import React, { Component } from 'react'

export default class ModalPic extends Component {
    render() {
        return (
            <div className="modalPic">
                <div className="pic">
                    <div className="close" onClick={this.props.close}>⌦</div>
                    <img src={`http://localhost:8080/${this.props.img}`} alt="" />
                </div>
            </div>
        )
    }
}
