// Nexora B2B CRM & RevOps Data Model
const initialCompanies = [
  { "Company Name": "TechCorp Solutions", "Industry": "SaaS", "Employees": 250, "Domain": "techcorp.example" },
  { "Company Name": "DataNova Systems", "Industry": "IT Services", "Employees": 500, "Domain": "datanova.example" },
  { "Company Name": "BrightEdge Labs", "Industry": "Software", "Employees": 120, "Domain": "brightedge.example" },
  { "Company Name": "CloudSphere", "Industry": "Cloud Services", "Employees": 800, "Domain": "cloudsphere.example" },
  { "Company Name": "Finova Technologies", "Industry": "FinTech", "Employees": 350, "Domain": "finova.example" }
];

const initialContacts = [
  { "First Name": "Rahul", "Last Name": "Sharma", "Email": "rahul.sharma@techcorp.example", "Phone Number": "+91 90000 10001", "Job Title": "Marketing Manager", "Company Name": "TechCorp Solutions", "Lead Source": "Website", "Lead Status": "New" },
  { "First Name": "Neha", "Last Name": "Singh", "Email": "neha.singh@techcorp.example", "Phone Number": "+91 90000 10002", "Job Title": "Sales Manager", "Company Name": "TechCorp Solutions", "Lead Source": "LinkedIn", "Lead Status": "Qualified" },
  { "First Name": "Aarav", "Last Name": "Mehta", "Email": "aarav.mehta@techcorp.example", "Phone Number": "+91 90000 10003", "Job Title": "CTO", "Company Name": "TechCorp Solutions", "Lead Source": "Referral", "Lead Status": "Contacted" },
  { "First Name": "Kavya", "Last Name": "Patil", "Email": "kavya.patil@techcorp.example", "Phone Number": "+91 90000 10004", "Job Title": "Operations Head", "Company Name": "TechCorp Solutions", "Lead Source": "Webinar", "Lead Status": "Demo Scheduled" },
  { "First Name": "Priya", "Last Name": "Mehta", "Email": "priya.mehta@datanova.example", "Phone Number": "+91 90000 10005", "Job Title": "Sales Director", "Company Name": "DataNova Systems", "Lead Source": "LinkedIn", "Lead Status": "Qualified" },
  { "First Name": "Rohan", "Last Name": "Verma", "Email": "rohan.verma@datanova.example", "Phone Number": "+91 90000 10006", "Job Title": "CEO", "Company Name": "DataNova Systems", "Lead Source": "Referral", "Lead Status": "Proposal Sent" },
  { "First Name": "Ishita", "Last Name": "Rao", "Email": "ishita.rao@datanova.example", "Phone Number": "+91 90000 10007", "Job Title": "Marketing Manager", "Company Name": "DataNova Systems", "Lead Source": "Website", "Lead Status": "New" },
  { "First Name": "Aditya", "Last Name": "Joshi", "Email": "aditya.joshi@datanova.example", "Phone Number": "+91 90000 10008", "Job Title": "IT Manager", "Company Name": "DataNova Systems", "Lead Source": "Webinar", "Lead Status": "Contacted" },
  { "First Name": "Arjun", "Last Name": "Patel", "Email": "arjun.patel@brightedge.example", "Phone Number": "+91 90000 10009", "Job Title": "CTO", "Company Name": "BrightEdge Labs", "Lead Source": "Referral", "Lead Status": "Demo Scheduled" },
  { "First Name": "Ananya", "Last Name": "Shah", "Email": "ananya.shah@brightedge.example", "Phone Number": "+91 90000 10010", "Job Title": "Marketing Head", "Company Name": "BrightEdge Labs", "Lead Source": "Website", "Lead Status": "Qualified" },
  { "First Name": "Vikram", "Last Name": "Desai", "Email": "vikram.desai@brightedge.example", "Phone Number": "+91 90000 10011", "Job Title": "Business Development Manager", "Company Name": "BrightEdge Labs", "Lead Source": "LinkedIn", "Lead Status": "Contacted" },
  { "First Name": "Pooja", "Last Name": "Kulkarni", "Email": "pooja.kulkarni@brightedge.example", "Phone Number": "+91 90000 10012", "Job Title": "Product Manager", "Company Name": "BrightEdge Labs", "Lead Source": "Webinar", "Lead Status": "New" },
  { "First Name": "Sneha", "Last Name": "Rao", "Email": "sneha.rao@cloudsphere.example", "Phone Number": "+91 90000 10013", "Job Title": "Operations Manager", "Company Name": "CloudSphere", "Lead Source": "Webinar", "Lead Status": "Qualified" },
  { "First Name": "Karan", "Last Name": "Joshi", "Email": "karan.joshi@cloudsphere.example", "Phone Number": "+91 90000 10014", "Job Title": "IT Manager", "Company Name": "CloudSphere", "Lead Source": "LinkedIn", "Lead Status": "Proposal Sent" },
  { "First Name": "Meera", "Last Name": "Nair", "Email": "meera.nair@cloudsphere.example", "Phone Number": "+91 90000 10015", "Job Title": "Sales Director", "Company Name": "CloudSphere", "Lead Source": "Website", "Lead Status": "Demo Scheduled" },
  { "First Name": "Ritesh", "Last Name": "Gupta", "Email": "ritesh.gupta@cloudsphere.example", "Phone Number": "+91 90000 10016", "Job Title": "CEO", "Company Name": "CloudSphere", "Lead Source": "Referral", "Lead Status": "Closed Won" },
  { "First Name": "Aman", "Last Name": "Gupta", "Email": "aman.gupta@finova.example", "Phone Number": "+91 90000 10017", "Job Title": "Product Manager", "Company Name": "Finova Technologies", "Lead Source": "Website", "Lead Status": "New" },
  { "First Name": "Simran", "Last Name": "Kapoor", "Email": "simran.kapoor@finova.example", "Phone Number": "+91 90000 10018", "Job Title": "Business Manager", "Company Name": "Finova Technologies", "Lead Source": "LinkedIn", "Lead Status": "Qualified" },
  { "First Name": "Nikhil", "Last Name": "Sharma", "Email": "nikhil.sharma@finova.example", "Phone Number": "+91 90000 10019", "Job Title": "Finance Director", "Company Name": "Finova Technologies", "Lead Source": "Referral", "Lead Status": "Negotiation" },
  { "First Name": "Diya", "Last Name": "Mishra", "Email": "diya.mishra@finova.example", "Phone Number": "+91 90000 10020", "Job Title": "Marketing Manager", "Company Name": "Finova Technologies", "Lead Source": "Webinar", "Lead Status": "Contacted" }
];

