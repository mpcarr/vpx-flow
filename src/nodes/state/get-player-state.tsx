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

type GetPlayerStateNodeProps<T = any> = NodeProps & {
    updateNodeData: any
}
class GetPlayerStateNode extends React.Component<GetPlayerStateNodeProps<Props>, State> {

    value: (number | string | undefined) = undefined;

    constructor(props: GetPlayerStateNodeProps<Props>) {
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
            <NodeContainer header={<NodeHeader label="Get Player State" color="red" />}>
                <Box>
                    <TextField type="text" className='bg-white' label="Value" variant="filled" value={this.props.data.value} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, data:{value: e.target.value} }) }} />
                </Box>
            </NodeContainer>
            <InHandle id="flowIn"/>
            <NextHandle id="flowOut" />
        </>);
    }
}

const mapStateToProps = (state: any) => ({

})

const GetPlayerStateNodeComponent = connect(mapStateToProps, {
    updateNodeData
})(GetPlayerStateNode)

export default GetPlayerStateNodeComponent