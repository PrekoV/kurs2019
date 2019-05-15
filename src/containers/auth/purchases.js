import React, { Component } from 'react';
import API from '../../services/api'

class Purchases extends Component {
    state = {
        purchases: {},
        name: "",
        
    }
    submit = e => {
        e.preventDefault()
        API.post('purchases/send', this.state.purchases).then(res => {})
    }
    render() {
        return (
            <div className="Purchases">
                
            </div>
        );
    }
}

export default Purchases;
