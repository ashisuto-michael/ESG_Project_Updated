import React from "react";

import { Icon } from "@chakra-ui/react";
import { MdBarChart, MdTopic, MdHome, MdAcUnit, MdLock } from "react-icons/md";

import { RiRulerFill } from "react-icons/ri";
import { GiStairsGoal } from "react-icons/gi";
import { FiTarget } from "react-icons/fi";
import { BsLayersFill } from "react-icons/bs";

// Admin Imports
import MainDashboard from "views/admin/default";
import MaterialTopics from "views/admin/materialTopics";
import Entities from "views/admin/entities";
import Units from "views/admin/units";
import Metrics from "views/admin/metrics";
import Targets from "views/admin/targets";
import Goals from "views/admin/goals";

// Admin Edit Imports (for creating & editing a doc)
import MaterialTopic from "views/admin/materialTopic";
import Unit from "views/admin/unit";
import Entity from "views/admin/entity";
import Metric from "views/admin/metric";
import Goal from "views/admin/goal";
import Target from "views/admin/target";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import SignUpCentered from "views/auth/signUp";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Material Topics",
    layout: "/admin",
    icon: <Icon as={MdTopic} width="20px" height="20px" color="inherit" />,
    path: "/material-topics",
    component: MaterialTopics,
  },
  {
    name: "Edit Material Topic",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/material-topic/:id",
    component: MaterialTopic,
    hide: true,
  },
  {
    name: "New Material Topic",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/material-topic",
    component: MaterialTopic,
    hide: true,
  },
  {
    name: "Units",
    layout: "/admin",
    icon: <Icon as={MdAcUnit} width="20px" height="20px" color="inherit" />,
    path: "/units",
    component: Units,
  },
  {
    name: "Edit Unit",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/unit/:id",
    component: Unit,
    hide: true,
  },
  {
    name: "New Unit",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/unit",
    component: Unit,
    hide: true,
  },
  {
    name: "Entities",
    layout: "/admin",
    icon: <Icon as={BsLayersFill} width="20px" height="20px" color="inherit" />,
    path: "/entities",
    component: Entities,
  },
  {
    name: "Edit Entities",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/entity/:id",
    component: Entity,
    hide: true,
  },
  {
    name: "New Entities",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/entity",
    component: Entity,
    hide: true,
  },
  {
    name: "Metrics ",
    layout: "/admin",
    icon: <Icon as={RiRulerFill} width="20px" height="20px" color="inherit" />,
    path: "/metrics",
    component: Metrics,
  },
  {
    name: "Edit Metrics ",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/metric/:id",
    component: Metric,
    hide: true,
  },
  {
    name: "New Metrics ",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/metric",
    component: Metric,
    hide: true,
  },
  {
    name: "Goals",
    layout: "/admin",
    icon: <Icon as={GiStairsGoal} width="20px" height="20px" color="inherit" />,
    path: "/goals",
    component: Goals,
  },
  {
    name: "Edit Goals",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/goal/:id",
    component: Goal,
    hide: true,
  },
  {
    name: "New Goals",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/goal",
    component: Goal,
    hide: true,
  },
  {
    name: "Targets",
    layout: "/admin",
    icon: <Icon as={FiTarget} width="20px" height="20px" color="inherit" />,
    path: "/targets",
    component: Targets,
  },
  {
    name: "Edit Targets",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/target/:id",
    component: Target,
    hide: true,
  },
  {
    name: "New Targets",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/target",
    component: Target,
    hide: true,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "/sign-up",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignUpCentered,
  },
];

export default routes;
