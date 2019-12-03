import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Bar, Line, Pie, Doughnut} from 'react-chartjs-2';
import App from '../App';
import "./Chart.css";

class Chart extends React.Component {

    state = {
      chartData: {},
      location_chartData: {},
      date_charData: {},
      sentiment_chartData : {},
    };

    static defaultProps = {
        displayTitle:true,
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

        var lang_dict = {};

        var loc_dict = {};

        var sentiment_dict = {
            "positive": 0,
            "negative": 0,
            "neutral": 0,
        };

        var date_dict = {};

        for(var i = 0; i < this.props.chartData.length; i++) {
            var obj = this.props.chartData[i];

            if (obj.lang in lang_dict){
                lang_dict[obj.lang] = lang_dict[obj.lang] + 1;
            }
            else {
                lang_dict[obj.lang] = 1;
            }

            if(obj["state"] != "null") {
            if (obj["state"] in loc_dict) {
                loc_dict[obj["state"]] = loc_dict[obj["state"]] + 1;
                }
            else {
                    loc_dict[obj["state"]] = 1;
                }
            }
            if (obj.sentiment in sentiment_dict) {
             sentiment_dict[obj.sentiment] = sentiment_dict[obj.sentiment] + 1;
            }

            var date = String(obj.createdAt).split(" ");
            var monthDict={'Jan':1, 'Feb':2, 'Mar':3, 'Apr':4, 'May':5, 'Jun':6, 'Jul':7, 'Aug':8, 'Sep':9, 'Oct':10, 'Nov':11, 'Dec':12};
            var temp = date[5] + "-" + monthDict[String(date[1])] + "-" + date[2];
            //var d = new Date(temp);

            if (temp in  date_dict) {
            date_dict[temp] = date_dict[temp] + 1;
            }
            else {
            date_dict[temp] = 1;
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
                backgroundColor:  ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#a8e0ff"],
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
            backgroundColor: ['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF', '#3e95cd', '#8e5ea2','#3cba9f','#e8c3b9','#c45850', '#a8e0ff']
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
            backgroundColor: '#a8e0ff',
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
                backgroundColor: ['#a8e0ff', '#b08ea2', '#BBB6DF'],
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
                    width= {40}
                    height= {10}
                    postion="left"
                    options={{
                        title:{
                            display:this.props.displayTitle,
                            text:'Language Based Analysis',
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
                    width={40}
                    height={10}
                    postion="left"
                    options={{
                        title:{
                            display:this.props.displayTitle,
                            text:'Location Based Analysis',
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
            <Bar
                    data={this.state.date_chartData}
                    width= {40}
                    height={20}
                    postion="left"
                    options={{
                        fill:false,
                        title:{
                            display:this.props.displayTitle,
                            text:'Time series(Number of tweets)',
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
                    width= {40}
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