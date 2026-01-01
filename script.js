// ScholarStack - Achievement Vault
// Vanilla JavaScript implementation

// State management
let achievements = [];
let currentEditId = null;
let currentSkills = [];
let sortBy = 'date';
let activeTab = 'locker';

// Category icons mapping
const categoryIcons = {
  'Academic': '📚',
  'Leadership': '👥',
  'Volunteer': '🤝',
  'Arts': '🎨',
  'Sport': '⚽',
  'Professional': '💼'
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadAchievements();
  setupEventListeners();
  render();
});

// Load achievements from localStorage
function loadAchievements() {
  const saved = localStorage.getItem('scholarstack_achievements');
  if (saved) {
    achievements = JSON.parse(saved);
  }
}

// Save achievements to localStorage
function saveAchievements() {
  localStorage.setItem('scholarstack_achievements', JSON.stringify(achievements));
}

// Setup event listeners
function setupEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      switchTab(tabName);
    });
  });

  // Description character counter
  const descriptionInput = document.getElementById('description');
  if (descriptionInput) {
    descriptionInput.addEventListener('input', (e) => {
      const count = e.target.value.length;
      document.getElementById('descriptionCount').textContent = count;
    });
  }

  // Skill input handling
  const skillInput = document.getElementById('skillInput');
  if (skillInput) {
    skillInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addSkill(e.target.value);
      }
    });
  }

  // Modal close on outside click
  const modal = document.getElementById('modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Locker door click handlers
  document.addEventListener('click', (e) => {
    if (e.target.closest('.locker-door.new')) {
      openAddForm();
    } else if (e.target.closest('.locker-door') && !e.target.closest('.locker-door.new')) {
      const door = e.target.closest('.locker-door');
      const achievementId = parseInt(door.getAttribute('data-id'));
      if (achievementId) {
        editAchievement(achievementId);
      }
    }
  });
}

// Tab switching
function switchTab(tabName) {
  activeTab = tabName;
  
  // Update tab UI
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.getAttribute('data-tab') === tabName) {
      tab.classList.add('active');
    }
  });

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
    if (content.id === tabName) {
      content.classList.add('active');
    }
  });

  // Render specific tab content
  if (tabName === 'locker') {
    renderLocker();
  } else if (tabName === 'list') {
    renderList();
  } else if (tabName === 'scholarships') {
    renderScholarships();
  } else if (tabName === 'export') {
    renderExport();
  }
}

// Main render function
function render() {
  updateStats();
  updateProfileStrength();
  
  if (activeTab === 'locker') {
    renderLocker();
  } else if (activeTab === 'list') {
    renderList();
  } else if (activeTab === 'scholarships') {
    renderScholarships();
  }
}

// Update header stats
function updateStats() {
  const totalHours = achievements.reduce((sum, a) => sum + (a.volunteerHours || 0), 0);
  
  document.getElementById('totalAchievements').textContent = achievements.length;
  document.getElementById('totalHours').textContent = Math.round(totalHours);
}

// Update profile strength
function updateProfileStrength() {
  const categories = ['Academic', 'Leadership', 'Volunteer', 'Arts', 'Sport', 'Professional'];
  const counts = {};
  
  categories.forEach(cat => {
    counts[cat] = achievements.filter(a => a.category === cat).length;
  });

  // Calculate strength score
  let strength = 0;
  const maxPerCategory = 3;
  categories.forEach(cat => {
    strength += Math.min(counts[cat], maxPerCategory) / maxPerCategory * 100 / 6;
  });

  // Bonus for descriptions and skills
  if (achievements.length > 0) {
    const hasDescription = achievements.filter(a => a.description).length / achievements.length;
    const hasSkills = achievements.filter(a => a.skills && a.skills.length > 0).length / achievements.length;
    strength += (hasDescription * 5) + (hasSkills * 5);
  }
  
  strength = Math.min(100, Math.round(strength));

  // Update UI
  document.getElementById('strengthScore').textContent = strength;
  document.getElementById('strengthPercent').textContent = strength;
  document.getElementById('strengthBar').style.width = strength + '%';

  // Update category counts
  categories.forEach(cat => {
    const element = document.getElementById('count' + cat);
    if (element) {
      element.textContent = counts[cat];
    }
  });

  // Generate suggestion
  const weakest = categories.filter(cat => counts[cat] === 0).slice(0, 1)[0];
  const maxCount = Math.max(...Object.values(counts));
  const weak = categories.filter(cat => counts[cat] < maxCount / 2 && counts[cat] > 0).slice(0, 2);

  let suggestion = '';
  if (weakest) {
    suggestion = `💡 Try exploring ${weakest} opportunities!`;
  } else if (weak.length > 0) {
    suggestion = `💡 Consider balancing with more ${weak.join(' & ')} achievements.`;
  } else if (strength >= 80) {
    suggestion = '✨ Well-rounded profile! Keep it up!';
  } else {
    suggestion = '💪 Keep adding achievements to strengthen your profile!';
  }

  document.getElementById('suggestion').textContent = suggestion;
}

