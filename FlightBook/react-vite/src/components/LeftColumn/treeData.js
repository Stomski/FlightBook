import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import FlightCreateModal from "../FlightCreateModal/FlightCreateModal";
import SiteCreateModal from "../SiteCreateModal/SiteCreateModal";

export const treeData = [
  {
    key: "0",
    label: "Sites",
    title: true,
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
        children: [
          {
            key: "0-2-0",
            label: "my favorites",
          },
          {
            key: "0-2-1",
            label: "Top Rated",
          },
        ],
      },
      {
        key: "0-3",
        label: "create an unofficial site!",
        RenderComponent: OpenModalMenuItem,
        Modal: SiteCreateModal,
      },
    ],
  },
  {
    key: "1",
    label: "Flights",
    title: true,
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
        label: "create a new flight log",
        RenderComponent: OpenModalMenuItem,
        Modal: FlightCreateModal,
      },
    ],
  },
];
