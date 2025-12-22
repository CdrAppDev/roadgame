# RoadGame V1 Strategy

## The Thesis

Youth sports travel is a $52 billion market where families spend 10-15 weekends per year at tournaments. The pain isn't the games—it's the **unpredictable downtime between games**.

In bracket-style tournaments, families only know their first game time. Win or lose, their schedule changes. They can't plan excursions because they don't know when they'll be free. The result: families sit around, kids stare at iPads, and everyone's frustrated.

**The opportunity:** Build a platform that knows the bracket, calculates downtime for win/lose scenarios, and lets families book excursions with **automatic cancellation if they win**—no fees.

**Our approach:** Partner with excursion vendors who agree to no-cancellation-fee terms. They accept this because tournament weekends are high-demand—cancelled slots get resold. We take commission on completed bookings.

This isn't a discovery app. It's a **bracket-aware booking platform**.

---

## V1 Scope

V1 is a **single-tournament pilot** designed to validate the hypothesis: *Will families book excursions when they can plan for both win/lose scenarios without cancellation risk?*

### What's In V1

#### Tournament Management Layer (Critical Foundation)

| Feature | Purpose |
|---------|---------|
| **Tournament Creation** | TD creates tournament with dates, venue, team list |
| **Bracket Builder** | Define bracket structure (single elimination, double, pool play → bracket) |
| **Game Scheduling** | Assign game times, fields, matchups |
| **Results Entry** | Coaches/TDs update scores after each game |
| **Auto-Schedule Calculation** | System calculates next game times based on bracket progression |
| **Downtime Windows** | Show families: "If you win: free 2-5pm. If you lose: free 1-6pm." |

#### Family Experience

| Feature | Purpose |
|---------|---------|
| **Tournament Join** | Family receives invite, joins via magic link |
| **Schedule View** | See current game + both win/lose scenarios for next round |
| **Downtime Display** | Clear visualization of free time windows for each scenario |
| **Vendor Browse** | Browse partnered excursion vendors near venue |
| **Conditional Booking** | Book for "lose" scenario. If win → auto-cancel, no fee. |
| **Itinerary View** | See booked excursions and their status |

#### Vendor Integration

| Feature | Purpose |
|---------|---------|
| **Vendor Onboarding** | Partner agreement: no-cancellation-fee terms |
| **Availability Calendar** | Vendor sets available time slots |
| **Booking Receipt** | Vendor receives booking with conditional status |
| **Auto-Cancellation** | System cancels booking when family wins |
| **Commission Tracking** | Track completed bookings for commission |

### What's NOT in V1

- Multiple simultaneous tournaments
- Payment processing (manual invoicing for V1)
- Vendor self-service portal (we onboard manually)
- Mobile app (web-only)
- Real-time bracket sync with external tournament software
- Family-to-family social features

### Technical Stack

- Frontend: React or Next.js (need real app state management)
- Backend: Node/Express or Next.js API routes
- Database: PostgreSQL via Supabase
- Auth: Magic links (Supabase Auth)
- Email: Resend or SendGrid

---

## The Three-Sided Marketplace

V1 requires coordination across three parties:

```
┌─────────────────────────────────────────────────────────┐
│                    ROADGAME PLATFORM                     │
├──────────────────┬──────────────────┬───────────────────┤
│  TOURNAMENT      │     FAMILIES     │     VENDORS       │
│  DIRECTORS       │                  │                   │
├──────────────────┼──────────────────┼───────────────────┤
│ • Create bracket │ • View schedule  │ • List offerings  │
│ • Update results │ • See downtime   │ • Set availability│
│ • Manage teams   │ • Book excursions│ • Receive bookings│
│                  │ • Auto-cancel    │ • Accept terms    │
└──────────────────┴──────────────────┴───────────────────┘
```

**Value exchange:**
- **TDs get:** Modern bracket management tool, happy families
- **Families get:** Usable downtime, stress-free booking
- **Vendors get:** Guaranteed traffic, predictable cancellation patterns

---

## Target Tournament Selection

### Criteria

1. **Format:** Must have bracket component (not pure round-robin)
2. **Size:** 40-80 teams (manageable for V1)
3. **Access:** Direct relationship with TD
4. **Location:** Area with 5+ potential excursion vendors
5. **Timing:** 10-14 weeks out (need time to build + recruit vendors)

### Vendor Recruitment (Before Launch)

For V1, we need **3-5 excursion vendors** near the venue:
- Family-friendly activities (mini golf, bowling, arcades)
- Restaurants that take reservations
- Local attractions (museums, parks with rentals)

**Pitch to vendors:**
> "150 families will be in town for [Tournament]. We'll send them to you with confirmed bookings. Some will cancel last-minute when their team wins—but it's a tournament weekend, you'll fill those slots. No platform fees until we prove it works."

---

## Data Model

