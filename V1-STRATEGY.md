# RoadGame V1 Strategy

## The Thesis

Youth sports travel is a $52 billion market where families are a captive, frustrated audience. They spend 10-15 weekends per year at tournaments, paying inflated hotel rates through mandatory booking portals, eating at random restaurants because no one coordinates the team, and watching siblings stare at iPads during 3-hour gaps between games.

**The opportunity:** No one owns the family experience layer. Tournament platforms serve organizers. Team apps serve coaches. Booking sites serve hotels. But no one helps the family answer: "What do we do with the next 4 hours?"

**Our approach:** Build the Yelp for tournament weekends. Scrape providers first (restaurants, activities, entertainment). Let families browse and express interest. Use that engagement data to prove demand to providers. Let providers claim their listings once we show them traffic.

This avoids the classic marketplace chicken-and-egg problem. We don't need provider partnerships to launch—we need families using the product.

---

## V1 Scope

V1 is a **single-tournament pilot** designed to validate one hypothesis: *Will families engage with local recommendations when presented in the context of their tournament schedule?*

### What's In V1

| Feature | Purpose |
|---------|---------|
| **Tournament Director Roster Upload** | TD uploads CSV of families (name, email). This is our distribution mechanism. |
| **Email Invitations** | Families receive magic link (no password). One click to join. |
| **Family Confirmation** | Family lands on tournament page, confirms participation. |
| **Schedule View** | Shows game times + downtime windows. "You have 3 hours free Saturday 2-5pm." |
| **Provider Listings** | Restaurants, activities, attractions near venue. Scraped from Google Places. |
| **Interest Button** | Families tap "Interested" on listings. No booking, no payment—just signal. |
| **Social Proof** | "3 teammates also interested" shown on listings. |

### What's NOT in V1

- Provider-side features (claiming, responding, offers)
- Booking or reservations
- Payment processing
- Multiple tournaments
- Mobile app (web-only)
- Real-time schedule updates from tournament software

### Technical Stack

- Vanilla JS frontend (consistent with existing codebase)
- No backend for V1—use Firebase or Supabase for auth + data
- Google Places API for provider scraping
- SendGrid or Resend for transactional email

---

## Target Tournament Selection

### Criteria

1. **Size:** 80-150 teams (large enough to matter, small enough to serve)
2. **Sport:** Basketball, soccer, or baseball (highest travel frequency)
3. **Access:** We have a connection to the tournament director or a coach
4. **Timing:** 8-12 weeks out (enough time to build, close enough to stay focused)
5. **Location:** City with decent restaurant/activity density near venue

### Selection Process

1. List tournaments meeting criteria in next 3 months
2. Identify any existing relationships (coach, parent, TD)
3. Prioritize by access > timing > size
4. Reach out to TD with pitch: "Free tool for your families. We handle everything."

**Action required:** The founding team needs to identify 3-5 candidate tournaments and rank by access. Pick one within the next week.

---

## Success Metrics

These are the numbers we'll measure after the tournament:

| Metric | Target | What It Tells Us |
|--------|--------|------------------|
| **Confirmation Rate** | >50% | Of families invited, what % actually joined? Measures: Is the value prop clear? Is the onboarding frictionless? |
| **Browse Rate** | >70% | Of confirmed families, what % viewed at least one provider listing? Measures: Is the UI discoverable? |
| **Interest Rate** | >30% | Of confirmed families, what % expressed interest in at least one listing? Measures: Are the recommendations relevant? |
| **Social Engagement** | >15% | Of interests expressed, what % were on listings where teammates also expressed interest? Measures: Does the social component drive behavior? |
| **Provider Views** | Track all | Total views per listing. This becomes our proof point for provider outreach post-V1. |

---

## Go / No-Go Criteria

After V1, we make a decision:

### Continue Building If:
- Confirmation rate >50% AND interest rate >30%
- Qualitative feedback indicates families found it useful
- At least one "aha" moment observed (e.g., team actually coordinated dinner through the app)

### Pivot If:
- Confirmation rate <30% (families don't care enough to join)
- Interest rate <15% (recommendations aren't compelling)
- Families say "I'd just use Yelp" in feedback

### Stop If:
- Can't get tournament director to participate
- Can't reach families through email (spam filters, ignored)
- Fundamental assumption wrong (families don't want coordination—they want to escape the team)

---

## Execution Sequence

```
Phase 1: Setup (Issues #2, #3, #4)
├── Data model & architecture
├── Tournament director admin (CSV upload)
└── Email invitation system

Phase 2: Family Experience (Issues #5, #6, #7, #8)
├── Family confirmation flow
├── Schedule view
├── Provider listings
└── Interest & social component

Phase 3: Data (Issues #9, #10)
├── Provider scraping (Google Places)
└── Schedule data entry (manual for V1)

Phase 4: Launch (Issues #11, #12, #13)
├── Select target tournament
├── Analytics setup
└── Deploy & launch
```

---

## Team Roles

| Role | Responsibility |
|------|----------------|
| **Technical Lead (You)** | Architecture decisions, all coding, deployment |
| **Tournament Liaison** | Relationship with TD, roster collection, day-of support |
| **Research & Analysis** | Monitor metrics, conduct post-tournament interviews, synthesize learnings |

---

## The Ask to Co-Founders

1. **Agree on thesis:** Do we believe the family experience gap is real and worth pursuing?
2. **Commit to V1 scope:** This is what we're building, nothing more.
3. **Identify tournament candidates:** Each founder lists any tournaments they have access to.
4. **Assign roles:** Who owns TD relationship? Who owns post-tournament research?
5. **Set a launch target:** Pick a tournament and work backward.

---

## Why This Will Work

1. **No chicken-and-egg:** We scrape providers, so we launch with inventory on day one.
2. **Built-in distribution:** Tournament director sends the invite, not us. We piggyback on existing trust.
3. **Social proof drives engagement:** "Your teammates are interested" is more compelling than any marketing.
4. **Low-risk validation:** One tournament, 100-200 families, a few weeks of effort. We learn fast.
5. **Clear next step:** If V1 works, we approach providers with data: "150 families viewed your listing. Want to claim it?"

---

## Appendix: Key Research Findings

From our market research synthesis:

- **Market size:** $52.2B direct spending, $128B total economic impact
- **Pain points (ranked):** Stay-to-Play mandates > Schedule chaos > App fatigue > Group dining > Sibling neglect > Burnout
- **Bootstrap precedents:** OpenTable (single-player mode), Airbnb (event-based launch), Yelp (claim listing model)
- **The gap:** No platform connects bracket/schedule to real-time local recommendations

Full research available at: [Research Dashboard](https://cdrappdev.github.io/roadgame/research-dashboard.html)