// Render Digital Locker
function renderLocker() {
  const lockerGrid = document.getElementById('lockerGrid');
  if (!lockerGrid) return;

  const sorted = sortAchievements([...achievements]);
  const displayAchievements = sorted.slice(0, 7);

  lockerGrid.innerHTML = '';

  // Render achievement doors
  displayAchievements.forEach(achievement => {
    const door = document.createElement('div');
    door.className = 'locker-door';
    door.setAttribute('data-id', achievement.id);
    door.innerHTML = `
      <div class="achievement-icon">${categoryIcons[achievement.category] || '🏆'}</div>
      <div class="achievement-title">${achievement.title.substring(0, 20)}${achievement.title.length > 20 ? '...' : ''}</div>
      <div class="achievement-category">${achievement.category}</div>
    `;
    lockerGrid.appendChild(door);
  });

  // Add "Add Achievement" door
  const addDoor = document.createElement('div');
  addDoor.className = 'locker-door new';
  addDoor.innerHTML = `
    <div class="achievement-icon">➕</div>
    <div class="achievement-title">Add Achievement</div>
    <div class="achievement-category">Click to start</div>
  `;
  lockerGrid.appendChild(addDoor);
}

// Render All Achievements List
function renderList() {
  const listContainer = document.getElementById('achievementsList');
  if (!listContainer) return;

  if (achievements.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔭</div>
        <h3>No achievements yet</h3>
        <p>Start building your achievement vault!</p>
      </div>
    `;
    return;
  }

  const sorted = sortAchievements([...achievements]);
  listContainer.innerHTML = '';

  sorted.forEach(achievement => {
    const card = document.createElement('div');
    card.className = `achievement-card ${achievement.category.toLowerCase()}`;
    card.innerHTML = `
      <div class="achievement-card-header">
        <div>
          <div class="achievement-card-title">
            ${categoryIcons[achievement.category] || '🏆'} ${achievement.title}
          </div>
          <div class="achievement-card-date">${formatDate(achievement.dateReceived)}</div>
        </div>
      </div>
      ${achievement.description ? `<div class="achievement-card-body">"${achievement.description}"</div>` : ''}
      <div class="achievement-card-meta">
        <span class="badge">${achievement.category}</span>
        ${achievement.issuingBody ? `<span class="badge">${achievement.issuingBody}</span>` : ''}
        ${achievement.impactMetric ? `<span class="badge">🏆 ${achievement.impactMetric}</span>` : ''}
        ${achievement.volunteerHours > 0 ? `<span class="badge">⏱️ ${achievement.volunteerHours}h</span>` : ''}
        ${achievement.skills && achievement.skills.length > 0 ? achievement.skills.map(skill => `<span class="badge">${skill}</span>`).join('') : ''}
      </div>
      <div class="card-actions">
        <button class="btn btn-primary btn-small" onclick="editAchievement(${achievement.id})">✏️ Edit</button>
        <button class="btn btn-danger btn-small" onclick="deleteAchievement(${achievement.id})">🗑️ Delete</button>
        ${achievement.evidenceLink ? `<a href="${achievement.evidenceLink}" target="_blank" class="btn btn-secondary btn-small">🔗 View</a>` : ''}
      </div>
    `;
    listContainer.appendChild(card);
  });
}

// Render Scholarships
function renderScholarships() {
  const scholarshipsList = document.getElementById('scholarshipsList');
  if (!scholarshipsList) return;

  if (achievements.length === 0) {
    scholarshipsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">💰</div>
        <h3>Add achievements to find scholarships</h3>
        <p>ScholarStack will match you with relevant scholarships.</p>
      </div>
    `;
    return;
  }

  const matches = generateScholarshipMatches();
  scholarshipsList.innerHTML = '';

  matches.forEach(scholarship => {
    const card = document.createElement('div');
    card.className = 'scholarship-card';
    card.innerHTML = `
      <div class="scholarship-name">${scholarship.name}</div>
      <div class="scholarship-match">Match Reason: ${scholarship.reason}</div>
    `;
    scholarshipsList.appendChild(card);
  });
}

