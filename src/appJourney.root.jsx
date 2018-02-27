import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import configureStore from './store/configureStore';
import FormContainer from './components/form';

const store = configureStore();


export default class Root extends Component {


    static defaultProps = {
        global: {},
    };

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="wrapper">

                        <div className="container-fluid">
                            <Switch>
                                <Route
                                    exact path="/"
                                    component={FormContainer}
                                />


                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}