const initialDeals = [
  { "Deal Name": "TechCorp Enterprise Plan", "Company Name": "TechCorp Solutions", "Amount": 500000, "Deal Stage": "Proposal Sent" },
  { "Deal Name": "TechCorp Growth Plan", "Company Name": "TechCorp Solutions", "Amount": 250000, "Deal Stage": "Qualified" },
  { "Deal Name": "DataNova CRM Implementation", "Company Name": "DataNova Systems", "Amount": 350000, "Deal Stage": "Demo Scheduled" },
  { "Deal Name": "DataNova Enterprise Package", "Company Name": "DataNova Systems", "Amount": 600000, "Deal Stage": "Negotiation" },
  { "Deal Name": "BrightEdge SaaS Package", "Company Name": "BrightEdge Labs", "Amount": 200000, "Deal Stage": "Contacted" },
  { "Deal Name": "BrightEdge Enterprise", "Company Name": "BrightEdge Labs", "Amount": 450000, "Deal Stage": "Qualified" },
  { "Deal Name": "CloudSphere Enterprise", "Company Name": "CloudSphere", "Amount": 750000, "Deal Stage": "Negotiation" },
  { "Deal Name": "CloudSphere Growth Plan", "Company Name": "CloudSphere", "Amount": 300000, "Deal Stage": "Demo Scheduled" },
  { "Deal Name": "Finova CRM Package", "Company Name": "Finova Technologies", "Amount": 400000, "Deal Stage": "Proposal Sent" },
  { "Deal Name": "Finova Enterprise Solution", "Company Name": "Finova Technologies", "Amount": 800000, "Deal Stage": "Closed Won" }
];

// Dual environment export (Browser + Node)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initialCompanies, initialContacts, initialDeals };
}
