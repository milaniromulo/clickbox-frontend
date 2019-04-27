import React, { Component } from 'react';
import "./index.css";
import api from '../../services/api';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import DropZone from 'react-dropzone';
import socket from 'socket.io-client';

import logo from '../../assets/ClickBox.svg';

import { MdInsertDriveFile } from 'react-icons/md';

class Box extends Component {

    constructor(props){
        super(props);

        this.state = {
            box: {},
        };
    }

    async componentWillMount(){
        this.subscribeToNewFiles();

        const response = await api.get(`boxes/${this.props.match.params.id}`);

        this.setState({
            box: response.data
        })
    }

    subscribeToNewFiles(){
        const box = this.props.match.params.id;
        const io = socket('https://clickbox-backend.herokuapp.com');

        io.emit('connectRoom', box);
        io.on('file', data => {
            this.setState({
                box: {
                    ...this.state.box, 
                    files:[ data, ...this.state.box.files ]
                }
            })
        });
    }

    handleUpload = (files) => {
        files.forEach( file => {
            const data = new FormData();
            data.append('file', file);

            api.post(`/boxes/${this.props.match.params.id}/files`, data)
        });
    }

    render() {
        return (
            <div id="box-container">
                <header>
                    <img src={logo} alt="ClickBox" width="195px"/>
                    <h1>{this.state.box.title}</h1>
                </header>

                <DropZone onDropAccepted={this.handleUpload}>
                    {
                        ({ getRootProps, getInputProps }) => (
                            <div className="upload" {... getRootProps()}>
                                <input {... getInputProps()} />

                                <p>Arraste arquivos ou clique aqui!</p>
                            </div>
                        )
                    }
                </DropZone>

                <ul>
                    {this.state.box.files &&
                        this.state.box.files.map( file => (
                            <li key={file._id}>
                                <a href={file.url} className="fileInfo">
                                    <MdInsertDriveFile size={ 24 } color="#b7b6ff"/>
        
                                    <strong>{file.title}</strong>
                                </a>
                                <span>há {distanceInWords(file.createdAt, new Date(), { locale: pt })}</span>
                            </li>
                        ))
                    }
    
                </ul>
            </div>
        );
    }
}

export default Box;