import { Box, Stack } from '@mui/material';
import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { NodeContainer } from './container';
import { DataHandle } from './data-handle';
import { NodeHeader } from './header';
import { InHandle } from './in-handle';
import { NextHandle } from './next-handle';

const flowInStyle = { width: 24, height: 24, borderRadius: 12, top: '48%', left: -12, };
const conditionStyle = { width: 24, height: 24, borderRadius: 12, top: '76%', left: -12 };
const flowTrueStyle = { width: 24, height: 24, borderRadius: 12, top: '48%', right: -12, };
const flowFalseStyle = { width: 24, height: 24, borderRadius: 12, top: '76%', right: -12, };


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

    onDataValueChange = (e: any) => {
        const { value } = e.target;
        this.setState({
            value: value,
        })
    }

    compile = () => {

        const vbs = `If condition = True Then
    FlowTrue
Else
    FlowFalse
End If`;
        //console.log(vbs)
        return vbs;
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
                            <div className="w-full"><span className={`text-sm font-semibold m-2 py-1 px-2 uppercase rounded-full text-slate-600 bg-slate-200`}>
                                True
                            </span></div>
                            <div className="w-full"><span className={`text-sm font-semibold m-2 py-1 px-2 uppercase rounded-full text-slate-600 bg-slate-200`}>
                                False
                            </span></div>
                        </Stack>
                    </Box>
                </NodeContainer>
                <InHandle id="flowIn" position="52%" />
                <DataHandle id="dataIn" position="80%" />
                <NextHandle id="nextTrue" position="52%" />
                <NextHandle id="nextFalse" position="80%" />
            </>);
    }
}