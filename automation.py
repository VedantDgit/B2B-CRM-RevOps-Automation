
import pandas as pd

HIGH_VALUE_SOURCES = {"Website", "LinkedIn"}
HIGH_VALUE_TITLES = {"CEO", "CTO", "Director", "Head", "Manager"}

def prepare_contacts(contacts: pd.DataFrame) -> pd.DataFrame:
    df = contacts.copy()
    df["Priority Score"] = 0

    df.loc[df["Lead Source"].isin(HIGH_VALUE_SOURCES), "Priority Score"] += 10

    title_text = df["Job Title"].fillna("").str.lower()
    df.loc[title_text.str.contains(r"ceo|cto|director|head|manager", regex=True), "Priority Score"] += 20

    df["Follow-up Required"] = (
        (df["Lead Status"].isin(["New", "Qualified"])) &
        (df["Priority Score"] >= 20)
    )

    df["Automation Action"] = df["Follow-up Required"].map(
        {True: "Create sales follow-up task", False: "No action"}
    )
    return df

def proposal_followups(deals: pd.DataFrame) -> pd.DataFrame:
    df = deals.copy()
    df["Follow-up Required"] = df["Deal Stage"].eq("Proposal Sent")
    df["Automation Action"] = df["Follow-up Required"].map(
        {True: "Follow up on proposal", False: "No action"}
    )
    return df
