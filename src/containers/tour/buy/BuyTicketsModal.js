import React, { Component } from 'react'

class BuyTicketsModal extends Component {

    render() {
        const { city, open, close, name } = this.props
        return (
            <div className={`BuyTicketsModal ${open ? 'openmodal' : ''}`} >
                {
                    city.date &&
                    <div className="wrappermodal">
                        <div className="close" onClick={close}>⌦</div>
                        <div className="info">
                            <div className="bg">live music</div>
                            <div className="fan-zone">fan zone</div>
                            <div className="name">{name}</div>
                            <div className="band">my chemical romance</div>
                            <div className="short-line"></div>
                            <div className="where-wrapper">
                                <div className="short-line"></div>
                                <div className="where"><span>{city.city}, {city.place}</span></div>
                                <div className="short-line"></div>
                            </div>
                            <div className="short-line"></div>
                            {/* <div className="live">live music</div> */}
                            <div className="details">
                                <div className="when">
                                    {city.date[0]}<sup>th</sup> {city.date[1]}, in {city.time}
                                </div>

                            </div>
                        </div>
                        <div className="price">
                            <span>price</span>
                            <div className="dots" />
                            <span>{city.price}$</span>
                        </div>
                        <button className="buy"><span>get ticket</span></button>
                    </div>
                }

            </div>
        )
    }
};
export default BuyTicketsModal