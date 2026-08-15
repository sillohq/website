import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ThemeProvider } from '../theme'

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Sillo: Async Python Web Framework with ORM, Auth and Queues' },
      {
        name: 'description',
        content:
          'Sillo is an async Python web framework for APIs, real-time apps and production backends. The ORM, authentication, admin, job queues, scheduler and WebSockets are already in place and share one configuration model.',
      },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg' },
    ],
  }),
})

function RootComponent() {
  return (
    <html lang="en" className="dark">
      <head />
      <body>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
      </body>
    </html>
  )
}