import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ThemeProvider } from '../theme'

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Sillo: The batteries-included async Python framework' },
      {
        name: 'description',
        content:
          'An async Python web framework where the ORM, auth, background work, websockets and HTTP layer are one product. Declare auth once: it gates the route and writes the OpenAPI spec.',
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