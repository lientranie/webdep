import React from 'react'

class NewCard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {items: []}
        }   

    componentDidMount() {
        fetch('/api/v2/queryplaces', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: this.props.clickedItem
            })
        }).then(
            res => res.json()
        ).then(
            data => this.setState({
                items: data.result
            })
        )
    }

    render() {
        return (
        <div className="ui five column grid"> 
            <p>{this.props.clickedItem}</p>
            {this.state.items.map((menuItem) => {
                const { name, street_address, postal_code, locality, } = menuItem;
                 return (
                    <div className = "column">
                        <div className="ui card">                            
                                <div className="content">
                                    <div className="header">{name} </div>
                                    <div className="meta">{street_address}, {postal_code}, {locality} </div>
                                    <div className="description">
                                        <p>{name}</p>
                                    </div>
                                </div>
                            <div className="extra content">
                            <div className="ui two buttons">
                                <div className="ui primary button">
                                <i className="check icon"></i>
                                Open
                                </div>
                                <div className="ui button">
                                <i className="close icon"></i>
                                Close
                                </div>
                            </div>
                        </div>                            
                        </div>
                    </div>
                 );
                } )}
        </div>
    )
    }

}


export default NewCard
