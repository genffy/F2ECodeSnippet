import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import AppRouter from './router'

import '../styles/index.scss'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
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