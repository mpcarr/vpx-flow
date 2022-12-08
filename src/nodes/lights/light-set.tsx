import { Autocomplete, Box, FormControl, FormHelperText, Input, InputLabel, Stack, TextField } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { NodeProps } from 'reactflow';
import { updateNodeData } from '../../state/flows';
import { NodeContainer } from '../container';
import { DataHandle } from '../data-handle';
import { NodeHeader } from '../header';
import { InHandle } from '../in-handle';
import { NextHandle } from '../next-handle';
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
                    <Stack className='mt-4' gap={1}>
                        <Stack direction={"row"} className="relative">
                            <DataHandle id="dataInLight" />
                            <Autocomplete
                                disablePortal
                                size='small'
                                id="combo-box-demo"
                                options={this.options}
                                sx={{ width: 300 }}
                                value={this.props.data.light}
                                onChange={(e, value) => { this.props.updateNodeData({ id: this.props.id, data: { light: value } }) }}
                                renderInput={(params) => <TextField {...params} variant="filled" className='w-full' label="Light" />}
                            />
                            <OutputHandle id="outputLight" />
                        </Stack>
                        <Stack direction={"row"} className="relative">
                            <DataHandle id="dataInColor" />
                            <Stack direction={'row'} className="w-full">
                                <InputLabel className="w-4/12 self-center">Color</InputLabel>
                                <Input id="color" type='color' fullWidth value={this.props.data.color} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, data: { color: e.target.value } }) }} />
                            </Stack>
                        </Stack>
                        <Stack direction={"row"} className="relative">
                            <DataHandle id="dataInColor" />
                            <Stack direction={'row'} className="w-full">
                                <InputLabel className="w-4/12 self-center">Color Full</InputLabel>
                                <Input id="color-full" type='color' fullWidth value={this.props.data.colorFull} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, data: { colorFull: e.target.value } }) }} />
                            </Stack>
                        </Stack>
                        <Stack direction={"row"} className="relative">
                            <DataHandle id="dataInBlinkPattern" />
                            <TextField size="small" type="text" className='w-full' label="Blink Pattern" variant="filled" value={this.props.data.blinkPattern} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, data: { blinkPattern: e.target.value } }) }} />
                        </Stack>
                        <Stack direction={"row"} className="relative">
                            <DataHandle id="dataInFadeUp" />
                            <TextField size="small" type="text" className='w-full' label="Fade Up" variant="filled" value={this.props.data.fadeUp} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, data: { fadeUp: e.target.value } }) }} />
                        </Stack>
                        <Stack direction={"row"} className="relative">
                            <DataHandle id="dataInFadeDown" />
                            <TextField size="small" type="text" className='w-full' label="Fade Down" variant="filled" value={this.props.data.fadeDown} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, data: { fadeDown: e.target.value } }) }} />
                        </Stack>
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

const LightSetNodeComponent = connect(mapStateToProps, {
    updateNodeData
})(LightSetNode)

export default LightSetNodeComponent