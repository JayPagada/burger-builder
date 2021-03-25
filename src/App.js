import React,{Component} from "react"
import Layout from "./hoc/Layout/layout";
import BuregerBuilder from "./containers/BuregerBuilder/BuregerBuilder";
class App extends Component{
  render() {


  return (
    <div>
      <Layout>
        <BuregerBuilder/>
      </Layout>
    </div>
  );
}}

export default App;
