import React from 'react';

export class MyInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }
    }
    onChange = (event)=> {
        this.setState({
            value: event.target.value
        })
    }

    onEnter = (event)=> {
        if(event.key === 'Enter'){
            this.props.onEnter(this.state);
        }
    }

    render() {
        return (
            <input
                onChange={this.onChange} 
                value={this.state.value}
                onKeyDown={this.onEnter}
                className='footer-input'
                name='search'
                type='text'
                placeholder='Search for event'
            />
        );
    } 
}