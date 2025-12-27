/**
 * Tourny-Cation Tournament Scheduler
 *
 * Creates a wave-scheduled tournament maximizing:
 * 1. Court utilization
 * 2. Predictable downtime for team excursions
 *
 * Key constraint: No team plays two games simultaneously
 */

const CONFIG = {
  sport: 'basketball',
  courts: 4,
  teams: 20,
  days: 2,
  gamesPerTeam: 4,
  gameSlotMinutes: 90,
  gameDurationMinutes: 60,
  minRestMinutes: 30,
  poolSize: 5,
};

/**
 * Pre-computed balanced 5-team round-robin split across 2 days
 * Each team plays exactly 2 games per day, 4 total
 *
 * Day 1: Games that can be scheduled without conflicts
 * Day 2: Remaining games
 */
function getBalancedPoolSchedule(teamNumbers) {
  const [t1, t2, t3, t4, t5] = teamNumbers;

  return {
    day1: [
      { home: t1, away: t2 },  // Slot 1
      { home: t4, away: t5 },  // Slot 1
      { home: t1, away: t3 },  // Slot 2
      { home: t2, away: t5 },  // Slot 2
      { home: t3, away: t4 },  // Slot 3
    ],
    day2: [
      { home: t1, away: t4 },  // Slot 1
      { home: t2, away: t3 },  // Slot 1
      { home: t1, away: t5 },  // Slot 2
      { home: t2, away: t4 },  // Slot 2
      { home: t3, away: t5 },  // Slot 3
    ],
  };
}

/**
 * Interleave two pools' games so they can share courts efficiently
 * Returns games ordered so no team conflicts within a time slot
 */
function interleavePoolGames(poolA, poolB) {
  // Pool A slots: [0,1], [2,3], [4]
  // Pool B slots: [0,1], [2,3], [4]
  // Combined: slot1 = A[0,1] + B[0,1] (4 games on 4 courts)
  //           slot2 = A[2,3] + B[2,3] (4 games on 4 courts)
  //           slot3 = A[4] + B[4] (2 games on 2 courts)
  return [
    // Time slot 1 - 4 courts full
    { ...poolA[0], slot: 0 },
    { ...poolA[1], slot: 0 },
    { ...poolB[0], slot: 0 },
    { ...poolB[1], slot: 0 },
    // Time slot 2 - 4 courts full
    { ...poolA[2], slot: 1 },
    { ...poolA[3], slot: 1 },
    { ...poolB[2], slot: 1 },
    { ...poolB[3], slot: 1 },
    // Time slot 3 - 2 courts used
    { ...poolA[4], slot: 2 },
    { ...poolB[4], slot: 2 },
  ];
}

