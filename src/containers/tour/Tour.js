import React, { Component } from 'react';
import { getTours } from '../../actions/nonauth/getTour'
import { connect } from 'react-redux'
import BuyTicketsModal from './buy/BuyTicketsModal';


const mapStateToProps = state => {
    return {
        tour: state.getToursReducer.tours
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTours: () => dispatch(getTours())
    }
}

class Tour extends Component {
    state = {
        today: [],
        open: false,
        city: {}
    }

    componentDidMount() {
        this.props.getTours()
        let date = new Date()
        let month = date.toLocaleString('en-us', { month: 'long' });
        console.log(date.getDate())
        let day = date.getDate()
        let today = [day, month]
        console.log(today)
        this.setState({ today })
        //console.log(this.props.tour[0])
        // this.props.tour[0] && console.log(today === this.props.tour[0].cities[0].date)
    }

    calcDate = (day, today) => {
        console.log(day.date[0])
        let a = day.date[0]
        console.log(a)
        let today1 = today
        return a < today1;
    }

    buyTicket = (city) => {
        city.date[0] > this.state.today[0] && this.setState({ open: true, city })
    }

    render() {
        console.log(this.state)
        console.log(this.props)
        //this.props.tour[0] && this.state.today[0] && console.log(this.state.today[0] === this.props.tour[0].cities[1].date[0])
        const { today } = this.state
        const { tour } = this.props
        return (
            <div className="Tour">
                <div className="bg-wrapper">
                    <div className="tour-wrapper">
                        {/* <div className="when">
                            {tour.cities &&
                                tour.cities.find((day) => {
                                    if (day.date[0] > today[0])
                                        return today[0] - day.date[0]
                                })} days left
                    </div> */}
                        <div className="coming">coming soon</div>
                        <h1 className="name">{tour.name}</h1>
                        <div className="line"></div>
                        <ul className="list">
                            {
                                tour.cities &&
                                tour.cities.map(city => {
                                    return <li
                                        className={`${city.date[0] < this.state.today[0] && 'was'}`}
                                        onClick={() => this.buyTicket(city)}>
                                        {city.city}
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <BuyTicketsModal
                        open={this.state.open}
                        close={() => this.setState({ open: false })}
                        city={this.state.city}
                        name={tour.name}
                    />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tour);