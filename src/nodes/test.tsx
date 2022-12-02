import { Box, TextField } from '@mui/material';
import { stringify } from 'querystring';
import React from 'react';
import { useCallback } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { HeaderNode } from './header';

const handleStyle = { width: 24, height: 24, borderRadius: 12, top: '75%', right: -12 };

interface Props {
    s: string
}

export class TextUpdaterNode extends React.Component<NodeProps<Props>> {

    value: (number | string | undefined) = undefined;

    compile = () => {
        return `Dim x : x = ${this.value}`
    }

    render() {
        return (<>
            <Box className='rounded-md'
                sx={{
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                <HeaderNode label='test' />
                <Box className='p-4'>
                    <TextField className='bg-white' label="Filled" variant="filled" value={this.value} />
                </Box>
                <div>{this.compile()}</div>
            </Box>
            <Handle id='a' type="source" position={Position.Right} style={handleStyle} />
        </>);
    }
}