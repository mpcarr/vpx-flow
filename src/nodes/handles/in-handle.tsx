import { Box } from '@mui/material';
import React from 'react';
import { Handle, Position } from 'reactflow';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

type Props = {
    id: string
}

const handleStyle = { width: 24, height: 24, borderRadius: 12, border: 0, top: 65 };

export class InHandle extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return ( 
            <Handle id={this.props.id} type="target" position={Position.Left} style={handleStyle}>
                <ArrowCircleRightIcon style={{width:24, height:24, display:'block'}} className="pointer-events-none text-green-300"/>
            </Handle>
        );
    }
}