import { Box, Stack } from '@mui/material';
import React from 'react';
import { NodeProps } from 'reactflow';
import { NodeCompileType } from '../state/node-types';
import { NodeContainer } from './container';
import { DataHandle } from './data-handle';
import { NodeHeader } from './header';
import { InHandle } from './in-handle';
import { NextHandle } from './next-handle';

type NodeDataType = "string" | "number";

interface State {
    value: string;
    label: string;
    type: NodeDataType
}

type Propsd = {
    type: NodeDataType
}

export class BranchNode extends React.Component<NodeProps<Propsd>, State> {

    value: (number | string | undefined) = undefined;

    constructor(props: NodeProps<Propsd>) {
        super(props);
        this.state = {
            value: '',
            label: `Branch`,
            type: props.data.type
        }
    }

    public static compile = () => {
        return {
            code: `If condition = True Then
        FlowTrue
    Else
        FlowFalse
    End If`, type: 'inline'
        };
    }

    onDataValueChange = (e: any) => {
        const { value } = e.target;
        this.setState({
            value: value,
        })
    }

    render() {
        return (
            <>
                <NodeContainer color="slate" header={<NodeHeader label="Branch" color="slate" />}>
                    <Box className='pl-4'>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-end"
                            spacing={2}
                        >
                            <Stack direction={"row"} className="relative">
                                <NextHandle id="flowOutTrue" />
                                <div className="w-full"><span className={`text-sm font-semibold m-2 py-1 px-2 uppercase rounded-full text-slate-600 bg-slate-200`}>
                                    True
                                </span></div>
                            </Stack>
                            <Stack direction={"row"} className="relative">
                                <NextHandle id="flowOutFalse" />
                                <div className="w-full"><span className={`text-sm font-semibold m-2 py-1 px-2 uppercase rounded-full text-slate-600 bg-slate-200`}>
                                    False
                                </span></div>
                            </Stack>

                        </Stack>
                    </Box>
                </NodeContainer>
                <InHandle id="flowIn"/>
                <DataHandle id="dataIn" />


            </>);
    }
}