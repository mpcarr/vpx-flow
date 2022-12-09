import { Box, Slider, Stack, TextareaAutosize, TextField } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { NodeProps, Position } from 'reactflow';
import { updateNodeData } from '../../state/flows';
import { NodeContainer } from '../container';
import { DataHandle } from '../handles/data-handle';
import { NodeHeader } from '../header';
import { InHandle } from '../handles/in-handle';
import { NextHandle } from '../handles/next-handle';
import { OutputHandle } from '../handles/output-handle';

import { useUpdateNodeInternals } from 'reactflow';

function UpdateNodeButton(props: any) {
    const updateNodeInternals = useUpdateNodeInternals();

    return <button onClick={() => updateNodeInternals(props.nodeId)}>update internals</button>;
}

interface State { }

type Props = {
    value: string;
}

type FormulaNodeProps<T = any> = NodeProps & {
    updateNodeData: any
}
class FormulaNode extends React.Component<FormulaNodeProps<Props>, State> {

    constructor(props: FormulaNodeProps<Props>) {
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

        const inputs = parseInt(this.props.data.inputs) || 0;
        console.log(inputs);

        return (<>
            <NodeContainer header={<NodeHeader label="Formula" color="slate" />}>
                <Box style={{ minHeight: 100 + ((inputs - 2) * 30) }}>
                    <Stack direction={"row"} className="relative mb-2">
                        <TextField type="text" multiline maxRows={4} label="Formula" variant="filled" value={this.props.data.value} onFocus={(e) => { e.stopPropagation() }} onClick={(e) => e.stopPropagation()} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, data: { value: e.target.value } }) }} />
                        <OutputHandle id="output" />
                    </Stack>
                    {[...Array(inputs)].map((_, index: number) => {
                        return (<div className="relative">
                            <DataHandle id={`DataIn${index}`} position={`${index * 30}px`} />
                        </div>)
                    })}
                    <div className="text-xs text-slate-600">Inputs</div>
                    <Slider
                        defaultValue={2}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={10}
                        value={this.props.data.inputs} onFocus={(e) => { e.stopPropagation() }} onClick={(e) => e.stopPropagation()} onChange={(e:any) => { this.props.updateNodeData({ id: this.props.id, data: { inputs: e.target.value } }) }} 
                    />
                </Box>
            </NodeContainer>
        </>);


    }
}

const mapStateToProps = (state: any) => ({

})

const FormulaNodeComponent = connect(mapStateToProps, {
    updateNodeData
})(FormulaNode)

export default FormulaNodeComponent