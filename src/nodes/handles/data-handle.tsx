import { Box } from '@mui/material';
import React from 'react';
import { Handle, Position } from 'reactflow';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

type Props = {
    id: string
    position?: string
}

const handleStyle = { width: 16, height: 16, borderRadius: 8, borderWidth:2, left: -30};
export class DataHandle extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return ( 
            <Handle id={this.props.id} type="target" position={Position.Left} style={this.props.position ? {...handleStyle, top: this.props.position} : {...handleStyle}} className="bg-red-400 border-red-700"/>
        );
    }
}