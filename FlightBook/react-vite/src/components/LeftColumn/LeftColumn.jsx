import LeftPageInfo from "./LeftPageInfo";
import LeftNavTree from "./LeftNavTree";

import "./LeftColumn.css";

function LeftColumn() {
  return (
    <section className="leftcolumndiv">
      <LeftPageInfo />
      <LeftNavTree />
    </section>
  );
}

export default LeftColumn;
