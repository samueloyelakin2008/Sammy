import express from "express";
import cors from "cors";
import helmet from "helmet";
import fetch from "node-fetch";

const app = express();
app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

// health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// save to Google Sheets
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message)
    return res.status(400).json({ error: "Missing fields" });

  try {
    if (!process.env.APPS_SCRIPT_URL)
      throw new Error("APPS_SCRIPT_URL not set");

    const gsResp = await fetch(process.env.APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (!gsResp.ok) throw new Error(await gsResp.text());

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to save" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
