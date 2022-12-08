import { Box, TextField } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { NodeProps } from 'reactflow';
import { updateNodeData } from '../../state/flows';
import { NodeContainer } from '../container';
import { NodeHeader } from '../header';
import { InHandle } from '../in-handle';
import { NextHandle } from '../next-handle';

interface State { }

type Props = {
    value: string;
}

type SetGameStateNodeProps<T = any> = NodeProps & {
    updateNodeData: any
}
class SetGameStateNode extends React.Component<SetGameStateNodeProps<Props>, State> {

    value: (number | string | undefined) = undefined;

    constructor(props: SetGameStateNodeProps<Props>) {
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
            <NodeContainer color="slate" header={<NodeHeader label="Set Game State" color="slate" />}>
                <Box>
                    <TextField type="text" className='bg-white' label="Name" variant="filled" value={this.props.data.value} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, value: e.target.value }) }} />
                </Box>
            </NodeContainer>
            <InHandle id="flowIn"/>
            <NextHandle id="flowOut" />
        </>);
    }
}

const mapStateToProps = (state: any) => ({

})

const SetGameStateNodeComponent = connect(mapStateToProps, {
    updateNodeData
})(SetGameStateNode)

export default SetGameStateNodeComponent