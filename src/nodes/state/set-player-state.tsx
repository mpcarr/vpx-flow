import { Box, Stack, TextField } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { NodeProps } from 'reactflow';
import { updateNodeData } from '../../state/flows';
import { NodeContainer } from '../container';
import { NodeHeader } from '../header';
import { InHandle } from '../handles/in-handle';
import { NextHandle } from '../handles/next-handle';
import { DataHandle } from '../handles/data-handle';

interface State { }

type Props = {
    value: string;
}

type SetPlayerStateNodeProps<T = any> = NodeProps & {
    updateNodeData: any
}
class SetPlayerStateNode extends React.Component<SetPlayerStateNodeProps<Props>, State> {

    value: (number | string | undefined) = undefined;

    constructor(props: SetPlayerStateNodeProps<Props>) {
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
            <NodeContainer header={<NodeHeader label="Set Player State" color="red" />}>
                <Box>
                    <Stack direction={"row"} className="relative">
                        <TextField type="text" className='bg-white' label="Name" variant="filled" value={this.props.data.value} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, value: e.target.value }) }} />
                        <DataHandle id="dataIn" />
                    </Stack>
                </Box>
            </NodeContainer>

            <InHandle id="flowIn" />
            <NextHandle id="flowOut" />
        </>);
    }
}

const mapStateToProps = (state: any) => ({

})

const SetPlayerStateNodeComponent = connect(mapStateToProps, {
    updateNodeData
})(SetPlayerStateNode)

export default SetPlayerStateNodeComponent