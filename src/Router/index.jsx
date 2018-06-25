import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import history from './history.js';
import Login from "../Pages/Login";
import Register from "../Pages/Register";
// import Header from "../Components/Header";
// import Admin from "../Pages/Admin";
import User from '../Pages/User';
import Logout from '../Pages/Logout';
// import Layout from '../Components/Layout';

class RouterIndex extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    {/*<Route path="/lay" component={Layout}/>*/}
                    {/*<Route path="/about" component={About}/>*/}
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register}/>
                    {/*<Route path="/head" component={Header}/>*/}
                    {/*<Route path='/admin/:path' component={Admin}/>*/}
                    <Route path="/user/:path" component={User}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/user" component={User}/>
                    <Route component={NoMatch}/>
                </Switch>
            </Router>
        );
    }
}

// const About = () => (
//     <div>
//         <h2>About</h2>
//     </div>
// );

// const List = () => (
//     <div>
//         <h1>主页开发中...</h1>
//         <Link to="/login">点击登录</Link>
//     </div>
// );

const NoMatch = ({location}) => (
    <div>
        <h3>未找到路由: <code>{location.pathname}</code></h3>
        <Link to="/">回主页</Link>
    </div>
);


export default RouterIndex;