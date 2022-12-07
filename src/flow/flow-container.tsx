import * as React from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, Connection, Controls, Edge, EdgeChange, HandleType, NodeChange, updateEdge } from 'reactflow';
import { connect } from 'react-redux';
import { updateFlow } from '../state/flows';
import { NodeTypes } from '../state/node-types';
import VariableNode from '../nodes/variable';
import { BranchNode } from '../nodes/branch';
import HitNodeComponent from '../nodes/events/hit';
import CreateGameStateNodeComponent from '../nodes/game-state/create-game-state';
import LightOnNodeComponent from './../nodes/lights/light-on';
import LightSetNodeComponent from './../nodes/lights/light-set';

const flowNodeTypes = {
    [NodeTypes.Variable]: VariableNode,
    [NodeTypes.Branch]: BranchNode,
    [NodeTypes.Hit]: HitNodeComponent,
    [NodeTypes.CreateGameState]: CreateGameStateNodeComponent,
    [NodeTypes.LightOn]: LightOnNodeComponent,
    [NodeTypes.LightSet]: LightSetNodeComponent
  }

interface State {
  selectedEdgeId: string | null;
}

interface Props {
  flow: any,
  updateFlow: any
}

class FlowContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedEdgeId: null
    }
  }

  onNodesChange = (changes: NodeChange[]) => {
    const nodes = applyNodeChanges(changes, this.props.flow.nodes);
    this.props.updateFlow({ nodes: nodes });
  }

  onEdgesChange = (changes: EdgeChange[]) => {
    const edges = applyEdgeChanges(changes, this.props.flow.edges);
    this.props.updateFlow({ edges: edges })
  }

  onEdgeUpdateStart = (_: any, edge: Edge, handle: HandleType) => {
    this.setState({ selectedEdgeId: edge.id });
  }

  onEdgeUpdate = (oldEdge: Edge, connection: Connection) => {
    const edges = updateEdge(oldEdge, connection, this.props.flow.edges);
    this.props.updateFlow({ edges: edges });
  }

  onEdgeUpdateEnd = (e: any, edge: Edge) => {
    if (this.state.selectedEdgeId) {
      const edges = this.props.flow.edges.filter((e: Edge) => e.id !== this.state.selectedEdgeId)
      this.props.updateFlow({ edges: edges });
    }
    this.setState({ selectedEdgeId: null });
  }

  onConnect = (connection: Connection) => {
    const edges = addEdge(connection, this.props.flow.edges);
    this.props.updateFlow({ edges: edges })
  }

  render() {
    return (
      <ReactFlow
        nodeTypes={flowNodeTypes}
        nodes={this.props.flow.nodes}
        edges={this.props.flow.edges}
        onNodesChange={this.onNodesChange}
        onEdgesChange={this.onEdgesChange}
        onConnect={this.onConnect}
        onEdgeUpdate={this.onEdgeUpdate}
        onEdgeUpdateStart={this.onEdgeUpdateStart}
        onEdgeUpdateEnd={this.onEdgeUpdateEnd}>
        <Background />
        <Controls />
      </ReactFlow>
    );
  }
}

const mapStateToProps = (state: any) => ({
  flows: state.flowsState.flows,
})

export default connect(mapStateToProps, {
  updateFlow,
})(FlowContainer)