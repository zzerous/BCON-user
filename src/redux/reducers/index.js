import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import login from './login'
import ui from './ui'
import contents from './contents'

const reducer = combineReducers({
  routing: routerReducer,
  login,
  ui,
  contents,
})

export default reducer
