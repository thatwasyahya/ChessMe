const express = require('express');
const app = express();

// Middleware pour définir les en-têtes CSP
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' wss://example-websocket-server.com wss://glorious-xylophone-gv56957599vh9xgq-3000.app.github.dev:3000; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://data1.seconetic.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-src 'none'; font-src 'self';");
  next();
});

// Autres configurations et routes
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
