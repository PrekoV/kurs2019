import React, { Component } from 'react'

export default class Content extends Component {
    submit = e => {
        e.preventDefault()
    }
    render() {
        console.log(this.props.product)
        const { product } = this.props
        return (
            <div className="Content">
                <div className="content-wrapper">
                    {product.name &&
                        product.list.map(prod => {
                            return (
                                <form onSubmit={this.submit}>
                                    <div className="one">
                                        <div className="img">
                                            <img src={`http://localhost:8080/${prod.img}`} alt="" />
                                        </div>
                                        <div className="name">{prod.name}</div>
                                        <div className="detail-wrapper">
                                            {prod.desc ? <div className="fabric">
                                                <span>{prod.desc.fabric}</span>, {" "}
                                                <select name={prod.name} id="">
                                                    {
                                                        prod.desc.size.map(size => {
                                                            return (
                                                                <option value={size}>{size}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                                : <div />}
                                            <button type="submit"><span>{prod.price}$</span></button>
                                        </div>
                                    </div>
                                </form>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
