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
import { UserDelRouter } from './server/routes/users-delete.routes';
import { UserModifyRouter } from './server/routes/users-modify.routes';
import { SingleUserDetailsRouter } from './server/routes/single-user.routes';

const app = express();
const port = 3000;

createTables();
addDefaultUserToUserTable();


app.use(express.json());
app.use(cookieParser());

app.use("/auth", AuthRouter);

// routes configurations
app.use("/", authProtectAboveStudent, StudentRouter);
app.use("/", authProtectAboveStudent, SingleUserDetailsRouter);
app.use("/", authProtectAboveDemo, CourseRouter);
app.use("/", authProtectAboveDemo, LectureRouter);
app.use("/", authProtectAboveDemo, StudentGroupRouter);
app.use("/", authProtectAboveDemo, UserDetailsRouter);
app.use("/", authProtectAboveLecturer, UserAddRouter);
app.use("/", authProtectAboveLecturer, UserDelRouter);
app.use("/", authProtectAboveLecturer, UserModifyRouter);





app.get('/', (req: Request, res: Response) => {
  res.send('Hello!');
});

app.get("/protected/student", authProtectAboveStudent as any, (req: Request, res: Response) => {
  res.send("Protected Student Route");
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});