import React, { Component } from 'react';
import api from '../../services/api';

import "./index.css";
import logo from '../../assets/ClickBox.svg';

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            newBox: '',
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const response = await api.post('/boxes',{
            title: this.state.newBox
        })

        this.props.history.push(`/box/${response.data._id}`);
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
                    <button type="submit">Criar</button>
                </form>
            </div>
        );
    }
}

export default Main;