import { createSlice } from '@reduxjs/toolkit';
import { NodeTypes } from './node-types';

const initialState = [
  {label: "Variable", type: NodeTypes.Variable },
  {label: "Branch", type: NodeTypes.Branch},
  {label: "Hit", type: NodeTypes.Hit},
  {label: "CreateGameState", type: NodeTypes.CreateGameState},
  {label: "LightOn", type: NodeTypes.LightOn},
];

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {}
})

export const {} = nodesSlice.actions

export default nodesSlice.reducer