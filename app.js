// Nexora B2B CRM & RevOps Engine for Vercel Deployment

// State
let companies = [...initialCompanies];
let contacts = [...initialContacts];
let deals = [...initialDeals];

let ruleConfig = {
  sourceBonus: 10,
  titleBonus: 20,
  scoreThreshold: 20
};

let activeTab = 'deals';
let stageChartInstance = null;
let sourceChartInstance = null;

// High value sources and title patterns
const HIGH_VALUE_SOURCES = new Set(["Website", "LinkedIn"]);
const TITLE_REGEX = /ceo|cto|director|head|manager/i;

// Scoring & Automation Rule Logic
function calculateContactActions(contactList, config = ruleConfig) {
  return contactList.map(c => {
    let score = 0;
    if (HIGH_VALUE_SOURCES.has(c["Lead Source"])) {
      score += config.sourceBonus;
    }
    if (c["Job Title"] && TITLE_REGEX.test(c["Job Title"])) {
      score += config.titleBonus;
    }

    const isEligibleStatus = c["Lead Status"] === "New" || c["Lead Status"] === "Qualified";
    const followUpRequired = isEligibleStatus && score >= config.scoreThreshold;
    const automationAction = followUpRequired ? "Create sales follow-up task" : "No action";

    return {
      ...c,
      "Priority Score": score,
      "Follow-up Required": followUpRequired,
      "Automation Action": automationAction
    };
  });
}

function calculateDealActions(dealList) {
  return dealList.map(d => {
    const followUpRequired = d["Deal Stage"] === "Proposal Sent";
    const automationAction = followUpRequired ? "Follow up on proposal" : "No action";

    return {
      ...d,
      "Follow-up Required": followUpRequired,
      "Automation Action": automationAction
    };
  });
}

// Format Currency
function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Stage Pill CSS Mapper
function getStageBadgeClass(stage) {
  switch (stage) {
    case 'Closed Won': return 'pill pill-won';
    case 'Proposal Sent': return 'pill pill-proposal';
    case 'Qualified': return 'pill pill-qualified';
    case 'Demo Scheduled': return 'pill pill-demo';
    case 'Negotiation': return 'pill pill-negotiation';
    case 'Contacted': return 'pill pill-contacted';
    default: return 'pill pill-new';
  }
}

// Initialize and Update Dashboard
function updateDashboard() {
  const enrichedContacts = calculateContactActions(contacts);
  const enrichedDeals = calculateDealActions(deals);

  // Compute Core Metrics
  const totalPipeline = deals.reduce((acc, d) => acc + Number(d["Amount"]), 0);
  const wonRevenue = deals
    .filter(d => d["Deal Stage"] === "Closed Won")
    .reduce((acc, d) => acc + Number(d["Amount"]), 0);
  const qualifiedContacts = contacts.filter(c => c["Lead Status"] === "Qualified").length;
  const leadFollowups = enrichedContacts.filter(c => c["Follow-up Required"]).length;
  const dealFollowups = enrichedDeals.filter(d => d["Follow-up Required"]).length;
  const totalFollowups = leadFollowups + dealFollowups;

  // Update KPI Cards
  document.getElementById('kpiCompanies').innerText = companies.length;
  document.getElementById('kpiContacts').innerText = contacts.length;
  document.getElementById('kpiQualifiedCount').innerText = qualifiedContacts;
  document.getElementById('kpiPipeline').innerText = formatINR(totalPipeline);
  document.getElementById('kpiWonRevenue').innerText = formatINR(wonRevenue);
  document.getElementById('kpiFollowups').innerText = totalFollowups;
  document.getElementById('leadTasksCount').innerText = leadFollowups;
  document.getElementById('dealTasksCount').innerText = dealFollowups;

  // Render Follow-up Task Lists
  renderFollowupLists(enrichedContacts, enrichedDeals);

  // Render Charts
  renderCharts(deals, contacts);

  // Render Tables
  renderTables(enrichedDeals, enrichedContacts, companies);
}