// Render Export tab
function renderExport() {
  // This is handled by the export buttons
}

// Generate scholarship matches
function generateScholarshipMatches() {
  const allSkills = achievements.flatMap(a => a.skills || []).map(s => s.toLowerCase()).join(' ');
  const allDescriptions = achievements.map(a => (a.description || '').toLowerCase()).join(' ');
  const allTitles = achievements.map(a => (a.title || '').toLowerCase()).join(' ');
  const searchText = allSkills + ' ' + allDescriptions + ' ' + allTitles;

  const scholarships = [
    { 
      name: 'STEM Excellence Grant', 
      keywords: ['python', 'coding', 'science', 'math', 'stem', 'technology', 'engineering', 'computer'],
      reason: 'Your tech and STEM skills match perfectly'
    },
    { 
      name: 'Leadership Award Fund', 
      keywords: ['leadership', 'president', 'officer', 'captain', 'director', 'coordinator'],
      reason: 'Your leadership roles demonstrate strong potential'
    },
    { 
      name: 'Community Service Scholarship', 
      keywords: ['volunteer', 'community', 'service', 'charity', 'helping'],
      reason: 'Your volunteer hours show commitment to community'
    },
    { 
      name: 'Arts & Culture Grant', 
      keywords: ['arts', 'music', 'design', 'theater', 'dance', 'creative', 'artistic'],
      reason: 'Your arts achievements showcase creativity'
    },
    { 
      name: 'Athletic Excellence Award', 
      keywords: ['sport', 'athlete', 'competition', 'championship', 'team', 'athletic'],
      reason: 'Your sports excellence demonstrates dedication'
    },
    { 
      name: 'Academic Merit Scholarship', 
      keywords: ['academic', 'gpa', 'honors', 'scholar', 'dean', 'merit'],
      reason: 'Your academic success is impressive'
    }
  ];

  const matches = scholarships.filter(scholarship => 
    scholarship.keywords.some(keyword => searchText.includes(keyword))
  );

  // If no matches, show top 3 general scholarships
  return matches.length > 0 ? matches : scholarships.slice(0, 3);
}

// Sort achievements
function sortAchievements(array) {
  if (sortBy === 'date') {
    return array.sort((a, b) => new Date(b.dateReceived) - new Date(a.dateReceived));
  } else {
    return array.sort((a, b) => a.category.localeCompare(b.category));
  }
}

// Toggle sort
function toggleSort() {
  sortBy = sortBy === 'date' ? 'category' : 'date';
  document.getElementById('sortLabel').textContent = sortBy === 'date' ? 'Date' : 'Category';
  renderList();
}

// Open add form
function openAddForm() {
  currentEditId = null;
  currentSkills = [];
  resetForm();
  document.getElementById('modalTitle').textContent = 'Add Achievement';
  document.getElementById('modal').classList.add('active');
  
  // Set today's date as default
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('dateReceived').value = today;
}

// Close modal
function closeModal() {
  document.getElementById('modal').classList.remove('active');
  currentEditId = null;
  currentSkills = [];
  resetForm();
}

// Reset form
function resetForm() {
  document.getElementById('achievementForm').reset();
  document.getElementById('descriptionCount').textContent = '0';
  document.getElementById('skillsTags').innerHTML = '';
  currentSkills = [];
}

// Save achievement
function saveAchievement(event) {
  event.preventDefault();

  const title = document.getElementById('title').value.trim();
  const category = document.getElementById('category').value;
  const dateReceived = document.getElementById('dateReceived').value;
  
  if (!title || !category || !dateReceived) {
    alert('Please fill in all required fields (Title, Category, Date)');
    return;
  }

  const achievement = {
    id: currentEditId || Date.now(),
    title,
    category,
    dateReceived,
    issuingBody: document.getElementById('issuingBody').value.trim(),
    description: document.getElementById('description').value.trim(),
    impactMetric: document.getElementById('impactMetric').value.trim(),
    volunteerHours: parseFloat(document.getElementById('volunteerHours').value) || 0,
    skills: [...currentSkills],
    evidenceLink: document.getElementById('evidenceLink').value.trim()
  };

  if (currentEditId) {
    const index = achievements.findIndex(a => a.id === currentEditId);
    if (index !== -1) {
      achievements[index] = achievement;
    }
  } else {
    achievements.push(achievement);
  }

  saveAchievements();
  closeModal();
  render();
  
  // Switch to list view if adding new
  if (!currentEditId) {
    switchTab('list');
  }
}

