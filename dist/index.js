// import 'module-alias/register';
import express from 'express';
import { addDefaultUserToUserTable, createTables } from './sqlite/db.sqlite';
const app = express();
const port = 3000;
createTables();
addDefaultUserToUserTable();
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
