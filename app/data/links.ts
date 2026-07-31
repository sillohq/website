/**
 * External destinations the site links to.
 *
 * These are deliberately constants rather than build-time environment
 * variables. The site is a single public marketing page with one set of real
 * destinations — there is no staging docs site to point at — so reading them
 * from `import.meta.env` only created a way for a deploy to ship with the
 * wrong links, or with none at all when the variable was missing.
 */

/** The documentation site. */
export const DOCS_URL = 'https://docs.sillo.build'

/** The framework repository. */
export const GITHUB_URL = 'https://github.com/sillohq/core'

/** Deep links into the docs, so the paths live in one place too. */
export const DOCS_LINKS = {
  installation: `${DOCS_URL}/guides/installation/`,
  introduction: `${DOCS_URL}/guides/introduction/`,
  apiReference: `${DOCS_URL}/reference/plugin-api/`,
  contributing: `${DOCS_URL}/community/contribution-guide/`,
} as const
