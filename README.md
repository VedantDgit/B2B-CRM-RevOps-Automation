# B2B Sales CRM & RevOps Implementation Demo

## Objective
A portfolio project demonstrating how CRM data can be structured, analyzed, and turned into business workflows for a B2B sales team.

## CRM model
- Companies
- Contacts
- Deals
- Deal stages
- Lead source
- Lead status

## Business process
Lead → Contacted → Qualified → Demo Scheduled → Proposal Sent → Negotiation → Closed Won/Lost

## Automation rules
1. Website/LinkedIn leads with relevant decision-maker job titles receive a higher priority score.
2. New/Qualified high-priority leads are flagged for a sales follow-up task.
3. Deals in "Proposal Sent" are flagged for proposal follow-up.

## Dashboard
The Streamlit dashboard reports:
- companies
- contacts
- pipeline value
- closed-won revenue
- deals by stage
- leads by source
- required follow-ups

## Run locally

```bash
pip install -r requirements.txt
streamlit run streamlit_app.py
```

## HubSpot component
The CRM records used in this demo were designed to mirror the HubSpot CRM structure: companies, contacts, associated deals, and a sales pipeline. HubSpot is used for the CRM implementation/demo data, while this Python layer demonstrates reporting and business-rule automation without requiring paid HubSpot workflow features.

## Interview talking point
"I configured a B2B CRM data model with companies, contacts, associated deals, and a sales pipeline. Because native lead scoring/workflow features can depend on the HubSpot subscription, I implemented the business rules and reporting layer in Python. This allowed me to demonstrate the same RevOps concepts—qualification, follow-up automation, pipeline reporting, and data-driven decision making—without claiming paid HubSpot features that I didn't have access to."
