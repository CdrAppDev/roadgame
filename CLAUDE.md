# RoadGame Project Context

## Current State (December 2024)

### What This Project Is NOW

**A group booking platform for tournament team activities.**

Team moms book group activities (restaurants, escape rooms, bowling, attractions) during tournament weekends. Activity providers pay for group leads. Team moms use it for free.

### Key Differentiator

**Built for bracket chaos.** Tournament schedules change constantly. You don't know if you're free until the last minute. We're built for "what's available RIGHT NOW for a group of 30?"

---

## What Changed (The Pivot)

### Original Thesis (OUTDATED)
- Build a "smart tournament scheduling system" with wave scheduling
- Cluster games so families have predictable free time
- TD revenue share on activity bookings

### Why It Was Invalidated

Research revealed:

1. **Wave scheduling already exists** - Poughkeepsie tournament has used it since 1988. Volleyball uses it universally. Not a new invention.

2. **The blocker is the club business model, not software** - Large clubs send 15 teams with only 6 coaches. TDs stagger games (U11 at 9am, U12 at 11am, U13 at 2pm) so one coach can cover multiple teams sequentially. Wave scheduling would create overlaps one coach can't handle.

3. **TDs won't adopt wave scheduling** - They prioritize big clubs (their paying customers) over family convenience. Staggered schedules aren't "bad scheduling"—they're intentional accommodation.

4. **Families want GROUP activities** - Not individual bookings. They want team experiences. The team mom coordinates this.

### New Direction

Accept that schedules will remain chaotic. Help families cope by making group booking easy despite the chaos.

---

## GitHub Issues

**Current Issues (V1 Proposal):**
- #35 - Founder Alignment on V1 Proposal
- #36 - Customer Discovery: Team Mom Interviews
- #37 - Customer Discovery: Activity Provider Interviews
- #38 - Research: Wave Scheduling Tournaments

**Closed Issues:**
- Issues #14-34 were closed - they described the old tournament management system approach (invalidated by research)

## Outdated Files

These files reflect the OLD thesis and should be considered historical:

- `V1-STRATEGY.md` - Describes wave scheduling approach (invalidated)
- `research/00-research-synthesis.md` - May be outdated

## Current Files

The presentation at https://cdrappdev.github.io/roadgame/ reflects current thinking:

- `thesis.html` - Original thesis (for context)
- `research.html` - What we found (validated + invalidated)
- `questions.html` - Answered questions + new questions
- `paths.html` - Options considered
- `decision.html` - **THE PROPOSAL** - Current V1 direction

Research files in `/research/` folder:
- `Tournament Director Motivations and Incentives.md`
- `Wave Scheduling in Youth Sports Tournaments.md`
- `Youth Sports Tournament Family Activity Demand.md`
- `Youth Sports Tournament Day Experience.md`
- `Youth Sports Schedule Pain Point Research.md`

---

## The V1 Proposal

### What We're Building

A group booking platform for tournament team activities.

### How It Works

1. Team mom opens the app: "We're in Orlando for a tournament. What can we do with 15 kids and 20 adults?"
2. See group-friendly options nearby (restaurants, escape rooms, bowling, attractions)
3. Book with flexibility: "We just found out we're free from 5-8pm. What's available NOW?"
4. Activity provider pays us (commission, lead fee, or featured placement)

### Who Pays

Activity providers pay for group leads. Groups are high-value customers ($500-800 team dinner, $400+ escape room for 20).

Team moms use it for free.

### What Needs Validation

Before building anything:

1. **Would activity providers pay for group leads?** Talk to 5-10 restaurants/venues near tournament hotspots.
2. **Would team moms use a centralized tool?** Talk to 5-10 team moms about how they currently coordinate.
3. **Can we get tournament-friendly flexibility?** Would venues offer flexible cancellation for tournament groups?

---

## Next Steps

1. Founder alignment on the proposal (Agree / Concerns / Disagree)
2. If agreed: Customer discovery interviews with team moms and activity providers
3. Validate willingness to pay before building anything

---

## Key Research Insights

### Validated
- $19.2B market, families spend $1,200-1,500 per tournament weekend
- 59% of families try to combine tournaments with activities
- Families want GROUP experiences, not individual bookings
- Team moms struggle to coordinate group activities
- "Hostage" experience is real: 60-70% of tournament day is NOT watching games

### Invalidated/Complicated
- Wave scheduling is not novel (exists since 1988)
- TDs won't adopt better scheduling (blocker is club coaching model)
- Individual activity marketplace won't work (families want group, bracket unpredictability blocks advance booking)

### Key Reframe
"Staggered schedules aren't bad scheduling—they're intentional accommodation of under-staffed clubs."
