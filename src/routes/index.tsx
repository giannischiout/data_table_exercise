import { lazy } from "react";
import type { RouteObject } from "react-router";


const Home = lazy(() => import('../pages/Home.tsx'))

export const routes: RouteObject[] = [
  {
    index: true,
    Component: () => <Home />
  }
]