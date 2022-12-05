import { Box } from '@mui/material';
import React from 'react';

type Props = {
    header: JSX.Element
    children: JSX.Element
    color: string;
}

export class NodeContainer extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (<>
            <Box className={`rounded-md text-white bg-${this.props.color}-500`}>
                {this.props.header}
                <Box className='mx-6 py-4'>
                    {this.props.children}
                </Box>
            </Box>
        </>);
    }
}