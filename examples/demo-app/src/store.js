// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import {hashHistory} from 'react-router';
import keplerGlReducer from 'kepler.gl/reducers';

import logger from "redux-logger";
import thunk from 'redux-thunk';
import window from 'global/window';
import {taskMiddleware} from 'react-palm';

import demoReducer from './reducers';

const customizedKeplerGlReducer = keplerGlReducer
  .initialState({
    uiState: {
      // hide side panel to disallower user customize the map
      readOnly: true,
  
      // customize which map control button to show
      mapControls: {
        visibleLayers: {
          show: false,
          isOpen: false
        },
        mapLegend: {
          show: true,
          active: true
        },
        toggle3d: {
          show: false
        },
        splitMap: {
          show: false
        }
      }
    }
  })

const reducers = combineReducers({
  keplerGl: customizedKeplerGlReducer,
  demo: demoReducer,
  routing: routerReducer
});

let middleware = [ taskMiddleware, thunk, routerMiddleware(hashHistory) ]

export const middlewares = [
  taskMiddleware,
  thunk,
  routerMiddleware(hashHistory)
];

export const enhancers = [applyMiddleware(...middlewares)];

const initialState = {};

// add redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducers,
  initialState,
  composeEnhancers(...enhancers)
);
