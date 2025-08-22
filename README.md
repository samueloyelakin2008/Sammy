# Oyelakin Samuel Adeoye — Portfolio

This repository contains:
- **index.html** (Tailwind + vanilla JS) — no Firebase, human‑authored UI.
- **server.js** (Express) — hides keys on the server and proxies contact messages to:
  - **Google Apps Script** (saves to Google Sheet)
  - **EmailJS** (optional email notification)
- **render.yaml** — deploy the backend on Render with environment variables.
- **package.json** — backend dependencies.

---

## 1) Frontend setup

- Open `index.html` and replace `RENDER_BACKEND_BASE_URL` with your Render URL, e.g.
  `https://portfolio-backend.onrender.com`.

- **CV button:** upload your CV PDF to Google Drive → Get share link (Anyone with link).
  - Extract the file ID from a URL like `https://drive.google.com/file/d/FILE_ID/view`.
  - For local preview, paste the ID into the “CV download” card on the site.
  - For production, replace the `href` of the `#resumeLink` in HTML with:
    `https://drive.google.com/uc?export=download&id=FILE_ID`

Images:
- Put your images in `/images/samuel-profile.jpg` and `/images/samuel-working.jpg` (or edit paths).

---

## 2) Google Apps Script (saves to Google Sheet)

1. Create a Google Sheet with headers: `timestamp, name, email, message`.
2. In Google Drive → New → Google Apps Script. Paste this code:

```javascript
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getSheetByName('Sheet1');
    sheet.appendRow([new Date(), body.name, body.email, body.message]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Replace `YOUR_SHEET_ID` with your sheet’s ID.
4. Deploy → **New deployment** → type **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the **Web app URL** and set it as `APPS_SCRIPT_URL` on Render.

---

## 3) Email notifications (EmailJS on server)

- Create a service + template in EmailJS.
- On Render, set environment variables:
  - `EMAILJS_SERVICE`
  - `EMAILJS_TEMPLATE`
  - `EMAILJS_PUBLIC`
  - `EMAILJS_PRIVATE`

If you prefer, swap EmailJS for Nodemailer in `server.js`.

---

## 4) Deploy backend to Render

- Push these files to a GitHub repo.
- On Render → **New Web Service** → Connect repo.
- Render auto-detects Node. It will use `render.yaml`.
- Add the env vars (Apps Script + optional EmailJS).

Your backend URL will look like: `https://YOUR-SERVICE.onrender.com`

---

## 5) Wire frontend to backend

In `index.html`, find:

```js
fetch('RENDER_BACKEND_BASE_URL/contact', { ... })
```

Replace with your actual Render URL (no trailing slash).

---

## 6) Security notes

- All secrets live in Render env vars (never in frontend).
- CORS is open by default; restrict `origin` in `server.js` for production.
- Consider adding a captcha or a simple honeypot if spam becomes an issue.
