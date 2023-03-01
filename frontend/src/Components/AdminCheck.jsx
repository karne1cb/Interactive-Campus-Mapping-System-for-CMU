import { Component } from 'react';
import axios from 'axios';
import AuthService from './AuthService';

export default class AdminCheck extends Component {
    constructor(props) {
        super(props)
    }
    
    render(){
        let url = 'http://localhost:9000/adminTest';
        
        axios.get(url, {headers: AuthService.authHeader()});

       AuthService.isAdmin().then(res =>{alert(res)});

        return(
            'Testing admin'
        )
    }
}