// Edit achievement
function editAchievement(id) {
  const achievement = achievements.find(a => a.id === id);
  if (!achievement) return;

  currentEditId = id;
  currentSkills = [...(achievement.skills || [])];
  
  document.getElementById('modalTitle').textContent = 'Edit Achievement';
  document.getElementById('title').value = achievement.title;
  document.getElementById('category').value = achievement.category;
  document.getElementById('dateReceived').value = achievement.dateReceived;
  document.getElementById('issuingBody').value = achievement.issuingBody || '';
  document.getElementById('description').value = achievement.description || '';
  document.getElementById('impactMetric').value = achievement.impactMetric || '';
  document.getElementById('volunteerHours').value = achievement.volunteerHours || 0;
  document.getElementById('evidenceLink').value = achievement.evidenceLink || '';
  document.getElementById('descriptionCount').textContent = (achievement.description || '').length;
  
  renderSkills();
  document.getElementById('modal').classList.add('active');
}

// Delete achievement
function deleteAchievement(id) {
  if (confirm('Are you sure you want to delete this achievement?')) {
    achievements = achievements.filter(a => a.id !== id);
    saveAchievements();
    render();
  }
}

// Add skill
function addSkill(input) {
  const skill = input.trim().replace(/,/g, '');
  if (skill && !currentSkills.includes(skill)) {
    currentSkills.push(skill);
    document.getElementById('skillInput').value = '';
    renderSkills();
  }
}

// Remove skill (kept for backwards compatibility)
function removeSkill(skill) {
  currentSkills = currentSkills.filter(s => s !== skill);
  renderSkills();
}

// Render skills tags
function renderSkills() {
  const container = document.getElementById('skillsTags');
  if (!container) return;
  
  container.innerHTML = currentSkills.map((skill, index) => {
    // Use index to avoid quote escaping issues
    return `
      <span class="skill-tag">
        ${escapeHtml(skill)}
        <span class="remove" onclick="removeSkillByIndex(${index})">×</span>
      </span>
    `;
  }).join('');
}

// Remove skill by index (to avoid quote escaping issues)
function removeSkillByIndex(index) {
  if (index >= 0 && index < currentSkills.length) {
    currentSkills.splice(index, 1);
    renderSkills();
  }
}

// Export brag sheet
function exportBragSheet() {
  if (achievements.length === 0) {
    alert('Add some achievements first!');
    return;
  }

  const categories = ['Academic', 'Leadership', 'Volunteer', 'Arts', 'Sport', 'Professional'];
  let sheet = 'BRAG SHEET FOR LETTERS OF RECOMMENDATION\n';
  sheet += '=====================================\n\n';

  categories.forEach(cat => {
    const catAchievements = achievements.filter(a => a.category === cat);
    if (catAchievements.length > 0) {
      sheet += `${cat.toUpperCase()}\n`;
      sheet += '---\n';
      catAchievements.forEach(a => {
        sheet += `• ${a.title}`;
        if (a.impactMetric) sheet += ` (${a.impactMetric})`;
        if (a.dateReceived) {
          const year = new Date(a.dateReceived).getFullYear();
          sheet += ` - ${year}`;
        }
        sheet += '\n';
        if (a.description) sheet += `  ${a.description}\n`;
      });
      sheet += '\n';
    }
  });

  displayExportPreview(sheet);
  switchTab('export');
}

// Export Common App format
function exportCommonApp() {
  if (achievements.length === 0) {
    alert('Add some achievements first!');
    return;
  }

  let app = '';
  achievements.forEach(a => {
    let desc = a.description || a.title;
    if (desc.length > 150) {
      desc = desc.substring(0, 147) + '...';
    }
    app += `[${a.category}] ${a.title}\n${desc}\n\n`;
  });

  displayExportPreview(app);
  switchTab('export');
}

// Display export preview
function displayExportPreview(content) {
  const preview = document.getElementById('exportPreview');
  if (!preview) return;
  
  const div = document.createElement('div');
  div.className = 'export-preview';
  div.textContent = content;
  preview.innerHTML = '';
  preview.appendChild(div);
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Download JSON
function downloadJSON() {
  const data = {
    exportDate: new Date().toISOString(),
    achievements: achievements,
    stats: {
      total: achievements.length,
      volunteerHours: achievements.reduce((sum, a) => sum + (a.volunteerHours || 0), 0)
    }
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'scholarstack-data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Format date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Download HTML (for project download)
function downloadHTML() {
  // This would generate a standalone HTML file with embedded data
  alert('Project download feature coming soon!');
}
