import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import FlightCreateModal from "../FlightCreateModal/FlightCreateModal";
import SiteCreateModal from "../SiteCreateModal/SiteCreateModal";

//    <div></div>
//   <OpenModalMenuItem
//     itemText="Log a Flight!"
//     modalComponent={<FlightCreateModal />}
//   />
<OpenModalMenuItem
  itemText="Create a Site!"
  modalComponent={<SiteCreateModal />}
/>;
//   <div></div>

export const treeData = [
  {
    key: "0",
    label: "Sites",
    children: [
      {
        key: "0-0",
        label: "view all",
        renderComponent: "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
      },
      {
        key: "0-1",
        label: "view my sites",
      },
      {
        key: "0-2",
        label: "view favorites",
      },
      {
        key: "0-3",
        label: "create an unofficial site!",
      },
    ],
  },
  {
    key: "1",
    label: "Flights",
    children: [
      {
        key: "1-0",
        label: "view recent",
      },
      {
        key: "1-1",
        label: "view my log book and stats",
      },
      {
        key: "1-2",
        label: "create a new log",
      },
    ],
  },
];
