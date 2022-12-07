import { Autocomplete, Box, Button, Popover, Stack, TextField } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { NodeProps } from 'reactflow';
import { updateNodeData } from '../../state/flows';
import { NodeContainer } from '../container';
import { NodeHeader } from '../header';
import { InHandle } from '../in-handle';
import { NextHandle } from '../next-handle';
import { ChromePicker } from 'react-color';
import { DataHandle } from '../data-handle';
import { OutputHandle } from '../output-handle';

interface State {

}

type Props = {
    value: string;
}

type LightSetNodeProps<T = any> = NodeProps & {
    updateNodeData: any
}
class LightSetNode extends React.Component<LightSetNodeProps<Props>, State> {

    value: (number | string | undefined) = undefined;

    colorBtnRef = React.createRef<Element>();

    options = [
        { label: 'l01', id: "l01" },
        { label: 'l02', id: "l02" },
    ];

    constructor(props: LightSetNodeProps<Props>) {
        super(props);
        this.state = {}
    }

    onDataValueChange = (e: any) => {
        const { value } = e.target;
    }

    render() {
        return (<>
            <NodeContainer color="blue" header={<NodeHeader label="Light Set" color="blue" />}>
                <Box>
                    <Stack className='mt-4'>
                        <Stack direction={"row"}>
                            <DataHandle id="dataInLight" position="30%" />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={this.options}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} variant="filled" className='bg-white' label="Light" />}
                            />
                        </Stack>
                        <div>
                            <label htmlFor="head">Color</label>
                            <input type="color" id="head" name="head"
                                value={this.props.data.color} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, color: e.target.value }) }} />
                        </div>
                        <TextField type="text" className='bg-white' label="Blink Pattern" variant="filled" value={this.props.data.value} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, value: e.target.value }) }} />
                        <TextField type="text" className='bg-white' label="Fade Up" variant="filled" value={this.props.data.value} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, value: e.target.value }) }} />
                        <TextField type="text" className='bg-white' label="Fade Down" variant="filled" value={this.props.data.value} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, value: e.target.value }) }} />
                    </Stack>
                </Box>
            </NodeContainer>
            <InHandle id="flowIn" position="18%" />

            <DataHandle id="dataInColor" position="43%" />
            <DataHandle id="dataInBlinkPattern" position="55%" />
            <DataHandle id="dataInFadeUp" position="71%" />
            <DataHandle id="dataInFadeDown" position="87%" />
            <OutputHandle id="outputLight" position="30%" />
            <NextHandle id="flowOut" position="18%" />

        </>);
    }
}

const mapStateToProps = (state: any) => ({

})

const LightSetNodeComponent = connect(mapStateToProps, {
    updateNodeData
})(LightSetNode)

export default LightSetNodeComponent