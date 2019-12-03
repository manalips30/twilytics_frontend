import React, { Component } from "react";
import Form from "./Form";
import Contacts from "./components/contacts";
import Filter from "./components/filter";
import Chart from "./components/Chart";
import News from "./components/News";
import {BrowserRouter as Router, Link, NavLink, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import "./App.css";
import "./logo.svg";

class App extends Component {
  state = {
    searchKey: "",
    fields: {},
    contacts :[]
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
      this.setState({analyse:true})
      console.log(this.state.contacts)
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
      <Router>
      <div className="App">
      <ul>
        <li>
        <NavLink to="" exact activeStyle = {
          {color:'green'}
        }>Home</NavLink>
        </li>
        <li>
        <NavLink to="/analyse"  exact activeStyle = {
          {color:'green'}
        }>Analyse</NavLink>
        </li>
      </ul>
      <Route path="/" exact strict render = {
        () => {
          return (
          <div className = "App">
          <Form onChange={this.onChange} onSearch={this.onSearch} />
          <Contacts contacts={this.state.contacts} searchKey={searchKey}/>
          <Filter onDate={this.onDate} />
          <News chartData={this.state.contacts}/>

          </div>
          )
        }
       } />
      <Route path="/analyse" exact strict render = {
        () => {
         return (
          <div className = "App">
            <Chart chartData={this.state.contacts} />
            </div>
          )
        }
      } />
      </div>
      </Router>
    );
  }
}

export default App;