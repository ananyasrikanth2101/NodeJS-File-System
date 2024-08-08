// const express = require("express");
// const bodyParser = require("body-parser");
// const { createFileAsync } = require("./utils/filesystem");
// const httpServer = express();

// httpServer.use(bodyParser.json());

// httpServer.listen(3000, "localhost", () => {
//   console.log("server started @", `http://localhost:3000`);
// });

// httpServer.get("/", (req, res) => {
//   return res.json({
//     name: "ananya",
//     age: 20,
//   });
// });
// httpServer.get("/todos", (req, res) => {
//   console.log(res);
//   return res.json({
//     message: "todos fetched successfully",
//     data: todos,
//   });
// });

// const todos = [
//   {
//     id: 1,
//     title: "create npm project",
//   },
//   {
//     id: 2,
//     title: "install necessary dependancies",
//   },
// ];

// httpServer.post("/createTodo", (req, res) => {
//   todos.push(req.body);
//   return res.json({
//     message: "data created successfully",
//   });
// });

// httpServer.get("/todo/:todoId", (req, res) => {
//   const { todoId } = req.params;
//   const matchingData = todos.find((todo) => todo.id == todoId);
//   if (matchingData) {
//     return res.status(200).json({
//       message: "todos fetched successfully",
//       todo: matchingData,
//     });
//   } else {
//     return res.status(404).json({
//       message: "no todos found",
//       todo: matchingData,
//     });
//   }
// });

// httpServer.post("/createFile", async (req, res) => {
//   try {
//     const response = await createFileAsync();
//   } catch (err) {
//     console.log(err);
//   }
//   return res.status(200).json({
//     message: "file created successfully",
//   });
// });

// const express = require("express");
// const bodyParser = require("body-parser");
// const fs = require("fs");
// const path = require("path");
// const moment = require("moment-timezone");

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());

// const folderPath = path.join(__dirname, "texts");

// if (!fs.existsSync(folderPath)) {
//   fs.mkdirSync(folderPath);
// }

// app.post("/create-file", (req, res) => {
//   try {
//     const istTime = moment().tz("Asia/Kolkata").format("DD-MM-YYYY-HH-mm-ss");
//     const filename = `${istTime}.txt`;
//     const filePath = path.join(folderPath, filename);

//     fs.writeFile(filePath, istTime, (err) => {
//       if (err) {
//         return res.status(500).json({ error: "Failed to create file" });
//       }
//       res.status(200).json({ message: "File created", filename });
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// });

// app.get("/get-files", (req, res) => {
//   fs.readdir(folderPath, (err, files) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to retrieve files" });
//     }
//     res.status(200).json({ files });
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Folder where the text files will be stored
const folderPath = path.join(__dirname, "texts");

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// API endpoint to create a text file with the current timestamp in IST
app.post("/create-file", (req, res) => {
  try {
    const istTime = moment().tz("Asia/Kolkata").format("DD-MM-YYYY-HH-mm-ss");
    const filename = `${istTime}.txt`;
    const filePath = path.join(folderPath, filename);

    fs.writeFile(filePath, istTime, (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to create file" });
      }
      res.status(200).json({ message: "File created", filename });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// API endpoint to retrieve all text files in the folder
app.get("/get-files", (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve files" });
    }
    res.status(200).json({ files });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

