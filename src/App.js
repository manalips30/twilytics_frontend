import React, { Component } from "react";
import Form from "./Form";
import Contacts from "./components/contacts";
import Filter from "./components/filter";
import Chart from "./components/Chart";
import News from "./components/news";
import Facets from "./components/facets";
import {BrowserRouter as Router, Link, NavLink} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import "./App.css";


class App extends Component {
  state = {
    searchKey: "",
    fields: {},
    contacts :[],
    facets:{"poiName":[],
    "lang":[],
    "hashtags":[],
    "mentions":[],
    "userLocation":[],
    "additionalProperties":{}}
    };

//http://localhost:8080/list?name=Donald

  onChange = updatedValue => {
    this.setState({
        searchKey: updatedValue
    });
  };

  //http://twilytics.us-east-2.elasticbeanstalk.com/list?name=donald 

   componentDidMount = async() => {
     await fetch('http://localhost:8080/fetch/fields?name=')
    .then(res => res.json())
     .then((data) => {
       this.setState({ facets: data })
     })
     .catch(console.log)
     console.log(this.state.facets)
   }

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
    this.onFacet(search)  
  };

  onFacet = async(query) => {
    await fetch(`http://localhost:8080/fetch/fields?name=${query}`)
    .then(res => res.json())
    .then((data) => {
     this.setState({ facets: data })
    })
    .catch(console.log)
    console.log("onFacetcalled" + query)
  };

  onFilter = async(query) => {
    console.log(query)
    await fetch('http://localhost:8080/query/facet?name=', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: query
    }).then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
    })
    .catch(console.log)
    console.log("onFiltercalled")
  }

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
            <div className = "App-components" > 
              <Filter onDate={this.onDate} />
              <Facets facets={this.state.facets} onFacet={this.onFacet} onFilter={this.onFilter}/> 
              <Contacts contacts={this.state.contacts} searchKey={searchKey}/>
              <News contacts={this.state.contacts}/>
            </div>
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