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

type HitNodeProps<T=any> = NodeProps & {
    updateNodeData: any
}

class HitNode extends React.Component<HitNodeProps<Props>, State> {

    constructor(props: HitNodeProps<Props>) {
        super(props);
        this.state = {}
    }

    render() {
        console.log(this.props);
        return (<>
            <NodeContainer header={<NodeHeader label="Hit" color="yellow" />}>
                <Box>                        
                    <TextField type="text" className='bg-white' label="Filled" variant="filled" value={this.props.data.value} onChange={(e)=>{this.props.updateNodeData({id: this.props.id, data: {value: e.target.value}})}} />
                </Box>
            </NodeContainer>
            <NextHandle id="flowOut"/>
            </>
        );
    }
}

const mapStateToProps = (state: any) => ({
    
})

const HitNodeComponent = connect(mapStateToProps, {
    updateNodeData
})(HitNode)

export default HitNodeComponent