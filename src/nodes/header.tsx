import { Box } from '@mui/material';
import React from 'react';

type Props = {
    label: string
    color: string;
}

export class NodeHeader extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (<>
            <Box className={`flex flex-row bg-${this.props.color}-700 rounded-md`}>
                <span className={`text-sm font-semibold inline-block m-2 py-1 px-2 uppercase rounded-full text-${this.props.color}-600 bg-${this.props.color}-200 uppercase`}>
                    {this.props.label}
                </span>
            </Box>
        </>);
    }
}