```
Tournament
  - name, dates, venue_address, bracket_type
  - has_many: Teams, Rounds, Vendors

Team
  - name, tournament_id
  - has_many: Families, Games

Family
  - email, name, team_id
  - has_many: Bookings

Round
  - tournament_id, round_number, scheduled_time
  - has_many: Games

Game
  - round_id, team_a_id, team_b_id
  - scheduled_time, field/location
  - score_a, score_b, status (scheduled/in_progress/completed)
  - winner_id, loser_id

Vendor
  - name, address, category, description
  - tournament_id (scoped to tournament area)
  - has_many: TimeSlots, Bookings

TimeSlot
  - vendor_id, start_time, end_time, capacity

Booking
  - family_id, vendor_id, time_slot_id
  - scenario: "lose" (always—you book for lose scenario)
  - status: pending/confirmed/auto_cancelled/completed
  - game_id (the game this booking depends on)
```

---

## Success Metrics

| Metric | Target | What It Tells Us |
|--------|--------|------------------|
| **TD Adoption** | 1 (pilot) | Can we get a TD to use bracket management? |
| **Vendor Partners** | 3-5 | Can we recruit vendors with no-fee terms? |
| **Family Confirmation** | >50% | Of invited families, how many join? |
| **Booking Rate** | >20% | Of confirmed families, how many book at least one excursion? |
| **Completion Rate** | Track | Of bookings, how many result in completed visits? |
| **Vendor Satisfaction** | Qualitative | Would vendors do this again? |

---

## Go / No-Go Criteria

### Continue Building If:
- Booking rate >20% (families actually book, not just browse)
- At least 2 vendors say "I'd do this again"
- TD found bracket management useful
- At least one "aha" moment (family raves about the experience)

### Pivot If:
- Families browse but don't book (<10% booking rate)
- Vendors reject the no-fee cancellation model
- Families say they'd rather "figure it out after the game"

### Stop If:
- Can't recruit 3 vendors
- TD won't adopt bracket management
- Fundamental assumption wrong (families don't plan ahead)

---

## Execution Phases

### Phase 1: Tournament Management Core
Build the bracket engine—this is the foundation everything else depends on.
- Tournament creation
- Bracket structure definition
- Game scheduling
- Results entry
- Auto-calculation of next games
- Downtime window calculation (win/lose scenarios)

### Phase 2: Family Experience
Build the family-facing booking flow.
- Magic link auth
- Tournament join flow
- Schedule + downtime view
- Vendor browsing
- Conditional booking flow
- Itinerary management

### Phase 3: Vendor Integration
Build minimal vendor tooling.
- Vendor onboarding (manual for V1)
- Availability management
- Booking notifications
- Auto-cancellation notifications

### Phase 4: Launch Prep
- Select tournament
- Recruit 3-5 vendors
- Onboard TD
- Test end-to-end flow
- Launch

---

## Team Roles

| Role | Responsibility |
|------|----------------|
| **Technical Lead** | Architecture, all coding, deployment |
| **Tournament Liaison** | TD relationship, vendor recruitment, day-of support |
| **Operations** | Manual vendor onboarding, booking support, issue resolution |

---

## The Ask

1. **Agree on pivot:** This is no longer a discovery app—it's a booking platform with tournament management. Are we aligned?
2. **Commit to scope:** Tournament management is critical. We build that first.
3. **Identify tournament:** Who has a TD relationship we can leverage?
4. **Identify vendors:** Who can recruit 3-5 local excursion vendors?
5. **Assign roles:** Who owns what?

---

## Why This Will Work

1. **Real value prop:** Families can actually plan, not just browse.
2. **Win-win for vendors:** They get guaranteed bookings; cancellations resell on busy weekends.
3. **TD gets value:** Modern bracket management tool (potential standalone value).
4. **Clear revenue model:** Commission on completed bookings.
5. **Defensible:** Tournament management + vendor relationships = hard to replicate.

---

## Key Risk: The Booking Cold Start

The new challenge: vendors won't partner without families, families won't book without vendors.

**Mitigation:**
1. Recruit vendors BEFORE families see the platform
2. Lead with TD value (bracket management) to get tournament buy-in
3. Offer vendors zero-risk trial: "No fees until we prove it works"
4. Start with vendors who are already hungry for tournament traffic

---

## Appendix: Research Findings

From market research:

- **Market size:** $52.2B direct spending, $128B total economic impact
- **Tournament frequency:** 10-15 weekends per year for serious travel teams
- **Downtime pain:** 8-10 hours at venue per day, much of it waiting
- **Spending per trip:** $830 average ($330 lodging, $250 transport, $250 food)
- **Key insight:** "Dead time gaps" ranked #2 pain point after lodging costs

Full research: [Research Dashboard](https://cdrappdev.github.io/roadgame/research-dashboard.html)
