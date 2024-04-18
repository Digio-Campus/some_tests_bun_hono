import { serveStatic } from 'hono/bun'
import { Hono } from 'hono'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))
app.get('/', (c) => c.text('You can access: /static/hello.txt'))
app.get('*', serveStatic({ path: './static/fallback.txt' }))

export default {
    port: 3000,
    fetch: app.fetch,
}
