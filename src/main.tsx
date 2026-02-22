import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import { routes } from './routes/index.tsx'
import { Provider } from 'react-redux'
import { store } from './store/configure.ts'

const router = createBrowserRouter([
  {
    Component: () => (
      <Suspense fallback={<>... is loading</>}>
        <App>
          <Outlet />
        </App>
      </Suspense>
    ),
    // TODO: ErrorBoundary
    children: routes

  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
