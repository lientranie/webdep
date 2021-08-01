import React from 'react'

class PlacesCard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {items: []}
        }   

    componentDidMount() {
        console.log(this.props.clickedItem)
        this.FetchData(this.props.clickedItem)
    }

    FetchData = (category) => {
        fetch('/api/v2/queryplaces', {
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
        if(prevProps.clickedItem !== this.props.clickedItem) {
        this.FetchData(this.props.clickedItem);}
      }

    render() {
        return (
        <div className="ui four column grid" style={{"height":"700px", "overflow-y": "scroll", "overflow-x": "hidden", 'margin-left':'auto','margin-right':'auto'}} > 
                    {this.state.items.map((menuItem) => {
                        const { name, street_address, postal_code, locality,tags ,description_intro, description_body,image_url, openStatus,openTime} = menuItem;
                        return (
                        <ul>
                            <div className = "ui link cards">
                                <div className="card" style={{"width":"400px", "height":"400px","overflow-y": "scroll", "overflow-x": "hidden"}}> 
                                    <div class="image">
                                        <img src={image_url}/>
                                    </div>                           
                                    <div className="content">
                                        <div className="header">{name} </div>
                                        <div className="meta">
                                            <p> 
                                            <i className= 'map marker alternate icon'/>
                                                {' '}{street_address}, {postal_code}, {locality} 
                                            </p>
                                                </div>
                                                <div className="extra content">
                                        <br/>                                       
                                            <div className="ui primary button">
                                                <i className="check icon"></i>
                                                Open status: {openStatus} 
                                                <p>{openTime}</p>
                                            </div>                                                
                                        </div>
                                        
                                        <div className="description">                                            
                                            <p>{description_intro}</p>
                                            <p>{description_body}</p>
                                            <p>Tags: {tags}</p>
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


export default PlacesCard
