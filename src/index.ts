// import 'module-alias/register';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import { addDefaultUserToUserTable, createTables } from './sqlite/db.sqlite';
import AuthRouter from './server/routes/auth.routes';
import { authProtectAboveStudent } from './auth/middleware/roleProtect';

const app = express();
const port = 3000;

createTables();
addDefaultUserToUserTable();


app.use(express.json());
app.use(cookieParser());

app.use("/auth", AuthRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello!');
});

app.get("/protected/student", authProtectAboveStudent as any, (req: Request, res: Response) => {
  res.send("Protected Student Route");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});