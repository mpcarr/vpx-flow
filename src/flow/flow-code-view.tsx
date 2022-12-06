import * as React from 'react';
import { connect } from 'react-redux';
import { Edge, Node } from 'reactflow';
import { EntryNodeTypes, NodeTypes } from '../state/node-types';

interface State {

}

interface Props {
    flow: {
        nodes: Node[],
        edges: Edge[],
    },
    flowCode: string,
}



class FlowCodeView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    compile = () => {
        const { nodes, edges } = this.props.flow;

        //1.) find endtry nodes.
        const entryNodes = nodes.filter((n: Node) => EntryNodeTypes.has(n.type as string));
        console.log(entryNodes);

        const codeTree: Array<any> = [];
        for (const entryNode of entryNodes) {
            this.compileNode(entryNode, codeTree);
            console.log(codeTree);
        }

        return codeTree;
    }

    compileNode(node: Node, codeTree: Array<any>): void {
        const { nodes, edges } = this.props.flow;

        switch (node.type) {
            case NodeTypes.Hit: {
                const flowOutEdge = edges.find(e => e.source === node.id && e.sourceHandle === 'flowOut');
                codeTree.push({ code: `Sub ${node.data.value}_Hit()\n\t${flowOutEdge?.target || ''}\nEnd Sub\n\n`, nodeId: node.id });
                const nextNode = nodes.find(n => n.id === flowOutEdge?.target);
                if (nextNode)
                    this.compileNode(nextNode, codeTree);
                break;
            }
            case NodeTypes.Branch: {
                const flowOutTrueEdge = edges.find(e => e.source === node.id && e.sourceHandle === 'flowOutTrue');
                const flowOutFalseEdge = edges.find(e => e.source === node.id && e.sourceHandle === 'flowOutFalse');
                const dataInEdge = edges.find(e => e.target === node.id && e.targetHandle === 'dataIn');
                console.log(dataInEdge);
                codeTree.push({ code: `Sub ${node.id}()\n\tIf ${dataInEdge?.source} = True Then\n\t\t${flowOutTrueEdge?.target || ''}\n\tElse\n\t\t${flowOutFalseEdge?.target || ''}\n\tEnd If\nEnd Sub\n\n`, nodeId: node.id });

                const dataInNode = nodes.find(n => n.id === dataInEdge?.source);
                if (dataInNode)
                    this.compileNode(dataInNode, codeTree);
                const flowOutTrueNode = nodes.find(n => n.id === flowOutFalseEdge?.target);
                if (flowOutTrueNode)
                    this.compileNode(flowOutTrueNode, codeTree);
                const flowOutFalseNode = nodes.find(n => n.id === flowOutFalseEdge?.target);
                if (flowOutFalseNode)
                    this.compileNode(flowOutFalseNode, codeTree);
                break;

                break;
            }
            case NodeTypes.Variable: {                
                codeTree.push({ code: `Function ${node.id}()\n\t${node.id} = "${node.data.value}"\nEnd Function\n\n`, nodeId: node.id });
                break;
            }
            default: {
                break;
            }
        }
    }

    render() {
        const codeTree = this.compile()
        return (
            <>
                {codeTree.map((ct: any) => (<div><pre>{ct.code}</pre></div>))}
            </>
        );
    }
}

const mapStateToProps = (state: any) => ({
    flow: state.flowsState.flows[state.flowsState.selectedFlow],
    flowCode: state.flowsState.flows[state.flowsState.selectedFlow].code,
})

export default connect(mapStateToProps, null)(FlowCodeView)