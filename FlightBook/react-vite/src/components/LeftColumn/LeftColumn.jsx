import LeftPageInfo from "./LeftPageInfo";
import LeftNavTree from "./LeftNavTree";
import { treeData } from "./treeData";

import "./LeftColumn.css";

function LeftColumn() {
  return (
    <section className="leftcolumndiv">
      <LeftPageInfo />
      <div className="left-nav-tree-div">
        <h1 className="left-nav-tree-title"> NAVIGATION:</h1>
        <LeftNavTree treeData={treeData} />
      </div>
    </section>
  );
}

export default LeftColumn;
