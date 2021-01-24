import { Server} from 'http';
import express, { Express, Request, Response } from 'express';
import socketIO from 'socket.io';
import catchUncatched from './utils/catchUncatched';
import createEndpoint from './utils/createEndpoint';


const app: Express = express();
app.set('port', process.env.PORT || "3001");


const server: Server = app.listen(app.get('port'), () => console.log('Server is running...'));

catchUncatched(server);

const router = createEndpoint(app);

router.get("/123", (req: Request, res: Response) => {
    console.log('1312');
    res.json({ test: "123" });
  });

const io = new socketIO.Server(server);

io.on('connection', () => {
    console.log('new connection');
});
