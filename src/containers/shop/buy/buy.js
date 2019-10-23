import React, { Component } from "react";
import API from "../../../services/api";
import { throws } from "assert";
class BuyProduct extends Component {
    state = {
        fn: "",
        ln: "",
        address: "",
        message: "",
        tel: ""
    };
    changeInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    submit = e => {
        e.preventDefault();
        if (this.state.fn && this.state.ln && this.state.address) {
            API.post("purchases/send", {
                name: `${this.state.fn} ${this.state.ln}`,
                product: this.props.purchase.product,
                size: this.props.purchase.size,
                img: this.props.purchase.img,
                price: this.props.purchase.price,
                address: this.state.address,
                tel: `${this.state.tel}`
            })
                .then(res => {
                    this.setState({ message: "" });
                    this.props.close();
                })
                .catch(e => {
                    this.setState({ message: "Failed!" });
                });
        } else {
            this.setState({ message: "You have to fill all information!" });
        }
    };
    render() {
        const { open, purchase } = this.props;
        console.log(this.props);
        console.log(this.state);
        return (
            <div className={`${open ? "BuyProduct" : ""}`}>
                {open && (
                    <div className="modal">
                        <div
                            className="close"
                            onClick={() => {
                                this.props.close();
                                this.setState({ message: "" });
                            }}
                        >
                            ⌦
                        </div>
                        <div className="modal-wrapper">
                            <div className="prod-info">
                                <div className="img-wrapper">
                                    <img
                                        src={`http://localhost:8080/${
                                            purchase.img
                                        }`}
                                        alt=""
                                    />
                                </div>
                                <div className="details">
                                    <p>
                                        Product: <span>{purchase.product}</span>
                                    </p>
                                    <p>
                                        Size: <span>{purchase.size}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="user">
                                <form onSubmit={this.submit}>
                                    <div className="input-wrapper">
                                        <input
                                            value={this.state.fn}
                                            placeholder="Your first name"
                                            name="fn"
                                            type="text"
                                            onChange={this.changeInput}
                                        />
                                    </div>
                                    <div className="input-wrapper">
                                        <input
                                            value={this.state.ln}
                                            placeholder="Your last name"
                                            name="ln"
                                            type="text"
                                            onChange={this.changeInput}
                                        />
                                    </div>
                                    <div className="input-wrapper">
                                        <input
                                            value={this.state.address}
                                            placeholder="Your address"
                                            name="address"
                                            type="text"
                                            onChange={this.changeInput}
                                        />
                                    </div>
                                    <div className="input-wrapper">
                                        <input
                                            value={this.state.tel}
                                            placeholder="Your telephone: XXXXXXXXXX"
                                            name="tel"
                                            maxLength="10"
                                            type="tel"
                                            onChange={this.changeInput}
                                        />
                                    </div>
                                    <button>Buy: {purchase.price}$</button>
                                    <div className="message">
                                        {this.state.message
                                            ? this.state.message
                                            : ""}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default BuyProduct;
