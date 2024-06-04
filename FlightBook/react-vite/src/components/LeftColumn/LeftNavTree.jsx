import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import FlightCreateModal from "../FlightCreateModal/FlightCreateModal";
function LeftNavTree() {
  return (
    <section className="left-nav-tree-div">
      <div></div>
      <OpenModalMenuItem
        itemText="Log a Flight!"
        modalComponent={<FlightCreateModal />}
      />
      <div></div>
    </section>
  );
}

export default LeftNavTree;
