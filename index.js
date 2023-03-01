const express = require("express");
const fs = require("fs-extra");

const app = express();

app.use("/", express.static("public"));

app.get("*", async (req, res) => {
  try {
    const file = Buffer.from(
      await fetch(`http://www.redistrictinggame.org/game${req.path}`).then((res) => res.arrayBuffer())
    );
    let path = req.path.split("/");
    path.pop();
    path = path.join("/");
    fs.ensureDirSync(`public${path}`);
    fs.writeFile(`public${req.path}`, file);
    res.send(file);
  } catch (err) {
    console.error(err);
    res.status(404);
    res.end();
  }
});

app.listen(3071);
