import React from 'react'
import "./location_filter.css"; 

export default class Location_filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            location_check: false,
        }
    }
    onLocationChanged(e){
        this.setState({location_check: !this.state.location_check});
    };

    render = () => {
        return (
            <div>
            <input type="checkbox" name="Location" checked={this.state.location_check} onChange={e => this.onLocationChanged(e)}/> Location <br/>
            </div>
        )
      }
}