// ============================================================
// models/serviceModel.js
// This file contains the functions that read and write
// community service records to the database.
// ============================================================
//
// ✏️  TASK (COMMENT): Each function below has a comment placeholder.
//     Replace each placeholder with a real comment that explains:
//       1. What the function does
//       2. What parameters it takes (if any)
//       3. What it returns
//
// ============================================================

const db = require('../db');

// COMMENT FOR getAllRecords:This code pulls data from the service records databse and orders it by activity date with no parameters. The code returns a promise that the data will be fulfilled.
const getAllRecords = async () => {
  const res = await db.query(
    'SELECT * FROM service_records ORDER BY activity_date DESC'
  );
  return res.rows;
};

// COMMENT FOR addRecord:This code adds a students community service hours to the existing database while using the parameters of the student name, student id, hiurs worked, date worked, and organizations to return a list/array.
const addRecord = async (student_name, student_id, activity_date, hours, recipient) => {
  const res = await db.query(
    `INSERT INTO service_records
       (student_name, student_id, activity_date, hours, recipient)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [student_name, student_id, activity_date, hours, recipient]
  );
  return res.rows[0];
};

// COMMENT FOR getHoursByStudent:This code under no parameters ask the database to pull all of a  students community service hours by name and student id and returns an ordered list of the students by s\student name.
const getHoursByStudent = async () => {
  const res = await db.query(
    `SELECT student_name, student_id, SUM(hours) AS total_hours
     FROM service_records
     GROUP BY student_name, student_id
     ORDER BY student_name ASC`
  );
  return res.rows;
};

module.exports = { getAllRecords, addRecord, getHoursByStudent };
