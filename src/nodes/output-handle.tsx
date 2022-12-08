import { Box } from '@mui/material';
import React from 'react';
import { Handle, Position } from 'reactflow';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

type Props = {
    id: string
}

const handleStyle = { width: 16, height: 16, borderRadius: 8, borderWidth:2, right: "-30px" };

export class OutputHandle extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return ( 
            <Handle id={this.props.id} type="source" position={Position.Right} style={handleStyle} className="bg-blue-400 border-blue-700"/>
        );
    }
}