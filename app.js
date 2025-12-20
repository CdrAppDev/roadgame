// RoadGame Business Canvas - App Logic

(function() {
  'use strict';

  // ============================================
  // PASSWORD PROTECTION
  // Change this password to whatever you want
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

  // Storage key
  const STORAGE_KEY = 'roadgame-canvas-data';

  // Default data to populate on first load
  const DEFAULT_DATA = {
    'problem-points': [
      { id: 1, text: 'Fragmented logistics - families piece together trips from scratch every time' },
      { id: 2, text: 'Time-consuming - hours spent researching unfamiliar areas' },
      { id: 3, text: 'Stressful uncertainty - don\'t know kid-friendly options, schedules, or locations' },
      { id: 4, text: 'Recurring burden - tournament families do this 5-15+ times per year' },
      { id: 5, text: '"Dead time" problem - 2-4 hour gaps between games with nothing planned' },
      { id: 6, text: 'Family coordination - siblings and extended family have nothing to do' }
    ],
    'users-demand': [
      { id: 10, text: '── INDIVIDUAL TRAVELERS ──' },
      { id: 11, text: 'Parents of players - primary trip planners and decision makers' },
      { id: 12, text: 'Players themselves - older teens may plan their own activities' },
      { id: 13, text: 'Siblings - need entertainment during long tournament days' },
      { id: 14, text: 'Grandparents - traveling to watch, may have different needs (accessibility, pace)' },
      { id: 15, text: 'Extended family - aunts, uncles, cousins making it a family event' },
      { id: 16, text: '── TEAM-LEVEL COORDINATORS ──' },
      { id: 17, text: 'Head coaches - set expectations, may organize team meals/activities' },
      { id: 18, text: 'Assistant coaches - help coordinate logistics' },
      { id: 19, text: 'Team managers - administrative coordination, communications' },
      { id: 20, text: 'Team parent (volunteer) - unofficial coordinator herding cats' },
      { id: 21, text: '── ORGANIZATION LEVEL ──' },
      { id: 22, text: 'Club directors - oversee multiple teams, negotiate group rates' },
      { id: 23, text: 'Travel coordinators - dedicated role at larger clubs' },
      { id: 24, text: 'League administrators - coordinate across multiple clubs' }
    ],
    'users-supply': [
      { id: 30, text: '── ACCOMMODATIONS ──' },
      { id: 31, text: 'Hotels/motels - traditional lodging, team blocks' },
      { id: 32, text: 'Vacation rentals - Airbnb/VRBO hosts, good for families' },
      { id: 33, text: 'Extended stay properties - kitchen amenities for longer tournaments' },
      { id: 34, text: 'RV parks/campgrounds - some families travel in RVs' },
      { id: 35, text: '── FOOD & DINING ──' },
      { id: 36, text: 'Sit-down restaurants - team dinners, family meals' },
      { id: 37, text: 'Quick service/fast food - speed between games' },
      { id: 38, text: 'Catering services - team meals at fields or hotels' },
      { id: 39, text: 'Grocery stores - families cooking at rentals' },
      { id: 40, text: 'Food trucks - on-site at complexes' },
      { id: 41, text: '── ENTERTAINMENT & ACTIVITIES ──' },
      { id: 42, text: 'Family entertainment centers (arcades, bowling, laser tag)' },
      { id: 43, text: 'Training facilities - batting cages, pitching tunnels' },
      { id: 44, text: 'Movie theaters' },
      { id: 45, text: 'Mini-golf, go-karts, amusement parks' },
      { id: 46, text: 'Local attractions - zoos, museums, aquariums' },
      { id: 47, text: 'Outdoor activities - parks, beaches, hiking, fishing' },
      { id: 48, text: 'Water parks, swimming pools' },
      { id: 49, text: '── SERVICES ──' },
      { id: 50, text: 'Sporting goods stores - forgot something, need replacements' },
      { id: 51, text: 'Urgent care/walk-in clinics - injuries happen' },
      { id: 52, text: 'Sports medicine/physical therapy - taping, recovery' },
      { id: 53, text: 'Laundromats - multi-day tournament necessity' },
      { id: 54, text: 'Photography/videography - team photos, game footage' },
      { id: 55, text: 'Private trainers/lessons - use downtime productively' },
      { id: 56, text: '── TRANSPORTATION ──' },
      { id: 57, text: 'Car rentals' },
      { id: 58, text: 'Shuttle services - hotel to complex' },
      { id: 59, text: 'Charter bus companies - full team travel' },
      { id: 60, text: 'Rideshare partnerships (Uber/Lyft)' },
      { id: 61, text: 'Parking services near venues' }
    ],
    'users-partners': [
      { id: 70, text: '── TOURNAMENT ECOSYSTEM ──' },
      { id: 71, text: 'Tournament organizers/operators - want attendance & happy travelers' },
      { id: 72, text: 'Sports complex owners - want to be destination of choice' },
      { id: 73, text: 'Sanctioning bodies (USSSA, Perfect Game, etc.) - credibility partners' },
      { id: 74, text: 'Team management platforms (TeamSnap, SportsEngine) - integration partners' },
      { id: 75, text: '── DESTINATION STAKEHOLDERS ──' },
      { id: 76, text: 'Convention & Visitor Bureaus (CVBs) - sports tourism marketing' },
      { id: 77, text: 'City/county tourism offices - want visitor spending data' },
      { id: 78, text: 'Chambers of Commerce - support local businesses' },
      { id: 79, text: 'Economic development offices - attract tournaments to region' },
      { id: 80, text: '── SPONSORS & ADVERTISERS ──' },
      { id: 81, text: 'Sports equipment brands (bats, gloves, cleats)' },
      { id: 82, text: 'Apparel brands (Nike, Under Armour, etc.)' },
      { id: 83, text: 'Sports nutrition brands (Gatorade, protein bars)' },
      { id: 84, text: 'Insurance companies - travel insurance, sports coverage' },
      { id: 85, text: 'Auto brands - targeting family vehicle buyers' },
      { id: 86, text: 'Financial services - family-focused credit cards' },
      { id: 87, text: '── DATA & INSIGHTS CONSUMERS ──' },
      { id: 88, text: 'Market researchers - youth sports spending patterns' },
      { id: 89, text: 'Real estate developers - where to build new complexes' },
      { id: 90, text: 'Franchise businesses - where to open new locations' }
    ],
    'ux-parent': [
      { id: 200, text: '── WHO THEY ARE ──' },
      { id: 201, text: 'Primary trip planner (usually mom or dad)' },
      { id: 202, text: 'Balancing player needs, sibling needs, budget, and sanity' },
      { id: 203, text: 'Time-starved, often planning trips last minute' },
      { id: 204, text: '── THEIR JOB TO BE DONE ──' },
      { id: 205, text: '"Plan a stress-free trip for my family around my kid\'s tournament"' },
      { id: 206, text: '── HOW THEY DO IT TODAY ──' },
      { id: 207, text: 'Google Maps + hotel apps + Yelp + asking other parents' },
      { id: 208, text: 'Group texts with other families trying to coordinate' },
      { id: 209, text: 'Spreadsheets or notes app to track game times vs. activities' },
      { id: 210, text: 'Lots of "we\'ll figure it out when we get there"' },
      { id: 211, text: '── THEIR IDEAL EXPERIENCE ──' },
      { id: 212, text: 'Select tournament → see everything nearby in one place' },
      { id: 213, text: 'Filter by "works in our 2-hour gap between games"' },
      { id: 214, text: 'See what other tournament families recommend' },
      { id: 215, text: 'Book hotel, restaurant, activity in one flow' },
      { id: 216, text: 'Get a unified itinerary synced to phone' },
      { id: 217, text: 'Receive alerts: "Head to the field in 30 min" or "Rain delay, here are indoor options"' },
      { id: 218, text: '── KEY SCREENS/TOUCHPOINTS ──' },
      { id: 219, text: 'Tournament search/select' },
      { id: 220, text: 'Trip dashboard with schedule + bookings' },
      { id: 221, text: 'Map view of services near the fields' },
      { id: 222, text: 'Time-slot suggestions ("You have 3 hours - here are ideas")' },
      { id: 223, text: 'Booking confirmation + add to calendar' },
      { id: 224, text: 'Day-of itinerary with notifications' }
    ],
    'ux-coordinator': [
      { id: 230, text: '── WHO THEY ARE ──' },
      { id: 231, text: 'Team manager, coach, or volunteer "team parent"' },
      { id: 232, text: 'Responsible for 12-15 families, herding cats' },
      { id: 233, text: 'Often doing this on top of their regular job' },
      { id: 234, text: '── THEIR JOB TO BE DONE ──' },
      { id: 235, text: '"Coordinate team logistics so families show up happy and on time"' },
      { id: 236, text: '── HOW THEY DO IT TODAY ──' },
      { id: 237, text: 'Email chains and group texts that get chaotic' },
      { id: 238, text: 'Manually calling hotels for team blocks' },
      { id: 239, text: 'Shared Google Docs that nobody reads' },
      { id: 240, text: 'Chasing down RSVPs for team dinners' },
      { id: 241, text: '── THEIR IDEAL EXPERIENCE ──' },
      { id: 242, text: 'Create a "team trip" for the tournament' },
      { id: 243, text: 'Share link with all families - they join with one click' },
      { id: 244, text: 'See who has booked hotels, who needs reminders' },
      { id: 245, text: 'Set up team dinner - families RSVP in-app' },
      { id: 246, text: 'Send announcements to whole team at once' },
      { id: 247, text: 'Dashboard showing "Team Status" - who\'s confirmed, who\'s pending' },
      { id: 248, text: '── KEY SCREENS/TOUCHPOINTS ──' },
      { id: 249, text: 'Team trip creation wizard' },
      { id: 250, text: 'Team dashboard - member status, bookings, RSVPs' },
      { id: 251, text: 'Shareable invite link' },
      { id: 252, text: 'Team announcement/messaging' },
      { id: 253, text: 'Group booking for restaurants/activities' },
      { id: 254, text: 'Export roster + logistics for coaches' }
    ],
    'ux-provider': [
      { id: 260, text: '── WHO THEY ARE ──' },
      { id: 261, text: 'Hotel manager, restaurant owner, activity center operator' },
      { id: 262, text: 'Located near tournament venues' },
      { id: 263, text: 'Know tournaments bring business but struggle to capture it' },
      { id: 264, text: '── THEIR JOB TO BE DONE ──' },
      { id: 265, text: '"Reach and convert families coming to town for tournaments"' },
      { id: 266, text: '── HOW THEY DO IT TODAY ──' },
      { id: 267, text: 'Hope for walk-ins or word of mouth' },
      { id: 268, text: 'Maybe a sign near the sports complex' },
      { id: 269, text: 'No visibility into tournament schedules' },
      { id: 270, text: 'Can\'t plan staffing around demand spikes' },
      { id: 271, text: '── THEIR IDEAL EXPERIENCE ──' },
      { id: 272, text: 'See upcoming tournaments and estimated attendance' },
      { id: 273, text: 'Create a listing highlighting sports-friendly features' },
      { id: 274, text: 'Receive bookings/leads directly through platform' },
      { id: 275, text: 'Offer special "tournament deals" to families' },
      { id: 276, text: 'Get reviews from sports families (builds credibility)' },
      { id: 277, text: 'See analytics: how many views, bookings, from which tournaments' },
      { id: 278, text: '── KEY SCREENS/TOUCHPOINTS ──' },
      { id: 279, text: 'Provider onboarding/listing creation' },
      { id: 280, text: 'Dashboard - upcoming tournaments, expected demand' },
      { id: 281, text: 'Booking/lead management' },
      { id: 282, text: 'Promotions/deals manager' },
      { id: 283, text: 'Reviews and ratings' },
      { id: 284, text: 'Analytics and reporting' }
    ],
    'ux-organizer': [
      { id: 290, text: '── WHO THEY ARE ──' },
      { id: 291, text: 'Tournament director or operations manager' },
      { id: 292, text: 'Running 5-50+ tournaments per year' },
      { id: 293, text: 'Competing with other tournaments for teams' },
      { id: 294, text: '── THEIR JOB TO BE DONE ──' },
      { id: 295, text: '"Make my tournament the one teams want to attend"' },
      { id: 296, text: '── HOW THEY DO IT TODAY ──' },
      { id: 297, text: 'Focus on fields, brackets, umpires - not travel experience' },
      { id: 298, text: 'Maybe a list of "recommended hotels" on website' },
      { id: 299, text: 'Field questions from parents about the area' },
      { id: 300, text: 'No insight into traveler experience or satisfaction' },
      { id: 301, text: '── THEIR IDEAL EXPERIENCE ──' },
      { id: 302, text: 'Embed RoadGame link in tournament registration' },
      { id: 303, text: 'Families get seamless travel planning after registering' },
      { id: 304, text: 'Tournament becomes known for "great travel experience"' },
      { id: 305, text: 'See data on where families are staying, what they\'re doing' },
      { id: 306, text: 'Potential revenue share from bookings' },
      { id: 307, text: '── KEY SCREENS/TOUCHPOINTS ──' },
      { id: 308, text: 'Tournament registration integration/embed' },
      { id: 309, text: 'Tournament dashboard - registered teams, travel activity' },
      { id: 310, text: 'Traveler satisfaction metrics' },
      { id: 311, text: 'Partner/sponsor management' },
      { id: 312, text: 'Revenue/commission reporting' }
    ],
    'ux-destination': [
      { id: 320, text: '── WHO THEY ARE ──' },
      { id: 321, text: 'CVB (Convention & Visitor Bureau) or tourism office staff' },
      { id: 322, text: 'Economic development officials' },
      { id: 323, text: 'Measured on tourism revenue and visitor spending' },
      { id: 324, text: '── THEIR JOB TO BE DONE ──' },
      { id: 325, text: '"Attract sports tourism and maximize visitor spending in our region"' },
      { id: 326, text: '── HOW THEY DO IT TODAY ──' },
      { id: 327, text: 'Bid on tournaments with incentives' },
      { id: 328, text: 'Provide welcome packets, but little visibility after that' },
      { id: 329, text: 'Estimate economic impact with rough formulas' },
      { id: 330, text: 'Limited data on actual visitor behavior' },
      { id: 331, text: '── THEIR IDEAL EXPERIENCE ──' },
      { id: 332, text: 'Dashboard showing all tournaments coming to the region' },
      { id: 333, text: 'Real data on visitor spending patterns' },
      { id: 334, text: 'Ability to promote local businesses to incoming travelers' },
      { id: 335, text: 'Measure ROI on sports tourism investments' },
      { id: 336, text: 'Use data to attract new tournaments ("look how well visitors are served")' },
      { id: 337, text: '── KEY SCREENS/TOUCHPOINTS ──' },
      { id: 338, text: 'Destination dashboard - tournament calendar, visitor projections' },
      { id: 339, text: 'Economic impact reporting' },
      { id: 340, text: 'Local business promotion tools' },
      { id: 341, text: 'Visitor satisfaction metrics' },
      { id: 342, text: 'Presentation-ready reports for stakeholders' }
    ],
    'value-families': [
      { id: 30, text: 'One-stop trip planning - everything in one place' },
      { id: 31, text: 'Tournament-aware scheduling - knows your game times and gaps' },
      { id: 32, text: 'Curated, kid-tested options - reviewed by other sports parents' },
      { id: 33, text: 'Consolidated itinerary - single view of entire trip' },
      { id: 34, text: 'Reduced stress - no more scrambling in unfamiliar towns' }
    ],
    'value-providers': [
      { id: 40, text: 'Access to predictable, recurring demand (tournament schedule = traffic)' },
      { id: 41, text: 'Pre-qualified family customers with intent to spend' },
      { id: 42, text: 'Group booking opportunities (teams, families)' },
      { id: 43, text: 'Reduced marketing/acquisition costs' },
      { id: 44, text: '"Sports-friendly" badge builds trust with target audience' }
    ],
    'features-planning': [
      { id: 50, text: 'Select tournament → auto-populates location, dates, venue' },
      { id: 51, text: 'Proximity-based recommendations (within X miles of fields)' },
      { id: 52, text: 'Time-slot aware suggestions ("you have 2 hours between games")' },
      { id: 53, text: 'Weather-integrated planning' },
      { id: 54, text: 'Kid age and interest filters' }
    ],
    'features-booking': [
      { id: 60, text: 'Hotel blocks with team rates' },
      { id: 61, text: 'Restaurant reservations integration' },
      { id: 62, text: 'Activity and experience booking' },
      { id: 63, text: 'Unified itinerary with push notifications' },
      { id: 64, text: 'Quick-service ratings (can we eat in 45 min?)' }
    ],
    'features-social': [
      { id: 70, text: 'Reviews from other sports parents (credibility)' },
      { id: 71, text: 'Teammate coordination - see where others are staying' },
      { id: 72, text: 'Team group booking tools' },
      { id: 73, text: 'Share itineraries with family members' },
      { id: 74, text: 'Sibling-friendly activity tags' }
    ],
    'mvp-must': [
      { id: 80, text: 'Tournament selection and lookup (start with one sport/region)' },
      { id: 81, text: 'Curated list of nearby hotels, restaurants, activities' },
      { id: 82, text: 'Basic itinerary builder' },
      { id: 83, text: 'Mobile-friendly web app' }
    ],
    'mvp-nice': [
      { id: 90, text: 'Direct booking integration' },
      { id: 91, text: 'User reviews and ratings' },
      { id: 92, text: 'Team coordination features' },
      { id: 93, text: 'Push notifications' }
    ],
    'mvp-out': [
      { id: 100, text: 'Native mobile apps (iOS/Android)' },
      { id: 101, text: 'Multi-sport support (start with baseball only)' },
      { id: 102, text: 'White-label for tournament organizers' },
      { id: 103, text: 'Provider self-service portal' },
      { id: 104, text: 'Payment processing' }
    ],
    'business-revenue': [
      { id: 110, text: 'Transaction fees - 10-15% commission on bookings' },
      { id: 111, text: 'Subscription - $99/season for premium features and deals' },
      { id: 112, text: 'Lead generation - charge providers per qualified referral' },
      { id: 113, text: 'Advertising/sponsorship - featured listings, brand partnerships' }
    ],
    'business-costs': [
      { id: 120, text: 'Tournament data acquisition and maintenance' },
      { id: 121, text: 'Provider onboarding and curation' },
      { id: 122, text: 'Platform development and hosting' },
      { id: 123, text: 'Customer acquisition (marketing)' },
      { id: 124, text: 'Customer support' }
    ],
    'business-metrics': [
      { id: 130, text: 'Monthly active users (families)' },
      { id: 131, text: 'Bookings per trip' },
      { id: 132, text: 'Provider listings by market' },
      { id: 133, text: 'Repeat usage rate' },
      { id: 134, text: 'Net Promoter Score (NPS)' }
    ],
    'roadmap-phase1': [
      { id: 140, text: 'Focus: Single sport (baseball) + single region (TX/FL/AZ)' },
      { id: 141, text: 'Partner with 2-3 major tournament organizers' },
      { id: 142, text: 'Manually curate initial provider listings' },
      { id: 143, text: 'Launch MVP web app' },
      { id: 144, text: 'Validate demand with real users' }
    ],
    'roadmap-phase2': [
      { id: 150, text: 'Expand to additional regions within baseball' },
      { id: 151, text: 'Add direct booking integrations' },
      { id: 152, text: 'Build review/rating system' },
      { id: 153, text: 'Launch team coordination features' },
      { id: 154, text: 'Provider self-service onboarding' }
    ],
    'roadmap-phase3': [
      { id: 160, text: 'Expand to additional sports (soccer, basketball, softball)' },
      { id: 161, text: 'Native mobile apps' },
      { id: 162, text: 'White-label offering for tournament organizers' },
      { id: 163, text: 'National coverage' },
      { id: 164, text: 'Premium subscription tier' }
    ],
    'questions-assumptions': [
      { id: 170, text: 'Parents will pay for convenience (vs. DIY with Google)' },
      { id: 171, text: 'Providers will participate without upfront payment' },
      { id: 172, text: 'Tournament data is accessible or can be aggregated' },
      { id: 173, text: 'Team-level coordination drives viral adoption' },
      { id: 174, text: 'Reviews from sports parents are more trusted than general reviews' }
    ],
    'questions-risks': [
      { id: 180, text: 'Chicken-and-egg: need providers to attract families, need families to attract providers' },
      { id: 181, text: 'Inventory integration complexity (hotels, restaurants, etc.)' },
      { id: 182, text: 'Geographic scaling - must build density market-by-market' },
      { id: 183, text: 'Seasonality - youth sports is seasonal by region and sport' },
      { id: 184, text: 'Trust barrier - parents are protective, need quality curation' },
      { id: 185, text: 'Competition from tournament apps adding similar features' }
    ]
  };

  // Initialize data from localStorage or use defaults
  let canvasData = loadData();

  // Load data from localStorage or use defaults
  function loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      } else {
        // First visit - use default data and save it
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
        return { ...DEFAULT_DATA };
      }
    } catch (e) {
      console.error('Error loading data:', e);
      return { ...DEFAULT_DATA };
    }
  }

  // Save data to localStorage
  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(canvasData));
    } catch (e) {
      console.error('Error saving data:', e);
    }
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
    return text.startsWith('──') || text.startsWith('--');
  }

  // Render a list
  function renderList(listElement, key) {
    const items = getItems(key);
    listElement.innerHTML = items.map(item => {
      const isHeader = isCategoryHeader(item.text);
      const headerClass = isHeader ? ' category-header' : '';
      // Clean up the header text (remove the ── markers)
      const displayText = isHeader ? item.text.replace(/^──\s*/, '').replace(/\s*──$/, '') : item.text;

      return `
        <li data-id="${item.id}" class="${headerClass}">
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
          // Small delay to allow click on edit button to register
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
      title: 'RoadGame - Business Canvas',
      exportedAt: new Date().toISOString(),
      sections: {}
    };

    // Map keys to readable names
    const keyNames = {
      'problem-points': 'Problem Statement',
      'users-demand': 'Users - Demand Side (Travelers)',
      'users-supply': 'Users - Supply Side (Service Providers)',
      'users-partners': 'Users - Partners & Ecosystem',
      'ux-parent': 'User Experience - Tournament Parent',
      'ux-coordinator': 'User Experience - Team Coordinator',
      'ux-provider': 'User Experience - Service Provider',
      'ux-organizer': 'User Experience - Tournament Organizer',
      'ux-destination': 'User Experience - CVB/Destination',
      'value-families': 'Value Prop - Families',
      'value-providers': 'Value Prop - Providers',
      'features-planning': 'Features - Trip Planning',
      'features-booking': 'Features - Booking & Logistics',
      'features-social': 'Features - Community & Social',
      'mvp-must': 'MVP - Must Have',
      'mvp-nice': 'MVP - Nice to Have',
      'mvp-out': 'MVP - Out of Scope',
      'business-revenue': 'Business Model - Revenue',
      'business-costs': 'Business Model - Costs',
      'business-metrics': 'Business Model - Metrics',
      'roadmap-phase1': 'Roadmap - Phase 1',
      'roadmap-phase2': 'Roadmap - Phase 2',
      'roadmap-phase3': 'Roadmap - Phase 3',
      'questions-assumptions': 'Assumptions to Validate',
      'questions-risks': 'Unknowns & Risks'
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

    // Remove existing modal if present
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) existingModal.remove();

    const modalHtml = `
      <div class="modal-overlay active">
        <div class="modal">
          <h3>Export Canvas Data</h3>
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

    // Close modal
    document.getElementById('closeModal').addEventListener('click', () => {
      overlay.remove();
    });

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });

    // Copy to clipboard
    document.getElementById('copyExport').addEventListener('click', () => {
      navigator.clipboard.writeText(json).then(() => {
        showToast('Copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy');
      });
    });

    // Download JSON
    document.getElementById('downloadExport').addEventListener('click', () => {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'roadgame-canvas.json';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Downloaded!');
    });

    // Close on Escape
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape' && document.querySelector('.modal-overlay')) {
        overlay.remove();
        document.removeEventListener('keydown', escHandler);
      }
    });
  }

  // Reset all data
  function resetData() {
    const choice = confirm('Click OK to reset to default content, or Cancel to keep your changes.\n\n(To clear everything, click OK then manually delete items.)');
    if (choice) {
      canvasData = { ...DEFAULT_DATA };
      saveData();
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

    // Export button
    document.getElementById('exportBtn').addEventListener('click', showExportModal);

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetData);

    console.log('RoadGame Business Canvas initialized');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