// Render Task Panels
function renderFollowupLists(enrichedContacts, enrichedDeals) {
  const leadListContainer = document.getElementById('leadFollowupList');
  const filteredLeadFollowups = enrichedContacts.filter(c => c["Follow-up Required"]);

  if (filteredLeadFollowups.length === 0) {
    leadListContainer.innerHTML = `<div style="padding: 16px; color: var(--text-muted); text-align: center;">No contact follow-ups needed.</div>`;
  } else {
    leadListContainer.innerHTML = filteredLeadFollowups.map(c => `
      <div class="task-item">
        <div class="task-main">
          <div class="task-title">
            <span>👤 ${c["First Name"]} ${c["Last Name"]}</span>
            <span class="${getStageBadgeClass(c["Lead Status"])}">${c["Lead Status"]}</span>
          </div>
          <div class="task-meta">
            🏢 ${c["Company Name"]} • 💼 ${c["Job Title"]} • 📍 ${c["Lead Source"]}
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
          <span class="task-badge badge-lead">Score: ${c["Priority Score"]} pts</span>
          <span style="font-size: 0.7rem; color: var(--text-secondary);">${c["Automation Action"]}</span>
        </div>
      </div>
    `).join('');
  }

  const dealListContainer = document.getElementById('dealFollowupList');
  const filteredDealFollowups = enrichedDeals.filter(d => d["Follow-up Required"]);

  if (filteredDealFollowups.length === 0) {
    dealListContainer.innerHTML = `<div style="padding: 16px; color: var(--text-muted); text-align: center;">No proposal follow-ups needed.</div>`;
  } else {
    dealListContainer.innerHTML = filteredDealFollowups.map(d => `
      <div class="task-item">
        <div class="task-main">
          <div class="task-title">
            <span>💼 ${d["Deal Name"]}</span>
            <span class="${getStageBadgeClass(d["Deal Stage"])}">${d["Deal Stage"]}</span>
          </div>
          <div class="task-meta">
            🏢 ${d["Company Name"]} • Value: <strong style="color: var(--accent-emerald);">${formatINR(d["Amount"])}</strong>
          </div>
        </div>
        <div>
          <span class="task-badge badge-deal">Action: Proposal Review</span>
        </div>
      </div>
    `).join('');
  }
}

// Render Charts
function renderCharts(dealsList, contactsList) {
  // Stage Counts for Deals
  const stageMap = {};
  dealsList.forEach(d => {
    stageMap[d["Deal Stage"]] = (stageMap[d["Deal Stage"]] || 0) + 1;
  });

  const stageLabels = Object.keys(stageMap);
  const stageData = Object.values(stageMap);

  // Source Counts for Contacts
  const sourceMap = {};
  contactsList.forEach(c => {
    sourceMap[c["Lead Source"]] = (sourceMap[c["Lead Source"]] || 0) + 1;
  });

  const sourceLabels = Object.keys(sourceMap);
  const sourceData = Object.values(sourceMap);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#9ca3af' : '#475569';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  // Stage Bar Chart
  const ctxStage = document.getElementById('dealsStageChart').getContext('2d');
  if (stageChartInstance) stageChartInstance.destroy();

  stageChartInstance = new Chart(ctxStage, {
    type: 'bar',
    data: {
      labels: stageLabels,
      datasets: [{
        label: 'Number of Deals',
        data: stageData,
        backgroundColor: [
          'rgba(99, 102, 241, 0.75)',
          'rgba(245, 158, 11, 0.75)',
          'rgba(6, 182, 212, 0.75)',
          'rgba(139, 92, 246, 0.75)',
          'rgba(16, 185, 129, 0.75)',
          'rgba(236, 72, 153, 0.75)'
        ],
        borderRadius: 8,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } },
          grid: { display: false }
        },
        y: {
          ticks: { color: textColor, stepSize: 1, font: { family: 'Plus Jakarta Sans', size: 11 } },
          grid: { color: gridColor }
        }
      }
    }
  });

  // Source Donut Chart
  const ctxSource = document.getElementById('leadsSourceChart').getContext('2d');
  if (sourceChartInstance) sourceChartInstance.destroy();

  sourceChartInstance = new Chart(ctxSource, {
    type: 'doughnut',
    data: {
      labels: sourceLabels,
      datasets: [{
        data: sourceData,
        backgroundColor: [
          'rgba(99, 102, 241, 0.85)',
          'rgba(6, 182, 212, 0.85)',
          'rgba(245, 158, 11, 0.85)',
          'rgba(16, 185, 129, 0.85)'
        ],
        borderWidth: 2,
        borderColor: isDark ? '#111827' : '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: textColor,
            font: { family: 'Plus Jakarta Sans', size: 12 },
            boxWidth: 14,
            padding: 12
          }
        }
      },
      cutout: '65%'
    }
  });
}

