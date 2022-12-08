import { Box, TextField } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { Node, NodeProps } from 'reactflow';
import { updateNodeData } from '../../state/flows';
import { NextHandle } from '../handles/next-handle';
import { NodeContainer } from './../container';
import { NodeHeader } from './../header';

type State = {}

type Props = {
    value: string;
}

type TimerNodeProps<T=any> = NodeProps & {
    updateNodeData: any
}

class TimerNode extends React.Component<TimerNodeProps<Props>, State> {

    nodeColor = "purple"

    constructor(props: TimerNodeProps<Props>) {
        super(props);
        this.state = {}
    }

    render() {
        console.log(this.props);
        return (<>
            <NodeContainer color={this.nodeColor} header={<NodeHeader label="Timer" color={this.nodeColor} />}>
                <Box>                        
                    <TextField type="text" fullWidth label="Filled" variant="filled" value={this.props.data.value} onChange={(e)=>{this.props.updateNodeData({id: this.props.id, data: {value: e.target.value}})}} />
                </Box>
            </NodeContainer>
            <NextHandle id="flowOut"/>
            </>
        );
    }
}

const mapStateToProps = (state: any) => ({
    
})

const TimerNodeComponent = connect(mapStateToProps, {
    updateNodeData
})(TimerNode)

export default TimerNodeComponent