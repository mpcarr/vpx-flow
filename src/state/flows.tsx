import { createSlice } from '@reduxjs/toolkit'
import { Edge, Node } from 'reactflow';
import { NodeTypes } from './node-types';

const flows = JSON.parse(window.localStorage.getItem("flows") as string) || {
  flows: [{
    id:"flow",
    nodes: [],
    edges: [],
    code: "test"
  }],
  selectedFlow: 0
};

const initialState:{
  flows:{
    id: string,
    nodes: Array<Node>,
    edges: Array<Edge>,
    code: string
  }
} = flows;

const flowsSlice = createSlice({
  name: 'flows',
  initialState,
  reducers: {
    addFlow(state:any, action:any) {
      state.flows.push(action.payload)
    },
    addNodeToFlow(state:any, action:any) {
      const flow = state.flows.find((flow:any) => flow.id === "flow")
      flow.nodes.push({ id: `${action.payload.type}${flow.nodes.length+1}`, dragHandle: '.node-drag-header', type: action.payload.type, position: { x: 0, y: 0 }, data: {} })
    },
    updateFlow(state:any, action:any) {
      const flow = state.flows.find((flow:any) => flow.id === "flow")
      if(action.payload.nodes)
        flow.nodes = action.payload.nodes;
      if(action.payload.edges)
        flow.edges = action.payload.edges;

        console.log(state.flows);
      //Generate code.
      //1.) loop each node.
      // for(const node of flow.nodes)
      // {
      //   const {code, type} = compile(node, flow.edges);
      //   console.log(code);

      // }

      window.localStorage.setItem("flows", JSON.stringify(state));
    },
    updateNodeData(state:any, action:any)
    {
      console.log(action);
      const flow = state.flows.find((flow:any) => flow.id === "flow")
      const node = flow.nodes.find((node: Node) => node.id === action.payload.id);
      console.log(node)
      node.data = {...node.data, ...action.payload.data};
      window.localStorage.setItem("flows", JSON.stringify(state));
    },
    deleteFlow(state:any, action:any) {
      const flows = state.flows.filter((flow:any) => flow.id !== action.payload)
      state.flows = flows;
    },
  }
})

export const flowSelector = (state:any) => state.flows;

export const { addFlow, deleteFlow, updateFlow, addNodeToFlow, updateNodeData } = flowsSlice.actions

export default flowsSlice.reducer