// Render Tables with Search & Filter
function renderTables(enrichedDeals, enrichedContacts, companyList) {
  const searchQuery = (document.getElementById('globalSearch').value || '').toLowerCase().trim();
  const selectedStage = document.getElementById('stageFilter').value;

  // 1. Deals Table
  const dealsBody = document.getElementById('dealsTableBody');
  const filteredDeals = enrichedDeals.filter(d => {
    const matchesSearch = !searchQuery || 
      d["Deal Name"].toLowerCase().includes(searchQuery) ||
      d["Company Name"].toLowerCase().includes(searchQuery) ||
      d["Deal Stage"].toLowerCase().includes(searchQuery);

    const matchesStage = selectedStage === 'ALL' || d["Deal Stage"] === selectedStage;
    return matchesSearch && matchesStage;
  });

  dealsBody.innerHTML = filteredDeals.length ? filteredDeals.map(d => `
    <tr>
      <td><strong>${d["Deal Name"]}</strong></td>
      <td>${d["Company Name"]}</td>
      <td style="font-weight: 700; color: var(--accent-cyan);">${formatINR(d["Amount"])}</td>
      <td><span class="${getStageBadgeClass(d["Deal Stage"])}">${d["Deal Stage"]}</span></td>
      <td>
        ${d["Follow-up Required"] 
          ? '<span style="color: var(--accent-amber); font-weight: 600;">⚡ Follow up on proposal</span>' 
          : '<span style="color: var(--text-muted);">No action</span>'}
      </td>
    </tr>
  `).join('') : `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 24px;">No matching deals found.</td></tr>`;

  // 2. Contacts Table
  const contactsBody = document.getElementById('contactsTableBody');
  const filteredContacts = enrichedContacts.filter(c => {
    const fullName = `${c["First Name"]} ${c["Last Name"]}`.toLowerCase();
    const matchesSearch = !searchQuery ||
      fullName.includes(searchQuery) ||
      c["Company Name"].toLowerCase().includes(searchQuery) ||
      c["Job Title"].toLowerCase().includes(searchQuery) ||
      c["Lead Source"].toLowerCase().includes(searchQuery) ||
      c["Lead Status"].toLowerCase().includes(searchQuery);

    const matchesStage = selectedStage === 'ALL' || c["Lead Status"] === selectedStage;
    return matchesSearch && matchesStage;
  });

  contactsBody.innerHTML = filteredContacts.length ? filteredContacts.map(c => `
    <tr>
      <td><strong>${c["First Name"]} ${c["Last Name"]}</strong><br><small style="color: var(--text-muted);">${c["Email"]}</small></td>
      <td>${c["Company Name"]}</td>
      <td>${c["Job Title"]}</td>
      <td><span class="pill" style="background: rgba(255,255,255,0.06);">${c["Lead Source"]}</span></td>
      <td><span class="${getStageBadgeClass(c["Lead Status"])}">${c["Lead Status"]}</span></td>
      <td style="font-weight: 700; color: ${c["Priority Score"] >= 20 ? 'var(--accent-primary)' : 'var(--text-muted)'};">${c["Priority Score"]} pts</td>
      <td>
        ${c["Follow-up Required"]
          ? '<span style="color: var(--accent-primary); font-weight: 600;">🚀 Create sales task</span>'
          : '<span style="color: var(--text-muted);">No action</span>'}
      </td>
    </tr>
  `).join('') : `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 24px;">No matching contacts found.</td></tr>`;

  // 3. Companies Table
  const companiesBody = document.getElementById('companiesTableBody');
  const filteredCompanies = companyList.filter(comp => {
    return !searchQuery ||
      comp["Company Name"].toLowerCase().includes(searchQuery) ||
      comp["Industry"].toLowerCase().includes(searchQuery) ||
      comp["Domain"].toLowerCase().includes(searchQuery);
  });

  companiesBody.innerHTML = filteredCompanies.length ? filteredCompanies.map(comp => `
    <tr>
      <td><strong>${comp["Company Name"]}</strong></td>
      <td><span class="pill" style="background: rgba(99, 102, 241, 0.15); color: #818cf8;">${comp["Industry"]}</span></td>
      <td>${comp["Employees"]} team members</td>
      <td><a href="https://${comp["Domain"]}" target="_blank" style="color: var(--accent-cyan); text-decoration: none;">${comp["Domain"]} ↗</a></td>
    </tr>
  `).join('') : `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 24px;">No matching companies found.</td></tr>`;
}

