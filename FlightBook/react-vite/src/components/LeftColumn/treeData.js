import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import FlightCreateModal from "../FlightCreateModal/FlightCreateModal";
import SiteCreateModal from "../SiteCreateModal/SiteCreateModal";

export const treeData = [
  {
    key: "0",
    label: "Launch Sites",
    title: true,
    children: [
      {
        key: "0-0",
        label: "view all",
        viewOption: "FeedAllSites",
      },
      {
        key: "0-1",
        label: "view my sites",
        viewOption: "FeedMySites",
        requireLogin: true,
      },
      // {
      //   key: "0-2",
      //   label: "view favorites",
      //   requireLogin: true,
      //   children: [
      //     {
      //       key: "0-2-0",
      //       label: "my favorites",
      //       viewOption: "featureComingSoon",
      //     },
      //     {
      //       key: "0-2-1",
      //       label: "Top Rated",
      //       viewOption: "featureComingSoon",
      //     },
      //   ],
      // },
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
    label: "Flight Logs",
    title: true,
    children: [
      {
        key: "1-0",
        label: "view recent",
        viewOption: "FeedAllFlights",
      },
      {
        key: "1-1",
        label: "view my log book and stats",
        viewOption: "FeedFlightsByUser",
        requireLogin: true,
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
