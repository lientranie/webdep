import React from 'react'

class EventCard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {items: []}
        }   

    componentDidMount() {
        console.log(this.props.clickedEvent)
        this.FetchData(this.props.clickedEvent)
    }

    FetchData = (category) => {
        fetch('/api/v1/queryevents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: category
            })
        }).then(
            res => res.json()
        ).then(
            data => this.setState({
                items: data.result
            })
        )
    } 
    componentDidUpdate(prevProps) {
        if(prevProps.clickedEvent!== this.props.clickedEvent) {
        this.FetchData(this.props.clickedEvent);}
      }

    render() {
        return (
        <div className="ui horizontal segments" style={{ "overflow-x": "scroll", "overflow-y": "hidden", 'margin-left':'auto','margin-right':'auto'}} > 
                    {this.state.items.map((menuItem) => {
                        const {id, name, location, description, event_starting_day, event_ending_day,image_url, } = menuItem;
                        return (
                        <ul>
                            <div className = "ui link cards">
                                <div className="card" style={{"width":"400px", "height":"400px","overflow-y": "scroll", "overflow-x": "hidden"}}> 
                                    <div class="image">
                                        <img src={image_url}/>
                                    </div>                           
                                    <div className="content">
                                        <div className="header">{name.fi} </div>
                                        <div className="meta">
                                            <p> 
                                            <i className= 'map marker alternate icon'/>
                                                {' '}{location.address.street_address}, {location.address.postal_code}, {location.address.locality} 
                                            </p>
                                                </div>
                                                <div className="extra content">
                                        <br/>
                                            <div className="ui primary button">
                                                <i className="info icon"></i>
                                               Event starts: {event_starting_day} 
                                                <p>Event ends: {event_ending_day} </p> 
                                            </div>
                                        </div>
                                        <div className="description">                                            
                                            <p>{description.intro}</p>
                                            <p>{description.body}</p>
                                            <p>Event id: {id}</p>
                                        </div>
                                    </div>                              
                                </div>
                            </div>
                        </ul>  
                        );
                        } )}
            </div>
    )
    }

}


export default EventCard
