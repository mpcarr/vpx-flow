import { Box, TextField } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { NodeProps } from 'reactflow';
import { updateNodeData } from '../../state/flows';
import { NodeContainer } from '../container';
import { NodeHeader } from '../header';
import { InHandle } from '../handles/in-handle';
import { NextHandle } from '../handles/next-handle';

interface State { }

type Props = {
    value: string;
}

type LightOnNodeProps<T = any> = NodeProps & {
    updateNodeData: any
}
class LightOnNode extends React.Component<LightOnNodeProps<Props>, State> {

    value: (number | string | undefined) = undefined;

    constructor(props: LightOnNodeProps<Props>) {
        super(props);
        this.state = {}
    }

    onDataValueChange = (e: any) => {
        const { value } = e.target;
        this.setState({
            value: value,
        })
    }

    render() {
        return (<>
            <NodeContainer header={<NodeHeader label="Light On" color="blue" />}>
                <Box>
                    <TextField type="text" className='bg-white' label="Name" variant="filled" value={this.props.data.value} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, data:{value: e.target.value }}) }} />
                </Box>
            </NodeContainer>
            <InHandle id="flowIn" />
            <NextHandle id="flowOut"/>
        </>);
    }
}

const mapStateToProps = (state: any) => ({

})

const LightOnNodeComponent = connect(mapStateToProps, {
    updateNodeData
})(LightOnNode)

export default LightOnNodeComponent