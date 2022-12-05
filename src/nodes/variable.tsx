import { Box, TextField } from '@mui/material';
import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { NodeContainer } from './container';
import { NodeHeader } from './header';
import { OutputHandle } from './output-handle';

const handleStyle = { width: 24, height: 24, borderRadius: 12, top: '75%', right: -12 };

type NodeDataType = "string" | "number";

interface State {
    value: string;
    label: string;
    type: NodeDataType
}

type Propsd = {
    type: NodeDataType
}

export class VariableNode extends React.Component<NodeProps<Propsd>, State> {

    value: (number | string | undefined) = undefined;

    constructor(props: NodeProps<Propsd>) {
        super(props);
        this.state = {
            value: '',
            label: `Variable - ${props.data.type}`,
            type: props.data.type
        }
    }

    onDataValueChange = (e: any) => {
        const { value } = e.target;
        this.setState({
            value: value,
        })
    }

    compile = () => {
        return `Dim x : x = ${this.state.type == 'string' ? '"' + this.state.value + '"' : this.state.value}`
    }

    render() {
        return (<>
            <NodeContainer color="slate" header={<NodeHeader label="Variable" color="slate" />}>
                <Box>                        
                    <TextField type="text" className='bg-white' label="Filled" variant="filled" value={this.state.value} onChange={this.onDataValueChange} />
                </Box>
            </NodeContainer>
           <OutputHandle id="output"/>
            </>);
    }
}