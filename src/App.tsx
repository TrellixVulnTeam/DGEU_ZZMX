import React from 'react';
import './assets/scss/main.scss';
import Header from './components/Header';
import Carousel from './containers/Carousel';
import { Action, createStore } from 'redux';
import { Provider } from 'react-redux';
import IGlobalState, { initialState } from './state/globalState';
import { ICustomAction, IContentAction } from './actions/customActions';
import Main from './containers/Main';

const reducer = (state: IGlobalState = initialState, action: Action) => {
  switch (action.type) {
    case 'ROTATE':
      const rotateAction = action as ICustomAction;
      if (rotateAction.payload) {
        // rotate left
        const expectedIndex = state.carouselIndex - 1;
        return {...state, carouselIndex: expectedIndex < 0 ? 5 : expectedIndex}
      } else {
        // rotate right
        const expectedIndex = state.carouselIndex + 1;
        return {...state, carouselIndex: expectedIndex > 5 ? 0 : expectedIndex}
      }
    
    case 'MODAL':
      const modalAction = action as ICustomAction;
      if (modalAction.payload) {
        // Opened
        return {...state, showModal: true}
      } else {
        //Closed
        return {...state, showModal: false}
      }

    case 'CONTENT':
      const contentAction = action as IContentAction;
      return {...state, mainContent: contentAction.payload}
  }
  return state;
}

const store = createStore(reducer, initialState);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header collapsed={true} />
        <Main/>
        <Carousel />
      </div>
    </Provider>
  );
}

export default App;
