import '../styles/reset.css'
import '../styles/application.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

// Reducers
import { rootReducer } from './rootReducer'

// Components
import { App } from './App'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
)
