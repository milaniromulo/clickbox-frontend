import React, { Component } from 'react';
import api from '../../services/api';

import "./index.css"
import logo from '../../assets/ClickBox.svg'

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            newBox: '',
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.newBox)
    }

    handleImputChange = (e) => {
        this.setState({
            newBox: e.target.value
        })
    }

    render() {
        return (
            <div id="main-container">
                <form onSubmit={this.handleSubmit}>
                    <img src={logo} alt="ClickBox" width="195px"/>
                    <input 
                    type="text" 
                    placeholder="Criar um Box"
                    valur={this.state.newBox}
                    onChange={this.handleImputChange}
                    />
                    <button type="submit">CRIAR</button>
                </form>
            </div>
        );
    }
}

export default Main;