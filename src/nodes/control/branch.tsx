import { Box, Stack } from '@mui/material';
import React from 'react';
import { NodeProps } from 'reactflow';
import { NodeCompileType } from '../../state/node-types';
import { NodeContainer } from '../container';
import { DataHandle } from '../handles/data-handle';
import { NodeHeader } from '../header';
import { InHandle } from '../handles/in-handle';
import { NextHandle } from '../handles/next-handle';

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
                <NodeContainer header={<NodeHeader label="Branch" color="slate" />}>
                    <Box className=''>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-end"
                            spacing={2}
                        >
                            <Stack direction={"row"} className="relative">
                                <NextHandle id="flowOutTrue" inline={true} />
                                <div className="w-full"><span className={`text-sm font-semibold m-2 py-1 px-2 uppercase rounded-full text-slate-600 bg-slate-200`}>
                                    True
                                </span></div>
                            </Stack>
                            <Stack direction={"row"} className="relative">
                                <NextHandle id="flowOutFalse" inline={true} />
                                <div className="w-full"><span className={`text-sm font-semibold m-2 py-1 px-2 uppercase rounded-full text-slate-600 bg-slate-200`}>
                                    False
                                </span></div>
                                <DataHandle id="dataIn" />
                            </Stack>
                        </Stack>
                    </Box>
                </NodeContainer>
                <InHandle id="flowIn"/>
            </>);
    }
}