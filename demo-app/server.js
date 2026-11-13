// Tiny static server for the Ticket-to-Test demo store. Node built-ins only.
// Serves this folder on http://localhost:4174
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4174;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };

const server = http.createServer((req, res) => {
  let file = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const full = path.join(__dirname, file);
  if (!full.startsWith(__dirname) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
    res.writeHead(404); res.end('Not found'); return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(full)] || 'application/octet-stream' });
  fs.createReadStream(full).pipe(res);
});

server.listen(PORT, () => console.log('Ticket-to-Test demo store on http://localhost:' + PORT));
