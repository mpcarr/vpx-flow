import * as React from 'react';

import { Box, Button, Tab, Tabs } from '@mui/material';
import { Allotment } from 'allotment';
import { connect } from 'react-redux';
import FlowContainer  from './flow-container';
import { addFlow, addNodeToFlow, deleteFlow } from '../state/flows';
import FlowCodeView from './flow-code-view';

interface State {
    openTabs: Array<{ label: string }>;
    selectedFlowTab: number
    selectedMenuTab: number
    codePaneVisible: boolean
}

interface Props {
    flows: Array<any>;
    nodes: Array<any>;
    addNodeToFlow: any
}

class MainComponent extends React.Component<Props, State> {


    constructor(props: Props) {
        super(props);
        this.state = {
            openTabs: [{
                label: 'switchhit'
            }],
            selectedFlowTab: 0,
            selectedMenuTab: 0,
            codePaneVisible: false
        }
    }

    onMenuTabChange = (event: React.SyntheticEvent, newValue: number) => {
        this.setState({
            selectedMenuTab: newValue
        })
      };

    render() {
        return (
            <Allotment>
                <Allotment.Pane preferredSize={200}>
                    <Tabs value={this.state.selectedMenuTab} onChange={this.onMenuTabChange}>
                        <Tab label="Flows" />
                        <Tab label="Nodes" />
                    </Tabs>
                    {this.state.selectedMenuTab == 0 ? <Box>
                        {this.props.flows.map((flow: any, index: number) => {
                            return (<div key={index}>flow</div>)
                        })}
                    </Box> : null}
                    {this.state.selectedMenuTab == 1 ? <Box>
                        {this.props.nodes.map((node: any, index: number) => {
                            return (
                            <Box key={index} className="m-2 p-2 bg-slate-700 text-white rounded">
                                {node.label}
                                <Button onClick={(e)=>{this.props.addNodeToFlow(node)}} variant="contained">+</Button>
                            </Box>)
                        })}
                    </Box> : null}
                </Allotment.Pane>
                <Allotment.Pane snap>
                    <Tabs value={this.state.selectedFlowTab}>
                        {this.state.openTabs.map((tab, index) => <Tab id={`simple-tab-${index}`} key={index} label={tab.label} />)}
                    </Tabs>
                    {this.props.flows.length>0 ? 
                    <>
                    <Button onClick={(e)=>{
                       this.setState({codePaneVisible: !this.state.codePaneVisible}) 
                    }} variant="contained">code</Button>
                    <Allotment>
                        <Allotment.Pane>
                            <FlowContainer flow={this.props.flows[this.state.selectedFlowTab]}/> 
                        </Allotment.Pane>
                        <Allotment.Pane visible={this.state.codePaneVisible}>
                            <FlowCodeView/>
                        </Allotment.Pane>
                    </Allotment>
                    </>
                    : null}
                </Allotment.Pane>
            </Allotment>);
    }
}

const mapStateToProps = (state: any) => ({
    flows: state.flowsState.flows,
    nodes: state.nodesState
})

export default connect(mapStateToProps, {
    addFlow,
    deleteFlow,
    addNodeToFlow,
})(MainComponent)