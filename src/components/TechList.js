import React, { Component } from 'react'

import TechItem from './TechItem'

class TechList extends Component {
    // static defaultProps {
    //     tech: 'Default Value'
    // }
    state = {
        newTech: '',
        techs: []
    };

    // executed as soon as component shows up at screen
    componentDidMount(){
        const techs = localStorage.getItem('techs');

        if (techs) {
          this.setState({ techs: JSON.parse(techs) })  
        }
    }

    //executed always when props or state changes
    //componentDidUpdate(prevPropos, prevState) {
        //access this.props to compare old and new props i.e. }
    componentDidUpdate(_, prevState) {
        if (prevState.techs !== this.state.techs) {
            localStorage.setItem('techs', JSON.stringify(this.state.techs))
        }
    }

    // //Executed when component "dies"
    // componentWillUnmount() {

    // }

    // arrow functions have access to variable This
    handleInputChange = text => {
        this.setState({ newTech: text.target.value })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState({ 
            techs: [...this.state.techs, this.state.newTech],
            newTech: ''
        })
    }

    handleDelete = (tech) => {
        this.setState({ techs: this.state.techs.filter(t => t !== tech) })
    }

    render() {
        return (
            
            <form onSubmit={this.handleSubmit}>
                <ul>
                    {this.state.techs.map(tech => (
                        <TechItem 
                            key={tech} 
                            tech={tech} 
                            onDelete={() => this.handleDelete(tech)}
                        />
                    ))}
                </ul>
                <input 
                    type="text"
                    onChange={this.handleInputChange}
                    value={this.state.newTech} 
                />
                <button type="submit">Enviar</button>
            </form>
            
        )
    }
}

export default TechList;