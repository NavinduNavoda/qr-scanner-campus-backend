import Database from "better-sqlite3";
import { registerNewUser } from "../auth/functions/auth.register";
import fs from "fs";
import path from "path";

const sqliteDB = new Database("db/sqlite.db", { verbose: console.log });

export const addDefaultUserToUserTable = () => {
 
  const userExistsQuery = "SELECT COUNT(*) as count FROM user";
  const { count }: any = sqliteDB.prepare(userExistsQuery).get();

  if (count == 0) {

    registerNewUser({
      username: "devstudent",
      password: "devpass",
      email: "student@gmail.com",
      name: "Joe Sis",
      phone: "0763225511",
      sc_number: "123456",
      role: "student",
    });

    registerNewUser({
      username: "devdemo",
      password: "devpass",
      email: "demo@gmail.com",
      name: "Joe Mama",
      phone: "0766332277",
      role: "demo",
    });

    registerNewUser({
      username: "devlec",
      password: "devpass",
      email: "lecturer@gmail.com",
      name: "Joe Dada",
      phone: "0766332288",
      role: "lecturer",
    });

    console.log("[*] Users added to user table.");
  }
};

export const createTables = () => {

  // Read the SQL file
  let sqlPath = path.join(__dirname, 'user.tables.sql');
  let sql = fs.readFileSync(sqlPath, 'utf8');
  sqliteDB.exec(sql);

  sqlPath = path.join(__dirname, 'business.tables.sql');
  sql = fs.readFileSync(sqlPath, 'utf8');
  sqliteDB.exec(sql);

  console.log("[*] Tables Created.");
}

export default sqliteDB;
