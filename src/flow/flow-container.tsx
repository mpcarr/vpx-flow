import * as React from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, updateEdge, Background, Connection, Controls, Edge, EdgeChange, Node, NodeChange, HandleType } from 'reactflow';
import { VariableNode } from '../nodes/variable';

import { BranchNode } from '../nodes/branch';
import { HitNode } from './../nodes/events/hit';
import { connect } from 'react-redux';
import { updateFlow } from '../state/flows';

const nodeTypes = {
  'variable': VariableNode,
  'branch': BranchNode,
  'hit': HitNode
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
    if (this.state.selectedEdgeId){
      const edges = this.props.flow.edges.filter((e:Edge)=>e.id !== this.state.selectedEdgeId)
      this.props.updateFlow({edges: edges});
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
        nodeTypes={nodeTypes}
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