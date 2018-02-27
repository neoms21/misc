
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer as HotLoaderAppContainer} from 'react-hot-loader';
import {createStore} from 'redux';
import rootReducer from './reducers/index';
import Root from './appJourney.root';

const store = createStore(rootReducer);


const render = (Component) => {
    ReactDOM.render(
        <HotLoaderAppContainer>
            <Component store={store} />
        </HotLoaderAppContainer>,

        document.getElementById('root'),
    );
};
render(Root);


// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./appJourney.root', () => {
        render(Root);
    });
}
