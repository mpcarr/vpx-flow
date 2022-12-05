import * as React from 'react';

import { Box, Tab, Tabs } from '@mui/material';
import { Allotment } from 'allotment';
import { connect } from 'react-redux';
import FlowContainer  from './flow-container';
import { addFlow, deleteFlow } from '../state/flows';

interface State {
    openTabs: Array<{ label: string }>;
    selectedFlowTab: number
    selectedMenuTab: number
}

interface Props {
    flows: Array<any>
}

class MainComponent extends React.Component<Props, State> {


    constructor(props: Props) {
        super(props);
        this.state = {
            openTabs: [{
                label: 'switchhit'
            }],
            selectedFlowTab: 0,
            selectedMenuTab: 0
        }
    }

    render() {
        return (
            <Allotment>
                <Allotment.Pane preferredSize={200}>
                    <Tabs value={this.state.selectedMenuTab}>
                        <Tab label="Flows" />
                        <Tab label="Nodes" />
                    </Tabs>
                    <Box>
                        {this.props.flows.map((flow: any, index: number) => {
                            return (<div key={index}>flow</div>)
                        })}
                    </Box>
                </Allotment.Pane>
                <Allotment.Pane snap>
                    <Tabs value={this.state.selectedFlowTab}>
                        {this.state.openTabs.map((tab, index) => <Tab id={`simple-tab-${index}`} key={index} label={tab.label} />)}
                    </Tabs>
                    <FlowContainer flow={this.props.flows[this.state.selectedFlowTab]}/>
                </Allotment.Pane>
            </Allotment>);
    }
}

const mapStateToProps = (state: any) => ({
    flows: state.flowsState.flows,
})

export default connect(mapStateToProps, {
    addFlow,
    deleteFlow
})(MainComponent)