import { Button } from '@mui/material';
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
        let code = "";
        for (const entryNode of entryNodes) {
            code += this.compileNode(entryNode, "", codeTree);
            codeTree.push({nodeId: entryNode.id, code:code});
            console.log(code);
        }

        return codeTree;
    }

    compileNode(node: Node, depth: string, codeTree: Array<any>): string {
        const { nodes, edges } = this.props.flow;

        let code = "";
        switch (node.type) {
            case NodeTypes.Hit: {
                const flowOutEdges = edges.filter(e => e.source === node.id && e.sourceHandle === 'flowOut');
                code += `Sub ${node.data.value}_Hit()\n`;
                for(const flowOutEdge of flowOutEdges)
                {
                    const nextNode = nodes.find(n => n.id === flowOutEdge?.target);
                    if (nextNode)
                        code +=`${this.compileNode(nextNode, "\t", codeTree)}`;
                }
                code+=`End Sub\n\n`;
                //codeTree.push({ code: code, nodeId: node.id });
                break;
            }
            case NodeTypes.Branch: {
                const flowOutTrueEdge = edges.find(e => e.source === node.id && e.sourceHandle === 'flowOutTrue');
                const flowOutFalseEdge = edges.find(e => e.source === node.id && e.sourceHandle === 'flowOutFalse');
                const dataInEdge = edges.find(e => e.target === node.id && e.targetHandle === 'dataIn');
                console.log(dataInEdge);
                //codeTree.push({ code: `Sub ${node.id}()\n\tIf ${dataInEdge?.source} = True Then\n\t\t${flowOutTrueEdge?.target || ''}\n\tElse\n\t\t${flowOutFalseEdge?.target || ''}\n\tEnd If\nEnd Sub\n\n`, nodeId: node.id });
                
                const dataInNode = nodes.find(n => n.id === dataInEdge?.source);
                if (dataInNode)
                    code+=this.compileNode(dataInNode, depth, codeTree);

                code+=`${depth}If ${dataInEdge?.source} = True Then\n`;


                const flowOutTrueNode = nodes.find(n => n.id === flowOutTrueEdge?.target);
                if (flowOutTrueNode)
                    code+=this.compileNode(flowOutTrueNode, depth+"\t", codeTree);

                
                
                const flowOutFalseNode = nodes.find(n => n.id === flowOutFalseEdge?.target);
                if (flowOutFalseNode)
                {
                    code+=`${depth}Else\n`
                    code+=this.compileNode(flowOutFalseNode, depth+"\t", codeTree);
                }
                code+=`${depth}End If\n`;
                break;
            }
            case NodeTypes.Variable: {                
                //codeTree.push({ code: `Function ${node.id}()\n\t${node.id} = "${node.data.value}"\nEnd Function\n\n`, nodeId: node.id });
                code+=`${depth}Dim ${node.id} : ${node.id} = "${node.data.value}"\n`;
                break;
            }
            // case NodeTypes.CreateGameState: {
            //     const flowInEdges = edges.filter(e => e.target === node.id && e.targetHandle === 'flowIn');
            //     if(flowInEdges.length>1)
            //     {
            //         //sub
            //         if(!codeTree.find(c=>c.nodeId===node.id))
            //         {
            //             const newSub = `Sub ${node.id}()\n\tDim ${node.data.value} : Set ${node.data.value} = CreateObject("Scripting.Dictionary")\nEnd Sub\n\n`;
            //             codeTree.push({nodeId: node.id, code: newSub});
            //         }
            //         code+=`${depth}${node.id}\n`;
            //     }else{    
            //         code+=`${depth}Dim ${node.data.value} : Set ${node.data.value} = CreateObject("Scripting.Dictionary")\n`;
            //         //codeTree.push({ code: `Sub ${node.id}()\n\tDim ${node.data.value} : Set ${node.data.value} = CreateObject("Scripting.Dictionary")\nEnd Sub\n\n`, nodeId: node.id });
            //     }

            //     const flowOutEdge = edges.find(e => e.source === node.id && e.sourceHandle === 'flowOut');
            //     console.log(flowOutEdge);
            //     const nextNode = nodes.find(n => n.id === flowOutEdge?.target);
            //     console.log(nextNode);
            //     if (nextNode)
            //         code+=this.compileNode(nextNode, depth, codeTree);
            //     break;
            // }
            case NodeTypes.LightOn: {                
                code+=`${depth}lController.LightOn ${node.data.value}\n`;
                break;
            }
            case NodeTypes.LightSet: {                
                code+=`${depth}lController.LightSet ${node.data.light.id}, Array(${this.colorToRGB(node.data.color)},${this.colorToRGB(node.data.colorFull)}, ${node.data.blinkPattern}, ${node.data.fadeUp}, ${node.data.fadeDown}\n`;
                break;
            }
            default: {
                break;
            }
        }
        return code;
    }

    colorToRGB(color:string) {
        if(!color) return 'Null';
        const r = parseInt(color.substr(1,2), 16)
        const g = parseInt(color.substr(3,2), 16)
        const b = parseInt(color.substr(5,2), 16)
        return `RGB(${r}, ${g}, ${b})`;
      }

    render() {
        const codeTree:any = this.compile()
        return (
            <>
                <pre>{codeTree.map((code:any)=>code.code)}</pre>
                <Button onClick={(e)=>{
                    fetch("http://localhost:8000/", {method:'post', headers: {
                        'Content-Type': 'application/json'
                      }, body: JSON.stringify(codeTree)})
                }}>Save</Button>
            </>
        );
    }
}

const mapStateToProps = (state: any) => ({
    flow: state.flowsState.flows[state.flowsState.selectedFlow],
})

export default connect(mapStateToProps, null)(FlowCodeView)