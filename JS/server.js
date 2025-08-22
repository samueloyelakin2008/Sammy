import express from "express";
import cors from "cors";
import helmet from "helmet";
import fetch from "node-fetch";
import { send } from "@emailjs/nodejs";

const app = express();
app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: "Missing fields" });
  try {
    if (!process.env.APPS_SCRIPT_URL) throw new Error("APPS_SCRIPT_URL not set");
    const gsResp = await fetch(process.env.APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });
    if (!gsResp.ok) {
      const txt = await gsResp.text();
      throw new Error("Apps Script error: " + txt);
    }

    if (process.env.EMAILJS_SERVICE && process.env.EMAILJS_TEMPLATE && process.env.EMAILJS_PUBLIC && process.env.EMAILJS_PRIVATE) {
      await send(
        process.env.EMAILJS_SERVICE,
        process.env.EMAILJS_TEMPLATE,
        { name, email, message },
        { publicKey: process.env.EMAILJS_PUBLIC, privateKey: process.env.EMAILJS_PRIVATE }
      );
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to send" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
