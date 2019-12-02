import React from "react";
import "./facets.css";
import cloneDeep from "lodash/cloneDeep";

class Facets extends React.Component {
    state = {
        name: {},
        query: "",
        facet: {
            poiName: [],
            lang: [],
            hashtags: [],
            mentions: [],
            loc: []
        },
        query_1: []
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.facets !== prevState.name) {
            console.log(nextProps.facets);
            return { name: nextProps.facets };
        }
        return null;
    }

    onnameSubmit = (e, fieldValue, fieldName) => {
        const facet = cloneDeep(this.state.facet);

        if (fieldName && fieldValue && facet[fieldName].includes(fieldValue)) {
            const index = facet[fieldName].indexOf(fieldValue);
            if (index > -1) {
                facet[fieldName].splice(index, 1);
            }
        } else  {
            facet[fieldName].push(fieldValue);
        }

        this.setState({
            facet
        });

        this.props.onFilter(JSON.stringify(facet));
    };

    onReset ={
        
    }

    render() {
        const { name, facet } = this.state;
        return (
            <div>
                <div className = "facetCard">
                    <div className="facetWrapper">
                        <h5 className="header">User Name</h5>
                        {name && name.userScreenName ? (
                            <React.Fragment>
                                {name.userScreenName.map(poi_name => {
                                    const checked = facet.poiName.includes(poi_name);
                                    return (
                                        <div className="facetName"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={e => this.onnameSubmit(e, poi_name, "poiName")}
                                            />
                                            <span>{poi_name}</span>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ) : null}
                    </div>
                    <div className="facetWrapper">
                        <h5 className="header">Language</h5>
                        {name && name.lang ? (
                            <React.Fragment>
                                {name.lang.map(poi_lang => {
                                    const checked = facet.lang.includes(poi_lang);
                                    return (
                                        <div className="facetName">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={e => this.onnameSubmit(e, poi_lang, "lang")}
                                            />
                                            <span>{poi_lang}</span>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ) : null}
                    </div>
                    <div className="facetWrapper">
                        <h5 className="header">Hashtags</h5>
                        {name && name.hashtags ? (
                            <React.Fragment>
                                {name.hashtags.map(poi_hashtag => {
                                    const checked = facet.hashtags.includes(poi_hashtag);
                                    return (
                                        <div className="facetName">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={e => this.onnameSubmit(e, poi_hashtag, "hashtags")}
                                            />
                                            <span>{poi_hashtag}</span>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ) : null}
                    </div>
                    <div className="facetWrapper">
                        <h5 className="header">Mentions</h5>
                        {name && name.mentions ? (
                            <React.Fragment>
                                {name.mentions.map(poi_mention => {
                                    const checked = facet.mentions.includes(poi_mention);
                                    return (
                                        <div className="facetName">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={e => this.onnameSubmit(e, poi_mention, "mentions")}
                                            />
                                            <span>{poi_mention}</span>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ) : null}
                    </div>
                    <div className="facetWrapper">
                        <h5 className="header">Location</h5>
                        {name && name.userLocation ? (
                            <React.Fragment>
                                {name.userLocation.map(poi_location => {
                                    const checked = facet.loc.includes(poi_location);
                                    return (
                                        <div className="facetName">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={e => this.onnameSubmit(e, poi_location, "loc")}
                                            />
                                            <span>{poi_location}</span>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ) : null}
                    </div>
                    <div className="facetWrapper">
                        <button className="resetButtonClass" onClick={e => this.onReset(e)}>reset</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Facets;
