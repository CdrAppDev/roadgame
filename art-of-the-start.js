// RoadGame - Art of the Start - App Logic

(function() {
  'use strict';

  // ============================================
  // PASSWORD PROTECTION
  // Same password as main canvas
  // ============================================
  const SITE_PASSWORD = 'roadgame2024';
  const AUTH_KEY = 'roadgame-auth';

  function checkAuth() {
    return sessionStorage.getItem(AUTH_KEY) === 'authenticated';
  }

  function initAuth() {
    const overlay = document.getElementById('authOverlay');
    const form = document.getElementById('authForm');
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('authError');

    if (checkAuth()) {
      overlay.classList.add('hidden');
      document.body.classList.add('authenticated');
      return;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value === SITE_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, 'authenticated');
        overlay.classList.add('hidden');
        document.body.classList.add('authenticated');
      } else {
        error.textContent = 'Incorrect password';
        input.value = '';
        input.focus();
      }
    });
  }

  // Run auth check immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
  } else {
    initAuth();
  }
  // ============================================

  // Storage key (separate from main canvas)
  const STORAGE_KEY = 'roadgame-art-of-start-data';

  // Default data
  const DEFAULT_DATA = {
    'challenge-constraints': [
      { id: 1, text: 'Need providers to attract families' },
      { id: 2, text: 'Need families to attract providers' },
      { id: 3, text: 'Limited initial resources - must be scrappy' },
      { id: 4, text: 'Geographic density matters - market-by-market' },
      { id: 5, text: 'Seasonality of youth sports' }
    ],
    'questions-bootstrap': [
      { id: 10, text: 'Can we manually curate provider listings without their participation?' },
      { id: 11, text: 'Could we build a "Yelp for tournament towns" that families use first?' },
      { id: 12, text: 'Do we have relationships with providers who would list early?' }
    ],
    'questions-distribution': [
      { id: 20, text: 'Do we have access to tournament organizers?' },
      { id: 21, text: 'Any connection to TeamSnap, SportsEngine, or similar?' },
      { id: 22, text: 'Are we embedded in any youth sports parent community?' },
      { id: 23, text: 'Can we reach team coordinators directly?' }
    ],
    'questions-pay': [
      { id: 30, text: 'What\'s the first thing valuable enough to charge for?' },
      { id: 31, text: 'Curated recommendations?' },
      { id: 32, text: 'Itinerary building?' },
      { id: 33, text: 'Team coordination tools?' },
      { id: 34, text: 'Exclusive deals/discounts?' }
    ],
    'questions-pain': [
      { id: 40, text: 'Is "dead time" (2-4 hour gaps) more painful than lodging research?' },
      { id: 41, text: 'Are team coordinators more desperate than individual parents?' },
      { id: 42, text: 'What do parents complain about most in Facebook groups?' }
    ],
    'strategy-demand': [
      { id: 50, text: 'PRO: Can launch without provider buy-in' },
      { id: 51, text: 'PRO: Build audience first, monetize later' },
      { id: 52, text: 'CON: No transactions = no revenue initially' },
      { id: 53, text: 'CON: Providers may not see value until traffic exists' },
      { id: 54, text: 'APPROACH: Curate listings manually, add booking later' }
    ],
    'strategy-supply': [
      { id: 60, text: 'PRO: Providers pay for leads/visibility' },
      { id: 61, text: 'PRO: Can charge from day one' },
      { id: 62, text: 'CON: Hard to sell without traffic proof' },
      { id: 63, text: 'CON: Empty marketplace = bad UX for families' },
      { id: 64, text: 'APPROACH: Partner with a few anchor providers in one market' }
    ],
    'strategy-coordinator': [
      { id: 70, text: 'PRO: Built-in distribution (coordinators share with 12-15 families)' },
      { id: 71, text: 'PRO: Team coordination is a real pain point' },
      { id: 72, text: 'PRO: Viral loop potential' },
      { id: 73, text: 'CON: More complex product (group features)' },
      { id: 74, text: 'APPROACH: Team trip planning tool that grows to marketplace' }
    ],
    'strategy-tournament': [
      { id: 80, text: 'PRO: Tournaments want happy travelers (differentiator)' },
      { id: 81, text: 'PRO: Built-in distribution to all registered teams' },
      { id: 82, text: 'PRO: Tournaments may have local provider relationships' },
      { id: 83, text: 'CON: Longer sales cycle' },
      { id: 84, text: 'CON: Dependency on partner priorities' },
      { id: 85, text: 'APPROACH: Embed in tournament registration flow' }
    ],
    'friction-low': [
      { id: 200, text: 'Free to list (no upfront cost)' },
      { id: 201, text: 'Simple listing creation (name, address, description)' },
      { id: 202, text: 'No integration required (just a directory listing)' },
      { id: 203, text: 'No exclusivity required' },
      { id: 204, text: 'We create the listing FOR them (zero effort)' }
    ],
    'friction-high': [
      { id: 210, text: 'Time to create quality listing (photos, descriptions)' },
      { id: 211, text: 'Trust barrier - "is this legit? will it actually work?"' },
      { id: 212, text: 'Ongoing management burden (updating availability, responding)' },
      { id: 213, text: 'Real-time inventory integration (if we want live booking)' },
      { id: 214, text: 'Commission on bookings (providers hate giving up margin)' },
      { id: 215, text: 'Yet another platform to manage' }
    ],
    'friction-claim': [
      { id: 220, text: '── PHASE 1: CURATE SUPPLY ──' },
      { id: 221, text: 'Create listings from Google Places API (hotels, restaurants near venues)' },
      { id: 222, text: 'Scrape tournament organizers\' recommended hotel lists' },
      { id: 223, text: 'Pull from sports facility directories and league websites' },
      { id: 224, text: 'Basic listing: name, address, phone, category, proximity to venues' },
      { id: 225, text: '── PHASE 2: DRIVE DEMAND ──' },
      { id: 226, text: 'Build SEO around "youth sports travel [city]"' },
      { id: 227, text: 'Target team coordinators via social/community' },
      { id: 228, text: 'Create content: "Best hotels for tournaments in [city]"' },
      { id: 229, text: 'Partner with tournament organizers for distribution' },
      { id: 230, text: '── PHASE 3: TRIGGER PROVIDER ENGAGEMENT ──' },
      { id: 231, text: '"Your listing has had 50 views this month"' },
      { id: 232, text: '"3 teams are asking about availability"' },
      { id: 233, text: '"A parent left a question about your business"' },
      { id: 234, text: 'KEY: Provider sees proof of demand BEFORE we ask for anything' },
      { id: 235, text: '── PHASE 4: CLAIMING FLOW ──' },
      { id: 236, text: 'Verify: phone call, email to domain, or link Google/Yelp account' },
      { id: 237, text: 'FREE: Update info, respond to questions, see basic analytics' },
      { id: 238, text: 'PREMIUM: Featured placement, lead notifications, booking integration' },
      { id: 239, text: '── WHY THIS WORKS ──' },
      { id: 240, text: 'Traditional: "Sign up and maybe get business" (value promised)' },
      { id: 241, text: 'Claim model: "You\'re already getting views, claim to respond" (value proven)' },
      { id: 242, text: 'We do the work upfront; provider claims when motivated' },
      { id: 243, text: 'Revenue: Charge for premium placement AFTER proving traffic' }
    ],
    'target-who': [],
    'target-why': [],
    'target-reach': [],
    'mvp-core': [],
    'mvp-value': [],
    'mvp-not': [],
    'revenue-first': [],
    'revenue-who': [],
    'revenue-milestones': [],
    'validation-hypotheses': [],
    'validation-metrics': [],
    'validation-kill': [],
    'decisions-strategic': [],
    'decisions-open': [
      { id: 100, text: 'Which strategy to pursue?' },
      { id: 101, text: 'What\'s our unfair advantage?' },
      { id: 102, text: 'How do we reach first 100 users?' }
    ]
  };

  // Initialize data from localStorage or use defaults
  let canvasData = loadData();

  // Load data - always start with defaults, merge any saved additions
  function loadData() {
    // Always use default data as the base
    return { ...DEFAULT_DATA };
  }

  // Save data (no-op for now - use Export to save work)
  function saveData() {
    // Data is session-only; use Export button to save
  }

  // Get items for a specific list
  function getItems(key) {
    return canvasData[key] || [];
  }

  // Set items for a specific list
  function setItems(key, items) {
    canvasData[key] = items;
    saveData();
  }

  // Add item to a list
  function addItem(key, text) {
    const items = getItems(key);
    items.push({ id: Date.now(), text: text.trim() });
    setItems(key, items);
    return items;
  }

  // Remove item from a list
  function removeItem(key, id) {
    const items = getItems(key).filter(item => item.id !== id);
    setItems(key, items);
    return items;
  }

  // Update item in a list
  function updateItem(key, id, newText) {
    const items = getItems(key).map(item =>
      item.id === id ? { ...item, text: newText.trim() } : item
    );
    setItems(key, items);
    return items;
  }

  // Check if item is a category header
  function isCategoryHeader(text) {
    return text.startsWith('──') || text.startsWith('--') ||
           text.startsWith('PRO:') || text.startsWith('CON:') || text.startsWith('APPROACH:');
  }

  // Get header class based on text
  function getItemClass(text) {
    if (text.startsWith('PRO:')) return 'item-pro';
    if (text.startsWith('CON:')) return 'item-con';
    if (text.startsWith('APPROACH:')) return 'item-approach';
    if (text.startsWith('──') || text.startsWith('--')) return 'category-header';
    return '';
  }

  // Render a list
  function renderList(listElement, key) {
    const items = getItems(key);
    listElement.innerHTML = items.map(item => {
      const itemClass = getItemClass(item.text);
      const displayText = item.text.replace(/^──\s*/, '').replace(/\s*──$/, '');

      return `
        <li data-id="${item.id}" class="${itemClass}">
          <span class="item-text">${escapeHtml(displayText)}</span>
          <input type="text" class="edit-input" value="${escapeHtml(item.text)}">
          <span class="item-actions">
            <button class="item-action-btn edit" title="Edit">&#9998;</button>
            <button class="item-action-btn delete" title="Delete">&#10005;</button>
          </span>
        </li>
      `;
    }).join('');
  }

  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Show toast notification
  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // Initialize all lists
  function initializeLists() {
    document.querySelectorAll('.editable-list').forEach(container => {
      const key = container.dataset.key;
      const listElement = container.querySelector('.item-list');
      const input = container.querySelector('.add-item input');
      const addBtn = container.querySelector('.btn-add');

      // Render existing items
      renderList(listElement, key);

      // Add item on button click
      addBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (text) {
          addItem(key, text);
          renderList(listElement, key);
          input.value = '';
          input.focus();
        }
      });

      // Add item on Enter key
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const text = input.value.trim();
          if (text) {
            addItem(key, text);
            renderList(listElement, key);
            input.value = '';
          }
        }
      });

      // Handle list item actions (delete, edit)
      listElement.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (!li) return;

        const id = parseInt(li.dataset.id, 10);

        // Delete button
        if (e.target.classList.contains('delete')) {
          removeItem(key, id);
          renderList(listElement, key);
          showToast('Item removed');
          return;
        }

        // Edit button
        if (e.target.classList.contains('edit')) {
          if (li.classList.contains('editing')) {
            // Save edit
            const editInput = li.querySelector('.edit-input');
            const newText = editInput.value.trim();
            if (newText) {
              updateItem(key, id, newText);
              renderList(listElement, key);
              showToast('Item updated');
            }
          } else {
            // Enter edit mode
            li.classList.add('editing');
            const editInput = li.querySelector('.edit-input');
            editInput.focus();
            editInput.select();
          }
          return;
        }
      });

      // Save on Enter in edit mode, cancel on Escape
      listElement.addEventListener('keydown', (e) => {
        const li = e.target.closest('li');
        if (!li || !li.classList.contains('editing')) return;

        if (e.key === 'Enter') {
          e.preventDefault();
          const id = parseInt(li.dataset.id, 10);
          const editInput = li.querySelector('.edit-input');
          const newText = editInput.value.trim();
          if (newText) {
            updateItem(key, id, newText);
            renderList(listElement, key);
            showToast('Item updated');
          }
        } else if (e.key === 'Escape') {
          li.classList.remove('editing');
          const editInput = li.querySelector('.edit-input');
          const originalText = li.querySelector('.item-text').textContent;
          editInput.value = originalText;
        }
      });

      // Exit edit mode on blur
      listElement.addEventListener('focusout', (e) => {
        if (e.target.classList.contains('edit-input')) {
          const li = e.target.closest('li');
          setTimeout(() => {
            if (li && li.classList.contains('editing')) {
              li.classList.remove('editing');
            }
          }, 150);
        }
      });
    });
  }

  // Export functionality
  function exportData() {
    const exportObj = {
      title: 'RoadGame - Art of the Start',
      exportedAt: new Date().toISOString(),
      sections: {}
    };

    const keyNames = {
      'challenge-constraints': 'Key Constraints',
      'questions-bootstrap': 'Bootstrap Questions',
      'questions-distribution': 'Distribution Questions',
      'questions-pay': 'Willingness to Pay',
      'questions-pain': 'Pain Points',
      'strategy-demand': 'Strategy: Demand-First',
      'strategy-supply': 'Strategy: Supply-First',
      'strategy-coordinator': 'Strategy: Coordinator-First',
      'strategy-tournament': 'Strategy: Tournament-First',
      'friction-low': 'Provider Friction - Low',
      'friction-high': 'Provider Friction - High',
      'friction-claim': 'Claim Listing Model',
      'target-who': 'Target User - Who',
      'target-why': 'Target User - Why',
      'target-reach': 'Target User - Reach',
      'mvp-core': 'MVP Core Features',
      'mvp-value': 'MVP Value Created',
      'mvp-not': 'MVP Not Building',
      'revenue-first': 'First Revenue Model',
      'revenue-who': 'Who Pays',
      'revenue-milestones': 'Revenue Milestones',
      'validation-hypotheses': 'Hypotheses to Test',
      'validation-metrics': 'Success Metrics',
      'validation-kill': 'Kill Criteria',
      'decisions-strategic': 'Strategic Decisions',
      'decisions-open': 'Open Questions'
    };

    Object.keys(keyNames).forEach(key => {
      const items = getItems(key);
      if (items.length > 0) {
        exportObj.sections[keyNames[key]] = items.map(i => i.text);
      }
    });

    return exportObj;
  }

  // Create and show export modal
  function showExportModal() {
    const data = exportData();
    const json = JSON.stringify(data, null, 2);

    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) existingModal.remove();

    const modalHtml = `
      <div class="modal-overlay active">
        <div class="modal">
          <h3>Export Art of the Start Data</h3>
          <pre>${escapeHtml(json)}</pre>
          <div class="modal-actions">
            <button class="btn btn-secondary" id="copyExport">Copy to Clipboard</button>
            <button class="btn btn-secondary" id="downloadExport">Download JSON</button>
            <button class="btn btn-danger" id="closeModal">Close</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const overlay = document.querySelector('.modal-overlay');

    document.getElementById('closeModal').addEventListener('click', () => {
      overlay.remove();
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });

    document.getElementById('copyExport').addEventListener('click', () => {
      navigator.clipboard.writeText(json).then(() => {
        showToast('Copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy');
      });
    });

    document.getElementById('downloadExport').addEventListener('click', () => {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'roadgame-art-of-start.json';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Downloaded!');
    });

    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape' && document.querySelector('.modal-overlay')) {
        overlay.remove();
        document.removeEventListener('keydown', escHandler);
      }
    });
  }

  // Reset all data
  function resetData() {
    const choice = confirm('Reset to default content? Your session changes will be lost.');
    if (choice) {
      canvasData = { ...DEFAULT_DATA };
      document.querySelectorAll('.item-list').forEach(list => {
        const container = list.closest('.editable-list');
        const key = container.dataset.key;
        renderList(list, key);
      });
      showToast('Reset to defaults');
    }
  }

  // Initialize app
  function init() {
    initializeLists();
    console.log('RoadGame Art of the Start initialized');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
