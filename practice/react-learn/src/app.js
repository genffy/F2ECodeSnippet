import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

import AppRouter from './router'

import reducer from './reducer'

import '../styles/index.scss'

let store = createStore(reducer)

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component/>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

render(AppRouter)

// 模块热替换的 API
if (module.hot) {
  module.hot.accept('./router', () => {
    render(AppRouter)
  })
}