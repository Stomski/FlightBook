import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import FlightCreateModal from "../FlightCreateModal/FlightCreateModal";
import SiteCreateModal from "../SiteCreateModal/SiteCreateModal";
import { useState } from "react";
import { setFeedComponent } from "../../redux/view";
import { useDispatch, useSelector } from "react-redux";

function TreeNode({ node }) {
  const {
    RenderComponent,
    children,
    label,
    Modal,
    title,
    viewOption,
    requireLogin,
  } = node;
  const dispatch = useDispatch();
  const [showChildren, setShowChildren] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };

  const handleViewChange = () => {
    // console.log("%c handleViewChange log>", "color:red; font-size: 26px");
    dispatch(setFeedComponent(viewOption));
  };
  return (
    <>
      {RenderComponent && Modal && sessionUser && (
        <div className="clickable">
          <RenderComponent itemText={label} modalComponent={<Modal />} />
        </div>
      )}

      {viewOption && sessionUser && (
        <>
          <div
            className="clickable"
            onClick={handleViewChange}
            style={{ marginBottom: "10px" }}
          >
            <span>{label}</span>
          </div>
        </>
      )}
      {viewOption && !sessionUser && !requireLogin && (
        <>
          <div
            className="clickable"
            onClick={handleViewChange}
            style={{ marginBottom: "10px" }}
          >
            <span>{label}</span>
          </div>
        </>
      )}

      {children && sessionUser && children.length > 0 && (
        <div
          className="clickable"
          onClick={handleClick}
          style={{ marginBottom: "10px" }}
        >
          {title ? (
            <h2 className="tree-title">{label}</h2>
          ) : (
            <span>{label}</span>
          )}
        </div>
      )}

      {children && !sessionUser && children.length > 0 && !requireLogin && (
        <div
          className="clickable"
          onClick={handleClick}
          style={{ marginBottom: "10px" }}
        >
          {title ? (
            <h2 className="tree-title">{label}</h2>
          ) : (
            <span>{label}</span>
          )}
        </div>
      )}

      {children && sessionUser && children.length > 0 && showChildren && (
        <ul style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}>
          <LeftNavTree treeData={children} />
        </ul>
      )}
      {children &&
        !sessionUser &&
        children.length > 0 &&
        showChildren &&
        !requireLogin && (
          <ul style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}>
            <LeftNavTree treeData={children} />
          </ul>
        )}
    </>
  );
}
function LeftNavTree({ treeData }) {
  // console.log(treeData);
  return (
    <section className="left-nav-tree">
      <ul>
        {treeData.map((node) => (
          <TreeNode node={node} key={node.key} />
        ))}
      </ul>
    </section>
  );
}

export default LeftNavTree;
