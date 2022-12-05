import { Box } from '@mui/material';
import React from 'react';
import { Handle, Position } from 'reactflow';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

type Props = {
    id: string
    position: string
}

const handleStyle = { width: 24, height: 24, borderRadius: 12, borderWidth:2};

export class DataHandle extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return ( 
            <Handle id={this.props.id} type="target" position={Position.Left} style={{...handleStyle, top: this.props.position}} className="bg-red-400 border-red-700"/>
        );
    }
}