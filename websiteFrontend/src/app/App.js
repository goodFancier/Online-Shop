import React, {Component} from 'react';
import './App.css';
import {
    Route,
    withRouter,
    Switch, Redirect
} from 'react-router-dom';

import {getCurrentUser} from '../util/APIUtils';
import {ACCESS_TOKEN} from '../constants';

import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import Bucket from '../user/bucket/Bucket';
import NotFound from '../common/NotFound';
import Catalogue from '../catalogue/Catalogue';
import LoadingIndicator from '../common/LoadingIndicator';

import {Layout, notification} from 'antd';
import Offers from "../offers/Offers";
import Good from "../catalogue/Good";
import OfferPage from "../offers/OfferPage";
import PurchaseConstructor from "../user/purchaseConstructor/PurchaseConstructor";
import SummaryPage from "../order/summary/SummaryPage";
import RetailersList from "../retailers/RetailersList";
import OrderMain from "../order/orderList/OrderMain";
import Sidebar from "../common/Sidebar";

const {Content} = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            retailer: null,
            filterValue: null
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.initCatalogueRetailer = this.initCatalogueRetailer.bind(this);
        this.filterGoodsBySearch = this.filterGoodsBySearch.bind(this);
        this.resetFilterValue = this.resetFilterValue.bind(this);
        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    handleLogout(redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'De/Li',
            description: description,
        });
    }

    handleLogin() {
        notification.success({
            message: 'De/Li',
            description: "Спасибо! Вы были успешно авторизированы!",
        });
        this.loadCurrentUser();
        this.props.history.push("/");
    }

    initCatalogueRetailer(retailerId) {
        this.setState({retailer: retailerId});
    }

    filterGoodsBySearch(filter) {
        this.setState({filterValue: filter});
        this.props.history.push(`/catalogue/${this.state.retailer}`);
    }

    resetFilterValue() {
        this.setState({filterValue: null});
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }
        return (
            <Layout className="app-container">
                <AppHeader isAuthenticated={this.state.isAuthenticated} retailer={this.state.retailer} filterGoodsBySearch={this.filterGoodsBySearch}
                           currentUser={this.state.currentUser} filterValue={this.state.filterValue}
                           onLogout={this.handleLogout}/>
                <Content className="app-content">
                    {window.innerWidth < 800 ?
                        <Sidebar className="sidebar" currentUser={this.state.currentUser} onLogout={this.handleLogout}/> : null}
                    <div className="container">
                        <Switch>
                            <Route path="/login"
                                   render={(props) => <Login onLogin={this.handleLogin} {...props} />}/>
                            <Route path="/signup" render={(props) => <Signup onLogin={this.handleLogin} {...props} />}
                            />
                            <Route path="/users/:username/profile"
                                   render={(props) => <Profile isAuthenticated={this.state.isAuthenticated}
                                                               currentUser={this.state.currentUser} {...props}/>}>
                            </Route>
                            <Route path="/users/:username"
                                   render={(props) => <Profile {...props}  />}>
                            </Route>
                            <Route path="/shopBucket"
                                   render={(props) => <Bucket currentUser={this.state.currentUser} {...props}/>}>
                            </Route>
                            {/*<Route path="/catalogue"*/}
                            {/*       render={(props) => <Catalogue currentUser={this.state.currentUser} {...props}/>}>*/}
                            {/*</Route>*/}
                            <Route path="/catalogue/:retailerId"
                                   render={(props) => <Catalogue resetFilterValue={this.resetFilterValue} filterValue={this.state.filterValue} initCatalogueRetailer={this.initCatalogueRetailer} currentUser={this.state.currentUser} {...props}/>}>
                            </Route>
                            <Route path="/offers"
                                   render={(props) => <Offers  {...props} />}>
                            </Route>
                            <Route path="/good/:goodId"
                                   render={(props) => <Good currentUser={this.state.currentUser} {...props}/>}>
                            </Route>
                            <Route path="/purchaseConstructor"
                                   render={(props) => <PurchaseConstructor currentUser={this.state.currentUser} {...props} />}>
                            </Route>
                            <Route path="/order/summarypage"
                                   render={(props) => <SummaryPage currentUser={this.state.currentUser} {...props} />}>
                            </Route>
                            <Route path="/order/orderList"
                                   render={(props) => <OrderMain currentUser={this.state.currentUser} {...props}/>}/>
                            <Route path="/offer/:offerId"
                                   render={(props) => <OfferPage currentUser={this.state.currentUser} {...props}/>}/>
                            <Route exact path="/"
                                   component={() => (<Redirect to="/retailers"/>)}/>
                            <Route exact path="/retailers"
                                   render={(props) => <RetailersList currentUser={this.state.currentUser} {...props}/>}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default withRouter(App);
