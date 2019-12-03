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

        var count = 0
        var people = [];
        var news = [];
        var urls = []
        for(var i = 0; i < this.props.chartData.length - 1; i++) {
            if(count < 10) {
            var obj = this.props.chartData[i];
            if(obj["numberOfArticles"] > 0) {
             news = obj.news;
             urls = obj.news_url;

                for (var j =0 ; j<5; j++) {
                    if(news[j] != null) {
                        count = count + 1
                        people.push({
                            news: news[j],
                            url: urls[j]
                        });
                    }
                }
        }
    }
    }

    if(count < 10) {
        alert("No news articles found")
    }
    this.setState({
        people : people})

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
                 <news_cardWrapper className="link_button" onClick={()=> window.open(`${person.url}`)} > {person.news} </news_cardWrapper>
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