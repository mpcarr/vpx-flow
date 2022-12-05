import { createSlice } from '@reduxjs/toolkit'

const flows = JSON.parse(window.localStorage.getItem("flows") as string);

const initialState = flows;

const flowsSlice = createSlice({
  name: 'flows',
  initialState,
  reducers: {
    addFlow(state:any, action:any) {
      state.flows.push(action.payload)
    },
    updateFlow(state:any, action:any) {
      const flow = state.flows.find((flow:any) => flow.id !== action.payload.id)
      if(action.payload.nodes)
        flow.nodes = action.payload.nodes;
      if(action.payload.edges)
        flow.edges = action.payload.edges;

      window.localStorage.setItem("flows", JSON.stringify(state));
    },
    deleteFlow(state:any, action:any) {
      const flows = state.flows.filter((flow:any) => flow.id !== action.payload)
      state.flows = flows;
    },
  }
})

export const { addFlow, deleteFlow, updateFlow } = flowsSlice.actions

export default flowsSlice.reducer