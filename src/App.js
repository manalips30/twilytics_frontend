import React, { Component } from "react";
import Form from "./Form";
import Contacts from "./components/contacts";
import Filter from "./components/filter";
import Chart from "./components/Chart";
import "./App.css";


class App extends Component {
  state = {
    searchKey: "",
    fields: {},
    contacts :[],
  };

//http://localhost:8080/list?name=Donald

  onChange = updatedValue => {
    this.setState({
        searchKey: updatedValue
    });
  };

  //http://twilytics.us-east-2.elasticbeanstalk.com/list?name=donald  


  onSearch = async(search) => {
    await fetch(`http://localhost:8080/list?name=${search}`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
    })
    .catch(console.log)
      this.setState({
          searchKey: ""
      })
  };

  onDate = (startDate, endDate) => {
    console.log("onDate called")
    fetch('http://localhost:8080/list?name=Donald')
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
    })
    .catch(console.log)
  }

  render() {
    const  {searchKey} = this.state;
    return (
      <div className="App">
        <Form onChange={this.onChange} onSearch={this.onSearch} />
        <Contacts contacts={this.state.contacts} searchKey={searchKey}/>
        <Filter onDate={this.onDate} />
        <Chart chartData={this.state.contacts} />
      </div>
    );
  }
}

export default App;