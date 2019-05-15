import React, { Component } from "react";

export default class Content extends Component {
    state = {
        size: ""
    };
    submit = (e, name, price) => {
        e.preventDefault();
        // initEvent('on')
        console.log();
        this.props.buy({product: name, price});
    };
    render() {
        console.log(this.state);
        const { product } = this.props;
        return (
            <div className="Content">
                <div className="content-wrapper">
                    {product.name &&
                        product.list.map(prod => {
                            return (
                                <form
                                    onSubmit={e =>
                                        this.submit(e, prod.name, prod.price)
                                    }
                                >
                                    {/* <form onSubmit={this.submit} > */}
                                    <div className="one">
                                        <div className="img">
                                            <img
                                                src={`http://localhost:8080/${
                                                    prod.img
                                                }`}
                                                alt=""
                                            />
                                        </div>
                                        <div className="name">{prod.name}</div>
                                        <div className="detail-wrapper">
                                            {prod.desc ? (
                                                <div className="fabric">
                                                    <span>
                                                        {prod.desc.fabric}
                                                    </span>
                                                    ,{" "}
                                                    <select
                                                        onChange={e =>
                                                            this.setState({
                                                                size:
                                                                    e.target
                                                                        .value
                                                            })
                                                        }
                                                        name={prod.name}
                                                        id=""
                                                    >
                                                        {prod.desc.size.map(
                                                            size => {
                                                                return (
                                                                    <option
                                                                        value={
                                                                            size
                                                                        }
                                                                    >
                                                                        {size}
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                </div>
                                            ) : (
                                                <div />
                                            )}
                                            <button type="submit">
                                                <span>{prod.price}$</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            );
                        })}
                </div>
            </div>
        );
    }
}
