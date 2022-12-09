import { Box, Stack, TextField } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { Handle, NodeProps, Position } from 'reactflow';
import { updateNodeData } from '../../state/flows';
import { NodeContainer } from '../container';
import { NodeHeader } from '../header';
import { OutputHandle } from '../handles/output-handle';

const handleStyle = { width: 24, height: 24, borderRadius: 12, top: '75%', right: -12 };

type NodeDataType = "string" | "number";

interface State { }

type Props = {
    value: string;
}

type VariableNodeProps<T = any> = NodeProps & {
    updateNodeData: any
}
class VariableNode extends React.Component<VariableNodeProps<Props>, State> {

    value: (number | string | undefined) = undefined;

    constructor(props: VariableNodeProps<Props>) {
        super(props);
        this.state = {}
    }

    public static compile = () => {
        return { code: `Variable VBS`, type: "inline" };
    }

    onDataValueChange = (e: any) => {
        const { value } = e.target;
        this.setState({
            value: value,
        })
    }

    render() {
        return (<>
            <NodeContainer header={<NodeHeader label="Variable" color="slate" />}>
                <Box>
                    <Stack direction={"row"} className="relative">
                        <TextField type="text" className='bg-white' label="Value" variant="filled" value={this.props.data.value} onFocus={(e) => { e.stopPropagation() }} onClick={(e) => e.stopPropagation()} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, data: { value: e.target.value } }) }} />
                        <OutputHandle id="output" />
                    </Stack>
                </Box>
            </NodeContainer>

        </>);
    }
}

const mapStateToProps = (state: any) => ({

})

const VariableNodeComponent = connect(mapStateToProps, {
    updateNodeData
})(VariableNode)

export default VariableNodeComponent