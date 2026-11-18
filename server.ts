import 'dotenv/config';
import express, {type Request, type Response} from 'express';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createApiApp} from './api/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';
const isVercel = Boolean(process.env.VERCEL);

const app = createApiApp();

async function startServer() {
  if (!isProduction && !isVercel) {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  if (!isVercel) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor Abonos Naturales escuchando en http://0.0.0.0:${PORT}`);
    });
  }
}

if (!isVercel) {
  startServer();
}

export default app;
