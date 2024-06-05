import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import FlightCreateModal from "../FlightCreateModal/FlightCreateModal";
import SiteCreateModal from "../SiteCreateModal/SiteCreateModal";
import { useState } from "react";

function TreeNode({ node }) {
  const { renderComponent, children, label } = node;

  const [showChildren, setShowChildren] = useState(false);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };
  return (
    <>
      <div onClick={handleClick} style={{ marginBottom: "10px" }}>
        <span>{label}</span>
      </div>
      {renderComponent && (
        <>
          <h1>{renderComponent}</h1>
        </>
      )}

      {children && children.length > 0 && showChildren && (
        <ul style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}>
          <LeftNavTree treeData={children} />
        </ul>
      )}
    </>
  );
}
function LeftNavTree({ treeData }) {
  console.log(treeData);
  return (
    <section className="left-nav-tree-div">
      {/* <div></div>
      <OpenModalMenuItem
        itemText="Log a Flight!"
        modalComponent={<FlightCreateModal />}
      />
      <OpenModalMenuItem
        itemText="Create a Site!"
        modalComponent={<SiteCreateModal />}
      />
      <div></div> */}

      <ul>
        {treeData.map((node) => (
          <TreeNode node={node} key={node.key} />
        ))}
      </ul>
    </section>
  );
}

export default LeftNavTree;
