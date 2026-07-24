import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ThemeProvider } from '../theme'

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Sillo — The productive Python framework' },
      {
        name: 'description',
        content:
          'Sillo gives Python teams routing, authentication, queues, ORM, mail, validation, scheduling, real-time communication and everything needed to move from idea to production.',
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