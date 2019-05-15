import React, { Component } from "react";
import API from "../../../services/api";
class BuyProduct extends Component {
    state = {
        fn: "",
        ln: "",
        address: "",
        message: ""
    };
    changeInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    submit = e => {
        e.preventDefault();
        API.post("purchases/send", {
            name: `${this.state.fn} ${this.state.ln}`,
            product: this.props.product,
            size: this.props.size,
            img: this.props.img,
            price: this.props.price,
            address: this.state.address
        })
            .then(res => {
                this.setState({ message: "Success!" });
            })
            .catch(e => {
                this.setState({ message: "Failed!" });
            });
    };
    render() {
        const { size, price, product, img } = this.props;
        return (
            <div className="BuyProduct">
                <div className="modal">
                    <div className="modal-wrapper">
                        <div className="info">
                            <div className="img-wrapper">
                                <img src={img} alt="" />
                            </div>
                        </div>
                        <div className="details">
                            <p>Product: {product}</p>
                            <p>Size: {size}</p>
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
                                <button>Buy: {price}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BuyProduct;
