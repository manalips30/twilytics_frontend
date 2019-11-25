import React, { Component } from "react";
import Form from "./Form";
import Contacts from "./components/contacts";
import "./App.css";


class App extends Component {
  state = {
    searchKey: "",
    fields: {},
    contacts :[
    ]
  };

//http://localhost:8080/list?name=Donald

  componentDidMount() {

  }

  onChange = updatedValue => {
    this.setState({
        searchKey: updatedValue
    });
  };

  //http://twilytics.us-east-2.elasticbeanstalk.com/list?name=donald  

  onSearch = (search) => {
    fetch(`http://twilytics.us-east-2.elasticbeanstalk.com/list?name=${search}`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
    })
    .catch(console.log)
      this.setState({
          searchKey: ""
      })
  };

  render() {
    const  {searchKey} = this.state;
    return (
      <div className="App">
        <Form onChange={this.onChange} onSearch={this.onSearch} />
        <Contacts contacts={this.state.contacts} searchKey={searchKey}/>
      </div>
    );
  }
}

export default App;