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
        name: "Companies",
        path: "/Companies",
        element: <Companies />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Services",
        path: "/Services",
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
