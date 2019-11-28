import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Bar, Line, Pie, Doughnut} from 'react-chartjs-2';
import App from '../App';

class Chart extends React.Component {
    state = {
      chartData: {},
      location_chartData: {},
      date_charData: {},
      sentiment_chartData : {}
    };

    static defaultProps = {
        displayTitle:false,
        displayLegend:true,
        lengendPosition:'right'
    }

    constructor(props){
        super(props);
        this.state = {
       chartData :{}
                    }
    }

    componentDidMount() { 
        this.setState({})
    }

    Processing =  () => {
    
        var lang_dict = {
          "en": 0,
          "fr": 0,
          "hi": 0,
          "ru": 0,
          "pl": 0
        };

        var loc_dict = {
            "California": 4,
            "Boston": 3,
            "Washington DC": 1,
            "New Delhi": 6
        };

        var sentiment_dict = {
            "Positive": 0,
            "Negative": 0,
            "Neutral": 0,
        };

        var date_dict = {};
    
        for(var i = 0; i < this.props.chartData.length; i++) {
          var obj = this.props.chartData[i];
            if (obj.lang in lang_dict){
                lang_dict[obj.lang] = lang_dict[obj.lang] + 1;
            }

            if (obj["user.location"] in loc_dict) {
                loc_dict[obj["user.location"]] = loc_dict[obj["user.location"]] + 1;
            }
            
            if (obj["user.sentiment"] in sentiment_dict) {
             sentiment_dict[obj["sentiment"]] = sentiment_dict[obj["sentiment"]] + 1;
            }

            var date = String(obj["created_at"]).split(" ");;
            var monthDict={'Jan':1, 'Feb':2, 'Mar':3, 'Apr':4, 'May':5, 'Jun':6, 'Jul':7, 'Aug':8, 'Sep':9, 'Oct':10, 'Nov':11, 'Dec':12};
            var temp = date[5] + "-" + monthDict[String(date[1])] + "-" + date[2];
            date = new Date(temp);

            if (date in  date_dict) {
            date_dict[date] = date_dict[date] + 1;
            }
            else {
            date_dict[date] = 1;
            }
        }   

        var lang_keys = []
        var lang_values = []
        var loc_keys = []
        var loc_values = []
        var date_keys = []
        var date_values = []
        var sentiment_keys = []
        var sentiment_values = []

        for(var key in lang_dict)  { 
            lang_keys.push( key );
            lang_values.push(lang_dict[key]);
        }

        for(var key in loc_dict)  { 
            loc_keys.push( key );
            loc_values.push(loc_dict[key]);
        }

        for(var key in date_dict)  { 
            date_keys.push( key );
            date_values.push(date_dict[key]);
        }

        for(var key in sentiment_dict)  { 
            sentiment_keys.push( key );
            sentiment_values.push(sentiment_dict[key]);
        }

    this.setState({
        chartData : {
        labels : lang_keys,
        datasets:[
            {
                label : "Language",
                data: lang_values,
                backgroundColor:  ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "FCCE56"],
            }
        ],
    }
    })

    this.setState({
        location_chartData : {
        labels : loc_keys,
        datasets:[
        {
            label : 'Location',
            data: loc_values,
            backgroundColor: ['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF']
        }],
        }
    })

    this.setState({
        date_chartData : {
        labels : date_keys,
        datasets:[
        {
            label : 'Time series',
            data: date_values,
            borderColor: "#8e5ea2",
            fill: false,
            backgroundColor: ['#a8e0ff'],
        }]   
        }
        })

    this.setState({
        sentiment_chartData : {
        labels : sentiment_keys,
        datasets:[
            {
                label : 'Sentiment Analysis',
                data: sentiment_values,
                borderColor: "#8e5ea2",
                fill: false,
                backgroundColor: ['#a8e0ff'],
            }]   
        }
    })
    }
    
    onSubmit = async () => {
      await this.Processing();
    };
    
    render(){
            return (
            <div className="chart">
            <button className="buttonClass" onClick={ this.onSubmit}>Analyse</button> 
            <Doughnut
                    data={this.state.chartData}
                    width= {20}
                    height={10}
                    postion="left"
                    options={{
                        title:{
                            display:this.props.displayTitle,
                            text:'Languages',
                            fontSize:20
                        },
                        lengend:{
                            display:this.props.displayLegend,
                            positon:this.props.lengendPosition
                        },
                    animationEnabled : true,
                    theme: "dark2"
                    }}
            />
            <Pie
                    data={this.state.location_chartData}
                    width={20}
                    height={10}
                    postion="left"
                    options={{
                        title:{
                            display:this.props.displayTitle,
                            text:'Location',
                            fontSize:20
                        },
                        lengend:{
                            display:this.props.displayLegend,
                            positon:this.props.lengendPosition
                        },
                        animationEnabled : true,
                        theme: "dark1"
                    }}
            />
            <Line
                    data={this.state.date_chartData}
                    width= {5}
                    height={5}
                    postion="left"
                    options={{
                        fill:false,
                        title:{
                            display:this.props.displayTitle,
                            text:'Time series',
                            fontSize:20
                            },
                        lengend:{
                           display:this.props.displayLegend,
                           positon:this.props.lengendPosition
                        },
                        animationEnabled : true,
                        theme: "light2"
                    }}
            />
            <Pie
                    data={this.state.sentiment_chartData}
                    width= {20}
                    height={10}
                    postion="left"
                    options={{
                        title:{
                            display:this.props.displayTitle,
                            text:'Sentiment Analysis',
                            fontSize:20
                        },
                        lengend:{
                            display:this.props.displayLegend,
                            positon:this.props.lengendPosition
                        },
                        animationEnabled : true,
                        theme: "dark2"
                    }}
            />
            </div>
        )
    }
}

ReactDOM.render(<Chart />, document.getElementById("root"));
export default Chart;