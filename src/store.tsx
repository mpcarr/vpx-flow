import { configureStore } from '@reduxjs/toolkit'

import flowsReducer from './state/flows'
import nodesReducer from './state/nodes'

const store = configureStore({
  reducer: {
    flowsState: flowsReducer,
    nodesState: nodesReducer,
  }
})

export default store