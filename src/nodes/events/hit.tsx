import { Box, Stack, TextField } from '@mui/material';
import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { NextHandle } from '../next-handle';
import { NodeContainer } from './../container';
import { NodeHeader } from './../header';

type State = {
    value: string
}


type Props = {

}


export class HitNode extends React.Component<NodeProps<Props>, State> {

    constructor(props: NodeProps<Props>) {
        super(props);
        this.state = {
            value: ''
        }
    }

    public static entryNode: boolean = true

    onDataValueChange = (e: any) => {
        const { value } = e.target;
        this.setState({
            value: value,
        })
    }

    render() {
        return (<>
            <NodeContainer color="yellow" header={<NodeHeader label="Hit" color="yellow" />}>
                <Box>                        
                    <TextField type="text" className='bg-white' label="Filled" variant="filled" value={this.state.value} onChange={this.onDataValueChange} />
                </Box>
            </NodeContainer>
            <NextHandle id="next" position="50%"/>
            </>
        );
    }
}