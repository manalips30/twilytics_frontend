import React from 'react'

export default class Verified_filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            verified_check: false,
        }
    }
    onVerifiedChanged(e){
        this.setState({verified_check: !this.state.verified_check});
    };

    render = () => {
        return (
            <div>
            <input type="checkbox" name="Verified" checked={this.state.verified_check} onChange={e => this.onVerifiedChanged(e)}/> Verified <br/>
            </div>
        )
      }
}