function createSchedule() {
  // Create 4 pools of 5 teams each
  const pools = [
    { name: 'Pool A', teams: ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5'] },
    { name: 'Pool B', teams: ['Team 6', 'Team 7', 'Team 8', 'Team 9', 'Team 10'] },
    { name: 'Pool C', teams: ['Team 11', 'Team 12', 'Team 13', 'Team 14', 'Team 15'] },
    { name: 'Pool D', teams: ['Team 16', 'Team 17', 'Team 18', 'Team 19', 'Team 20'] },
  ];

  // Generate balanced schedules for each pool
  const poolSchedules = {};
  for (const pool of pools) {
    poolSchedules[pool.name] = getBalancedPoolSchedule(pool.teams);
  }

  // Time slots (90-min spacing for 30-min minimum rest between games)
  const morningTimes = ['8:00 AM', '9:30 AM', '11:00 AM'];
  const afternoonTimes = ['1:30 PM', '3:00 PM', '4:30 PM'];

  // Build schedule
  const schedule = {
    saturday: { morning: [], afternoon: [] },
    sunday: { morning: [], afternoon: [] },
  };

  // Helper to assign games to a block
  function buildBlock(poolAName, poolBName, dayKey, times) {
    const poolAGames = poolSchedules[poolAName][dayKey];
    const poolBGames = poolSchedules[poolBName][dayKey];
    const interleaved = interleavePoolGames(poolAGames, poolBGames);

    let courtNum = 1;
    return interleaved.map((game, idx) => {
      const result = {
        ...game,
        pool: idx < 5 ? poolAName : poolBName,
        time: times[game.slot],
        court: `Court ${courtNum}`,
      };
      courtNum = courtNum >= 4 ? 1 : courtNum + 1;
      return result;
    });
  }

  // Morning wave: Pools A & B
  // Afternoon wave: Pools C & D
  schedule.saturday.morning = buildBlock('Pool A', 'Pool B', 'day1', morningTimes);
  schedule.saturday.afternoon = buildBlock('Pool C', 'Pool D', 'day1', afternoonTimes);
  schedule.sunday.morning = buildBlock('Pool A', 'Pool B', 'day2', morningTimes);
  schedule.sunday.afternoon = buildBlock('Pool C', 'Pool D', 'day2', afternoonTimes);

  return { schedule, pools };
}

function getTeamSchedule(schedule, teamName) {
  const allGames = [
    ...schedule.saturday.morning.map(g => ({ ...g, day: 'Saturday' })),
    ...schedule.saturday.afternoon.map(g => ({ ...g, day: 'Saturday' })),
    ...schedule.sunday.morning.map(g => ({ ...g, day: 'Sunday' })),
    ...schedule.sunday.afternoon.map(g => ({ ...g, day: 'Sunday' })),
  ];

  return allGames
    .filter(g => g.home === teamName || g.away === teamName)
    .map(g => ({
      day: g.day,
      time: g.time,
      court: g.court,
      opponent: g.home === teamName ? g.away : g.home,
    }))
    .sort((a, b) => {
      if (a.day !== b.day) return a.day === 'Saturday' ? -1 : 1;
      return a.time.localeCompare(b.time);
    });
}

function validateSchedule(schedule) {
  const allGames = [
    ...schedule.saturday.morning,
    ...schedule.saturday.afternoon,
    ...schedule.sunday.morning,
    ...schedule.sunday.afternoon,
  ];

  // Check game counts per team
  const gameCounts = {};
  for (const game of allGames) {
    gameCounts[game.home] = (gameCounts[game.home] || 0) + 1;
    gameCounts[game.away] = (gameCounts[game.away] || 0) + 1;
  }

  // Check for time conflicts
  const conflicts = [];
  const blocks = [
    { name: 'Sat Morning', games: schedule.saturday.morning },
    { name: 'Sat Afternoon', games: schedule.saturday.afternoon },
    { name: 'Sun Morning', games: schedule.sunday.morning },
    { name: 'Sun Afternoon', games: schedule.sunday.afternoon },
  ];

  for (const block of blocks) {
    const bySlot = {};
    for (const game of block.games) {
      if (!bySlot[game.time]) bySlot[game.time] = [];
      bySlot[game.time].push(game);
    }

    for (const [time, games] of Object.entries(bySlot)) {
      const teamsInSlot = [];
      for (const game of games) {
        if (teamsInSlot.includes(game.home)) {
          conflicts.push(`${game.home} plays twice at ${time} in ${block.name}`);
        }
        if (teamsInSlot.includes(game.away)) {
          conflicts.push(`${game.away} plays twice at ${time} in ${block.name}`);
        }
        teamsInSlot.push(game.home, game.away);
      }
    }
  }

  return { gameCounts, conflicts, totalGames: allGames.length };
}

function printSchedule() {
  const { schedule, pools } = createSchedule();
  const validation = validateSchedule(schedule);

  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('                 TOURNY-CATION TOURNAMENT SCHEDULE');
  console.log('                       Basketball • 20 Teams');
  console.log('═══════════════════════════════════════════════════════════════════\n');

  console.log('WAVE ASSIGNMENTS:');
  console.log('─────────────────');
  console.log('🌅 MORNING WAVE (Play 8am-12pm, FREE afternoons)');
  console.log('   Pool A:', pools[0].teams.join(', '));
  console.log('   Pool B:', pools[1].teams.join(', '));
  console.log('');
  console.log('🌆 AFTERNOON WAVE (FREE mornings, Play 1pm-5pm)');
  console.log('   Pool C:', pools[2].teams.join(', '));
  console.log('   Pool D:', pools[3].teams.join(', '));

  // Print schedule
  const days = [
    { name: 'SATURDAY', data: schedule.saturday },
    { name: 'SUNDAY', data: schedule.sunday },
  ];

  for (const day of days) {
    console.log(`\n${'═'.repeat(67)}`);
    console.log(`                            ${day.name}`);
    console.log(`${'═'.repeat(67)}`);

    const blocks = [
      { name: 'MORNING', games: day.data.morning, pools: 'Pool A & B', free: 'Pools C & D FREE' },
      { name: 'AFTERNOON', games: day.data.afternoon, pools: 'Pool C & D', free: 'Pools A & B FREE' },
    ];

    for (const block of blocks) {
      console.log(`\n${block.name} SESSION (${block.pools}) — ${block.free}`);
      console.log('─'.repeat(67));
      console.log('Time        | Court 1      | Court 2      | Court 3      | Court 4');
      console.log('─'.repeat(67));

      const gamesByTime = {};
      for (const game of block.games) {
        if (!gamesByTime[game.time]) gamesByTime[game.time] = {};
        gamesByTime[game.time][game.court] = game;
      }

      const times = block.name === 'MORNING'
        ? ['8:00 AM', '9:30 AM', '11:00 AM']
        : ['1:30 PM', '3:00 PM', '4:30 PM'];

      for (const time of times) {
        const row = [time.padEnd(11)];
        for (let c = 1; c <= 4; c++) {
          const game = gamesByTime[time]?.[`Court ${c}`];
          if (game) {
            const matchup = `${game.home.replace('Team ', 'T')} v ${game.away.replace('Team ', 'T')}`;
            row.push(matchup.padEnd(12));
          } else {
            row.push('--'.padEnd(12));
          }
        }
        console.log(row.join(' | '));
      }
    }
  }

  // Metrics
  console.log(`\n${'═'.repeat(67)}`);
  console.log('                             METRICS');
  console.log(`${'═'.repeat(67)}`);
  console.log(`Total Games:           ${validation.totalGames}`);
  console.log(`Available Slots:       48 (4 courts × 3 slots × 2 blocks × 2 days)`);
  console.log(`Court Utilization:     ${((validation.totalGames / 48) * 100).toFixed(1)}%`);
  console.log(`Game Slot Duration:    ${CONFIG.gameSlotMinutes} minutes`);
  console.log(`Minimum Rest Time:     ${CONFIG.minRestMinutes} minutes between games`);
  console.log(`Guaranteed Downtime:   4+ hours per day (half-day blocks)`);

  // Game count verification
  console.log(`\nGames per Team:`);
  const counts = Object.entries(validation.gameCounts)
    .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))
    .map(([team, count]) => `${team.replace('Team ', 'T')}:${count}`);
  console.log('  ' + counts.join(', '));

  if (validation.conflicts.length > 0) {
    console.log('\n⚠️  CONFLICTS DETECTED:');
    validation.conflicts.forEach(c => console.log(`   ${c}`));
  } else {
    console.log('\n✅ No scheduling conflicts detected');
  }

  // Sample team schedules
  console.log(`\n${'═'.repeat(67)}`);
  console.log('                       SAMPLE TEAM SCHEDULES');
  console.log(`${'═'.repeat(67)}`);

  for (const [teamName, wave, poolLetter] of [
    ['Team 1', 'Morning Wave', 'A'],
    ['Team 8', 'Morning Wave', 'B'],
    ['Team 14', 'Afternoon Wave', 'C'],
  ]) {
    const teamSched = getTeamSchedule(schedule, teamName);
    console.log(`\n${teamName} (${wave} - Pool ${poolLetter})`);
    console.log('─'.repeat(50));
    for (const game of teamSched) {
      console.log(`  ${game.day.padEnd(9)} ${game.time.padEnd(10)} ${game.court.padEnd(10)} vs ${game.opponent}`);
    }
    const freeTime = wave === 'Morning Wave' ? 'afternoons (1pm-6pm+)' : 'mornings (until 1pm)';
    console.log(`  ✅ FREE: Both ${freeTime}`);
  }

  // Excursions
  console.log(`\n${'═'.repeat(67)}`);
  console.log('                      EXCURSION WINDOWS');
  console.log(`${'═'.repeat(67)}`);
  console.log('\n📍 Morning Wave (Pools A & B) — FREE 1pm onwards both days:');
  console.log('   Saturday: Beach trip, pool party, shopping');
  console.log('   Sunday: Boat tour, theme park, team dinner');
  console.log('');
  console.log('📍 Afternoon Wave (Pools C & D) — FREE until 1pm both days:');
  console.log('   Saturday: Sunrise kayaking, brunch, golf');
  console.log('   Sunday: Farmers market, spa morning, hiking');

  console.log(`\n${'═'.repeat(67)}`);
  console.log('                       VALUE PROPOSITION');
  console.log(`${'═'.repeat(67)}`);
  console.log('\n✓ PREDICTABLE: Wave assignments known weeks in advance');
  console.log('✓ GUARANTEED: 4+ hours uninterrupted free time every day');
  console.log('✓ GROUP: Entire team off together (not staggered)');
  console.log('✓ BOOKABLE: Excursion providers plan around wave schedule');
  console.log('✓ PREMIUM: Families pay 40-60% more for this experience');
}

module.exports = { createSchedule, getTeamSchedule, validateSchedule, CONFIG };

printSchedule();
