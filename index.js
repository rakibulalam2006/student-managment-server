const express = require("express");
const fs = require("fs").promises;
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("student managment server is running ");
});

//  read opreation
app.get("/students", async (req, res) => {
  try {
    const data = await fs.readFile("./data/students.json");
    const students = JSON.parse(data);
    res.send(students);
  } finally {
  }
});

// write operation
app.post("/students", async (req, res) => {
  const newStudent = { id: Date.now(), ...req.body };
  const data = await fs.readFile("./data/students.json");
  const students = JSON.parse(data);
  students.push(newStudent);
  await fs.writeFile("./data/students.json", JSON.stringify(students, null, 2));
  res.send(newStudent);
});

// remove students(delete operation)
app.delete("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await fs.readFile("./data/students.json");
    const students = JSON.parse(data);
    const reaminingStudents = students.filter((student) => student.id != id);
    await fs.writeFile(
      "./data/students.json",
      JSON.stringify(reaminingStudents, null, 2),
    );
    res.send(reaminingStudents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete student" });
  } finally {
  }
});

// update students
app.patch("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const updatedStudent = req.body;

    const data = await fs.readFile("./data/students.json");

    const students = JSON.parse(data);
    const index = students.findIndex((student) => student.id == id);

    students[index] = {
      ...students[index],
      ...updatedStudent,
    };

    await fs.writeFile(
      "./data/students.json",
      JSON.stringify(students, null, 2),
    );

    res.send(student);
  } finally {
  }
});

app.listen(port, () => {
  console.log(`student management server is running on port ${port}`);
});
