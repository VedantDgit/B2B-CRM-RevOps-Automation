# Nexora B2B Sales CRM & RevOps Executive Dashboard

A modern, production-ready B2B CRM and RevOps dashboard designed for high-performance deployment on **Vercel**. It demonstrates structured CRM data modeling, dynamic lead scoring, automated sales workflows, and pipeline analytics with zero server overhead.

---

## 🚀 Instant Deployment on Vercel

This repository is pre-configured with `vercel.json` and standard web assets for instant 1-click deployment on Vercel.

### Option 1: Deploy via Vercel Web Dashboard (Recommended)

1. **Push your code to GitHub / GitLab / Bitbucket**:
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository (`NimbleGTM_CRM_RevOps_Project`).
4. Keep the default settings (Framework Preset: **Other** / Root Directory: `./`).
5. Click **Deploy**. Your dashboard will be live on a global CDN in under 30 seconds!

---

### Option 2: Deploy via Vercel CLI

1. Run the Vercel CLI directly from your terminal:
   ```bash
   npx vercel
   ```
2. Follow the quick prompts (accept defaults by pressing Enter).
3. For production release:
   ```bash
   npx vercel --prod
   ```

---

## 💻 Local Development

You can preview the dashboard locally using any static web server:

```bash
# Using Node (npx)
npx serve .

# OR using Python
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Core RevOps Architecture & Features

- **Executive KPI Cards**: Real-time aggregation of Total Companies, Active Contacts, Qualified Leads, Open Pipeline Value (₹), Closed-Won ARR (₹), and Automated Follow-up Count.
- **Dynamic Charting (Chart.js)**:
  - Deals distribution by stage (`Closed Won`, `Proposal Sent`, `Negotiation`, `Demo Scheduled`, `Qualified`, `Contacted`).
  - Lead volume breakdown by acquisition channel (`Website`, `LinkedIn`, `Webinar`, `Referral`).
- **Automation Rules Engine**:
  - **Rule 1 (High-Intent Source)**: Website / LinkedIn leads gain an intent bonus.
  - **Rule 2 (Executive Title Match)**: Decision-makers (`CEO`, `CTO`, `Director`, `Head`, `Manager`) receive a seniority bonus.
  - **Rule 3 (Automated Follow-up Trigger)**: Any `New` or `Qualified` contact scoring $\ge 20$ triggers an immediate sales task.
  - **Rule 4 (Proposal Velocity)**: Deals in `Proposal Sent` stage are automatically queued for proposal follow-ups.
- **Interactive Rules Simulator**: Test and adjust scoring weights via real-time sliders to immediately preview pipeline velocity.
- **Data Explorer & Filtering**: Instant global text search, stage dropdown filtering, and 1-click **CSV Export**.
- **Dark / Light Mode**: Executive glassmorphic dark theme with light mode toggle.

---

## 📁 Repository Structure

```
├── index.html        # Main semantic dashboard layout
├── styles.css        # Responsive glassmorphism CSS design system
├── app.js            # Reactive RevOps engine & Chart.js logic
├── data.js           # Structured CRM data (Companies, Contacts, Deals)
├── vercel.json       # Vercel deployment & security headers configuration
├── package.json      # Node.js project metadata for Vercel
├── .gitignore        # Clean Git repository ignore list
├── data/             # Source CSV files
│   ├── companies.csv
│   ├── contacts.csv
│   └── deals.csv
├── automation.py     # Python reference implementation of business rules
└── app.py            # Streamlit reference application (local only)
```

---

## 🎯 Why Vercel over Streamlit?

| Feature | Vercel (Modern Web Engine) | Streamlit |
| :--- | :--- | :--- |
| **Server Architecture** | Serverless Edge CDN | Stateful WebSocket Python Server |
| **Load Times** | Instant (<100ms) | 3-8s container spin-up |
| **Hosting Cost** | $0 (Free Tier Forever) | Requires dedicated server/Streamlit Cloud |
| **Scalability** | Global CDN caching & infinite concurrency | Single-threaded per instance limits |
| **Custom UI/UX** | Bespoke Glassmorphism, animations, dark/light theme | Standard Streamlit component layout |

---

## 💼 Interview Talking Point
> *"I built and deployed a complete B2B CRM and RevOps pipeline engine to Vercel. To eliminate cloud hosting costs and ensure sub-second global response times, I translated complex business rules (seniority scoring, channel attribution, and proposal velocity follow-ups) into a modern client-side and serverless architecture with interactive data exploration, CSV reporting, and a live rules simulator."*
