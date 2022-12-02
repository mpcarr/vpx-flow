import * as React from 'react';

import './App.css';
import { ExampleFlow } from './flow/example';
import { SplitPane } from "react-collapse-pane";

function App() {
  return (
    <div className="App">
      <ExampleFlow />
      {/* <SplitPane split="vertical" collapse={true}>
        <div>This is the first div</div>
        <div>This is the second div</div>
        <div>This is the third div</div>
        This is the fourth but not a div!
      </SplitPane> */}
    </div>

  );
}

export default App;
