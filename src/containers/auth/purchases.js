import React, { Component } from "react";
import API from "../../services/api";
import { withRouter } from "react-router";
import BuyProduct from "../shop/buy/buy";
import AuthHeader from "../../components/header/authHeader";

class Purchases extends Component {
    state = {
        purchases: [],
        edit: false,
        name: "",
        tel: "",
        address: "",
        size: "",
        purchase: {},
        _id: ""
    };
    componentDidMount() {
        API.get("purchases/").then(res => {
            this.setState({ purchases: res.data });
        });
    }

    submitOrEdit = item => {
        if (this.state.edit) {
            if (
                this.state.name !== item.name ||
                this.state.tel !== item.tel ||
                this.state.address !== item.address ||
                this.state.size !== item.size
            ) {
                let prod = {
                    _id: this.state.purchase._id,
                    name: this.state.name
                        ? this.state.name
                        : this.state.purchase.name,
                    tel: this.state.tel
                        ? this.state.tel
                        : this.state.purchase.tel,
                    address: this.state.address
                        ? this.state.address
                        : this.state.purchase.address,
                    size: this.state.size
                        ? this.state.size
                        : this.state.purchase.size
                };
                console.log(prod);
                API.put("/adminactions/purchases", prod).then(res => {
                    // this.setState({ edit: false });
                    API.get("purchases/").then(res => {
                        this.setState({ purchases: res.data, edit: false });
                    });
                });
            } else {
                this.setState({ edit: false });
            }
        } else {
            this.setState({
                edit: true,
                purchase: item,
                name: item.name,
                tel: item.tel,
                address: item.address,
                size: item.size,
                _id: item._id
            });
        }
    };
    change = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    delete = item => {
        let _id = { _id: item._id }
        console.log(_id)
        API.delete("/adminactions/purchases/" + item._id, _id).then(res => {
            console.log(res)
            API.get("purchases/").then(res => {
                this.setState({ purchases: res.data, edit: false });
            });
        })
    }
    render() {
        console.log(this.state);
        return (
            <div className="Purchases">
                <AuthHeader />
                <div className="purchases-wrapper">
                    {this.state.purchases.map(item => {
                        return (
                            <div className="purchase">
                                <div className="info">
                                    <div className="img-wrapper">
                                        <img
                                            src={`http://localhost:8080/${
                                                item.img
                                                }`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="details">
                                        <p>
                                            Product: <span>{item.product}</span>
                                        </p>
                                        <p>
                                            Size:{" "}
                                            {this.state.edit &&
                                                this.state._id === item._id ? (
                                                    <div className="input-wrapper">
                                                        <input
                                                            type="text"
                                                            name="size"
                                                            value={this.state.size}
                                                            onChange={this.change}
                                                        />
                                                    </div>
                                                ) : (
                                                    <span>{item.size}</span>
                                                )}
                                        </p>
                                        <p>
                                            Buyer:{" "}
                                            {this.state.edit &&
                                                this.state._id === item._id ? (
                                                    <div className="input-wrapper">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={this.state.name}
                                                            onChange={this.change}
                                                        />
                                                    </div>
                                                ) : (
                                                    <span>{item.name}</span>
                                                )}
                                        </p>
                                        <p>
                                            Address:
                                            {this.state.edit &&
                                                this.state._id === item._id ? (
                                                    <div className="input-wrapper">
                                                        <input
                                                            type="address"
                                                            name="address"
                                                            value={
                                                                this.state.address
                                                            }
                                                            onChange={this.change}
                                                        />
                                                    </div>
                                                ) : (
                                                    <span>{item.address}</span>
                                                )}
                                        </p>
                                        <p>
                                            Telephone:{" "}
                                            {this.state.edit &&
                                                this.state._id === item._id ? (
                                                    <div className="input-wrapper">
                                                        <input
                                                            type="tel"
                                                            name="tel"
                                                            value={this.state.tel}
                                                            onChange={this.change}
                                                        />
                                                    </div>
                                                ) : (
                                                    <span>{item.tel}</span>
                                                )}
                                        </p>
                                        <p>
                                            Price: <span>{item.price}$</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="wrapper-methods">
                                    <div className="methods">
                                        <button
                                            onClick={() =>
                                                this.submitOrEdit(item)
                                            }
                                        >
                                            {this.state.edit ? "Save" : "Edit"}
                                        </button>
                                        <button onClick={() => this.delete(item)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default withRouter(Purchases);
