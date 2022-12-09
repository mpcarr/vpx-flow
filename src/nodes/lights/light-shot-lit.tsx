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

type LightShotLitNodeProps<T = any> = NodeProps & {
    updateNodeData: any
}
class LightShotLitNode extends React.Component<LightShotLitNodeProps<Props>, State> {

    value: (number | string | undefined) = undefined;

    constructor(props: LightShotLitNodeProps<Props>) {
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
            <NodeContainer header={<NodeHeader label="Is Shot Lit" color="blue" />}>
                <Box>
                    <TextField type="text" className='bg-white' label="Shot" variant="filled" value={this.props.data.value} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, data:{value: e.target.value }}) }} />
                </Box>
            </NodeContainer>
            <NextHandle id="flowOut"/>
        </>);
    }
}

const mapStateToProps = (state: any) => ({

})

const LightShotLitNodeComponent = connect(mapStateToProps, {
    updateNodeData
})(LightShotLitNode)

export default LightShotLitNodeComponent