import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import FlightCreateModal from "../FlightCreateModal/FlightCreateModal";
import SiteCreateModal from "../SiteCreateModal/SiteCreateModal";
function LeftNavTree() {
  return (
    <section className="left-nav-tree-div">
      <div></div>
      <OpenModalMenuItem
        itemText="Log a Flight!"
        modalComponent={<FlightCreateModal />}
      />
      <OpenModalMenuItem
        itemText="Create a Site!"
        modalComponent={<SiteCreateModal />}
      />
      <div></div>
    </section>
  );
}

export default LeftNavTree;
