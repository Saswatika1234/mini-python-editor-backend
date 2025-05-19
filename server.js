const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/run", async (req, res) => {
  const { language, code, input } = req.body;

  try {
    const result = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language,
      source: code,
      stdin: input
    });

    res.json({ output: result.data.output });
  } catch (error) {
    res.status(500).json({ output: "Error running code." });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
