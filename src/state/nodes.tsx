import { createSlice } from '@reduxjs/toolkit';
import { NodeTypes } from './node-types';

const initialState = [
  {label: "Branch", type: NodeTypes.Branch},
  {label: "Formula", type: NodeTypes.Formula},
  {label: "GetGameState", type: NodeTypes.GetGameState},
  {label: "GetPlayerState", type: NodeTypes.GetPlayerState},
  {label: "Hit", type: NodeTypes.Hit},
  {label: "LightOn", type: NodeTypes.LightOn},
  {label: "LightSet", type: NodeTypes.LightSet},
  {label: "LightShotLit", type: NodeTypes.LightShotLit},
  {label: "SetGameState", type: NodeTypes.SetGameState},
  {label: "SetPlayerState", type: NodeTypes.SetPlayerState},
  {label: "Timer", type: NodeTypes.Timer},
  {label: "Variable", type: NodeTypes.Variable },
];

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {}
})

export const {} = nodesSlice.actions

export default nodesSlice.reducer