import { createSlice } from '@reduxjs/toolkit';
import { NodeTypes } from './node-types';

const initialState = [
  {label: "Variable", type: NodeTypes.Variable },
  {label: "Branch", type: NodeTypes.Branch},
  {label: "Hit", type: NodeTypes.Hit}
];

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {}
})

export const {} = nodesSlice.actions

export default nodesSlice.reducer