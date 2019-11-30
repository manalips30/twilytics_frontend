import React, { Component } from "react";
import Form from "./Form";
import Contacts from "./components/contacts";
import Filter from "./components/filter";
import Chart from "./components/Chart";
import Location_filter from "./components/location_filter"
import Language_filter from "./components/language_filter"
import Verified_filter from "./components/verified_filter"
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
    await fetch(`http://localhost:8080/query/search?name=${search}`)
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
        <Location_filter />
        <Language_filter />
        <Verified_filter />
        <Chart chartData={this.state.contacts} />
      </div>
    );
  }
}

export default App;