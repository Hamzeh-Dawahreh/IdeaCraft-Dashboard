// import {
//   HomeIcon,
//   TableCellsIcon,
//   ArrowRightOnRectangleIcon,
// } from "@heroicons/react/24/solid";
// import { Home, Users } from "@/pages/dashboard";
// import { SignIn } from "@/pages/auth";
// import Companies from "./pages/dashboard/companies";
// import Services from "./pages/dashboard/services";
// import ContactUs from "./pages/dashboard/ContactUs";
// import AboutUs from "./pages/dashboard/AboutUs";
// const icon = {
//   className: "w-5 h-5 text-inherit",
// };

// export const routes = [
//   {
//     layout: "dashboard",
//     pages: [
//       {
//         icon: <HomeIcon {...icon} />,
//         name: "Home",
//         path: "/home",
//         element: <Home />,
//       },

//       {
//         icon: <TableCellsIcon {...icon} />,
//         name: "Users",
//         path: "/Users",
//         element: <Users />,
//       },
//       {
//         icon: <TableCellsIcon {...icon} />,
//         name: "Companies",
//         path: "/companies",
//         element: <Companies />,
//       },
//       {
//         icon: <TableCellsIcon {...icon} />,
//         name: "Services",
//         path: "/services",
//         element: <Services />,
//       },
//       {
//         icon: <TableCellsIcon {...icon} />,
//         name: "Contact us",
//         path: "/ContactUs",
//         element: <ContactUs />,
//       },
//       {
//         icon: <TableCellsIcon {...icon} />,
//         name: "About us",
//         path: "/AboutUs",
//         element: <AboutUs />,
//       },
//     ],
//   },
//   {
//     title: "auth pages",
//     layout: "auth",
//     pages: [
//       {
//         icon: <ArrowRightOnRectangleIcon {...icon} />,
//         name: "log Out",
//         path: "/sign-in",
//         element: <SignIn />,
//       },
//     ],
//   },
// ];

// export default routes;
import {
  HomeIcon,
  TableCellsIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Home, Users } from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";
import Companies from "./pages/dashboard/companies";
import Services from "./pages/dashboard/services";
import ContactUs from "./pages/dashboard/ContactUs";
import AboutUs from "./pages/dashboard/AboutUs";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Home",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Users",
        path: "/Users",
        element: <Users />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Products",
        path: "/products",
        element: <Companies />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Partners",
        path: "/Partners",
        element: <Services />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Contact Us",
        path: "/ContactUs",
        element: <ContactUs />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Sign-in",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
