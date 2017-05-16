import React, {Component, PropTypes} from 'react'
import {Router, Route, Redirect} from 'react-router-dom'
import createHashHistory from 'history/createHashHistory'
import {connect} from 'react-redux'
import Index from './index'
import Detail from './detail'

class AppRouter extends Component {
    constructor(props) {
        super(props)
        this.history = new createHashHistory()
    }
    render() {
        return (
            <Router history={this.history}>
                <div>
                    <Route path='/index' component={Index}/>
                    <Route path='/detail' component={Detail}/>
                    <Redirect from="/" to="/index"/>
                </div>
            </Router>
        )
    }
}

AppRouter.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

export default connect(select)(AppRouter)