import React, { Component } from 'react';
import Header from './Components/Header';
import Login from './Components/Login';

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Login/>
            </div>
        );
    }
}

export default App;