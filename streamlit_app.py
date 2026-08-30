
import pandas as pd
import streamlit as st
from automation import prepare_contacts, proposal_followups

st.set_page_config(page_title="Nexora CRM RevOps Dashboard", layout="wide")

st.title("Nexora B2B CRM & RevOps Dashboard")
st.caption("Portfolio implementation demo: CRM data → business rules → follow-up automation → reporting")

companies = pd.read_csv("data/companies.csv")
contacts = pd.read_csv("data/contacts.csv")
deals = pd.read_csv("data/deals.csv")

contact_actions = prepare_contacts(contacts)
deal_actions = proposal_followups(deals)

total_pipeline = deals["Amount"].sum()
won_revenue = deals.loc[deals["Deal Stage"] == "Closed Won", "Amount"].sum()
qualified = (contacts["Lead Status"] == "Qualified").sum()
followups = contact_actions["Follow-up Required"].sum() + deal_actions["Follow-up Required"].sum()

c1, c2, c3, c4 = st.columns(4)
c1.metric("Companies", len(companies))
c2.metric("Contacts", len(contacts))
c3.metric("Open Pipeline", f"₹{total_pipeline:,.0f}")
c4.metric("Follow-ups Required", int(followups))

st.divider()

left, right = st.columns(2)

with left:
    st.subheader("Deals by Stage")
    stage_counts = deals["Deal Stage"].value_counts().rename_axis("Stage").reset_index(name="Deals")
    st.bar_chart(stage_counts.set_index("Stage"))

with right:
    st.subheader("Leads by Source")
    source_counts = contacts["Lead Source"].value_counts().rename_axis("Source").reset_index(name="Leads")
    st.bar_chart(source_counts.set_index("Source"))

st.subheader("Pipeline Summary")
st.write(f"**Closed-won revenue:** ₹{won_revenue:,.0f}")
st.dataframe(deals, use_container_width=True, hide_index=True)

st.subheader("Automated Lead Follow-ups")
st.dataframe(
    contact_actions[contact_actions["Follow-up Required"]][
        ["First Name","Last Name","Company Name","Lead Source","Lead Status","Priority Score","Automation Action"]
    ],
    use_container_width=True,
    hide_index=True,
)

st.subheader("Proposal Follow-ups")
st.dataframe(
    deal_actions[deal_actions["Follow-up Required"]][
        ["Deal Name","Company Name","Amount","Deal Stage","Automation Action"]
    ],
    use_container_width=True,
    hide_index=True,
)

with st.expander("Business Process"):
    st.code("""Lead Source
    ↓
CRM Contact
    ↓
Lead Status
    ↓
Business Rules
    ↓
Follow-up Task
    ↓
Sales Pipeline
    ↓
Reporting Dashboard""")
