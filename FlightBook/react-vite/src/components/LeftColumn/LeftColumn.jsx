import LeftPageInfo from "./LeftPageInfo";
import LeftNavTree from "./LeftNavTree";
import { treeData } from "./treeData";

import "./LeftColumn.css";

function LeftColumn() {
  return (
    <section className="leftcolumndiv">
      <LeftPageInfo />
      <LeftNavTree treeData={treeData} />
    </section>
  );
}

export default LeftColumn;
