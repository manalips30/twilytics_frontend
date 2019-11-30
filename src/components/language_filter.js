import React from 'react'

export default class Language_filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            language_check: false,
        }
    }
    onLanguageChanged(e){
        this.setState({language_check: !this.state.language_check});
    };

    render = () => {
        return (
            <div>
            <input type="checkbox" name="Language" checked={this.state.language_check} onChange={e => this.onLanguageChanged(e)}/> Language <br/>
            </div>
        )
      }
}