import { Autocomplete, Box, Stack, TextField } from '@mui/material';
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
                    <Stack className='mt-4'>
                        <Stack direction={"row"} className="relative">
                            <DataHandle id="dataInLight" />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={this.options}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} variant="filled" className='bg-white' label="Light" />}
                            />
                            <OutputHandle id="outputLight" />
                        </Stack>
                        <Stack direction={"row"} className="relative">
                            <DataHandle id="dataInColor" />
                            <div>
                                <label htmlFor="color">Color</label>
                                <input type="color" id="color" name="color"
                                    value={this.props.data.color} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, color: e.target.value }) }} />
                            </div>
                        </Stack>
                        <Stack direction={"row"} className="relative">
                            <DataHandle id="dataInColor" />
                            <div>
                                <label htmlFor="colorFull">Color Full</label>
                                <input type="color" id="colorFull" name="colorFull"
                                    value={this.props.data.colorFull} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, colorFull: e.target.value }) }} />
                            </div>
                        </Stack>
                        <Stack direction={"row"} className="relative">
                            <DataHandle id="dataInBlinkPattern" />
                            <TextField type="text" className='bg-white' label="Blink Pattern" variant="filled" value={this.props.data.value} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, value: e.target.value }) }} />
                        </Stack>
                        <Stack direction={"row"} className="relative">
                            <DataHandle id="dataInFadeUp" />
                            <TextField type="text" className='bg-white' label="Fade Up" variant="filled" value={this.props.data.value} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, value: e.target.value }) }} />
                        </Stack>
                        <Stack direction={"row"} className="relative">
                            <DataHandle id="dataInFadeDown" />
                            <TextField type="text" className='bg-white' label="Fade Down" variant="filled" value={this.props.data.value} onChange={(e) => { this.props.updateNodeData({ id: this.props.id, value: e.target.value }) }} />
                        </Stack>
                    </Stack>
                </Box>
            </NodeContainer>
            <InHandle id="flowIn"/>
            
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