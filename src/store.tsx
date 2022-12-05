import { configureStore } from '@reduxjs/toolkit'

import flowsReducer from './state/flows'

const store = configureStore({
  reducer: {
    flowsState: flowsReducer
  }
})

export default store