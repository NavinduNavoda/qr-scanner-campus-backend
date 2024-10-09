// import 'module-alias/register';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import { addDefaultUserToUserTable, createTables } from './sqlite/db.sqlite';
import AuthRouter from './server/routes/auth.routes';
import { authProtectAboveDemo, authProtectAboveLecturer, authProtectAboveStudent } from './auth/middleware/roleProtect';
import { StudentRouter } from './server/routes/student.routes';
import { CourseRouter } from './server/routes/course.routes';
import { LectureRouter } from './server/routes/lecture.routes';
import { StudentGroupRouter } from './server/routes/student-group.routes';
import { UserDetailsRouter } from './server/routes/users-details.routes';
import { UserAddRouter } from './server/routes/users-add.routes';

const app = express();
const port = 3000;

createTables();
addDefaultUserToUserTable();


app.use(express.json());
app.use(cookieParser());

app.use("/auth", AuthRouter);

// routes configurations
app.use("/", authProtectAboveStudent, StudentRouter);
app.use("/", authProtectAboveDemo, CourseRouter);
app.use("/", authProtectAboveDemo, LectureRouter);
app.use("/", authProtectAboveDemo, StudentGroupRouter);
app.use("/", authProtectAboveDemo, UserDetailsRouter);
app.use("/", authProtectAboveLecturer, UserAddRouter);





app.get('/', (req: Request, res: Response) => {
  res.send('Hello!');
});

app.get("/protected/student", authProtectAboveStudent as any, (req: Request, res: Response) => {
  res.send("Protected Student Route");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});