// Export CSV Feature
function exportPipelineCSV() {
  const enrichedDeals = calculateDealActions(deals);
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Deal Name,Company Name,Amount,Deal Stage,Automation Action\n";

  enrichedDeals.forEach(d => {
    csvContent += `"${d["Deal Name"]}","${d["Company Name"]}",${d["Amount"]},"${d["Deal Stage"]}","${d["Automation Action"]}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "Nexora_Pipeline_Report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Tab Switching
function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      ['dealsTableContainer', 'contactsTableContainer', 'companiesTableContainer'].forEach(id => {
        document.getElementById(id).style.display = (id === targetId) ? 'block' : 'none';
      });
    });
  });
}

// Simulator Slider Controls
function setupSimulator() {
  const sourceSlider = document.getElementById('highValueSourceWeight');
  const titleSlider = document.getElementById('decisionMakerWeight');
  const thresholdSlider = document.getElementById('thresholdWeight');

  sourceSlider.addEventListener('input', (e) => {
    ruleConfig.sourceBonus = parseInt(e.target.value, 10);
    document.getElementById('sourceWeightVal').innerText = `+${ruleConfig.sourceBonus} pts`;
    updateDashboard();
  });

  titleSlider.addEventListener('input', (e) => {
    ruleConfig.titleBonus = parseInt(e.target.value, 10);
    document.getElementById('titleWeightVal').innerText = `+${ruleConfig.titleBonus} pts`;
    updateDashboard();
  });

  thresholdSlider.addEventListener('input', (e) => {
    ruleConfig.scoreThreshold = parseInt(e.target.value, 10);
    document.getElementById('thresholdWeightVal').innerText = `≥ ${ruleConfig.scoreThreshold} pts`;
    updateDashboard();
  });

  document.getElementById('resetRulesBtn').addEventListener('click', () => {
    ruleConfig = { sourceBonus: 10, titleBonus: 20, scoreThreshold: 20 };
    sourceSlider.value = 10;
    titleSlider.value = 20;
    thresholdSlider.value = 20;
    document.getElementById('sourceWeightVal').innerText = '+10 pts';
    document.getElementById('titleWeightVal').innerText = '+20 pts';
    document.getElementById('thresholdWeightVal').innerText = '≥ 20 pts';
    updateDashboard();
  });
}

// Search & Filter Listeners
function setupSearchAndFilters() {
  document.getElementById('globalSearch').addEventListener('input', () => {
    const enrichedContacts = calculateContactActions(contacts);
    const enrichedDeals = calculateDealActions(deals);
    renderTables(enrichedDeals, enrichedContacts, companies);
  });

  document.getElementById('stageFilter').addEventListener('change', () => {
    const enrichedContacts = calculateContactActions(contacts);
    const enrichedDeals = calculateDealActions(deals);
    renderTables(enrichedDeals, enrichedContacts, companies);
  });

  document.getElementById('exportCsvBtn').addEventListener('click', exportPipelineCSV);
}

// Theme Toggle
function setupThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeIcon.innerText = newTheme === 'dark' ? '☀️' : '🌙';
    themeLabel.innerText = newTheme === 'dark' ? 'Light' : 'Dark';
    
    // Re-render charts with correct color palette
    renderCharts(deals, contacts);
  });
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupSimulator();
  setupSearchAndFilters();
  setupThemeToggle();
  updateDashboard();
});
