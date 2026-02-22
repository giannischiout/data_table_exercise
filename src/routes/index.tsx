import { lazy } from "react";
import type { RouteObject } from "react-router";


const Home = lazy(() => import('../pages/Home.tsx'))
const ViewEmployee = lazy(() => import('../pages/ViewEmployee.tsx'))

export const routes: RouteObject[] = [
  {
    index: true,
    Component: () => <Home />
  },
  {
    path: '/employee/:id',
    Component: () => <ViewEmployee />
  }
]