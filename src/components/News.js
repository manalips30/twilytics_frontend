import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import "./news.css";
import "./contacts.css"

class News extends React.Component {
    
    state = {
      chartData: {},
      people : [],
      UrlLink : "No news to Display"
    };

    static defaultProps = {
        displayTitle:true,
        displayLegend:true,
        lengendPosition:'right'
    }

    constructor(props){
   
        super(props);
        this.state = {
        chartData :{},
        UrlLink : "No news to Display"
        }
        this.state = {
            people : [{
                news: "No News",
                url: ""
            }]
        }           
    }

    componentDidMount() { 
        this.setState({})
    }

    Processing =  () => {

        var people = [];
        var news = [];
        var urls = []
        for(var i = 0; i < 5; i++) {
            var obj = this.props.chartData[i];
             news = obj.news;
             urls = obj.news_url;

            if(news != undefined) {
                for (var j =0 ; j<2; j++) {
                    if(news[j] != null) {
                        people.push({
                            news: news[j],
                            url: urls[j]
                        });
                    }
                }
            }
        }
        this.setState({
            people : people})

        this.setState({
            UrlLink : "Go to Link"})
        }
    onSubmit = async () => {
      await this.Processing();
    };

    render(){
            const temp = this.state.WrappedMap
            return (
            <div className="news">
            <div news_button>
            <button className="news_button" onClick={ this.onSubmit}>News</button>
            </div>
            <div className='news_cardWrapper'>
            {this.state.people.map((person, index) => (
            <div className="news_card" key={index}>
                <div className = "card-title">
                 <h5 className="title">{person.news}</h5>
               </div>
               <div className = "card-title">
                 <button className="link_button" onClick={()=> window.open(`${person.url}`)} >{this.state.UrlLink}</button>
               </div>
            </div>
            ))}
            </div>
            </div>
        )
    }
}

ReactDOM.render(<News />, document.getElementById("root"));
export default News;