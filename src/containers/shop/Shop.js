import React, { Component } from 'react';
import { getProds, getProdOne } from '../../actions/nonauth/getProducts'
import { connect } from 'react-redux'
import Content from '../../components/shop-content/content';
import BuyProduct from './buy/buy';


const mapStateToProps = state => {
    return {
        products: state.getProductsReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProdOne: (name) => dispatch(getProdOne(name)),
        getProds: () => dispatch(getProds())
    }
}

class Shop extends Component {

    state = {
        selected: "t-shirts",
        isOpen: false,
        buy: false,
        product:{}
    }

    componentDidMount() {
        this.props.getProds()
        if (this.state.selected) {
            this.props.getProdOne(this.state.selected)
        }
    }

    setProducts = (item) => {
        if (item !== this.state.selected) {
            this.props.getProdOne(item)
            this.setState({ selected: item, isOpen: false })
        } else {
            this.setState({ isOpen: false })
        }
    }

    buy = (product) => {
        this.setState({buy: true, product})
    }

    close = () => {
        this.setState({buy: false})
    }

    render() {
        console.log(this.props)
        const { products } = this.props
        return (
            <div className="Shop">
                <div className="shop-wrapper">
                    {
                        products.prodList[0] ?
                            <div className="products">
                                <ul className="big">
                                    {
                                        products.prodList.map(prod => {
                                            return (
                                                <li
                                                    key={prod.name}
                                                    className={`${this.state.selected === prod.name ? 'selected' : ''}`}
                                                    onClick={() => this.setProducts(prod.name)}
                                                >
                                                    {prod.name}
                                                    {/* <div className="short-line"></div> */}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="small" onClick={() => this.setState({ isOpen: !this.state.isOpen })}>{this.state.selected}</div>
                                <ul className={`small-ul ${this.state.isOpen ? 'open' : ''}`}>
                                    {
                                        products.prodList.map(prod => {
                                            return (
                                                <li
                                                    key={prod.name}
                                                    className={`small-li ${this.state.selected === prod.name ? 'selected' : ''}`}
                                                    onClick={() => this.setProducts(prod.name)}
                                                >
                                                    {prod.name}
                                                    {/* <div className="short-line"></div> */}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="line"></div>
                                <div className="list">
                                    <Content  buy={this.buy} product={products.product} />
                                </div>
                            </div>
                            : <div className="no-connection">No connection</div>
                    }
                    <div className="line"></div>
                    <BuyProduct purchase={this.state.product} close={this.close} open = {this.state.buy}/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);