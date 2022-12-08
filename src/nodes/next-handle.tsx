import { Box } from '@mui/material';
import React from 'react';
import { Handle, Position } from 'reactflow';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

type Props = {
    id: string;
    inline?: boolean
}

const handleStyle = { width: 24, height: 24, borderRadius: 12, border: 0 };

export class NextHandle extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return ( 
            <Handle id={this.props.id} type="source" position={Position.Right} style={this.props.inline ? {...handleStyle, right: "-30px"} : {...handleStyle,  top: 65}}>
                <ArrowCircleRightIcon style={{width:24, height:24, display:'block'}} className="pointer-events-none text-green-300"/>
            </Handle>
        );
    }
}