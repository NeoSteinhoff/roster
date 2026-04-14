const RECORDS_KEY = 'friends-circle-crm.static.v4'
const SETTINGS_KEY = 'friends-circle-crm.settings.v1'
const DRAFTS_KEY = 'friends-circle-crm.drafts.v1'
const REMINDER_LOG_KEY = 'friends-circle-crm.reminders.v1'
const GEOCODE_CACHE_KEY = 'friends-circle-crm.geocode-cache.v1'
const APP_VERSION = '0.9.3'
const PROFILE_CLOSE_MS = 220
const workspaceModes = ['classic', 'tab', 'map', 'relationships', 'timeline']

const baseTierDefinitions = [
  {
    key: 'inner-circle',
    label: 'Inner circle',
    cadenceHint: 'Touch weekly',
    description: 'Your closest people. Prioritize them first.',
  },
  {
    key: 'close',
    label: 'Close',
    cadenceHint: 'Every 10-14 days',
    description: 'Strong friendships that deserve active upkeep.',
  },
  {
    key: 'medium',
    label: 'Medium',
    cadenceHint: 'Every 2-4 weeks',
    description: 'Solid friends who can drift if you do not stay intentional.',
  },
  {
    key: 'acquaintance',
    label: 'Acquaintance',
    cadenceHint: 'Monthly or event-based',
    description: 'Lighter relationships, social orbit, and warm intros.',
  },
]
const tierOrder = baseTierDefinitions.map((tier) => tier.key)
const baseTouchStyles = ['Text', 'Call', 'Coffee', 'Dinner', 'Voice note']
const suggestedTags = [
  'family',
  'local',
  'long-distance',
  'founder',
  'creative',
  'business',
  'travel',
  'social',
  'operator',
  'friend',
  'fitness',
  'investing',
  'dog',
  'loyal',
  'local',
  'europe',
]

const settingsTabs = [
  { key: 'general', label: 'General', eyebrow: 'Workspace', title: 'Visuals, motion, and daily controls', summary: 'Tune the app shell, motion behavior, scale, and reminders without hunting through separate modals.' },
  { key: 'defaults', label: 'Defaults', eyebrow: 'Template', title: 'New-person defaults', summary: 'Set the starting tier, cadence, tags, groups, and city so adding people feels instant.' },
  { key: 'extra', label: 'Extra features', eyebrow: 'Structure', title: 'Modules, tiers, and cleanup', summary: 'Control optional modules, custom lanes, tutorial behavior, and workspace visibility.' },
  { key: 'shortcuts', label: 'Shortcuts', eyebrow: 'Keyboard', title: 'Keys and command habits', summary: 'See the shortcuts map and the command palette actions that keep the app fast.' },
  { key: 'data', label: 'Data', eyebrow: 'Safety', title: 'Imports, exports, and recovery', summary: 'Handle backups, merges, imports, duplicates, and resets from one safer control room.' },
]

const themeOptions = [
  { value: 'mesh', label: 'Mesh Night' },
  { value: 'clay', label: 'Clay Ember' },
  { value: 'harbor', label: 'Harbor Slate' },
]

const contactFields = [
  { key: 'email', label: 'Email', type: 'email', placeholder: 'name@example.com' },
  { key: 'phone', label: 'Phone', type: 'text', placeholder: '+971 ...' },
  { key: 'whatsapp', label: 'WhatsApp', type: 'text', placeholder: '+971 ...' },
  { key: 'telegram', label: 'Telegram', type: 'text', placeholder: '@handle' },
  { key: 'linkedin', label: 'LinkedIn', type: 'url', placeholder: 'linkedin.com/in/...' },
  { key: 'instagram', label: 'Instagram', type: 'text', placeholder: '@handle' },
  { key: 'snapchat', label: 'Snapchat', type: 'text', placeholder: '@handle' },
  { key: 'tiktok', label: 'TikTok', type: 'text', placeholder: '@handle' },
  { key: 'x', label: 'X', type: 'text', placeholder: '@handle' },
  { key: 'website', label: 'Website', type: 'url', placeholder: 'https://...' },
  { key: 'company', label: 'Company', type: 'text', placeholder: 'Company or context' },
  { key: 'birthday', label: 'Birthday', type: 'date', placeholder: '' },
]

const hotkeyLegend = [
  { keys: 'Cmd/Ctrl + K', action: 'Open quick actions' },
  { keys: '/', action: 'Search roster' },
  { keys: 'N', action: 'Add person' },
  { keys: 'G', action: 'Open settings' },
  { keys: '?', action: 'Open shortcuts tab' },
  { keys: 'S', action: 'Toggle multi-select' },
  { keys: 'J / K', action: 'Move selection' },
  { keys: 'M', action: 'Mark touched today' },
  { keys: 'A', action: 'Archive or restore person' },
  { keys: 'P', action: 'Toggle full profile' },
  { keys: 'B', action: 'Toggle meeting brief' },
  { keys: 'Q', action: 'Toggle quick capture' },
  { keys: 'U', action: 'Toggle orbit' },
  { keys: 'C', action: 'Toggle compact mode' },
  { keys: 'E', action: 'Focus memory' },
  { keys: 'T', action: 'Focus tags' },
  { keys: 'F', action: 'Focus active context' },
  { keys: 'O', action: 'Focus notes' },
  { keys: '[', action: 'Hide or show left rail' },
  { keys: ']', action: 'Hide or show inspector' },
  { keys: 'Cmd/Ctrl + A', action: 'Select all visible' },
  { keys: 'I', action: 'Import memory file' },
  { keys: 'X', action: 'Export memory file' },
  { keys: 'Cmd/Ctrl + ,', action: 'Open settings' },
  { keys: 'Cmd/Ctrl + Enter', action: 'Save memory' },
  { keys: '1-6', action: 'Jump filters' },
  { keys: 'Esc', action: 'Close settings' },
]

const onboardingSteps = [
  {
    eyebrow: 'Welcome',
    title: 'Roster helps you remember people without becoming weirdly robotic about it.',
    body: 'Think of it as a calm relationship cockpit: context, memories, cadence, and follow-up timing, all in one place.',
    target: 'hero-actions',
    placement: 'bottom-left',
  },
  {
    eyebrow: 'Views',
    title: 'These modes change how your roster thinks.',
    body: 'Classic is your full CRM. Tab is faster. Map is place-based. Timeline is story-based. Use the one that matches your brain that day.',
    target: 'hero-modes',
    placement: 'bottom-left',
  },
  {
    eyebrow: 'Left rail',
    title: 'This is where you change the lens.',
    body: 'Views, Today, Groups, and Tags all live here. If the rail ever feels noisy, hide it with [ and bring it back when you need it.',
    target: 'left-rail',
    placement: 'right',
  },
  {
    eyebrow: 'Today',
    title: 'Today is your nudge engine.',
    body: 'It groups who deserves a touch now, tomorrow, and this week. Attention mode is the same module with a sharper urgency filter.',
    target: 'today-module',
    placement: 'right',
  },
  {
    eyebrow: 'Inspector',
    title: 'The person card is your launchpad.',
    body: 'Open the selected-person section for identity, photo, full profile, and archive controls. You can hide the whole inspector with ].',
    target: 'inspector-identity',
    placement: 'left',
  },
  {
    eyebrow: 'Cadence',
    title: 'Cadence means how often you want Roster to remind you to reconnect.',
    body: 'A 7 day cadence means weekly. A 21 day cadence means roughly every three weeks. Bond health is your gut-check score, not a fake science meter.',
    target: 'inspector-basics',
    placement: 'left',
  },
  {
    eyebrow: 'Bulk mode',
    title: 'Multi-select is for decisive cleaning, not suffering.',
    body: 'Select a bunch of people, then archive, restore, tag, group, or mass-edit them together. It should feel like a sweep, not a chore.',
    target: 'bulk-actions',
    placement: 'top',
  },
  {
    eyebrow: 'Safety',
    title: 'Archive is reversible. Delete is forever forever.',
    body: 'If someone is tagged, grouped, tiered, or memory-heavy, Roster now double-checks before you yeet them into the void.',
    target: 'inspector-status',
    placement: 'left',
  },
  {
    eyebrow: 'Settings',
    title: 'Settings is the control room.',
    body: 'Use Extra features to hide modules, manage custom tiers, delete stale tags/groups, and replay this tutorial when future-you forgets what cadence means.',
    target: 'hero-settings',
    placement: 'bottom-left',
  },
]

const defaultContactSettings = {
  tier: 'medium',
  touchStyle: 'Text',
  cadenceDays: 21,
  bondHealth: 75,
  city: '',
  tags: [],
  groups: [],
}

const tierMeta = Object.fromEntries(
  baseTierDefinitions.map((tier) => [
    tier.key,
    {
      label: tier.label,
      cadenceHint: tier.cadenceHint,
      description: tier.description,
    },
  ]),
)

const initialRecords = [
  createSeedRecord({
    name: 'Ivan Wazir',
    tier: 'inner-circle',
    lastContactOffsetDays: -5,
    cadenceDays: 7,
    tags: ['local', 'business', 'operator'],
    city: 'Dubai',
    groups: ['operators', 'inner circle'],
    focus: 'Hiring two operators and deciding whether to spend May in Paris.',
    notes: 'Prefers direct voice notes over long text threads. Best time to reach him is after 6pm.',
    relatedIds: ['rayan-shayara', 'karoline-berg'],
    contact: {
      email: 'ivan@harborstudio.co',
      whatsapp: '+971 55 010 2471',
      linkedin: 'linkedin.com/in/ivanwazir',
      company: 'Harbor Studio',
      birthday: addDays(todayStamp(), 4),
    },
    memories: [
      createSeedMemory(-19, 'Moved the ops offsite to Dubai and is testing whether the team should anchor there for Q2.'),
      createSeedMemory(-6, 'Asked for a warm intro to a recruiter who understands founder-operator talent.'),
    ],
  }),
  createSeedRecord({
    name: 'Silver Rottweiler',
    tier: 'close',
    lastContactOffsetDays: -11,
    cadenceDays: 14,
    tags: ['dog', 'loyal', 'local'],
    city: 'Dubai Hills',
    groups: ['daily life'],
    focus: 'Recovering from a rough vet week and back to sunrise park laps.',
    notes: 'The profile is intentionally weird, but it does show that Roster can track any relationship that matters.',
    memories: [
      createSeedMemory(-14, 'Needed a follow-up with the vet after a stomach scare.'),
      createSeedMemory(-2, 'Back to normal energy and obsessed with the tennis balls again.'),
    ],
  }),
  createSeedRecord({
    name: 'Karoline Berg',
    tier: 'close',
    lastContactOffsetDays: -10,
    cadenceDays: 10,
    tags: ['creative', 'europe', 'travel'],
    city: 'Dubai',
    groups: ['creative circle', 'europe'],
    focus: 'Planning a small dinner for visiting founders during Dubai AI Week.',
    notes: 'Strong taste, fast feedback, and a very useful person to sanity-check design direction with.',
    relatedIds: ['ivan-wazir', 'gaspard'],
    contact: {
      email: 'karoline@northfoundry.co',
      instagram: '@karolineberg',
      website: 'https://northfoundry.co',
      company: 'North Foundry',
    },
    memories: [
      createSeedMemory(-22, 'Shared a sharp point about using friend CRM language that feels warm instead of salesy.'),
      createSeedMemory(-3, 'May be able to host a founder dinner if the guest list stays under ten.'),
    ],
  }),
  createSeedRecord({
    name: 'Rayan Shayara',
    tier: 'inner-circle',
    lastContactOffsetDays: -8,
    cadenceDays: 7,
    tags: ['family', 'local'],
    city: 'Dubai',
    groups: ['family'],
    focus: 'Working through a move decision and could use a calm check-in, not a high-energy one.',
    notes: 'Family first. Usually appreciates practical help more than abstract advice.',
    relatedIds: ['ivan-wazir'],
    contact: {
      whatsapp: '+971 55 440 1188',
      birthday: addDays(todayStamp(), 11),
    },
    memories: [
      createSeedMemory(-12, 'Mentioned that the move feels bigger emotionally than logistically.'),
      createSeedMemory(-1, 'Wanted a light check-in after a long week rather than a long phone call.'),
    ],
  }),
  createSeedRecord({
    name: 'Rayhan',
    tier: 'medium',
    lastContactOffsetDays: -15,
    cadenceDays: 21,
    tags: ['long-distance', 'friend'],
    city: 'London',
    groups: ['long-distance'],
    focus: 'Exploring a new role and open to intros in London.',
    notes: 'Long-distance, but the relationship stays strong when the check-ins are intentional and specific.',
    contact: {
      telegram: '@rayhan',
      linkedin: 'linkedin.com/in/rayhan',
    },
    memories: [
      createSeedMemory(-28, 'Was deciding between staying in consulting or moving into operator work.'),
      createSeedMemory(-9, 'Said London is feeling expensive and slightly chaotic, but energizing.'),
    ],
  }),
  createSeedRecord({
    name: 'Gaspard',
    tier: 'acquaintance',
    lastContactOffsetDays: -32,
    cadenceDays: 45,
    tags: ['social', 'europe'],
    city: 'Paris',
    groups: ['paris'],
    focus: 'A good warm-intro node for Paris creative and salon-style dinners.',
    notes: 'Not a weekly person, but a great one to keep warm before Europe trips.',
    relatedIds: ['karoline-berg'],
    contact: {
      instagram: '@gaspard.rossi',
      company: 'Independent',
    },
    memories: [
      createSeedMemory(-27, 'Invited me to a small dinner in Paris the next time I am in town.'),
    ],
  }),
]

const defaultSettings = {
  theme: 'mesh',
  motion: true,
  dense: false,
  hints: true,
  compact: false,
  ultraCompact: false,
  leftRailVisible: true,
  rightRailVisible: true,
  workspaceMode: 'classic',
  tabLayout: 'cards',
  mapLayer: 'dark',
  tabView: false,
  scale: 82,
  customTouchStyles: [],
  customTiers: [],
  features: {
    sidebarViews: true,
    sidebarToday: true,
    sidebarTiers: false,
    sidebarGroups: true,
    sidebarTags: true,
    sidebarQueue: true,
    compactToggle: true,
    tabViewToggle: true,
    shortcutDock: true,
  },
  reminders: {
    enabled: false,
    range: 'week',
    hour: 9,
    birthdayLeadDays: 7,
    meetingLeadDays: 1,
  },
  defaults: { ...defaultContactSettings },
  tutorialSeen: false,
}

const shortDate = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
})

const longDate = new Intl.DateTimeFormat('en', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
})

const compactDate = new Intl.DateTimeFormat('en', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
})

const state = {
  records: loadRecords(),
  filter: 'all',
  query: '',
  groupFilter: '',
  tagFilter: '',
  sortDirection: 'desc',
  sortMode: 'attention',
  selectedId: null,
  selectedIds: [],
  multiSelectMode: false,
  expandedTier: 'inner-circle',
  sidebarPanels: {
    views: false,
    today: false,
    tiers: false,
    groups: false,
    tags: false,
    queue: false,
  },
  inspectorPanels: {
    identity: false,
    status: false,
    basics: false,
    notes: false,
    contact: false,
    related: false,
    memory: false,
  },
  settingsOpen: false,
  profileOpen: false,
  profileClosing: false,
  profileEditOpen: false,
  briefOpen: false,
  quickCaptureOpen: false,
  networkOpen: false,
  commandPaletteOpen: false,
  commandQuery: '',
  commandPaletteIndex: 0,
  quickCaptureMode: 'memory',
  quickCaptureRecordId: null,
  csvImportReview: null,
  activityImportReview: null,
  settings: loadSettings(),
  settingsTab: 'general',
  pendingImportMode: 'replace',
  pendingAvatarId: null,
  reminderLog: loadReminderLog(),
  drafts: loadDrafts(),
  tagDraft: '',
  groupDraft: '',
  relatedDraft: '',
  touchStyleDraft: '',
  quickCaptureDraft: {
    tag: '',
    memory: '',
    note: '',
  },
  tierDraft: {
    label: '',
    cadenceHint: '',
    description: '',
  },
  memoryDraft: {
    date: todayStamp(),
    text: '',
  },
  onboardingOpen: false,
  onboardingStep: 0,
  todayPanelMode: 'today',
  settingsAnimating: false,
  booting: true,
  bulkEditorOpen: false,
  bulkEditorMode: 'all',
  bulkDraft: {
    tier: '',
    city: '',
    touchStyle: '',
    cadenceDays: '',
    addTag: '',
    removeTag: '',
    addGroup: '',
    removeGroup: '',
  },
  mapLocationPanels: {},
}

syncTierConfig(state.settings)
state.records = state.records.map(standardizeRecord).filter(Boolean)
state.selectedId = state.records[0] ? state.records[0].id : null
state.quickCaptureRecordId = state.selectedId
restoreDraftsForSelected(state.selectedId)
hydrateCaptureIntent()
state.onboardingOpen = !state.settings.tutorialSeen && state.records.length === 0
if (state.onboardingOpen) {
  prepareOnboardingStep()
}

const app = document.querySelector('#app')
let compactPulseTimer = null
let profileCloseTimer = null
let reminderTimer = null
let settingsAnimationTimer = null
let touchRewardTimer = null
let bootTimer = null
let cursorCleanup = null
let rosterMap = null
let rosterMapMarkersLayer = null
let rosterMapTileLayers = {}
const geocodeCache = loadGeocodeCache()
const geocodePending = new Set()
const animatedValueHistory = new Map()
const animatedTextHistory = new Map()
const bodyPulseTimers = new Map()

if (app) {
  app.addEventListener('click', handleClick)
  app.addEventListener('input', handleInput)
  app.addEventListener('change', handleInput)
  app.addEventListener('submit', handleSubmit)
  app.addEventListener('dragover', handleDragOver)
  app.addEventListener('drop', handleDrop)
}

document.addEventListener('keydown', handleKeydown)
window.addEventListener('resize', () => {
  if (state.onboardingOpen) {
    positionOnboardingSpotlight()
  }
})

render({ preserveFocus: false })
startReminderLoop()
if (bootTimer) {
  window.clearTimeout(bootTimer)
}
bootTimer = window.setTimeout(() => {
  state.booting = false
  render({ preserveFocus: false })
  bootTimer = null
}, 720)

function resolveTierDefinitions(customTiers = []) {
  const seen = new Set()
  const normalizedCustom = Array.isArray(customTiers)
    ? customTiers
        .map((tier) => normalizeTierDefinition(tier))
        .filter(Boolean)
    : []

  return [...baseTierDefinitions, ...normalizedCustom].filter((tier) => {
    const key = tier.key.toLowerCase()
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

function normalizeTierDefinition(value) {
  if (!value || typeof value !== 'object') {
    return null
  }

  const label = String(value.label || '').trim()
  const cadenceHint = String(value.cadenceHint || '').trim()
  const description = String(value.description || '').trim()
  const key = normalizeTierKey(value.key || label)

  if (!key || !label) {
    return null
  }

  if (baseTierDefinitions.some((tier) => tier.key === key)) {
    return null
  }

  return {
    key,
    label,
    cadenceHint: cadenceHint || 'Custom cadence',
    description: description || 'A custom relationship lane for your roster.',
  }
}

function normalizeTierKey(value) {
  return slugify(value).replace(/^-+|-+$/g, '')
}

function getWorkspaceMode() {
  const mode = state.settings.workspaceMode || (state.settings.tabView ? 'tab' : 'classic')
  return workspaceModes.includes(mode) ? mode : 'classic'
}

function syncTierConfig(settings = defaultSettings) {
  const resolved = resolveTierDefinitions(settings.customTiers)
  tierOrder.splice(0, tierOrder.length, ...resolved.map((tier) => tier.key))

  for (const key of Object.keys(tierMeta)) {
    if (!resolved.some((tier) => tier.key === key)) {
      delete tierMeta[key]
    }
  }

  for (const tier of resolved) {
    tierMeta[tier.key] = {
      label: tier.label,
      cadenceHint: tier.cadenceHint,
      description: tier.description,
    }
  }
}

function render({ preserveFocus = true } = {}) {
  if (!app) {
    return
  }

  if (cursorCleanup) {
    cursorCleanup()
    cursorCleanup = null
  }

  const focusSnapshot = preserveFocus ? captureFocus() : null
  applySettings()

  const today = todayStamp()
  const records = state.records
  const activeRecords = records.filter((record) => !record.archived)
  const scopedRecords = state.filter === 'archived' ? records.filter((record) => record.archived) : activeRecords
  const visibleRecords = getVisibleRecords(records, state.query, state.filter, today)
  const selectedRecord = getSelectedRecord()
  const activeSelectedId = selectedRecord ? selectedRecord.id : null
  const needsAttentionCount = activeRecords.filter((record) => getAttentionState(record, today).rank < 2).length
  const overdueCount = activeRecords.filter((record) => getAttentionState(record, today).tone === 'overdue').length
  const archivedCount = records.filter((record) => record.archived).length
  const averageHealth = Math.round(
    activeRecords.reduce((sum, record) => sum + record.bondHealth, 0) / Math.max(activeRecords.length, 1),
  )
  const memoryCount = activeRecords.reduce((sum, record) => sum + record.memories.length, 0)
  const topQueue = activeRecords
    .slice()
    .sort((first, second) => compareRecords(first, second, today))
    .slice(0, 4)
  const todayQueue = getTodayReviewRecords(activeRecords, today).slice(0, 5)
  const thisWeekQueue = getThisWeekReviewRecords(
    activeRecords,
    today,
    state.settings.reminders.birthdayLeadDays,
    state.settings.reminders.meetingLeadDays,
  ).slice(0, 6)
  const groupOptions = getUniqueGroups(scopedRecords)
  const tagOptions = getUniqueTags(scopedRecords)
  const topTagOptions = tagOptions.slice(0, 10)
  const duplicateGroups = getDuplicateGroups(records)
  const featureFlags = state.settings.features || defaultSettings.features
  const workspaceMode = getWorkspaceMode()
  const ultraCompactActive = workspaceMode === 'classic' && state.settings.ultraCompact
  const showLeftRail = state.settings.leftRailVisible !== false
  const showRightRail = workspaceMode === 'classic' && state.settings.rightRailVisible !== false
  const workspaceShellClass = [
    'workspace',
    `workspace--${workspaceMode}`,
    ultraCompactActive ? 'workspace--ultra-compact' : '',
    !showLeftRail ? 'workspace--left-hidden' : '',
    !showRightRail ? 'workspace--right-hidden' : '',
  ]
    .filter(Boolean)
    .join(' ')
  const heroMarkup = buildHeroSection({
    workspaceMode,
    featureFlags,
    activeRecords,
    selectedRecord,
    needsAttentionCount,
    overdueCount,
    memoryCount,
    averageHealth,
    topQueue,
    todayQueue,
    thisWeekQueue,
    ultraCompactActive,
  })
  const classicWorkspaceMarkup = buildClassicRosterPanel({
    visibleRecords,
    activeSelectedId,
    today,
    groupOptions,
    tagOptions,
    ultraCompactActive,
  })

  app.innerHTML = `
    <div class="app-frame ${state.multiSelectMode ? 'app-frame--multi-select' : ''} ${state.booting ? 'app-frame--booting' : ''} ${ultraCompactActive ? 'app-frame--ultra-compact' : ''}" style="--frame-scale:${state.settings.scale / 100}">
    <div class="crm-shell">
      ${heroMarkup}

      <main class="${workspaceShellClass}">
        ${
          showLeftRail
            ? `
        <aside class="panel panel--sidebar" data-onboarding-target="left-rail">
          <div class="rail-head">
            <span class="rail-head__label">Navigate</span>
          </div>
          <div class="sidebar-stack">
            ${featureFlags.sidebarViews ? buildSidebarSection(
              'views',
              'Views',
              'Filter the circle.',
              `Focused on ${escapeHtml(selectedRecord?.name || 'nobody yet')}`,
              `
                <p class="sidebar-context">Focused on <strong data-live-selected-name>${buildAnimatedText(selectedRecord?.name || 'nobody yet', 'sidebar-focused-record')}</strong></p>
                <div class="filter-stack">
                  ${filterButton('all', 'All people', 'Everything in one view', activeRecords.length)}
                  ${filterButton('needs-attention', 'Needs attention', 'Overdue or due this week', needsAttentionCount)}
                  ${tierOrder
                    .map((tier) =>
                      filterButton(
                        tier,
                        tierMeta[tier].label,
                        tierMeta[tier].cadenceHint,
                        activeRecords.filter((record) => record.tier === tier).length,
                      ),
                    )
                    .join('')}
                  ${filterButton('archived', 'Archived', 'Stored away, not deleted', archivedCount)}
                </div>
              `,
              `${buildAnimatedValue(String(activeRecords.length), 'sidebar-active-count', { tag: 'span', className: 'inline-count' })} active`,
              { targetName: 'views-module' },
            ) : ''}

            ${featureFlags.sidebarTiers ? buildSidebarSection(
              'tiers',
              'Tiers',
              'Open a lane and jump to people.',
              'The grouped view for close, medium, and broader orbit.',
              `
                <div class="tier-accordion">
                  ${tierOrder
                    .map(
                      (tier) => `
                        <section class="tier-card ${state.expandedTier === tier ? 'open' : ''}">
                          <button class="tier-card__header" data-expand-tier="${tier}">
                            <span>
                              <strong>${tierMeta[tier].label}</strong>
                              <small>${tierMeta[tier].cadenceHint}</small>
                            </span>
                            <em>${buildAnimatedValue(String(activeRecords.filter((record) => record.tier === tier).length), `tier-${tier}-count`, { tag: 'span', className: 'tier-count' })}</em>
                          </button>
                          ${
                            state.expandedTier === tier
                              ? `
                                <div class="tier-card__body">
                                  <p>${tierMeta[tier].description}</p>
                                  <div class="tier-card__people">
                                    ${
                                      activeRecords.filter((record) => record.tier === tier).length
                                        ? activeRecords
                                            .filter((record) => record.tier === tier)
                                            .sort((first, second) => first.name.localeCompare(second.name))
                                            .map(
                                              (record) => `
                                                <button class="tier-person" data-select="${record.id}">
                                                  <span>${escapeHtml(record.name)}</span>
                                                  <small>${getAttentionState(record, today).label}</small>
                                                </button>
                                              `,
                                            )
                                            .join('')
                                        : '<div class="empty-copy">No people in this tier yet.</div>'
                                    }
                                  </div>
                                </div>
                              `
                              : ''
                          }
                        </section>
                      `,
                    )
                    .join('')}
                </div>
              `,
              '',
              { targetName: 'tiers-module' },
            ) : ''}

            ${(featureFlags.sidebarToday || featureFlags.sidebarQueue) ? buildTodaySidebarSection({
              today,
              todayQueue,
              thisWeekQueue,
              topQueue,
              featureFlags,
            }) : ''}

            ${featureFlags.sidebarGroups ? buildSidebarSection(
              'groups',
              'Groups',
              'Groups',
              'Filter by shared lanes across your roster.',
              `
                <div class="token-filter-grid">
                  <button class="token-filter ${state.groupFilter ? '' : 'active'}" type="button" data-filter-group="">
                    All groups
                  </button>
                  ${
                    groupOptions.length
                      ? groupOptions
                          .map(
                            (group) => `
                              <button
                                class="token-filter ${state.groupFilter === group ? 'active' : ''}"
                                type="button"
                                data-filter-group="${escapeAttribute(group)}"
                              >
                                ${escapeHtml(group)}
                              </button>
                            `,
                          )
                          .join('')
                      : '<div class="empty-copy">Groups appear once you add them to people.</div>'
                  }
                </div>
              `,
              groupOptions.length ? `${groupOptions.length} groups` : '',
              { compactTitle: true, targetName: 'groups-module' },
            ) : ''}

            ${featureFlags.sidebarTags ? buildSidebarSection(
              'tags',
              'Tags',
              'Tags',
              'Filter by shared context, identity, and energy.',
              `
                <div class="token-filter-grid">
                  <button class="token-filter ${state.tagFilter ? '' : 'active'}" type="button" data-filter-tag="">
                    All tags
                  </button>
                  ${
                    topTagOptions.length
                      ? topTagOptions
                          .map(
                            (tag) => `
                              <button
                                class="token-filter ${state.tagFilter === tag ? 'active' : ''}"
                                type="button"
                                data-filter-tag="${escapeAttribute(tag)}"
                              >
                                ${escapeHtml(tag)}
                              </button>
                            `,
                          )
                          .join('')
                      : '<div class="empty-copy">Tags appear once they are added to people.</div>'
                  }
                </div>
              `,
              topTagOptions.length ? `${topTagOptions.length} live` : '',
              { compactTitle: true, targetName: 'tags-module' },
            ) : ''}
          </div>
        </aside>
        `
            : ''
        }

        ${
          workspaceMode === 'tab'
            ? buildTabRosterPanel({
                visibleRecords,
                activeSelectedId,
                today,
                groupOptions,
                tagOptions,
              })
            : workspaceMode === 'map'
              ? buildMapRosterPanel({
                  visibleRecords,
                  activeSelectedId,
                  today,
                  groupOptions,
                  tagOptions,
                })
              : workspaceMode === 'relationships'
                ? buildRelationshipsPanel({
                    visibleRecords,
                    activeSelectedId,
                    today,
                    groupOptions,
                    tagOptions,
                  })
              : workspaceMode === 'timeline'
                ? buildTimelinePanel({
                    visibleRecords,
                    activeSelectedId,
                    today,
                    groupOptions,
                    tagOptions,
                  })
            : classicWorkspaceMarkup
        }

        ${showRightRail ? `<aside class="panel inspector panel--inspector">
          ${buildInspectorPanel(selectedRecord, today)}
        </aside>` : ''}
      </main>
    </div>
    </div>

    ${buildSettingsPanel(duplicateGroups)}
    ${buildProfilePanel(selectedRecord, today)}
    ${buildMeetingBriefPanel(selectedRecord, today)}
    ${buildQuickCapturePanel(selectedRecord)}
    ${buildOrbitPanel(selectedRecord)}
    ${buildCommandPalettePanel(selectedRecord)}
    ${buildBulkEditorPanel()}
    ${buildOnboardingPanel()}
    ${buildBootSplash()}
    ${buildMobileQuickBar(selectedRecord)}
    ${buildCursorChrome()}
    <input id="memory-import-input" type="file" accept=".json,application/json" hidden />
    <input id="csv-import-input" type="file" accept=".csv,text/csv" hidden />
    <input id="activity-import-input" type="file" accept=".csv,.ics,.txt,text/csv,text/calendar,text/plain" hidden />
    <input id="avatar-input" type="file" accept="image/*" hidden />
  `

  if (focusSnapshot) {
    restoreFocus(focusSnapshot)
  }

  initCustomCursor()

  window.requestAnimationFrame(() => {
    positionSelectionRail({ animate: false })
    positionOnboardingSpotlight()
    if (state.commandPaletteOpen) {
      const activePaletteItem = app.querySelector('.command-palette-item.is-active')
      if (activePaletteItem instanceof HTMLElement) {
        activePaletteItem.scrollIntoView({ block: 'nearest' })
      }
    }
    syncInteractiveMap()
  })
}

function buildCollapsibleSection({
  scope,
  key,
  eyebrow,
  title,
  summary = '',
  badge = '',
  content = '',
  open = true,
  className = '',
  headerContent = '',
  headerClass = '',
  targetName = '',
  toggleBehavior = '',
}) {
  return `
    <section class="collapsible-section collapsible-section--${scope} ${open ? 'is-open' : 'is-closed'} ${className}" ${targetName ? `data-onboarding-target="${escapeAttribute(targetName)}"` : ''}>
      <button class="collapsible-toggle ${headerClass}" type="button" data-toggle-panel="${scope}:${key}" ${toggleBehavior ? `data-toggle-behavior="${escapeAttribute(toggleBehavior)}"` : ''} aria-expanded="${open ? 'true' : 'false'}">
        ${
          headerContent
            ? `
              <span class="collapsible-toggle__custom">
                ${headerContent}
              </span>
            `
            : `
              <span class="collapsible-toggle__copy">
                ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
                <strong>${title}</strong>
                ${summary ? `<small>${summary}</small>` : ''}
              </span>
            `
        }
        <span class="collapsible-toggle__meta">
          ${badge || ''}
          <i class="collapsible-chevron" aria-hidden="true"></i>
        </span>
      </button>
      <div class="collapsible-body">
        <div class="collapsible-body__inner">
          ${content}
        </div>
      </div>
    </section>
  `
}

function buildStaticSection({ scope, className = '', headerContent = '', content = '', targetName = '' }) {
  return `
    <section class="collapsible-section collapsible-section--${scope} is-open ${className}" ${targetName ? `data-onboarding-target="${escapeAttribute(targetName)}"` : ''}>
      <div class="collapsible-toggle collapsible-toggle--static">
        <span class="collapsible-toggle__custom">
          ${headerContent}
        </span>
      </div>
      <div class="collapsible-body">
        <div class="collapsible-body__inner">
          ${content}
        </div>
      </div>
    </section>
  `
}

function positionOnboardingSpotlight() {
  if (!state.onboardingOpen || !app) {
    return
  }

  const overlay = app.querySelector('.onboarding-overlay')
  const panel = overlay?.querySelector('.onboarding-panel')
  if (!(overlay instanceof HTMLElement) || !(panel instanceof HTMLElement)) {
    return
  }

  const token = overlay.dataset.onboardingStep
  if (!token) {
    panel.style.left = '50%'
    panel.style.top = '50%'
    panel.style.transform = 'translate(-50%, -50%)'
    return
  }

  const target = app.querySelector(`[data-onboarding-target="${token}"]`)
  if (!(target instanceof HTMLElement)) {
    panel.style.left = '50%'
    panel.style.top = '50%'
    panel.style.transform = 'translate(-50%, -50%)'
    return
  }

  const rect = target.getBoundingClientRect()
  overlay.style.setProperty('--spotlight-left', `${Math.max(rect.left - 10, 12)}px`)
  overlay.style.setProperty('--spotlight-top', `${Math.max(rect.top - 10, 12)}px`)
  overlay.style.setProperty('--spotlight-width', `${Math.max(rect.width + 20, 88)}px`)
  overlay.style.setProperty('--spotlight-height', `${Math.max(rect.height + 20, 56)}px`)

  const placement = overlay.dataset.placement || 'center'
  const panelRect = panel.getBoundingClientRect()
  let left = window.innerWidth / 2 - panelRect.width / 2
  let top = window.innerHeight / 2 - panelRect.height / 2

  if (placement === 'right') {
    left = rect.right + 20
    top = rect.top + rect.height / 2 - panelRect.height / 2
  } else if (placement === 'left') {
    left = rect.left - panelRect.width - 20
    top = rect.top + rect.height / 2 - panelRect.height / 2
  } else if (placement === 'top') {
    left = rect.left + rect.width / 2 - panelRect.width / 2
    top = rect.top - panelRect.height - 20
  } else if (placement === 'bottom-left') {
    left = rect.left
    top = rect.bottom + 18
  } else if (placement === 'bottom') {
    left = rect.left + rect.width / 2 - panelRect.width / 2
    top = rect.bottom + 18
  }

  left = clamp(left, 16, window.innerWidth - panelRect.width - 16)
  top = clamp(top, 16, window.innerHeight - panelRect.height - 16)

  panel.style.left = `${left}px`
  panel.style.top = `${top}px`
  panel.style.transform = 'translate(0, 0)'
}

function buildSidebarSection(key, eyebrow, title, summary, content, badge = '', options = {}) {
  const open = state.sidebarPanels[key] !== false

  return `
    <section class="sidebar-section ${open ? 'is-open' : 'is-closed'} ${options.compactTitle ? 'sidebar-section--compact' : ''}" ${options.targetName ? `data-onboarding-target="${escapeAttribute(options.targetName)}"` : ''}>
      <button
        class="sidebar-summary-card"
        type="button"
        data-toggle-panel="sidebar:${key}"
        aria-expanded="${open ? 'true' : 'false'}"
      >
        <span class="sidebar-summary-card__copy">
          ${
            eyebrow || badge
              ? `
                <span class="sidebar-summary-card__topline">
                  ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
                  ${badge ? `<span class="sidebar-inline-meta">${badge}</span>` : ''}
                </span>
              `
              : ''
          }
          <strong class="${options.compactTitle ? 'sidebar-title sidebar-title--compact' : 'sidebar-title'}">${title}</strong>
          ${summary ? `<small>${summary}</small>` : ''}
        </span>
      </button>
      <div class="sidebar-section__body">
        <div class="sidebar-section__body-inner">
          ${content}
        </div>
      </div>
    </section>
  `
}

function buildTodaySidebarSection({ today, todayQueue, thisWeekQueue, topQueue, featureFlags }) {
  const availableModes = []
  if (featureFlags.sidebarToday) {
    availableModes.push('today')
  }
  if (featureFlags.sidebarQueue) {
    availableModes.push('queue')
  }

  const activeMode = availableModes.includes(state.todayPanelMode) ? state.todayPanelMode : availableModes[0] || 'today'
  const tomorrowQueue = thisWeekQueue.filter(({ record, reason }) => {
    const attention = getAttentionState(record, today)
    const birthday = getBirthdayState(record, today)
    return attention.daysUntil === 1 || birthday?.daysUntil === 1 || /tomorrow/i.test(reason)
  })
  const laterThisWeekQueue = thisWeekQueue.filter(({ record, reason }) => {
    const attention = getAttentionState(record, today)
    const birthday = getBirthdayState(record, today)
    return !(attention.daysUntil === 1 || birthday?.daysUntil === 1 || /tomorrow/i.test(reason))
  })

  const badge = activeMode === 'queue'
    ? `${buildAnimatedValue(String(topQueue.length), 'today-panel-queue-count', { tag: 'span', className: 'inline-count' })} shown`
    : `${buildAnimatedValue(String(todayQueue.length + thisWeekQueue.length), 'today-panel-today-count', { tag: 'span', className: 'inline-count' })} queued`

  const content = activeMode === 'queue'
    ? `
        ${availableModes.length > 1 ? buildTodayModeToggle(activeMode) : ''}
        <div class="today-mode-stage today-mode-stage--queue" data-today-mode-stage="${activeMode}">
        <div class="queue-cluster queue-cluster--stacked">
          <div class="queue-divider">
            <strong>Attention queue</strong>
            <small>Your priority list, sorted by urgency.</small>
          </div>
          <ul class="plain-list queue-list">
            ${topQueue.length
              ? topQueue
                  .map((record) => {
                    const attention = getAttentionState(record, today)
                    return `
                      <li>
                        <button class="queue-item queue-item--priority" data-select="${record.id}">
                          <span>
                            <strong>${escapeHtml(record.name)}</strong>
                            <small>${tierMeta[record.tier].label}</small>
                          </span>
                          <i class="status-pill tone-${attention.tone}">${attention.label}</i>
                        </button>
                      </li>
                    `
                  })
                  .join('')
              : '<li class="empty-copy">No priority nudges right now.</li>'}
          </ul>
        </div>
        </div>
      `
    : `
        ${availableModes.length > 1 ? buildTodayModeToggle(activeMode) : ''}
        <div class="today-mode-stage today-mode-stage--today" data-today-mode-stage="${activeMode}">
        ${buildTodayQueueSection('Today', todayQueue.length ? `${todayQueue.length} live item${todayQueue.length === 1 ? '' : 's'}` : 'Nothing urgent today', todayQueue, today, 'today')}
        ${buildTodayQueueSection('Tomorrow', tomorrowQueue.length ? `${tomorrowQueue.length} coming up` : 'No tomorrow nudges', tomorrowQueue, today, 'tomorrow')}
        ${buildTodayQueueSection('This week', laterThisWeekQueue.length ? `${laterThisWeekQueue.length} upcoming` : 'No additional follow-ups this week', laterThisWeekQueue, today, 'week')}
        </div>
      `

  return buildSidebarSection(
    'today',
    'Today',
    'Who to reach out to next.',
    'Birthdays, reconnects, and what deserves a touch today or this week.',
    content,
    badge,
    { targetName: 'today-module' },
  )
}

function buildTodayModeToggle(activeMode) {
  return `
    <div class="queue-mode-toggle" role="tablist" aria-label="Today sidebar mode">
      <button class="queue-mode-toggle__button ${activeMode === 'today' ? 'active' : ''}" type="button" role="tab" aria-selected="${activeMode === 'today' ? 'true' : 'false'}" data-action="set-today-panel-mode" data-today-panel-mode="today">Today</button>
      <button class="queue-mode-toggle__button ${activeMode === 'queue' ? 'active' : ''}" type="button" role="tab" aria-selected="${activeMode === 'queue' ? 'true' : 'false'}" data-action="set-today-panel-mode" data-today-panel-mode="queue">Attention queue</button>
    </div>
  `
}

function buildTodayQueueSection(title, subtitle, items, today, tone = 'today') {
  return `
    <div class="queue-cluster queue-cluster--stacked">
      <div class="queue-divider queue-divider--${tone}">
        <strong>${title}</strong>
        <small>${subtitle}</small>
      </div>
      <ul class="plain-list queue-list">
        ${
          items.length
            ? items
                .map(
                  ({ record, reason }) => `
                    <li>
                      <button class="queue-item queue-item--today" data-select="${record.id}">
                        <span>
                          <strong>${escapeHtml(record.name)}</strong>
                          <small>${escapeHtml(reason)}</small>
                        </span>
                        <i class="status-pill tone-${getAttentionState(record, today).tone}">${getAttentionState(record, today).label}</i>
                      </button>
                    </li>
                  `,
                )
                .join('')
            : '<li class="empty-copy">Nothing here right now.</li>'
        }
      </ul>
    </div>
  `
}

function buildWorkspaceModeButton(mode, label, activeMode) {
  return `
    <button
      class="button button-secondary mode-switcher__button ${activeMode === mode ? 'button-active' : ''}"
      type="button"
      role="tab"
      aria-selected="${activeMode === mode ? 'true' : 'false'}"
      data-action="set-workspace-mode"
      data-workspace-mode="${mode}"
    >
      ${label}
    </button>
  `
}

function keyHintAttrs(keys) {
  return state.settings.hints ? `data-kbd="${escapeAttribute(keys)}"` : ''
}

function buildAlternateViewToolbar(viewTitle, visibleCount, groupOptions, tagOptions, today) {
  const workspaceMode = getWorkspaceMode()
  return `
    <div class="tab-roster-head">
      <div class="tab-roster-topbar">
        <label class="search-field search-field--tab">
          <div class="search-shell">
            <input
              data-search
              data-focus-key="search"
              id="search-input"
              type="search"
              placeholder="Search contacts..."
              value="${escapeAttribute(state.query)}"
              ${keyHintAttrs('/')}
            />
            ${
              state.query
                ? '<button class="search-action" data-action="clear-search" aria-label="Clear search">Clear</button>'
                : ''
            }
          </div>
        </label>

        <div class="tab-roster-controls">
          ${
            workspaceMode === 'tab'
              ? `
                <div class="tab-layout-toggle">
                  <button class="button button-secondary button-small ${state.settings.tabLayout === 'cards' ? 'button-active' : ''}" type="button" data-action="set-tab-layout" data-tab-layout="cards">Cards</button>
                  <button class="button button-secondary button-small ${state.settings.tabLayout === 'kanban' ? 'button-active' : ''}" type="button" data-action="set-tab-layout" data-tab-layout="kanban">Kanban</button>
                </div>
              `
              : ''
          }
          <label class="toolbar-select toolbar-select--tab">
            <span>Sort</span>
            <select data-ui-filter="sort" data-focus-key="sort-mode">
              <option value="attention" ${state.sortMode === 'attention' ? 'selected' : ''}>Attention</option>
              <option value="name" ${state.sortMode === 'name' ? 'selected' : ''}>Name</option>
              <option value="created" ${state.sortMode === 'created' ? 'selected' : ''}>Created</option>
              <option value="group" ${state.sortMode === 'group' ? 'selected' : ''}>Group</option>
              <option value="tag" ${state.sortMode === 'tag' ? 'selected' : ''}>Tag</option>
            </select>
          </label>
          <label class="toolbar-select toolbar-select--tab">
            <span>Direction</span>
            <select data-ui-filter="direction" data-focus-key="sort-direction">
              <option value="desc" ${state.sortDirection === 'desc' ? 'selected' : ''}>Newest first</option>
              <option value="asc" ${state.sortDirection === 'asc' ? 'selected' : ''}>Oldest first</option>
            </select>
          </label>
          <button
            class="button button-secondary toolbar-mode-button ${state.multiSelectMode ? 'button-active' : ''}"
            type="button"
            data-action="toggle-multi-select"
            data-onboarding-target="bulk-actions"
            ${keyHintAttrs('S')}
          >
            ${state.multiSelectMode ? 'Done' : 'Select'}
          </button>
        </div>
      </div>

      <div class="tab-roster-subbar">
        <div class="tab-roster-title">
          <h2>${buildAnimatedText(viewTitle, `view-title-${getWorkspaceMode()}`)}</h2>
          <small>${buildAnimatedValue(String(visibleCount), `${slugify(viewTitle)}-visible-records-count`, { tag: 'span', className: 'inline-count' })} people</small>
          <p class="roster-filter-context roster-filter-context--subtle">
            <span>Tier</span>
            ${buildAnimatedText(filterLabel(state.filter), `alt-filter-label-${getWorkspaceMode()}`)}
            <span>Group</span>
            ${buildAnimatedText(state.groupFilter || 'All groups', `alt-group-label-${getWorkspaceMode()}`)}
            <span>Tag</span>
            ${buildAnimatedText(state.tagFilter || 'All tags', `alt-tag-label-${getWorkspaceMode()}`)}
          </p>
        </div>
        <div class="tab-roster-filters">
          <label class="toolbar-select toolbar-select--tab">
            <span>Tier</span>
            <select data-ui-filter="tier" data-focus-key="tier-filter">
              <option value="all" ${state.filter === 'all' ? 'selected' : ''}>All people</option>
              <option value="needs-attention" ${state.filter === 'needs-attention' ? 'selected' : ''}>Needs attention</option>
              ${tierOrder.map((tier) => `<option value="${tier}" ${state.filter === tier ? 'selected' : ''}>${tierMeta[tier].label}</option>`).join('')}
              <option value="archived" ${state.filter === 'archived' ? 'selected' : ''}>Archived</option>
            </select>
          </label>
          <label class="toolbar-select toolbar-select--tab">
            <span>Group</span>
            <select data-ui-filter="group" data-focus-key="group-filter">
              <option value="">All groups</option>
              ${groupOptions.map((group) => `<option value="${escapeAttribute(group)}" ${state.groupFilter === group ? 'selected' : ''}>${escapeHtml(group)}</option>`).join('')}
            </select>
          </label>
          <label class="toolbar-select toolbar-select--tab">
            <span>Tag</span>
            <select data-ui-filter="tag" data-focus-key="tag-filter">
              <option value="">All tags</option>
              ${tagOptions.map((tag) => `<option value="${escapeAttribute(tag)}" ${state.tagFilter === tag ? 'selected' : ''}>${escapeHtml(tag)}</option>`).join('')}
            </select>
          </label>
        </div>
      </div>
    </div>
    ${
      state.selectedIds.length
        ? `
            <div class="bulk-bar bulk-bar--tab">
              <div class="bulk-bar__copy">
                <p class="eyebrow">Bulk actions</p>
                <strong>${buildAnimatedValue(String(state.selectedIds.length), `bulk-count-${slugify(viewTitle)}`, { tag: 'span', className: 'inline-count' })} selected</strong>
              </div>
              <div class="bulk-bar__actions">
                <button class="button button-secondary" type="button" data-action="bulk-mark-touched">Mark touched</button>
                <button class="button button-secondary" type="button" data-action="bulk-add-tag">Add tag</button>
                <button class="button button-secondary" type="button" data-action="bulk-remove-tag">Remove tag</button>
                <button class="button button-secondary" type="button" data-action="bulk-add-group">Add group</button>
                <button class="button button-secondary" type="button" data-action="bulk-remove-group">Remove group</button>
                <button class="button button-secondary" type="button" data-action="bulk-mass-editor">Mass editor</button>
                <button class="button button-secondary" type="button" data-action="bulk-archive">Archive</button>
                <button class="button button-secondary" type="button" data-action="bulk-restore">Restore</button>
                <button class="button button-secondary" type="button" data-action="clear-selection">Clear</button>
              </div>
            </div>
        `
        : ''
    }
  `
}

function buildTabRosterPanel({ visibleRecords, activeSelectedId, today, groupOptions, tagOptions }) {
  const viewTitle = getViewTitle(state.filter)
  const tabLayout = state.settings.tabLayout || 'cards'

  return `
    <section class="panel panel--tab-roster">
      ${buildAlternateViewToolbar(viewTitle, visibleRecords.length, groupOptions, tagOptions, today)}

      ${
        visibleRecords.length
          ? `
            ${
              tabLayout === 'kanban'
                ? buildTabKanbanBoard(visibleRecords, activeSelectedId, today)
                : `
                    <div class="tab-card-grid">
                      ${visibleRecords.map((record) => buildTabContactCard(record, activeSelectedId, today)).join('')}
                    </div>
                  `
            }
          `
          : `
            <div class="empty-state">
              <p class="eyebrow">No matches</p>
              <h3>Nothing fits this tab view yet.</h3>
              <p class="empty-copy">Try another filter, group, tag, or search term.</p>
            </div>
          `
      }
    </section>
  `
}

function buildTabContactCard(record, activeSelectedId, today) {
  const attention = getAttentionState(record, today)
  const isSelected = activeSelectedId === record.id
  const isBulkSelected = state.selectedIds.includes(record.id)
  const nextTouch = getNextTouchDate(record)
  const lastTouchAgo = differenceInDays(record.lastContact, today)
  const previewTags = record.tags.slice(0, 2)
  const extraTags = Math.max(0, record.tags.length - previewTags.length)
  const metaLine = [record.contact.company, record.city || record.touchStyle].filter(Boolean).join(' · ')

  return `
    <button class="tab-contact-card tone-${attention.tone} ${isSelected ? 'selected' : ''} ${state.settings.compact ? 'tab-contact-card--compact' : ''}" data-select="${record.id}" data-open-profile-select="true">
      <div class="tab-contact-card__top">
        <div class="tab-contact-card__identity">
          ${
            state.multiSelectMode
              ? `
                <span class="record-select-toggle ${isBulkSelected ? 'active' : ''}" data-toggle-select="${record.id}" aria-label="${isBulkSelected ? 'Deselect person' : 'Select person'}" role="button">
                  <span></span>
                </span>
              `
              : ''
          }
          ${buildRecordAvatar(record, 'small')}
          <div class="tab-contact-card__copy">
            <strong>${escapeHtml(record.name)}</strong>
            <small>${escapeHtml(metaLine || tierMeta[record.tier].label)}</small>
          </div>
        </div>
        <span class="tab-bond">${record.bondHealth}%</span>
      </div>

      <div class="tab-contact-card__status">
        <span class="tab-status-dot tone-${attention.tone}"></span>
        <span>${lastTouchAgo <= 0 ? 'Touched today' : `${lastTouchAgo}d ago`}</span>
      </div>

      <div class="tab-contact-card__schedule">
        <strong>${formatShortDate(nextTouch)}</strong>
        <small>${formatReconnectTiming(attention.daysUntil)}</small>
      </div>

      ${
        state.settings.compact
          ? ''
          : `
            <div class="tab-contact-card__footer">
              <div class="tab-card-tags">
                ${
                  previewTags.length
                    ? previewTags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')
                    : '<span class="tag ghost">untagged</span>'
                }
                ${extraTags ? `<span class="tab-card-more">+${extraTags}</span>` : ''}
              </div>
              <i class="status-pill tone-${attention.tone}">${attention.label}</i>
            </div>
          `
      }
    </button>
  `
}

function buildTabKanbanBoard(visibleRecords, activeSelectedId, today) {
  const columns = [
    { key: 'overdue', label: 'Overdue', matcher: (attention) => attention.tone === 'overdue' },
    { key: 'soon', label: 'Soon', matcher: (attention) => attention.tone === 'soon' },
    { key: 'steady', label: 'On track', matcher: (attention) => attention.tone === 'steady' },
  ]

  return `
    <div class="kanban-board">
      ${columns
        .map((column) => {
          const records = visibleRecords.filter((record) => column.matcher(getAttentionState(record, today)))
          return `
            <section class="kanban-column">
              <header class="kanban-column__header">
                <div>
                  <p class="eyebrow">${column.label}</p>
                  <strong>${records.length} ${records.length === 1 ? 'person' : 'people'}</strong>
                </div>
              </header>
              <div class="kanban-column__list">
                ${
                  records.length
                    ? records.map((record) => buildTabContactCard(record, activeSelectedId, today)).join('')
                    : '<div class="kanban-empty">No one here right now.</div>'
                }
              </div>
            </section>
          `
        })
        .join('')}
    </div>
  `
}

function buildMapRosterPanel({ visibleRecords, activeSelectedId, today, groupOptions, tagOptions }) {
  const cityGroups = getCityGroups(visibleRecords, today)
  const mappedGroups = cityGroups.filter((group) => group.coordinates)
  const unmappedGroups = cityGroups.filter((group) => !group.coordinates)

  return `
    <section class="panel panel--tab-roster panel--map-roster">
      ${buildAlternateViewToolbar('Map view', visibleRecords.length, groupOptions, tagOptions, today)}

      ${
        visibleRecords.length
          ? `
            <div class="map-view-shell">
              <div class="map-surface-card">
                <div class="map-surface-toolbar">
                  <div>
                    <p class="eyebrow">Live map</p>
                    <strong>Pan, zoom, and switch to satellite.</strong>
                  </div>
                  <div class="map-surface-actions">
                    <button class="button button-secondary button-small ${state.settings.mapLayer === 'dark' ? 'button-active' : ''}" type="button" data-action="set-map-layer" data-map-layer="dark">Dark</button>
                    <button class="button button-secondary button-small ${state.settings.mapLayer === 'satellite' ? 'button-active' : ''}" type="button" data-action="set-map-layer" data-map-layer="satellite">Satellite</button>
                    <button class="button button-secondary button-small" type="button" data-action="fit-map">Fit people</button>
                  </div>
                </div>
                <div class="live-map" id="live-map" data-map-canvas></div>
                ${
                  unmappedGroups.length
                    ? `<p class="map-hint">Using city, country, or building names works here. Unmapped right now: ${escapeHtml(unmappedGroups.map((group) => group.city).join(', '))}</p>`
                    : '<p class="map-hint">Tip: you can use country names, city names, or specific places and Roster will try to pin them.</p>'
                }
              </div>

              <div class="map-location-list">
                ${buildMapLocationList(cityGroups, activeSelectedId, today)}
              </div>
            </div>
          `
          : `
            <div class="empty-state">
              <p class="eyebrow">No places</p>
              <h3>No contacts match this map yet.</h3>
              <p class="empty-copy">Try another filter or add city names to more people.</p>
            </div>
          `
      }
    </section>
  `
}

function buildMapLocationList(cityGroups, activeSelectedId, today) {
  const regions = buildMapLocationRegions(cityGroups, activeSelectedId)

  return regions
    .map((region, regionIndex) => {
      const regionKey = `region:${region.key}`
      const regionOpen = isMapLocationPanelOpen(regionKey, region.containsSelected || regionIndex < 2)

      return `
        <section class="map-location-card map-location-card--region ${region.containsSelected ? 'selected' : ''} ${regionOpen ? 'is-open' : 'is-closed'}">
          <button
            class="map-location-card__toggle"
            type="button"
            aria-expanded="${regionOpen ? 'true' : 'false'}"
            data-action="toggle-map-location"
            data-map-location-key="${escapeAttribute(regionKey)}"
          >
            <div class="map-location-card__head">
              <div>
                <strong>${escapeHtml(region.label)}</strong>
                <small>${region.mappedCount ? `${region.mappedCount} pinned` : 'Waiting on map resolution'}</small>
              </div>
              <span class="map-location-card__meta">
                <span class="settings-pill">${region.recordCount}</span>
                <span class="map-location-card__chevron" aria-hidden="true"></span>
              </span>
            </div>
          </button>

          <div class="map-location-card__body">
            <div class="map-location-card__body-inner">
              ${region.cities
                .map((group, cityIndex) => {
                  const cityKey = `city:${group.key}`
                  const cityOpen = isMapLocationPanelOpen(cityKey, group.containsSelected || region.cities.length === 1 || cityIndex === 0)

                  return `
                    <section class="map-city-group ${group.containsSelected ? 'selected' : ''} ${cityOpen ? 'is-open' : 'is-closed'}">
                      <button
                        class="map-city-group__toggle"
                        type="button"
                        aria-expanded="${cityOpen ? 'true' : 'false'}"
                        data-action="toggle-map-location"
                        data-map-location-key="${escapeAttribute(cityKey)}"
                      >
                        <div class="map-location-card__head">
                          <div>
                            <strong>${escapeHtml(group.city)}</strong>
                            <small>${group.coordinates ? 'Pinned on map' : 'Resolving location…'}</small>
                          </div>
                          <span class="map-location-card__meta">
                            <span class="settings-pill">${group.records.length}</span>
                            <span class="map-location-card__chevron" aria-hidden="true"></span>
                          </span>
                        </div>
                      </button>

                      <div class="map-city-group__body">
                        <div class="map-city-group__body-inner map-location-card__people">
                          ${group.records
                            .map((record) => {
                              const attention = getAttentionState(record, today)
                              return `
                                <button class="map-person-row" type="button" data-select="${record.id}">
                                  <span class="map-person-row__identity">
                                    ${buildRecordAvatar(record, 'tiny')}
                                    <span>
                                      <strong>${escapeHtml(record.name)}</strong>
                                      <small>${formatReconnectTiming(attention.daysUntil)}</small>
                                    </span>
                                  </span>
                                  <i class="status-pill tone-${attention.tone}">${attention.label}</i>
                                </button>
                              `
                            })
                            .join('')}
                        </div>
                      </div>
                    </section>
                  `
                })
                .join('')}
            </div>
          </div>
        </section>
      `
    })
    .join('')
}

function buildMapLocationRegions(cityGroups, activeSelectedId) {
  const regions = new Map()

  cityGroups.forEach((group) => {
    const region = resolveLocationRegion(group.city)
    const containsSelected = group.records.some((record) => record.id === activeSelectedId)

    if (!regions.has(region.key)) {
      regions.set(region.key, {
        key: region.key,
        label: region.label,
        cities: [],
        recordCount: 0,
        mappedCount: 0,
        containsSelected: false,
      })
    }

    const entry = regions.get(region.key)
    entry.cities.push({ ...group, containsSelected })
    entry.recordCount += group.records.length
    entry.mappedCount += group.coordinates ? 1 : 0
    entry.containsSelected = entry.containsSelected || containsSelected
  })

  return Array.from(regions.values()).sort((first, second) => {
    if (first.containsSelected !== second.containsSelected) {
      return first.containsSelected ? -1 : 1
    }
    if (first.mappedCount !== second.mappedCount) {
      return second.mappedCount - first.mappedCount
    }
    return first.label.localeCompare(second.label)
  })
}

function resolveLocationRegion(location) {
  const normalized = normalizeLocationLabel(location)
  const normalizedLower = normalized.toLowerCase()

  if (!normalized || normalizedLower === 'unmapped') {
    return { key: 'unmapped', label: 'Unmapped' }
  }

  const parts = normalized.split(',').map((part) => part.trim()).filter(Boolean)
  if (parts.length > 1) {
    const country = parts[parts.length - 1]
    return { key: slugify(country) || 'region', label: country }
  }

  const cachedLabel = geocodeCache[normalizedLower]?.label
  if (cachedLabel) {
    const cachedParts = String(cachedLabel).split(',').map((part) => part.trim()).filter(Boolean)
    if (cachedParts.length) {
      const country = cachedParts[cachedParts.length - 1]
      return { key: slugify(country) || 'region', label: country }
    }
  }

  const regionMatches = [
    { pattern: /dubai|abu dhabi|united arab emirates|uae/, label: 'United Arab Emirates' },
    { pattern: /riyadh|saudi arabia/, label: 'Saudi Arabia' },
    { pattern: /doha|qatar/, label: 'Qatar' },
    { pattern: /istanbul/, label: 'Turkey' },
    { pattern: /cairo|egypt/, label: 'Egypt' },
    { pattern: /paris|france/, label: 'France' },
    { pattern: /london|united kingdom/, label: 'United Kingdom' },
    { pattern: /berlin/, label: 'Germany' },
    { pattern: /amsterdam|netherlands/, label: 'Netherlands' },
    { pattern: /zurich|switzerland/, label: 'Switzerland' },
    { pattern: /rome/, label: 'Italy' },
    { pattern: /barcelona|spain/, label: 'Spain' },
    { pattern: /lisbon|portugal/, label: 'Portugal' },
    { pattern: /new york|miami|san francisco|los angeles|united states/, label: 'United States' },
    { pattern: /toronto|canada/, label: 'Canada' },
    { pattern: /singapore/, label: 'Singapore' },
    { pattern: /tokyo|japan/, label: 'Japan' },
    { pattern: /seoul|south korea/, label: 'South Korea' },
    { pattern: /hong kong/, label: 'Hong Kong' },
    { pattern: /mumbai|delhi|bangalore|india/, label: 'India' },
    { pattern: /sydney|australia/, label: 'Australia' },
    { pattern: /cape town|south africa/, label: 'South Africa' },
  ]

  const matchedRegion = regionMatches.find((entry) => entry.pattern.test(normalizedLower))
  const label = matchedRegion?.label || normalized
  return { key: slugify(label) || 'region', label }
}

function isMapLocationPanelOpen(key, defaultOpen = false) {
  if (!key) {
    return defaultOpen
  }

  return key in state.mapLocationPanels ? state.mapLocationPanels[key] : defaultOpen
}

function buildTimelinePanel({ visibleRecords, activeSelectedId, today, groupOptions, tagOptions }) {
  const events = buildTimelineEvents(visibleRecords, today)

  return `
    <section class="panel panel--tab-roster panel--timeline-roster">
      ${buildAlternateViewToolbar('Timeline', visibleRecords.length, groupOptions, tagOptions, today)}

      ${
        events.length
          ? `
            <div class="timeline-list">
              ${events
                .map((event, index) => `
                  <article class="timeline-entry ${event.record.id === activeSelectedId ? 'selected' : ''}" style="animation-delay:${Math.min(index * 35, 280)}ms">
                    <div class="timeline-entry__rail">
                      <span class="timeline-entry__dot tone-${event.tone}"></span>
                    </div>
                    <button class="timeline-entry__card" type="button" data-select="${event.record.id}">
                      <div class="timeline-entry__meta">
                        <span class="timeline-entry__date">${formatLongDate(event.date)}</span>
                        <i class="status-pill tone-${event.tone}">${event.label}</i>
                      </div>
                      <div class="timeline-entry__body">
                        <div class="timeline-entry__identity">
                          ${buildRecordAvatar(event.record, 'tiny')}
                          <div>
                            <strong>${escapeHtml(event.record.name)}</strong>
                            <small>${escapeHtml(event.title)}</small>
                          </div>
                        </div>
                        <p>${escapeHtml(event.description)}</p>
                      </div>
                    </button>
                  </article>
                `)
                .join('')}
            </div>
          `
          : `
            <div class="empty-state">
              <p class="eyebrow">No timeline yet</p>
              <h3>No events match this view.</h3>
              <p class="empty-copy">Add memories, contact people, or switch filters to populate the timeline.</p>
            </div>
          `
      }
    </section>
  `
}

function buildRelationshipsPanel({ visibleRecords, activeSelectedId, today, groupOptions, tagOptions }) {
  const selectedRecord = visibleRecords.find((record) => record.id === activeSelectedId) || visibleRecords[0] || null
  const connectedRecords = visibleRecords
    .map((record) => ({ record, linkCount: getRelatedRecords(record).length }))
    .sort((first, second) => second.linkCount - first.linkCount || compareRecords(first.record, second.record, today))

  if (!selectedRecord) {
    return `
      <section class="panel panel--tab-roster panel--relationships-roster">
        ${buildAlternateViewToolbar('Relationships', visibleRecords.length, groupOptions, tagOptions, today)}
        <div class="empty-state">
          <p class="eyebrow">No relationships yet</p>
          <h3>Add a person to start the atlas.</h3>
          <p class="empty-copy">Once people are in Roster and linked to each other, this space will show how the whole orbit hangs together.</p>
        </div>
      </section>
    `
  }

  const orbit = buildOrbitData(selectedRecord)
  const linkedCount = connectedRecords.filter(({ linkCount }) => linkCount > 0).length
  const disconnectedCount = Math.max(visibleRecords.length - linkedCount, 0)
  const strongSignals = connectedRecords.filter(({ linkCount }) => linkCount > 0).slice(0, 6)

  return `
    <section class="panel panel--tab-roster panel--relationships-roster">
      ${buildAlternateViewToolbar('Relationships', visibleRecords.length, groupOptions, tagOptions, today)}

      <div class="relationship-atlas">
        <aside class="relationship-browser">
          <div class="relationship-browser__head">
            <div>
              <p class="eyebrow">Relationship atlas</p>
              <strong>Browse every orbit.</strong>
            </div>
            <span class="settings-pill">${visibleRecords.length}</span>
          </div>

          <div class="relationship-browser__stats">
            <div class="relationship-stat">
              <strong>${linkedCount}</strong>
              <small>linked people</small>
            </div>
            <div class="relationship-stat">
              <strong>${disconnectedCount}</strong>
              <small>still unlinked</small>
            </div>
          </div>

          <div class="relationship-browser__list">
            ${connectedRecords
              .map(({ record, linkCount }, index) => {
                const attention = getAttentionState(record, today)
                return `
                  <button
                    class="relationship-person-row ${record.id === selectedRecord.id ? 'selected' : ''}"
                    type="button"
                    data-select="${record.id}"
                    style="animation-delay:${Math.min(index * 26, 220)}ms"
                  >
                    <span class="relationship-person-row__identity">
                      ${buildRecordAvatar(record, 'tiny')}
                      <span>
                        <strong>${escapeHtml(record.name)}</strong>
                        <small>${linkCount ? `${linkCount} link${linkCount === 1 ? '' : 's'}` : 'No links yet'}</small>
                      </span>
                    </span>
                    <i class="status-pill tone-${attention.tone}">${attention.label}</i>
                  </button>
                `
              })
              .join('')}
          </div>
        </aside>

        <div class="relationship-stage">
          <div class="relationship-stage__head">
            <div>
              <p class="eyebrow">Selected orbit</p>
              <h3>${escapeHtml(selectedRecord.name)}</h3>
              <p class="empty-copy">Direct links sit inside the first ring, then nearby connections fan outward so you can see the shape of the circle fast.</p>
            </div>
            <div class="relationship-stage__summary">
              <div class="relationship-stage__pill">
                <strong>${orbit.direct.length}</strong>
                <small>direct</small>
              </div>
              <div class="relationship-stage__pill">
                <strong>${orbit.secondary.length}</strong>
                <small>nearby</small>
              </div>
            </div>
          </div>

          <article class="network-canvas-card relationship-canvas-card">
            ${buildOrbitCanvasMarkup(orbit, selectedRecord, {
              emptyTitle: 'Link one related person to wake up this orbit.',
              emptyBody: 'Open the profile, add someone in Related people, and this graph will stop feeling lonely.',
            })}
          </article>
        </div>

        <aside class="relationship-sidebar">
          ${buildOrbitLinker(selectedRecord)}

          <article class="brief-card">
            <p class="eyebrow">Selected person</p>
            <div class="relationship-focus-card">
              <div class="relationship-focus-card__identity">
                ${buildRecordAvatar(selectedRecord, 'small')}
                <div>
                  <strong>${escapeHtml(selectedRecord.name)}</strong>
                  <small>${tierMeta[selectedRecord.tier].label}${selectedRecord.city ? ` · ${escapeHtml(selectedRecord.city)}` : ''}</small>
                </div>
              </div>
              <div class="relationship-focus-card__meta">
                <span>${selectedRecord.cadenceDays} day cadence</span>
                <span>${selectedRecord.groups.length ? escapeHtml(selectedRecord.groups[0]) : 'No group yet'}</span>
              </div>
            </div>
            <div class="quick-capture__actions">
              <button class="button button-secondary" type="button" data-action="open-profile">Full profile</button>
              <button class="button button-secondary" type="button" data-action="open-network">Open orbit overlay</button>
            </div>
          </article>

          ${buildOrbitSidebarMarkup(orbit, today)}

          <article class="brief-card">
            <p class="eyebrow">Most connected</p>
            ${
              strongSignals.length
                ? `
                  <div class="network-chip-cloud">
                    ${strongSignals
                      .map(
                        ({ record, linkCount }) => `
                          <button class="tag tag-chip" type="button" data-select="${record.id}">
                            <span>${escapeHtml(record.name)}</span>
                            <small>${linkCount} link${linkCount === 1 ? '' : 's'}</small>
                          </button>
                        `,
                      )
                      .join('')}
                  </div>
                `
                : '<p class="empty-copy">No one has related links yet, so the atlas is waiting on the first few connections.</p>'
            }
          </article>
        </aside>
      </div>
    </section>
  `
}

function buildInspectorSection(key, eyebrow, title, summary, content, badge = '') {
  return buildCollapsibleSection({
    scope: 'inspector',
    key,
    eyebrow,
    title,
    summary,
    badge,
    content,
    open: state.inspectorPanels[key] !== false,
    targetName: key === 'basics' ? 'inspector-basics' : '',
  })
}

function buildInspector(record, today) {
  const attention = getAttentionState(record, today)
  const tagSuggestions = getTagSuggestions(record, state.tagDraft)
  const groupSuggestions = getGroupSuggestions(record, state.groupDraft)
  const relatedRecords = getRelatedRecords(record)
  const relatedSuggestions = getRelatedSuggestions(record, state.relatedDraft)
  const nextTouchDate = getNextTouchDate(record)
  const nextTouchLabel = formatCompactDate(nextTouchDate)
  const touchStyleCount = getTouchStyles(record.touchStyle).length
  const identityHeader = `
    <div class="identity-hero identity-hero--header" data-drop-zone="avatar" data-drop-label="Drop a photo">
      <div class="identity-hero__main">
        ${buildRecordAvatar(record, 'large')}
        <div>
          <p class="eyebrow">Selected person</p>
          <h3 class="identity-hero__name">${escapeHtml(record.name)}</h3>
          <div class="identity-meta">
            <span>Added ${formatCompactDate(record.createdAt)}</span>
            <span>${tierMeta[record.tier].label}</span>
            <span>${record.groups.length ? `${record.groups.length} groups` : 'No groups yet'}</span>
          </div>
        </div>
      </div>
    </div>
  `
  const statusHeader = `
    <div class="status-hero status-hero--header">
      <div class="status-hero__top">
        <div>
          <p class="eyebrow">Connection status</p>
          <h3>${statusHeadline(attention)}</h3>
        </div>
        <i class="status-pill tone-${attention.tone}">${attention.label}</i>
      </div>
      <p class="status-hero__detail">
        Last contact ${formatCompactDate(record.lastContact)} · Next touch ${nextTouchLabel} · ${record.cadenceDays} day rhythm
      </p>
    </div>
  `

  return `
    <div class="inspector-stack">
      ${buildStaticSection({
        scope: 'inspector',
        className: 'collapsible-section--hero-static',
        headerContent: identityHeader,
        targetName: 'inspector-identity',
        content: `
          <div class="identity-hero__actions">
            <button class="button button-secondary" type="button" data-action="open-profile" ${keyHintAttrs('P')}>Full profile</button>
            <button class="button button-secondary" type="button" data-action="upload-avatar">${record.avatar ? 'Change photo' : 'Add photo'}</button>
            ${record.avatar ? '<button class="button button-secondary" type="button" data-action="remove-avatar">Remove photo</button>' : ''}
          </div>
        `,
      })}

      ${buildStaticSection({
        scope: 'inspector',
        className: 'collapsible-section--hero-static',
        headerContent: statusHeader,
        targetName: 'inspector-status',
        content: `
          <div class="inspector-stats">
            ${metricCard('Bond health', `${record.bondHealth}%`, '', 'Relationship strength snapshot')}
            ${metricCard('Next touch', nextTouchLabel, '', `${record.touchStyle} · ${formatLongDate(nextTouchDate)}`)}
            ${metricCard('Cadence', `${record.cadenceDays} days`, '', 'Planned check-in spacing')}
            ${metricCard('Memories', `${record.memories.length}`, '', 'Saved notes and context')}
          </div>

          <div class="inspector-actions">
            <button class="button button-primary" data-action="mark-touched" ${keyHintAttrs('M')}>Mark touched today</button>
            <button class="button button-secondary" data-action="open-brief" ${keyHintAttrs('B')}>Meeting brief</button>
            <button class="button button-secondary" data-action="focus-memory" ${keyHintAttrs('E')}>Add memory</button>
            <button class="button button-secondary button-archive" data-action="${record.archived ? 'restore-person' : 'archive-person'}" ${keyHintAttrs('A')}>
              ${record.archived ? 'Restore' : 'Archive'}
            </button>
          </div>
        `,
      })}

      ${buildInspectorSection(
        'basics',
        'Basics',
        'Relationship settings',
        'Name, tier, cadence, style, groups, and tags in one place.',
        buildInspectorBasics(record, tagSuggestions, groupSuggestions),
        `<span class="settings-pill">${touchStyleCount} styles</span>`,
      )}

      ${buildInspectorSection(
        'contact',
        'Contact card',
        'Reachability and social context',
        'Email, socials, company, birthday, and home address.',
        buildContactCard(record),
        `<span class="settings-pill">${contactCompletionCount(record)} fields</span>`,
      )}

      ${buildInspectorSection(
        'related',
        'Orbit',
        'Relationship network',
        'Jump between family, friends, collaborators, or shared circles.',
        buildRelatedPeopleEditor(record, relatedRecords, relatedSuggestions),
        `<span class="settings-pill">${relatedRecords.length} linked</span>`,
      )}

      ${buildInspectorSection(
        'notes',
        'Notes',
        'Keep narrative context',
        'Short factual notes that help future-you reconnect smoothly.',
        buildNotesEditor(record),
        record.notes ? '<span class="settings-pill">Saved</span>' : '<span class="settings-pill">Empty</span>',
      )}

      ${buildInspectorSection(
        'memory',
        'Memory lane',
        `${record.memories.length} memories saved`,
        'A running trail of moments, changes, and reminders for next time.',
        buildMemorySection(record),
        `<span class="settings-pill">${record.memories.length ? 'Sticky recall' : 'Empty'}</span>`,
      )}
    </div>
  `
}

function buildInspectorBasics(record, tagSuggestions, groupSuggestions) {
  const touchStyles = getTouchStyles(record.touchStyle)

  return `
    <form class="editor-form editor-form--section">
      <div class="form-grid">
        <label>
          <span>Name</span>
          <input data-record-field="name" data-focus-key="record-name" type="text" value="${escapeAttribute(record.name)}" />
        </label>

        <label>
          <span>Tier</span>
          <select data-record-field="tier" data-focus-key="record-tier">
            ${tierOrder
              .map(
                (tier) =>
                  `<option value="${tier}" ${record.tier === tier ? 'selected' : ''}>${tierMeta[tier].label}</option>`,
              )
              .join('')}
          </select>
        </label>

        <label>
          <span>City</span>
          <input data-record-field="city" data-focus-key="record-city" type="text" value="${escapeAttribute(record.city)}" />
        </label>

        <label>
          <span>Touch style</span>
          <select data-record-field="touchStyle" data-focus-key="record-touch">
            ${touchStyles
              .map(
                (style) =>
                  `<option value="${style}" ${record.touchStyle === style ? 'selected' : ''}>${style}</option>`,
              )
              .join('')}
          </select>
        </label>

        <label>
          <span>Last contact</span>
          <input data-record-field="lastContact" data-focus-key="record-last" type="date" value="${record.lastContact}" />
        </label>

        <label>
          <span>Cadence in days</span>
          <input
            data-record-field="cadenceDays"
            data-focus-key="record-cadence"
            type="number"
            min="1"
            value="${record.cadenceDays}"
          />
        </label>
      </div>

      <label class="wide">
        <div class="field-head">
          <span>Bond health</span>
          <output class="bond-output" data-bond-output data-bond-output-inline>${record.bondHealth}%</output>
        </div>
        <div class="bond-slider-row">
          <input data-record-field="bondHealth" data-focus-key="record-health" type="range" min="0" max="100" value="${record.bondHealth}" />
        </div>
      </label>

      <label class="wide">
        <span>What is alive right now?</span>
        <input
          data-record-field="focus"
          data-focus-key="record-focus"
          type="text"
          value="${escapeAttribute(record.focus)}"
          placeholder="New project, life change, family context, trip, work shift..."
        />
      </label>

      <label class="wide">
        <span>Groups</span>
        <div class="tag-editor">
          <div class="tag-editor__chips">
            ${
              record.groups.length
                ? record.groups
                    .map(
                      (group) => `
                        <button class="tag tag-chip group-tag" type="button" data-remove-group="${escapeAttribute(group)}">
                          <span>${escapeHtml(group)}</span>
                          <small>remove</small>
                        </button>
                      `,
                    )
                    .join('')
                : '<span class="tag ghost">No groups yet</span>'
            }
          </div>

          <input
            data-group-input
            data-focus-key="record-groups"
            type="text"
            value="${escapeAttribute(state.groupDraft)}"
            placeholder="Add a custom group, then press Enter or Add"
          />

          <div class="tag-editor__actions">
            <button class="button button-secondary tag-add-button" type="button" data-action="commit-group-draft">Add group</button>
            <span class="settings-pill">Saved to this person</span>
          </div>

          ${
            groupSuggestions.length
              ? `
                <div class="tag-suggestions">
                  ${groupSuggestions
                    .map(
                      (group) => `
                        <button class="tag-suggestion" type="button" data-add-group="${escapeAttribute(group)}">
                          ${escapeHtml(group)}
                        </button>
                      `,
                    )
                    .join('')}
                </div>
              `
              : ''
          }
        </div>
      </label>

      <label class="wide">
        <span>Tags</span>
        <div class="tag-editor">
          <div class="tag-editor__chips">
            ${
              record.tags.length
                ? record.tags
                    .map(
                      (tag) => `
                        <button class="tag tag-chip" type="button" data-remove-tag="${escapeAttribute(tag)}">
                          <span>${escapeHtml(tag)}</span>
                          <small>remove</small>
                        </button>
                      `,
                    )
                    .join('')
                : '<span class="tag ghost">No tags yet</span>'
            }
          </div>

          <input
            data-tag-input
            data-focus-key="record-tags"
            type="text"
            value="${escapeAttribute(state.tagDraft)}"
            placeholder="Type a tag, then press Enter or Add"
          />

          <div class="tag-editor__actions">
            <button class="button button-secondary tag-add-button" type="button" data-action="commit-tag-draft">Add tag</button>
            <span class="settings-pill">Saved to this person</span>
          </div>

          ${
            tagSuggestions.length
              ? `
                <div class="tag-suggestions">
                  ${tagSuggestions
                    .map(
                      (tag) => `
                        <button class="tag-suggestion" type="button" data-add-tag="${escapeAttribute(tag)}">
                          ${escapeHtml(tag)}
                        </button>
                      `,
                    )
                    .join('')}
                </div>
              `
              : ''
          }
        </div>
      </label>
    </form>
  `
}

function buildContactCard(record) {
  return `
    <div class="contact-card">
      <div class="contact-card__summary">
        <span>
          <strong>Contact card</strong>
          <small>Email, socials, website, and home address</small>
        </span>
        <em>Added ${formatCompactDate(record.createdAt)}</em>
      </div>
      <div class="contact-card__grid">
        ${contactFields
          .map(
            (field) => `
              <label>
                <span>${field.label}</span>
                <input
                  data-record-field="contact.${field.key}"
                  type="${field.type}"
                  value="${escapeAttribute(record.contact[field.key] || '')}"
                  placeholder="${field.placeholder}"
                />
              </label>
            `,
          )
          .join('')}
        <label class="wide">
          <span>Home address</span>
          <textarea data-record-field="contact.address" placeholder="Apartment, home, or mailing address">${escapeHtml(record.contact.address || '')}</textarea>
        </label>
      </div>
    </div>
  `
}

function buildRelatedPeopleEditor(record, relatedRecords, relatedSuggestions) {
  return `
    <div class="related-editor">
      <div class="tag-editor__chips relation-chip-row">
        ${
          relatedRecords.length
            ? relatedRecords
                .map(
                  (related) => `
                    <span class="relation-chip">
                      <button type="button" class="relation-chip__link" data-select="${related.id}">${escapeHtml(related.name)}</button>
                      <button type="button" class="relation-chip__remove" data-remove-related="${related.id}">remove</button>
                    </span>
                  `,
                )
                .join('')
            : '<span class="tag ghost">No related people yet</span>'
        }
      </div>

      <input
        data-related-input
        data-focus-key="record-related"
        list="related-people-list"
        type="text"
        value="${escapeAttribute(state.relatedDraft)}"
        placeholder="Type a person name and press Enter"
      />
      <datalist id="related-people-list">
        ${getAvailableRelationOptions(record).map((candidate) => `<option value="${escapeAttribute(candidate.name)}"></option>`).join('')}
      </datalist>
      <div class="tag-editor__actions">
        <button class="button button-secondary tag-add-button" type="button" data-action="commit-related-draft">Link person</button>
        <button class="button button-secondary tag-add-button" type="button" data-action="open-network">Open orbit</button>
      </div>
      ${
        relatedSuggestions.length
          ? `
            <div class="tag-suggestions">
              ${relatedSuggestions
                .map(
                  (candidate) => `
                    <button class="tag-suggestion" type="button" data-add-related="${escapeAttribute(candidate.id)}">${escapeHtml(candidate.name)}</button>
                  `,
                )
                .join('')}
            </div>
          `
          : ''
      }
    </div>
  `
}

function buildNotesEditor(record) {
  return `
    <form class="editor-form editor-form--section">
      <label class="wide">
        <span>Notes</span>
        <textarea
          data-record-field="notes"
          data-focus-key="record-notes"
          placeholder="Short factual notes that help future you remember context"
        >${escapeHtml(record.notes)}</textarea>
      </label>
    </form>
  `
}

function buildMemorySection(record) {
  return `
    <section class="memory-section">
      <form class="memory-composer" data-form="memory">
        <div class="form-grid">
          <label>
            <span>Memory date</span>
            <input
              data-memory-field="date"
              data-focus-key="memory-date"
              type="date"
              value="${state.memoryDraft.date}"
            />
          </label>

          <label>
            <span>Shortcut</span>
            <div class="memory-shortcut-note">Cmd/Ctrl + Enter to save</div>
          </label>
        </div>

        <label class="wide">
          <span>Memory</span>
          <textarea
            data-memory-field="text"
            data-focus-key="memory-text"
            placeholder="What happened, what matters, and what you should remember for next time"
          >${escapeHtml(state.memoryDraft.text)}</textarea>
        </label>

        <div class="memory-actions">
          <button class="button button-primary" type="submit">Save memory</button>
          <button class="button button-secondary" type="button" data-action="clear-memory-draft">Clear draft</button>
        </div>
      </form>

      ${
        record.memories.length
          ? `
            <div class="memory-list">
              ${record.memories
                .map(
                  (memory) => `
                    <article class="memory-card">
                      <div class="memory-card-header">
                        <div>
                          <strong>${formatLongDate(memory.date)}</strong>
                          <div class="memory-meta">Saved to ${record.name}</div>
                        </div>
                        <button class="memory-delete" data-remove-memory="${memory.id}">Remove</button>
                      </div>
                      <p>${escapeHtml(memory.text)}</p>
                    </article>
                  `,
                )
                .join('')}
            </div>
          `
          : `
            <div class="empty-state">
              <p class="eyebrow">No memory yet</p>
              <h3>Start a memory trail.</h3>
              <p class="empty-copy">Save moments, updates, and personal details you want available next time.</p>
            </div>
          `
      }
    </section>
  `
}

function buildProfilePanel(record, today) {
  if ((!state.profileOpen && !state.profileClosing) || !record) {
    return ''
  }

  const attention = getAttentionState(record, today)
  const nextTouchDate = getNextTouchDate(record)
  const relatedRecords = getRelatedRecords(record)
  const touchStyles = getTouchStyles(record.touchStyle, state.settings.defaults.touchStyle)
  const contactRows = contactFields
    .filter((field) => record.contact[field.key])
    .map(
      (field) => `
        <div class="profile-contact-row">
          <span>${field.label}</span>
          ${buildContactLink(field.key, record.contact[field.key])}
        </div>
      `,
    )
    .join('')

  return `
    <div class="profile-overlay open ${state.profileClosing ? 'closing' : ''}" data-overlay="profile">
      <section class="profile-panel ${state.profileClosing ? 'closing' : ''}" role="dialog" aria-modal="true" aria-label="Full profile">
        <div class="profile-panel__header">
          <div>
            <p class="eyebrow">Full profile</p>
            <h2>${escapeHtml(record.name)}</h2>
          </div>
          <button class="settings-close" data-action="close-profile" aria-label="Close full profile">Close</button>
        </div>

        <div class="profile-actions">
          <button class="button button-secondary" type="button" data-action="toggle-profile-edit">
            ${state.profileEditOpen ? 'Done editing' : 'Edit person'}
          </button>
          <button class="button button-secondary" type="button" data-action="open-brief">Meeting brief</button>
          <button class="button button-secondary" type="button" data-action="focus-memory">Add memory</button>
          <button class="button button-secondary button-archive" type="button" data-action="${record.archived ? 'restore-person' : 'archive-person'}">
            ${record.archived ? 'Restore' : 'Archive'}
          </button>
          <button class="button button-danger" type="button" data-action="delete-person">Delete</button>
        </div>

        <div class="profile-hero" data-drop-zone="avatar" data-drop-label="Drop a photo">
          ${buildRecordAvatar(record, 'hero')}
          <div class="profile-hero__copy">
            <p>${tierMeta[record.tier].label} · Added ${formatLongDate(record.createdAt)}</p>
            <h3>${statusHeadline(attention)}</h3>
            <div class="profile-token-row">
              ${record.groups.length ? record.groups.map((group) => `<span class="tag group-tag">${escapeHtml(group)}</span>`).join('') : '<span class="tag ghost">No groups</span>'}
              ${record.tags.length ? record.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('') : '<span class="tag ghost">No tags</span>'}
            </div>
          </div>
          <div class="profile-hero__status">
            <i class="status-pill tone-${attention.tone}">${attention.label}</i>
            <strong>${formatCompactDate(nextTouchDate)}</strong>
            <small>${record.touchStyle} · ${record.cadenceDays} day rhythm</small>
          </div>
        </div>

        <div class="profile-grid">
          ${
            state.profileEditOpen
              ? `
                <section class="profile-card profile-card--wide">
                  <p class="eyebrow">Edit</p>
                  <div class="form-grid">
                    <label>
                      <span>Name</span>
                      <input data-record-field="name" type="text" value="${escapeAttribute(record.name)}" />
                    </label>
                    <label>
                      <span>Tier</span>
                      <select data-record-field="tier">
                        ${tierOrder.map((tier) => `<option value="${tier}" ${record.tier === tier ? 'selected' : ''}>${tierMeta[tier].label}</option>`).join('')}
                      </select>
                    </label>
                    <label>
                      <span>City</span>
                      <input data-record-field="city" type="text" value="${escapeAttribute(record.city)}" />
                    </label>
                    <label>
                      <span>Touch style</span>
                      <select data-record-field="touchStyle">
                        ${touchStyles.map((style) => `<option value="${style}" ${record.touchStyle === style ? 'selected' : ''}>${style}</option>`).join('')}
                      </select>
                    </label>
                    <label class="wide">
                      <span>Groups</span>
                      <input data-record-field="groupsText" data-profile-groups type="text" value="${escapeAttribute(record.groups.join(', '))}" placeholder="founders, dubai, family" />
                    </label>
                    <label class="wide">
                      <span>Tags</span>
                      <input data-record-field="tagsText" data-profile-tags type="text" value="${escapeAttribute(record.tags.join(', '))}" placeholder="local, creative, travel" />
                    </label>
                    <label class="wide">
                      <span>Focus</span>
                      <input data-record-field="focus" type="text" value="${escapeAttribute(record.focus)}" />
                    </label>
                    <label class="wide">
                      <span>Notes</span>
                      <textarea data-record-field="notes">${escapeHtml(record.notes)}</textarea>
                    </label>
                  </div>
                </section>
              `
              : ''
          }
          <section class="profile-card">
            <p class="eyebrow">Contact card</p>
            <div class="profile-contact-list">
              ${contactRows || '<div class="empty-copy">No contact fields added yet.</div>'}
              ${record.contact.address ? `<div class="profile-contact-row profile-contact-row--wide"><span>Home address</span><strong>${escapeHtml(record.contact.address)}</strong></div>` : ''}
            </div>
          </section>

          <section class="profile-card">
            <p class="eyebrow">Context</p>
            <h3>${escapeHtml(record.focus || 'No active focus added yet.')}</h3>
            <p>${escapeHtml(record.notes || 'No notes saved yet.')}</p>
          </section>

          <section class="profile-card">
            <p class="eyebrow">Related people</p>
            <div class="profile-token-row">
              ${relatedRecords.length ? relatedRecords.map((related) => `<button class="tag tag-chip profile-related-link" type="button" data-select="${related.id}">${escapeHtml(related.name)}</button>`).join('') : '<span class="tag ghost">No related people yet</span>'}
            </div>
          </section>

          <section class="profile-card">
            <p class="eyebrow">Memory timeline</p>
            <div class="profile-memory-list">
              ${record.memories.length ? record.memories.map((memory) => `<article class="profile-memory"><strong>${formatLongDate(memory.date)}</strong><p>${escapeHtml(memory.text)}</p></article>`).join('') : '<div class="empty-copy">No memories yet.</div>'}
            </div>
          </section>
        </div>
      </section>
    </div>
  `
}

function buildMeetingBriefPanel(record, today) {
  if (!state.briefOpen || !record) {
    return ''
  }

  const brief = buildMeetingBrief(record, today)

  return `
    <div class="brief-overlay open" data-overlay="brief">
      <section class="brief-panel" role="dialog" aria-modal="true" aria-label="Meeting brief">
        <div class="brief-panel__header">
          <div>
            <p class="eyebrow">Meeting brief</p>
            <h2>${escapeHtml(record.name)}</h2>
            <p class="brief-intro">${escapeHtml(brief.intro)}</p>
          </div>
          <button class="settings-close" data-action="close-brief" aria-label="Close meeting brief">Close</button>
        </div>

        <div class="brief-grid">
          <article class="brief-card">
            <p class="eyebrow">Snapshot</p>
            <ul class="brief-list">
              ${brief.snapshot.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
          </article>

          <article class="brief-card">
            <p class="eyebrow">Talk tracks</p>
            <ul class="brief-list">
              ${brief.prompts.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
          </article>

          <article class="brief-card">
            <p class="eyebrow">Memory cues</p>
            ${
              brief.memories.length
                ? `<ul class="brief-list">${brief.memories.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
                : '<p class="empty-copy">No saved memories yet. Add a few before the next catch-up.</p>'
            }
          </article>

          <article class="brief-card">
            <p class="eyebrow">Context</p>
            <ul class="brief-list">
              ${brief.context.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
          </article>
        </div>

        <div class="brief-actions">
          <button class="button button-primary" type="button" data-action="copy-brief">Copy brief</button>
          <button class="button button-secondary" type="button" data-action="open-quick-capture" data-quick-capture-mode="memory">Quick capture</button>
          <button class="button button-secondary" type="button" data-action="mark-touched">Mark touched today</button>
        </div>
      </section>
    </div>
  `
}

function buildQuickCapturePanel(selectedRecord) {
  if (!state.quickCaptureOpen) {
    return ''
  }

  const activeRecordId = state.quickCaptureRecordId || selectedRecord?.id || ''
  const activeRecord = state.records.find((record) => record.id === activeRecordId) || selectedRecord || null

  return `
    <div class="quick-capture-overlay open" data-overlay="quick-capture">
      <section class="quick-capture-panel" role="dialog" aria-modal="true" aria-label="Quick capture">
        <div class="quick-capture__header">
          <div>
            <p class="eyebrow">Quick capture</p>
            <h2>Update the roster fast.</h2>
            <p class="settings-note">Built for phone-sized moments: save a memory, tag context, or mark a touch without digging through the full profile.</p>
          </div>
          <button class="settings-close" data-action="close-quick-capture" aria-label="Close quick capture">Close</button>
        </div>

        <div class="quick-capture__controls">
          <label class="toolbar-select">
            <span>Person</span>
            <select data-quick-capture-field="recordId">
              ${state.records
                .filter((record) => !record.archived)
                .sort((first, second) => first.name.localeCompare(second.name))
                .map((record) => `<option value="${record.id}" ${record.id === activeRecordId ? 'selected' : ''}>${escapeHtml(record.name)}</option>`)
                .join('')}
            </select>
          </label>

          <div class="quick-capture__modes">
            ${[
              ['memory', 'Memory'],
              ['tag', 'Tag'],
              ['touch', 'Touched'],
            ]
              .map(
                ([mode, label]) => `
                  <button class="token-filter ${state.quickCaptureMode === mode ? 'active' : ''}" type="button" data-action="set-quick-capture-mode" data-quick-capture-mode="${mode}">
                    ${label}
                  </button>
                `,
              )
              .join('')}
          </div>
        </div>

        ${
          activeRecord
            ? `
              <div class="quick-capture__body">
                ${
                  state.quickCaptureMode === 'memory'
                    ? `
                      <label class="wide">
                        <span>Memory for ${escapeHtml(activeRecord.name)}</span>
                        <textarea data-quick-capture-field="memory" data-focus-key="quick-capture-memory" placeholder="What happened, what matters, and what you want to remember next time">${escapeHtml(state.quickCaptureDraft.memory)}</textarea>
                      </label>
                      <div class="quick-capture__actions">
                        <button class="button button-primary" type="button" data-action="save-quick-capture">Save memory</button>
                      </div>
                    `
                    : state.quickCaptureMode === 'tag'
                      ? `
                        <label class="wide">
                          <span>Tag for ${escapeHtml(activeRecord.name)}</span>
                          <input data-quick-capture-field="tag" data-focus-key="quick-capture-tag" type="text" placeholder="travel, founder, family..." value="${escapeAttribute(state.quickCaptureDraft.tag)}" />
                        </label>
                        <div class="quick-capture__actions">
                          <button class="button button-primary" type="button" data-action="save-quick-capture">Add tag</button>
                        </div>
                      `
                      : `
                        <div class="quick-capture-touch">
                          <strong>${escapeHtml(activeRecord.name)}</strong>
                          <p>Mark them as touched today and keep the cadence aligned without opening the full editor.</p>
                          <div class="quick-capture__actions">
                            <button class="button button-primary" type="button" data-action="save-quick-capture">Mark touched today</button>
                          </div>
                        </div>
                      `
                }
              </div>
            `
            : '<p class="empty-copy">Add a person first, then quick-capture will follow them.</p>'
        }
      </section>
    </div>
  `
}

function buildOrbitPanel(record) {
  if (!state.networkOpen || !record) {
    return ''
  }

  const orbit = buildOrbitData(record)

  return `
    <div class="network-overlay open" data-overlay="network">
      <section class="network-panel" role="dialog" aria-modal="true" aria-label="Orbit">
        <div class="network-panel__header">
          <div>
            <p class="eyebrow">Orbit</p>
            <h2>${escapeHtml(record.name)}</h2>
            <p class="brief-intro">See how this relationship sits inside your circle, with direct links in the first ring and nearby people fanning out around them.</p>
          </div>
          <button class="settings-close" data-action="close-network" aria-label="Close orbit">Close</button>
        </div>

        <div class="network-layout">
          <article class="network-canvas-card">
            ${buildOrbitCanvasMarkup(orbit, record)}
          </article>

          <aside class="network-sidebar">
            ${buildOrbitLinker(record)}
            ${buildOrbitSidebarMarkup(orbit, todayStamp())}

            <article class="brief-card">
              <p class="eyebrow">Suggested links</p>
              ${
                getRelatedSuggestions(record, '')
                  .slice(0, 6)
                  .length
                  ? `
                    <div class="network-chip-cloud">
                      ${getRelatedSuggestions(record, '')
                        .slice(0, 6)
                        .map(
                          (candidate) => `
                            <button class="tag tag-chip" type="button" data-add-related="${escapeAttribute(candidate.id)}">
                              <span>${escapeHtml(candidate.name)}</span>
                              <small>link</small>
                            </button>
                          `,
                        )
                        .join('')}
                    </div>
                  `
                  : '<p class="empty-copy">No open suggestions right now. Everyone in the roster is already directly linked here.</p>'
              }
            </article>
          </aside>
        </div>
      </section>
    </div>
  `
}

function buildOrbitLinker(record) {
  const suggestions = getRelatedSuggestions(record, state.relatedDraft)

  return `
    <article class="brief-card">
      <p class="eyebrow">Link people</p>
      <div class="settings-row">
        <strong>Connect ${escapeHtml(record.name)} to someone else</strong>
        <small>Create direct relationship links from inside the orbit so the graph updates immediately.</small>
      </div>
      <div class="orbit-linker">
        <input
          data-related-input
          data-focus-key="record-related"
          type="text"
          placeholder="Type a name to link into this orbit"
          value="${escapeAttribute(state.relatedDraft)}"
        />
        <button class="button button-secondary" type="button" data-action="commit-related-draft">Link person</button>
      </div>
      ${
        suggestions.length
          ? `
            <div class="network-chip-cloud">
              ${suggestions
                .map(
                  (candidate) => `
                    <button class="tag tag-chip" type="button" data-add-related="${escapeAttribute(candidate.id)}">
                      <span>${escapeHtml(candidate.name)}</span>
                      <small>link</small>
                    </button>
                  `,
                )
                .join('')}
            </div>
          `
          : '<p class="empty-copy">No open suggestions right now. Try searching for a person by name.</p>'
      }
    </article>
  `
}

function buildOrbitCanvasMarkup(orbit, activeRecord, options = {}) {
  const emptyTitle = options.emptyTitle || 'Start the orbit with one related person.'
  const emptyBody = options.emptyBody || 'Add a collaborator, sibling, partner, or shared-circle contact to unlock the network view.'

  return `
    <div class="network-canvas ${options.className || ''}">
      ${
        orbit.nodes.length > 1
          ? `
            <svg class="network-lines" viewBox="0 0 1000 1000" aria-hidden="true">
              ${orbit.edges
                .map(
                  (edge) => `
                    <line
                      x1="${edge.from.x * 10}"
                      y1="${edge.from.y * 10}"
                      x2="${edge.to.x * 10}"
                      y2="${edge.to.y * 10}"
                      class="network-line network-line--${edge.type}"
                    />
                  `,
                )
                .join('')}
            </svg>
          `
          : ''
      }

      ${orbit.nodes
        .map(
          (node) => `
            <button
              class="network-node network-node--${node.ring} ${node.id === activeRecord.id ? 'is-active' : ''}"
              type="button"
              style="left:${node.x}%; top:${node.y}%;"
              data-select="${node.id}"
            >
              <span class="network-node__avatar">
                ${node.avatar ? `<img src="${escapeAttribute(node.avatar)}" alt="${escapeAttribute(node.name)}" />` : `<strong>${escapeHtml(node.initials)}</strong>`}
              </span>
              <span class="network-node__label">${escapeHtml(node.name)}</span>
            </button>
          `,
        )
        .join('')}

      ${
        orbit.direct.length
          ? ''
          : `
            <div class="network-empty">
              <p class="eyebrow">No links yet</p>
              <h3>${escapeHtml(emptyTitle)}</h3>
              <p>${escapeHtml(emptyBody)}</p>
            </div>
          `
      }
    </div>
  `
}

function buildOrbitSidebarMarkup(orbit, today) {
  return `
    <article class="brief-card">
      <p class="eyebrow">Direct links</p>
      ${
        orbit.direct.length
          ? `
            <div class="network-list">
              ${orbit.direct
                .map((related) => {
                  const attention = getAttentionState(related, today)
                  return `
                    <button class="network-list__item" type="button" data-select="${related.id}">
                      <span class="network-list__identity">
                        ${buildRecordAvatar(related, 'tiny')}
                        <span>
                          <strong>${escapeHtml(related.name)}</strong>
                          <small>${tierMeta[related.tier].label}</small>
                        </span>
                      </span>
                      <i class="status-pill tone-${attention.tone}">${attention.label}</i>
                    </button>
                  `
                })
                .join('')}
            </div>
          `
          : '<p class="empty-copy">No direct links yet. Use the Related people section to connect this person to someone else in your roster.</p>'
      }
    </article>

    <article class="brief-card">
      <p class="eyebrow">Nearby people</p>
      ${
        orbit.secondary.length
          ? `
            <div class="network-chip-cloud">
              ${orbit.secondary
                .map(
                  (related) => `
                    <button class="tag tag-chip" type="button" data-select="${related.id}">
                      <span>${escapeHtml(related.name)}</span>
                      <small>${getRelatedRecords(related).length} links</small>
                    </button>
                  `,
                )
                .join('')}
            </div>
          `
          : '<p class="empty-copy">Once direct links are connected to other people, the second ring will light up here.</p>'
      }
    </article>
  `
}

function buildMobileQuickBar(selectedRecord) {
  return `
    <div class="mobile-quickbar">
      <button class="mobile-quickbar__button" type="button" data-action="open-quick-capture" data-quick-capture-mode="memory">
        <strong>Memory</strong>
        <small>${escapeHtml(selectedRecord?.name || 'Pick a person')}</small>
      </button>
      <button class="mobile-quickbar__button" type="button" data-action="open-quick-capture" data-quick-capture-mode="tag">
        <strong>Tag</strong>
        <small>Fast context</small>
      </button>
      <button class="mobile-quickbar__button mobile-quickbar__button--primary" type="button" data-action="open-quick-capture" data-quick-capture-mode="touch">
        <strong>Touched</strong>
        <small>Today</small>
      </button>
    </div>
  `
}

function buildMeetingBrief(record, today) {
  const attention = getAttentionState(record, today)
  const nextTouch = getNextTouchDate(record)
  const birthday = getBirthdayState(record, today)
  const related = getRelatedRecords(record).map((person) => person.name)
  const memoryCues = record.memories.slice(0, 3).map((memory) => `${formatCompactDate(memory.date)}: ${truncate(memory.text, 120)}`)
  const touchStyleLabel = normalizeTouchStyle(record.touchStyle)
  const touchStyleTone = touchStyleLabel ? touchStyleLabel.toLowerCase() : 'your usual'
  const prompts = [
    record.focus ? `Ask about ${record.focus}.` : `Open by asking what feels most alive for them right now.`,
    record.notes ? `Use your notes to reconnect naturally: ${truncate(record.notes, 110)}` : `Anchor the conversation with one concrete update you remember from last time.`,
    touchStyleLabel ? `This relationship responds well to ${touchStyleTone} energy.` : `Use a tone that matches how you usually connect.`,
  ]

  if (birthday && birthday.daysUntil <= state.settings.reminders.birthdayLeadDays) {
    prompts.push(birthday.daysUntil === 0 ? 'Wish them happy birthday today.' : `Mention their birthday coming up on ${formatCompactDate(birthday.date)}.`)
  }

  return {
    intro: `${tierMeta[record.tier].label} relationship. ${attention.label}. Best next touch is ${touchStyleTone} on ${formatCompactDate(nextTouch)}.`,
    snapshot: [
      `Last contact: ${formatCompactDate(record.lastContact)}`,
      `Next touch: ${formatCompactDate(nextTouch)}`,
      `Cadence: every ${record.cadenceDays} days`,
      `Bond health: ${record.bondHealth}%`,
    ],
    context: [
      record.groups.length ? `Groups: ${record.groups.join(', ')}` : 'Groups: none yet',
      record.tags.length ? `Tags: ${record.tags.join(', ')}` : 'Tags: none yet',
      related.length ? `Related people: ${related.join(', ')}` : 'Related people: none linked yet',
      record.city ? `City: ${record.city}` : 'City: not set',
    ],
    prompts,
    memories: memoryCues,
  }
}


function buildInspectorPanel(selectedRecord, today) {
  return `
    <div class="panel-heading panel-heading--inspector-bar">
      <div>
        <p class="eyebrow">Inspector</p>
        <h2 class="inspector-name">${selectedRecord ? escapeHtml(selectedRecord.name) : 'No person selected'}</h2>
      </div>
    </div>

    ${
      selectedRecord
        ? buildInspector(selectedRecord, today)
        : `
          <div class="empty-state">
            <p class="eyebrow">Start here</p>
            <h3>Add your first person card.</h3>
            <p class="empty-copy">Create a new record and start storing real memory.</p>
            <button class="button button-primary" data-action="add-person">Add person</button>
          </div>
        `
    }
  `
}

function buildSettingsPanel(duplicateGroups = []) {
  const activeTab = settingsTabs.find((tab) => tab.key === state.settingsTab) || settingsTabs[0]
  const hiddenAttrs = state.settingsOpen ? '' : ' hidden aria-hidden="true" inert'

  return `
    <div class="settings-overlay ${state.settingsOpen ? 'open' : ''}" data-overlay="settings"${hiddenAttrs}>
      <section class="settings-panel ${state.settingsAnimating ? 'settings-panel--animate' : ''}" role="dialog" aria-modal="true" aria-label="Settings panel">
        <div class="settings-shell">
          <aside class="settings-sidebar">
            <div class="settings-brand">
              <div class="settings-copy">
                <p class="eyebrow">Settings</p>
                <h2>Run the workspace.</h2>
                <p class="settings-note">A cleaner control room for how Roster looks, behaves, reminds, and stores your data.</p>
              </div>
              <button class="settings-close" data-action="close-settings" aria-label="Close settings">Close</button>
            </div>

            <div class="settings-nav" role="tablist" aria-label="Settings sections">
              ${settingsTabs
                .map(
                  (tab) => `
                    <button
                      class="settings-nav__button ${state.settingsTab === tab.key ? 'active' : ''}"
                      type="button"
                      role="tab"
                      aria-selected="${state.settingsTab === tab.key ? 'true' : 'false'}"
                      data-settings-tab="${tab.key}"
                    >
                      <span class="settings-nav__copy">
                        <strong>${tab.label}</strong>
                        <small>${tab.eyebrow}</small>
                      </span>
                    </button>
                  `,
                )
                .join('')}
            </div>

            <div class="settings-sidebar__meta">
              <span class="settings-pill">${themeOptions.find((theme) => theme.value === state.settings.theme)?.label || 'Mesh Night'}</span>
              <span class="settings-pill">${state.settings.motion ? 'Motion on' : 'Motion off'}</span>
              <span class="settings-pill">${state.settings.scale}% scale</span>
              <span class="settings-pill">${getWorkspaceMode()} mode</span>
            </div>
          </aside>

          <div class="settings-main">
            <div class="settings-main__intro">
              <div>
                <p class="eyebrow">${activeTab.eyebrow}</p>
                <h3>${activeTab.title}</h3>
                <p class="settings-note">${activeTab.summary}</p>
              </div>
              <div class="settings-main__chips">
                <span class="settings-pill">${state.records.filter((record) => !record.archived).length} active people</span>
                <span class="settings-pill">${(state.settings.customTouchStyles || []).length + baseTouchStyles.length} touch styles</span>
                <span class="settings-pill">${(state.settings.customTiers || []).length + baseTierDefinitions.length} tiers</span>
              </div>
            </div>

            <div class="settings-body">
              ${buildSettingsTabContent(duplicateGroups)}
            </div>
          </div>
        </div>
      </section>
    </div>
  `
}

function buildSettingsTabContent(duplicateGroups = []) {
  switch (state.settingsTab) {
    case 'defaults':
      return buildDefaultsTab()
    case 'extra':
      return buildExtraFeaturesTab()
    case 'shortcuts':
      return buildShortcutsTab()
    case 'data':
      return buildDataTab(duplicateGroups)
    case 'general':
    default:
      return buildGeneralTab()
  }
}

function buildGeneralTab() {
  const touchStyles = getTouchStyles(state.settings.defaults.touchStyle)
  const notificationPermission = typeof Notification === 'undefined' ? 'unsupported' : Notification.permission
  const featureFlags = state.settings.features || defaultSettings.features

  return `
    <section class="settings-card settings-group">
      <p class="eyebrow">Visual mode</p>
      <div class="settings-row">
        <strong>Theme</strong>
        <small>Choose a darker palette with clearer contrast and less visual noise.</small>
        <select class="theme-select" data-setting-field="theme" data-focus-key="setting-theme" name="theme" autocomplete="off">
          ${themeOptions
            .map(
              (theme) => `
                <option value="${theme.value}" ${state.settings.theme === theme.value ? 'selected' : ''}>${theme.label}</option>
              `,
            )
            .join('')}
        </select>
      </div>
    </section>

    <section class="settings-card settings-group">
      <p class="eyebrow">Interaction</p>
      <div class="settings-switch">
        <div class="settings-row">
          <strong>Compact roster mode</strong>
          <small>Show a denser list with just name, due state, next touch, and reconnect timing.</small>
        </div>
        <label class="toggle">
          <input type="checkbox" data-setting-field="compact" ${state.settings.compact ? 'checked' : ''} ${!featureFlags.compactToggle ? 'disabled' : ''} />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
        </label>
      </div>

      <div class="settings-switch">
        <div class="settings-row">
          <strong>Ultra compact mode</strong>
          <small>Switch the classic workspace into a traditional Mesh-style CRM layout with flatter rows, denser scanning, and calmer chrome.</small>
        </div>
        <label class="toggle">
          <input type="checkbox" data-setting-field="ultraCompact" ${state.settings.ultraCompact ? 'checked' : ''} />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
        </label>
      </div>

      <div class="settings-switch">
        <div class="settings-row">
          <strong>Workspace mode</strong>
          <small>Switch between classic CRM, tab cards, a city map, a relationship atlas, or a timeline of activity.</small>
        </div>
        <select data-setting-field="workspaceMode" ${!featureFlags.tabViewToggle ? 'disabled' : ''}>
          <option value="classic" ${getWorkspaceMode() === 'classic' ? 'selected' : ''}>Classic CRM</option>
          <option value="tab" ${getWorkspaceMode() === 'tab' ? 'selected' : ''}>Tab view</option>
          <option value="map" ${getWorkspaceMode() === 'map' ? 'selected' : ''}>Map view</option>
          <option value="relationships" ${getWorkspaceMode() === 'relationships' ? 'selected' : ''}>Relationships</option>
          <option value="timeline" ${getWorkspaceMode() === 'timeline' ? 'selected' : ''}>Timeline</option>
        </select>
      </div>

      <div class="settings-switch">
        <div class="settings-row">
          <strong>Motion</strong>
          <small>Keep the floating glows and layout transitions.</small>
        </div>
        <label class="toggle">
          <input type="checkbox" data-setting-field="motion" ${state.settings.motion ? 'checked' : ''} />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
        </label>
      </div>

      <div class="settings-switch">
        <div class="settings-row">
          <strong>Command palette</strong>
          <small>Open quick actions with Cmd/Ctrl + K and jump to any major workflow.</small>
        </div>
        <span class="settings-pill">Cmd/Ctrl + K</span>
      </div>

      <div class="settings-switch">
        <div class="settings-row">
          <strong>Compact density</strong>
          <small>Tighten the chrome while keeping the content readable.</small>
        </div>
        <label class="toggle">
          <input type="checkbox" data-setting-field="dense" ${state.settings.dense ? 'checked' : ''} />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
        </label>
      </div>

      <div class="settings-switch">
        <div class="settings-row">
          <strong>Shortcut dock</strong>
          <small>Show the power-user key strip beside the settings button.</small>
        </div>
        <label class="toggle">
          <input type="checkbox" data-setting-field="hints" ${state.settings.hints ? 'checked' : ''} ${!featureFlags.shortcutDock ? 'disabled' : ''} />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
        </label>
      </div>
    </section>

    <section class="settings-card settings-group">
      <p class="eyebrow">Scale</p>
      <div class="settings-row">
        <strong>Workspace scale</strong>
        <small>Default is 82% so the workspace feels substantial without crowding the wider layouts.</small>
      </div>
      <label class="settings-row">
        <strong>${state.settings.scale}%</strong>
        <input
          class="settings-range"
          data-setting-field="scale"
          type="range"
          min="60"
          max="100"
          step="1"
          value="${state.settings.scale}"
        />
      </label>
    </section>

    <section class="settings-card settings-group">
      <p class="eyebrow">Touch styles</p>
      <div class="settings-row">
        <strong>Customize how you reconnect</strong>
        <small>Add your own contact styles so the inspector, defaults, and queue reflect how you actually keep in touch.</small>
      </div>
      <div class="tag-editor">
        <div class="tag-editor__chips">
          ${touchStyles
            .map((style) =>
              baseTouchStyles.includes(style)
                ? `<span class="tag tag-chip tag-chip--static"><span>${escapeHtml(style)}</span><small>core</small></span>`
                : `
                  <button class="tag tag-chip" type="button" data-remove-touch-style="${escapeAttribute(style)}">
                    <span>${escapeHtml(style)}</span>
                    <small>remove</small>
                  </button>
                `,
            )
            .join('')}
        </div>

        <input
          data-touch-style-input
          data-focus-key="setting-touch-style"
          type="text"
          value="${escapeAttribute(state.touchStyleDraft)}"
          placeholder="Lunch, walk, voice memo, WhatsApp..."
        />

        <div class="tag-editor__actions">
          <button class="button button-secondary tag-add-button" type="button" data-action="commit-touch-style-draft">Add touch style</button>
          <span class="settings-pill">${touchStyles.length} available</span>
        </div>
      </div>
    </section>

    <section class="settings-card settings-group">
      <p class="eyebrow">Native reminders</p>
      <div class="settings-row">
        <strong>Desktop reminder digest</strong>
        <small>Roster can send a local reminder summary with birthdays, due touches, and pre-meeting nudges while the app is open.</small>
      </div>

      <div class="settings-switch">
        <div class="settings-row">
          <strong>Enable reminders</strong>
          <small>${notificationPermission === 'granted' ? 'Notifications are allowed on this device.' : notificationPermission === 'denied' ? 'Notifications are blocked right now.' : notificationPermission === 'unsupported' ? 'This environment does not support notifications.' : 'Allow notifications so the digest can reach you.'}</small>
        </div>
        <label class="toggle">
          <input type="checkbox" data-setting-field="reminders" data-reminder-field="enabled" ${state.settings.reminders.enabled ? 'checked' : ''} ${notificationPermission === 'unsupported' ? 'disabled' : ''} />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
        </label>
      </div>

      <div class="form-grid">
        <label>
          <span>Digest range</span>
          <select data-setting-field="reminders" data-reminder-field="range">
            <option value="today" ${state.settings.reminders.range === 'today' ? 'selected' : ''}>Today only</option>
            <option value="week" ${state.settings.reminders.range === 'week' ? 'selected' : ''}>Today + this week</option>
          </select>
        </label>
        <label>
          <span>Reminder hour</span>
          <input data-setting-field="reminders" data-reminder-field="hour" type="number" min="0" max="23" value="${state.settings.reminders.hour}" />
        </label>
        <label>
          <span>Birthday lead days</span>
          <input data-setting-field="reminders" data-reminder-field="birthdayLeadDays" type="number" min="0" max="30" value="${state.settings.reminders.birthdayLeadDays}" />
        </label>
        <label>
          <span>Meeting prep lead days</span>
          <input data-setting-field="reminders" data-reminder-field="meetingLeadDays" type="number" min="0" max="14" value="${state.settings.reminders.meetingLeadDays}" />
        </label>
      </div>

      <div class="settings-actions-grid">
        <button class="button button-secondary" type="button" data-action="enable-notifications">Enable notifications</button>
        <button class="button button-secondary" type="button" data-action="send-reminder-preview">Preview digest</button>
      </div>
    </section>
  `
}

function buildDefaultsTab() {
  const touchStyles = getTouchStyles(state.settings.defaults.touchStyle)

  return `
    <section class="settings-card settings-group">
      <p class="eyebrow">New contact template</p>
      <div class="settings-row">
        <strong>Default values for every new person</strong>
        <small>Use this as your starting template instead of rebuilding the same fields each time.</small>
      </div>

      <div class="form-grid form-grid--settings">
        <label>
          <span>Default tier</span>
          <select data-default-field="tier" name="default-tier" autocomplete="off">
            ${tierOrder
              .map(
                (tier) => `
                  <option value="${tier}" ${state.settings.defaults.tier === tier ? 'selected' : ''}>${tierMeta[tier].label}</option>
                `,
              )
              .join('')}
          </select>
        </label>

        <label>
          <span>Default touch style</span>
          <select data-default-field="touchStyle" name="default-touch-style" autocomplete="off">
            ${touchStyles
              .map(
                (style) => `
                  <option value="${style}" ${state.settings.defaults.touchStyle === style ? 'selected' : ''}>${style}</option>
                `,
              )
              .join('')}
          </select>
        </label>

        <label>
          <span>Cadence in days</span>
          <input
            data-default-field="cadenceDays"
            type="number"
            min="1"
            value="${state.settings.defaults.cadenceDays}"
            name="default-cadence"
            autocomplete="off"
          />
        </label>

        <label>
          <span>Bond health</span>
          <input
            data-default-field="bondHealth"
            type="number"
            min="0"
            max="100"
            value="${state.settings.defaults.bondHealth}"
            name="default-bond-health"
            autocomplete="off"
          />
        </label>

        <label class="wide">
          <span>Default city</span>
          <input
            data-default-field="city"
            type="text"
            value="${escapeAttribute(state.settings.defaults.city)}"
            placeholder="Optional city for new contacts…"
            name="default-city"
            autocomplete="off"
          />
        </label>

        <label class="wide">
          <span>Starter groups</span>
          <input
            data-default-field="groups"
            type="text"
            value="${escapeAttribute((state.settings.defaults.groups || []).join(', '))}"
            placeholder="inner orbit, founders, dubai…"
            name="default-groups"
            autocomplete="off"
          />
        </label>

        <label class="wide">
          <span>Starter tags</span>
          <input
            data-default-field="tags"
            type="text"
            value="${escapeAttribute(state.settings.defaults.tags.join(', '))}"
            placeholder="local, founder, travel…"
            name="default-tags"
            autocomplete="off"
          />
        </label>
      </div>

      <div class="settings-footer">
        <button class="button button-secondary" type="button" data-action="reset-defaults">Reset template</button>
      </div>
    </section>
  `
}

function buildExtraFeaturesTab() {
  const featureFlags = state.settings.features || defaultSettings.features
  const customTiers = state.settings.customTiers || []
  const groupOptions = getUniqueGroups(state.records)
  const tagOptions = getUniqueTags(state.records)

  return `
    <section class="settings-card settings-group">
      <p class="eyebrow">Workspace modules</p>
      <div class="settings-row">
        <strong>Turn extra structure on or off</strong>
        <small>Everything stays available in settings, but the shell can open much cleaner when you hide the modules you do not use.</small>
      </div>

      <div class="settings-toggle-grid">
        ${buildFeatureToggle('sidebarViews', 'Views card', 'Left rail entry for all people and focus state.', featureFlags.sidebarViews)}
        ${buildFeatureToggle('sidebarToday', 'Today card', 'Show the Today module in the left rail.', featureFlags.sidebarToday)}
        ${buildFeatureToggle('sidebarTiers', 'Tiers card', 'Collapsed by default so the left rail stays lighter.', featureFlags.sidebarTiers)}
        ${buildFeatureToggle('sidebarGroups', 'Groups card', 'Quick jump by custom group.', featureFlags.sidebarGroups)}
        ${buildFeatureToggle('sidebarTags', 'Tags card', 'Quick jump by shared context tags.', featureFlags.sidebarTags)}
        ${buildFeatureToggle('sidebarQueue', 'Attention mode', 'Enable the alternate Today -> Attention queue toggle inside that module.', featureFlags.sidebarQueue)}
        ${buildFeatureToggle('compactToggle', 'Compact toggle', 'Show the compact-view toggle in the hero.', featureFlags.compactToggle)}
        ${buildFeatureToggle('tabViewToggle', 'View mode switcher', 'Show the classic, tab, map, and timeline switcher in the hero.', featureFlags.tabViewToggle)}
        ${buildFeatureToggle('shortcutDock', 'Shortcut dock', 'Show the keyboard helper strip beside the hero actions.', featureFlags.shortcutDock)}
      </div>
    </section>

    <section class="settings-card settings-group">
      <p class="eyebrow">Custom tiers</p>
      <div class="settings-row">
        <strong>Add or remove relationship lanes</strong>
        <small>The four core tiers stay protected. Custom tiers appear in filters, defaults, and person records.</small>
      </div>

      ${
        customTiers.length
          ? `
            <div class="settings-token-stack">
              ${customTiers
                .map(
                  (tier) => `
                    <div class="settings-token-card">
                      <div>
                        <strong>${escapeHtml(tier.label)}</strong>
                        <small>${escapeHtml(tier.cadenceHint)}</small>
                      </div>
                      <button class="button button-secondary button-small" type="button" data-action="remove-tier" data-tier-key="${escapeAttribute(tier.key)}">
                        Delete
                      </button>
                    </div>
                  `,
                )
                .join('')}
            </div>
          `
          : '<div class="empty-copy">No custom tiers yet. Add one if your relationship map needs more nuance.</div>'
      }

      <div class="form-grid">
        <label>
          <span>Tier name</span>
          <input data-tier-draft-field="label" type="text" value="${escapeAttribute(state.tierDraft.label)}" placeholder="Advisors, Family, VIP..." />
        </label>
        <label>
          <span>Cadence hint</span>
          <input data-tier-draft-field="cadenceHint" type="text" value="${escapeAttribute(state.tierDraft.cadenceHint)}" placeholder="Every month, check quarterly..." />
        </label>
        <label class="wide">
          <span>Description</span>
          <textarea data-tier-draft-field="description" rows="3" placeholder="What makes this lane different?">${escapeHtml(state.tierDraft.description)}</textarea>
        </label>
      </div>

      <div class="settings-actions-grid">
        <button class="button button-secondary" type="button" data-action="add-tier">Add tier</button>
      </div>
    </section>

    <section class="settings-card settings-group">
      <p class="eyebrow">Taxonomy cleanup</p>
      <div class="settings-row">
        <strong>Remove stale tags and groups</strong>
        <small>Deleting one here removes it from the whole roster and from the new-contact template too.</small>
      </div>

      <div class="settings-split">
        <div class="settings-stack">
          <strong>Groups</strong>
          ${
            groupOptions.length
              ? `
                <div class="profile-token-row">
                  ${groupOptions
                    .map(
                      (group) => `
                        <button class="tag tag-chip" type="button" data-action="remove-global-group" data-group-value="${escapeAttribute(group)}">
                          <span>${escapeHtml(group)}</span>
                          <small>delete</small>
                        </button>
                      `,
                    )
                    .join('')}
                </div>
              `
              : '<div class="empty-copy">No groups to clean up yet.</div>'
          }
        </div>

        <div class="settings-stack">
          <strong>Tags</strong>
          ${
            tagOptions.length
              ? `
                <div class="profile-token-row">
                  ${tagOptions
                    .map(
                      (tag) => `
                        <button class="tag tag-chip" type="button" data-action="remove-global-tag" data-tag-value="${escapeAttribute(tag)}">
                          <span>${escapeHtml(tag)}</span>
                          <small>delete</small>
                        </button>
                      `,
                    )
                    .join('')}
                </div>
              `
              : '<div class="empty-copy">No tags to clean up yet.</div>'
          }
        </div>
      </div>
    </section>

    <section class="settings-card settings-group">
      <p class="eyebrow">Onboarding</p>
      <div class="settings-row">
        <strong>Start fresh or rerun the walkthrough</strong>
        <small>New users get a short tutorial. If you already know the product, you can skip it or launch it again later from here.</small>
      </div>
      <div class="settings-actions-grid">
        <button class="button button-secondary" type="button" data-action="rerun-tutorial">Replay tutorial</button>
        <button class="button button-secondary" type="button" data-action="mark-tutorial-seen">Skip tutorial by default</button>
      </div>
    </section>
  `
}

function buildFeatureToggle(key, title, description, enabled) {
  return `
    <label class="settings-switch settings-switch--stacked">
      <div class="settings-row">
        <strong>${title}</strong>
        <small>${description}</small>
      </div>
      <span class="toggle">
        <input type="checkbox" data-feature-field="${key}" ${enabled ? 'checked' : ''} />
        <span class="toggle-track"><span class="toggle-thumb"></span></span>
      </span>
    </label>
  `
}

function buildShortcutsTab() {
  const selectedRecord = getSelectedRecord()
  const commandGroups = getCommandPaletteCommands(selectedRecord).reduce((groups, command) => {
    const group = groups.get(command.group) || []
    group.push(command)
    groups.set(command.group, group)
    return groups
  }, new Map())

  return `
    <section class="settings-card settings-group">
      <p class="eyebrow">Keyboard</p>
      <div class="settings-row">
        <strong>Power-user map</strong>
        <small>The fastest path through the app is search, move, focus, and save without leaving the keyboard.</small>
      </div>

      <div class="hotkey-list">
        ${hotkeyLegend
          .map(
            (entry) => `
              <div class="hotkey-item">
                <span class="key-pill">${entry.keys}</span>
                <strong>${entry.action}</strong>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>

    <section class="settings-card settings-group">
      <p class="eyebrow">Quick actions</p>
      <div class="settings-row">
        <strong>Everything in the command palette</strong>
        <small>Open the palette with Cmd/Ctrl + K, type a few letters, and jump straight to the action you want.</small>
      </div>
      <div class="shortcut-command-list">
        ${Array.from(commandGroups.entries())
          .map(
            ([group, commands]) => `
              <section class="shortcut-command-group">
                <h4>${escapeHtml(group)}</h4>
                <div class="shortcut-command-group__list">
                  ${commands
                    .map(
                      (command) => `
                        <div class="hotkey-item hotkey-item--command">
                          <div class="hotkey-item__copy">
                            <strong>${escapeHtml(command.label)}</strong>
                            <small>${escapeHtml(command.shortcut || 'Command palette only')}</small>
                          </div>
                          <span class="key-pill">${escapeHtml(command.shortcut || 'Type to run')}</span>
                        </div>
                      `,
                    )
                    .join('')}
                </div>
              </section>
            `,
          )
          .join('')}
      </div>
    </section>
  `
}

function buildDataTab(duplicateGroups = []) {
  return `
    <section class="settings-card settings-group">
      <p class="eyebrow">Migration</p>
      <div class="settings-row">
        <strong>Bring contacts in from CSV exports</strong>
        <small>Import Google Contacts, Mesh, Clay, or other CRM CSVs and review the field mapping before anything lands in Roster.</small>
      </div>
      <div class="settings-actions-grid">
        <button class="button button-secondary" data-action="import-csv" type="button">Import CSV</button>
        <button class="button button-secondary" data-action="import-activity" type="button">Import activity</button>
      </div>
      <div class="drop-zone" data-drop-zone="csv">
        Drop a CSV here to import contacts from Mesh, Clay, Google Contacts, or another CRM.
      </div>
      <p class="empty-copy">Activity import accepts calendar .ics exports and CSV-style exports from tools like email, WhatsApp, or other communication logs so Last contact can update from real history.</p>
    </section>

    ${
      state.csvImportReview
        ? buildCsvImportReview()
        : ''
    }

    ${
      state.activityImportReview
        ? buildActivityImportReview()
        : ''
    }

    <section class="settings-card settings-group">
      <p class="eyebrow">Memory file</p>
      <div class="settings-row">
        <strong>Readable import and export</strong>
        <small>Back up the roster as structured JSON, merge another file in, or replace the current roster in one step.</small>
      </div>
      <div class="settings-help">
        <span class="settings-pill">format: friends-circle-memory-file</span>
        <span class="settings-pill">version: 4</span>
        <span class="settings-pill">profile + contact + relations</span>
        <span class="settings-pill">app: v${APP_VERSION}</span>
      </div>
      <div class="settings-actions-grid">
        <button class="button button-secondary" data-action="export-memory-file" type="button">Export JSON</button>
        <button class="button button-secondary" data-action="copy-memory-file" type="button">Copy JSON</button>
        <button class="button button-secondary" data-action="import-memory-merge" type="button">Import & merge</button>
        <button class="button button-secondary" data-action="import-memory-replace" type="button">Import & replace</button>
      </div>
    </section>

    <section class="settings-card settings-group">
      <p class="eyebrow">Duplicates</p>
      <div class="settings-row">
        <strong>Find and merge duplicate people</strong>
        <small>Roster groups likely duplicates by matching normalized name, email, or phone. Review each cluster before merging.</small>
      </div>
      ${
        duplicateGroups.length
          ? `
            <div class="duplicate-list">
              ${duplicateGroups
                .map(
                  (group, index) => `
                    <div class="duplicate-card">
                      <div class="duplicate-card__head">
                        <strong>Possible duplicate set ${index + 1}</strong>
                        <span class="settings-pill">${group.length} records</span>
                      </div>
                      <div class="profile-token-row">
                        ${group
                          .map(
                            (record) => `
                              <button class="tag tag-chip" type="button" data-select="${record.id}">
                                ${escapeHtml(record.name)}
                              </button>
                            `,
                          )
                          .join('')}
                      </div>
                      <button class="button button-secondary" type="button" data-action="merge-duplicates" data-duplicate-ids="${escapeAttribute(group.map((record) => record.id).join(','))}">
                        Merge this set
                      </button>
                    </div>
                  `,
                )
                .join('')}
            </div>
          `
          : '<div class="empty-copy">No likely duplicates detected right now.</div>'
      }
    </section>

    <section class="settings-card settings-group">
      <p class="eyebrow">Roster</p>
      <div class="settings-row">
        <strong>Reset to the seeded demo roster</strong>
        <small>Replace the current workspace with a richer six-person sample so the app is ready to demo again.</small>
      </div>
      <div class="settings-footer">
        <button class="button button-secondary" data-action="reset-roster" type="button">Reset roster</button>
      </div>
    </section>

    <section class="settings-card settings-group">
      <p class="eyebrow">Release</p>
      <div class="settings-row">
        <strong>Running Roster v${APP_VERSION}</strong>
        <small>The current desktop build includes custom groups, contact cards, profile photos, relation links, archive mode, compact mode, motion polish, and import/export tools.</small>
      </div>
    </section>

    <section class="settings-card settings-group">
      <p class="eyebrow">Next platform</p>
      <div class="settings-row">
        <strong>Companion ideas</strong>
        <small>The local-first app now has quick capture and reminder plumbing. The next real jump would be a native iPhone companion and Mac menu bar reminders.</small>
      </div>
    </section>
  `
}

function buildOnboardingPanel() {
  if (!state.onboardingOpen) {
    return ''
  }

  const step = onboardingSteps[state.onboardingStep] || onboardingSteps[0]
  const isLastStep = state.onboardingStep === onboardingSteps.length - 1

  return `
    <div class="onboarding-overlay ${step.target ? 'has-target' : ''}" data-overlay="onboarding" data-onboarding-step="${escapeAttribute(step.target || '')}" data-placement="${escapeAttribute(step.placement || 'center')}">
      <section class="onboarding-panel" role="dialog" aria-modal="true" aria-label="Roster onboarding">
        <p class="eyebrow">${step.eyebrow}</p>
        <h2>${step.title}</h2>
        <p class="onboarding-copy">${step.body}</p>
        <div class="onboarding-progress">
          ${onboardingSteps
            .map(
              (_, index) => `
                <span class="onboarding-dot ${index === state.onboardingStep ? 'active' : ''}"></span>
              `,
            )
            .join('')}
        </div>
        <div class="onboarding-actions">
          <button class="button button-secondary" type="button" data-action="skip-tutorial">I'm an expert already</button>
          ${
            state.onboardingStep
              ? '<button class="button button-secondary" type="button" data-action="prev-tutorial-step">Back</button>'
              : ''
          }
          <button class="button button-primary" type="button" data-action="${isLastStep ? 'finish-tutorial' : 'next-tutorial-step'}">
            ${isLastStep ? 'Start using Roster' : 'Next'}
          </button>
        </div>
      </section>
    </div>
  `
}

function buildBootSplash() {
  if (!state.booting) {
    return ''
  }

  return `
    <div class="boot-overlay">
      <div class="boot-panel">
        <img class="boot-logo" src="./assets/roster-logo.svg?v=20260401f" alt="Roster logo" />
        <div class="boot-copy">
          <p class="eyebrow">Roster</p>
          <strong>Warming the orbit.</strong>
          <small>Give it one very dramatic heartbeat.</small>
        </div>
      </div>
    </div>
  `
}

function buildHeroSection({
  workspaceMode,
  featureFlags,
  activeRecords,
  selectedRecord,
  needsAttentionCount,
  overdueCount,
  memoryCount,
  averageHealth,
  topQueue,
  todayQueue,
  thisWeekQueue,
  ultraCompactActive,
}) {
  const compactToggleLabel = state.settings.compact ? 'Full view' : 'Compact view'
  const summaryMarkup = ultraCompactActive
    ? `
      ${summaryTile('Open relationships', activeRecords.length, 'Entire active roster in one dense CRM view')}
      ${summaryTile('Priority queue', topQueue.length, `${todayQueue.length} due today · ${thisWeekQueue.length} due this week`)}
      ${summaryTile('Needs attention', needsAttentionCount, `${overdueCount} overdue now`)}
      ${summaryTile('Stored memory', memoryCount, `${averageHealth}% average bond health`)}
    `
    : `
      ${summaryTile('People tracked', activeRecords.length, 'Only your active roster lives here')}
      ${summaryTile('Needs attention', needsAttentionCount, `${overdueCount} overdue right now`)}
      ${summaryTile('Memories saved', memoryCount, 'Stored context for future you')}
      ${summaryTile('Average bond', `${averageHealth}%`, 'Live relationship health across active people')}
    `

  return `
    <header class="hero ${ultraCompactActive ? 'hero--ultra' : ''}">
      <div class="hero-copy ${ultraCompactActive ? 'hero-copy--ultra' : ''}">
        <div class="brand-lockup">
          <img class="brand-logo" src="./assets/roster-logo.svg?v=20260414a" alt="Roster logo" />
          <div class="brand-lockup__text">
            <p class="eyebrow">Roster</p>
            <small>The friend CRM</small>
          </div>
        </div>
        <div class="${ultraCompactActive ? 'hero-compact-bar' : ''}">
          <div class="${ultraCompactActive ? 'hero-compact-heading' : ''}">
            <h1>${ultraCompactActive ? 'Operate the roster.' : 'Your people, clearly remembered.'}</h1>
            <p class="hero-summary">
              ${
                ultraCompactActive
                  ? 'Ultra compact mode turns the shell into a calmer, denser operating view with faster scanning, flatter rows, and less decorative chrome.'
                  : 'Track the relationships that matter, keep memory attached to each person, and move through your roster with less friction.'
              }
            </p>
            ${
              ultraCompactActive
                ? `
                  <div class="hero-compact-badges">
                    <span class="command-chip"><b>CRM</b><small>Traditional list + inspector</small></span>
                    <span class="command-chip"><b>Focus</b><small>${escapeHtml(selectedRecord?.name || 'No person selected')}</small></span>
                    <span class="command-chip"><b>Queue</b><small>${topQueue.length} people need review</small></span>
                  </div>
                `
                : ''
            }
          </div>
          <div class="button-row ${ultraCompactActive ? 'button-row--ultra' : ''}" data-onboarding-target="hero-actions">
            <button class="button button-primary" data-action="add-person" ${keyHintAttrs('N')}>Add person</button>
            <button class="button button-secondary" data-action="open-settings" data-onboarding-target="hero-settings" ${keyHintAttrs('G')}>Settings</button>
            <button class="button button-secondary" data-action="open-command-palette" ${keyHintAttrs('Cmd/Ctrl + K')}>Quick actions</button>
            ${
              featureFlags.compactToggle
                ? `
                  <button class="button button-secondary ${state.settings.compact ? 'button-active' : ''}" data-action="toggle-compact" ${keyHintAttrs('C')}>
                    ${compactToggleLabel}
                  </button>
                `
                : ''
            }
            ${
              featureFlags.tabViewToggle
                ? `
                  <div class="mode-switcher" role="tablist" aria-label="Workspace view" data-onboarding-target="hero-modes">
                    ${buildWorkspaceModeButton('classic', ultraCompactActive ? 'CRM' : 'Classic CRM', workspaceMode)}
                    ${buildWorkspaceModeButton('tab', 'Tab view', workspaceMode)}
                    ${buildWorkspaceModeButton('map', 'Map view', workspaceMode)}
                    ${buildWorkspaceModeButton('relationships', 'Relationships', workspaceMode)}
                    ${buildWorkspaceModeButton('timeline', 'Timeline', workspaceMode)}
                  </div>
                `
                : ''
            }
            <div class="shell-controls">
              <span class="command-chip">
                <b>[</b>
                <small>Left rail</small>
              </span>
              ${
                workspaceMode === 'classic'
                  ? `
                    <span class="command-chip">
                      <b>]</b>
                      <small>Inspector</small>
                    </span>
                  `
                  : ''
              }
            </div>
            ${state.settings.hints && featureFlags.shortcutDock ? buildPowerDock() : ''}
          </div>
        </div>
      </div>

      <div class="summary-grid ${ultraCompactActive ? 'summary-grid--ultra' : ''}">
        ${summaryMarkup}
      </div>
    </header>
  `
}

function buildClassicRosterPanel({
  visibleRecords,
  activeSelectedId,
  today,
  groupOptions,
  tagOptions,
  ultraCompactActive,
}) {
  const compactListActive = state.settings.compact || ultraCompactActive
  const panelClassName = ['panel', ultraCompactActive ? 'panel--classic-ultra' : ''].filter(Boolean).join(' ')
  const headerClassName = ['roster-header', 'roster-header--stacked', ultraCompactActive ? 'roster-header--crm' : '']
    .filter(Boolean)
    .join(' ')
  const listClassName = [
    'plain-list',
    'record-list',
    'record-list--animated',
    compactListActive ? 'record-list--compact' : '',
    ultraCompactActive ? 'record-list--ultra' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return `
    <section class="${panelClassName}">
      <div class="${headerClassName}">
        <div class="panel-heading">
          <p class="eyebrow">${ultraCompactActive ? 'Pipeline' : 'Roster'}</p>
          <h2>${buildAnimatedValue(String(visibleRecords.length), 'visible-records-count', { tag: 'span', className: 'inline-count animated-value--large' })} ${ultraCompactActive ? 'open relationships' : 'people in view'}</h2>
          <p class="roster-filter-context ${ultraCompactActive ? 'roster-filter-context--crm' : ''}">
            <span>View</span>
            ${buildAnimatedText(filterLabel(state.filter), 'classic-filter-label')}
            <span>Group</span>
            ${buildAnimatedText(state.groupFilter || 'All groups', 'classic-group-label')}
            <span>Tag</span>
            ${buildAnimatedText(state.tagFilter || 'All tags', 'classic-tag-label')}
          </p>
        </div>

        <div class="roster-toolbar ${ultraCompactActive ? 'roster-toolbar--crm' : ''}">
          <label class="toolbar-select toolbar-select--compact">
            <span>Tier</span>
            <select data-ui-filter="tier" data-focus-key="tier-filter">
              <option value="all" ${state.filter === 'all' ? 'selected' : ''}>All people</option>
              <option value="needs-attention" ${state.filter === 'needs-attention' ? 'selected' : ''}>Needs attention</option>
              ${tierOrder.map((tier) => `<option value="${tier}" ${state.filter === tier ? 'selected' : ''}>${tierMeta[tier].label}</option>`).join('')}
              <option value="archived" ${state.filter === 'archived' ? 'selected' : ''}>Archived</option>
            </select>
          </label>
          <label class="toolbar-select">
            <span>Group</span>
            <select data-ui-filter="group" data-focus-key="group-filter">
              <option value="">All groups</option>
              ${groupOptions.map((group) => `<option value="${escapeAttribute(group)}" ${state.groupFilter === group ? 'selected' : ''}>${escapeHtml(group)}</option>`).join('')}
            </select>
          </label>
          <label class="toolbar-select">
            <span>Tag</span>
            <select data-ui-filter="tag" data-focus-key="tag-filter">
              <option value="">All tags</option>
              ${tagOptions.map((tag) => `<option value="${escapeAttribute(tag)}" ${state.tagFilter === tag ? 'selected' : ''}>${escapeHtml(tag)}</option>`).join('')}
            </select>
          </label>
          <label class="toolbar-select">
            <span>Sort</span>
            <select data-ui-filter="sort" data-focus-key="sort-mode">
              <option value="attention" ${state.sortMode === 'attention' ? 'selected' : ''}>Attention</option>
              <option value="name" ${state.sortMode === 'name' ? 'selected' : ''}>Name</option>
              <option value="created" ${state.sortMode === 'created' ? 'selected' : ''}>Created</option>
              <option value="group" ${state.sortMode === 'group' ? 'selected' : ''}>Group</option>
              <option value="tag" ${state.sortMode === 'tag' ? 'selected' : ''}>Tag</option>
            </select>
          </label>
          <label class="toolbar-select toolbar-select--compact">
            <span>Direction</span>
            <select data-ui-filter="direction" data-focus-key="sort-direction">
              <option value="desc" ${state.sortDirection === 'desc' ? 'selected' : ''}>Newest first</option>
              <option value="asc" ${state.sortDirection === 'asc' ? 'selected' : ''}>Oldest first</option>
            </select>
          </label>
          <button
            class="button button-secondary toolbar-mode-button ${state.multiSelectMode ? 'button-active' : ''}"
            type="button"
            data-action="toggle-multi-select"
            data-onboarding-target="bulk-actions"
            ${keyHintAttrs('S')}
          >
            ${state.multiSelectMode ? 'Done selecting' : ultraCompactActive ? 'Select' : 'Select multiple'}
          </button>
        </div>
      </div>

      ${
        state.selectedIds.length
          ? `
            <div class="bulk-bar">
              <div class="bulk-bar__copy">
                <p class="eyebrow">Bulk actions</p>
                <strong>${buildAnimatedValue(String(state.selectedIds.length), 'bulk-count', { tag: 'span', className: 'inline-count' })} selected</strong>
              </div>
              <div class="bulk-bar__actions">
                <button class="button button-secondary" type="button" data-action="bulk-mark-touched">Mark touched</button>
                <button class="button button-secondary" type="button" data-action="bulk-add-tag">Add tag</button>
                <button class="button button-secondary" type="button" data-action="bulk-remove-tag">Remove tag</button>
                <button class="button button-secondary" type="button" data-action="bulk-add-group">Add group</button>
                <button class="button button-secondary" type="button" data-action="bulk-remove-group">Remove group</button>
                <button class="button button-secondary" type="button" data-action="bulk-mass-editor">Mass editor</button>
                <button class="button button-secondary" type="button" data-action="bulk-archive">Archive</button>
                <button class="button button-secondary" type="button" data-action="bulk-restore">Restore</button>
                <button class="button button-secondary" type="button" data-action="clear-selection">Clear</button>
              </div>
            </div>
          `
          : ''
      }

      <label class="search-field">
        <span class="search-label">${ultraCompactActive ? 'Search contacts, tags, groups, notes, and memory' : 'Search by name, notes, memory, tag, group, or socials'}</span>
        <div class="search-shell">
          <input
            data-search
            data-focus-key="search"
            id="search-input"
            type="search"
            placeholder="${ultraCompactActive ? 'Search contacts, groups, or context' : 'Search your people'}"
            value="${escapeAttribute(state.query)}"
            ${keyHintAttrs('/')}
          />
          ${
            state.query
              ? '<button class="search-action" data-action="clear-search" aria-label="Clear search">Clear</button>'
              : ''
          }
        </div>
      </label>

      ${
        visibleRecords.length
          ? `
            <div class="record-list-shell ${ultraCompactActive ? 'record-list-shell--ultra' : ''}" data-selection-shell>
              <div class="selection-rail" data-selection-rail></div>
              <ul class="${listClassName}">
                ${visibleRecords.map((record) => buildClassicRecordCard(record, { today, activeSelectedId, ultraCompactActive })).join('')}
              </ul>
            </div>
          `
          : `
            <div class="empty-state">
              <p class="eyebrow">No matches</p>
              <h3>Nothing fits this view yet.</h3>
              <p class="empty-copy">Try another filter, group, tag, or search term.</p>
            </div>
          `
      }
    </section>
  `
}

function buildClassicRecordCard(record, { today, activeSelectedId, ultraCompactActive = false }) {
  const attention = getAttentionState(record, today)
  const isSelected = activeSelectedId === record.id
  const isBulkSelected = state.selectedIds.includes(record.id)
  const latestMemory = record.memories[0]
  const nextTouch = getNextTouchDate(record)
  const compactListActive = state.settings.compact || ultraCompactActive
  const recordClassName = ['record-card', isSelected ? 'selected' : '', ultraCompactActive ? 'record-card--ultra' : '']
    .filter(Boolean)
    .join(' ')
  const inlineTags = [...record.groups.slice(0, 1), ...record.tags.slice(0, 2)]

  return `
    <li>
      <button class="${recordClassName}" data-select="${record.id}">
        <div class="record-top">
          <div class="record-person">
            ${
              state.multiSelectMode
                ? `
                  <span class="record-select-toggle ${isBulkSelected ? 'active' : ''}" data-toggle-select="${record.id}" aria-label="${isBulkSelected ? 'Deselect person' : 'Select person'}" role="button">
                    <span></span>
                  </span>
                `
                : ''
            }
            ${buildRecordAvatar(record, 'small')}
            <div>
              <p class="record-tier">${tierMeta[record.tier].label}</p>
              <h3>${escapeHtml(record.name)}</h3>
            </div>
          </div>
          <i class="status-pill tone-${attention.tone}">${attention.label}</i>
        </div>

        ${
          ultraCompactActive
            ? `
              <div class="record-card__meta-line">
                <span class="record-meta-pill">${escapeHtml(record.city || 'No city')}</span>
                <span class="record-meta-pill">${escapeHtml(record.touchStyle)}</span>
                ${
                  inlineTags.length
                    ? inlineTags.map((item) => `<span class="record-meta-pill">${escapeHtml(item)}</span>`).join('')
                    : '<span class="record-meta-pill">No tags yet</span>'
                }
              </div>
              <div class="compact-inline compact-inline--ultra">
                <strong>Next ${formatShortDate(nextTouch)}</strong>
                <span>Last ${formatShortDate(record.lastContact)}</span>
                <span>${formatReconnectTiming(attention.daysUntil)}</span>
                <span>${record.memories.length} memories</span>
                <span>${escapeHtml(truncate(record.focus || 'No focus note yet.', 58))}</span>
              </div>
            `
            : compactListActive
              ? `
                <div class="compact-inline compact-inline--minimal">
                  <strong>${formatShortDate(nextTouch)}</strong>
                  <span>${formatReconnectTiming(attention.daysUntil)}</span>
                </div>
              `
              : `
                <p class="record-focus">${escapeHtml(record.focus || 'No focus note added yet.')}</p>

                <div class="record-meta">
                  <span>${escapeHtml(record.city || 'No city set')}</span>
                  <span>Added ${formatShortDate(record.createdAt)}</span>
                  <span>Last ${formatShortDate(record.lastContact)}</span>
                  <span>Next ${formatShortDate(nextTouch)}</span>
                  <span>${record.touchStyle}</span>
                  <span>${record.memories.length} memories</span>
                </div>

                ${
                  record.groups.length
                    ? `<div class="group-row">${record.groups.map((group) => `<span class="tag group-tag">${escapeHtml(group)}</span>`).join('')}</div>`
                    : ''
                }

                <div class="tag-row">
                  ${
                    record.tags.length
                      ? record.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')
                      : '<span class="tag ghost">No tags yet</span>'
                  }
                </div>

                ${
                  latestMemory
                    ? `
                      <div class="mini-memory-row">
                        <span class="mini-memory">Latest memory · ${formatShortDate(latestMemory.date)}</span>
                        <span class="mini-memory">${escapeHtml(truncate(latestMemory.text, 88))}</span>
                      </div>
                    `
                    : ''
                }
              `
        }
      </button>
    </li>
  `
}

function buildCursorChrome() {
  if (!window.matchMedia('(pointer:fine)').matches) {
    return ''
  }

  return `
    <div class="cursor-chrome" aria-hidden="true">
      <div class="cursor-ring" data-cursor-ring></div>
      <div class="cursor-dot" data-cursor-dot></div>
    </div>
  `
}

function buildBulkEditorPanel() {
  if (!state.bulkEditorOpen) {
    return ''
  }

  const touchStyles = getTouchStyles()
  const selectedCount = state.selectedIds.length

  return `
    <div class="brief-overlay open" data-overlay="bulk-editor">
      <section class="brief-panel bulk-editor-panel" role="dialog" aria-modal="true" aria-label="Bulk editor">
        <div class="brief-panel__header">
          <div>
            <p class="eyebrow">Bulk editor</p>
            <h2>Edit ${selectedCount} ${selectedCount === 1 ? 'person' : 'people'} together.</h2>
            <p class="brief-intro">Use this for city changes, tag sweeps, group cleanup, or one tidy batch instead of six repetitive clicks.</p>
          </div>
          <button class="settings-close" data-action="close-bulk-editor" aria-label="Close bulk editor">Close</button>
        </div>

        <div class="form-grid form-grid--settings">
          <label>
            <span>Set tier</span>
            <select data-bulk-field="tier">
              <option value="">Leave unchanged</option>
              ${tierOrder.map((tier) => `<option value="${tier}" ${state.bulkDraft.tier === tier ? 'selected' : ''}>${tierMeta[tier].label}</option>`).join('')}
            </select>
          </label>

          <label>
            <span>Set touch style</span>
            <select data-bulk-field="touchStyle">
              <option value="">Leave unchanged</option>
              ${touchStyles.map((style) => `<option value="${escapeAttribute(style)}" ${state.bulkDraft.touchStyle === style ? 'selected' : ''}>${escapeHtml(style)}</option>`).join('')}
            </select>
          </label>

          <label>
            <span>Set city</span>
            <input data-bulk-field="city" type="text" value="${escapeAttribute(state.bulkDraft.city)}" placeholder="Leave blank to skip" />
          </label>

          <label>
            <span>Set cadence in days</span>
            <input data-bulk-field="cadenceDays" type="number" min="1" value="${escapeAttribute(state.bulkDraft.cadenceDays)}" placeholder="Leave blank to skip" />
          </label>

          <label>
            <span>Add tag</span>
            <input data-bulk-field="addTag" type="text" value="${escapeAttribute(state.bulkDraft.addTag)}" placeholder="family, founder, travel..." />
          </label>

          <label>
            <span>Remove tag</span>
            <input data-bulk-field="removeTag" type="text" value="${escapeAttribute(state.bulkDraft.removeTag)}" placeholder="Tag to strip out..." />
          </label>

          <label>
            <span>Add group</span>
            <input data-bulk-field="addGroup" type="text" value="${escapeAttribute(state.bulkDraft.addGroup)}" placeholder="dubai, founders, family..." />
          </label>

          <label>
            <span>Remove group</span>
            <input data-bulk-field="removeGroup" type="text" value="${escapeAttribute(state.bulkDraft.removeGroup)}" placeholder="Group to strip out..." />
          </label>
        </div>

        <div class="brief-actions">
          <button class="button button-primary" type="button" data-action="apply-bulk-editor">Apply changes</button>
          <button class="button button-secondary" type="button" data-action="close-bulk-editor">Cancel</button>
        </div>
      </section>
    </div>
  `
}

function buildCsvImportReview() {
  const review = state.csvImportReview
  if (!review) {
    return ''
  }

  const mappableTargets = getCsvFieldTargets()

  return `
    <section class="settings-card settings-group">
      <p class="eyebrow">CSV review</p>
      <div class="settings-row">
        <strong>Map fields before importing</strong>
        <small>${escapeHtml(review.fileName)} · ${review.rows.length} rows · adjust the inferred field mapping before the merge lands in your roster.</small>
      </div>

      <div class="import-review-grid">
        ${review.headers
          .map((header) => `
            <div class="import-map-row">
              <div>
                <strong>${escapeHtml(header)}</strong>
                <small>${escapeHtml(truncate(String(review.rows[0]?.[header] || ''), 72) || 'No sample value')}</small>
              </div>
              <select data-csv-map-header="${escapeAttribute(header)}">
                ${mappableTargets
                  .map((target) => `<option value="${target.key}" ${review.mapping[header] === target.key ? 'selected' : ''}>${target.label}</option>`)
                  .join('')}
              </select>
            </div>
          `)
          .join('')}
      </div>

      <div class="settings-actions-grid">
        <button class="button button-primary" type="button" data-action="apply-csv-review">Apply import</button>
        <button class="button button-secondary" type="button" data-action="clear-csv-review">Discard review</button>
      </div>
    </section>
  `
}

function buildActivityImportReview() {
  const review = state.activityImportReview
  if (!review) {
    return ''
  }

  return `
    <section class="settings-card settings-group">
      <p class="eyebrow">Activity import</p>
      <div class="settings-row">
        <strong>Auto-capture review</strong>
        <small>${escapeHtml(review.fileName)} · ${review.events.length} activity items parsed · ${review.matches.length} roster matches found.</small>
      </div>

      <div class="duplicate-list">
        ${
          review.matches.length
            ? review.matches
                .map(
                  (match) => `
                    <div class="duplicate-card">
                      <div class="duplicate-card__head">
                        <strong>${escapeHtml(match.record.name)}</strong>
                        <span class="settings-pill">${formatCompactDate(match.latestDate)}</span>
                      </div>
                      <p class="empty-copy">${escapeHtml(match.reason)}</p>
                      <div class="profile-token-row">
                        ${match.sources.map((source) => `<span class="tag">${escapeHtml(source)}</span>`).join('')}
                      </div>
                    </div>
                  `,
                )
                .join('')
            : '<div class="empty-copy">No activity events matched your roster yet. Try a calendar export or a CSV with date + name/email/phone columns.</div>'
        }
      </div>

      <div class="settings-actions-grid">
        <button class="button button-primary" type="button" data-action="apply-activity-review" ${review.matches.length ? '' : 'disabled'}>Apply last-contact updates</button>
        <button class="button button-secondary" type="button" data-action="clear-activity-review">Discard review</button>
      </div>
    </section>
  `
}

function buildPowerDock() {
  return `
    <div class="power-dock" aria-label="Quick keyboard shortcuts">
      ${hotkeyLegend
        .slice(0, 6)
        .map(
          (entry) => `
            <span class="command-chip">
              <b>${entry.keys}</b>
              <small>${entry.action}</small>
            </span>
          `,
        )
        .join('')}
      <button class="command-chip command-chip--button" type="button" data-action="open-shortcuts-tab">
        <b>?</b>
        <small>All keys</small>
      </button>
    </div>
  `
}

function focusAfterRender(focusKey) {
  state.commandPaletteOpen = false
  state.commandQuery = ''
  state.commandPaletteIndex = 0
  render({ preserveFocus: false })
  window.requestAnimationFrame(() => {
    focusByKey(focusKey)
  })
}

function pulseBodyClass(className, duration = 420) {
  if (!className || document.body.classList.contains('motion-off')) {
    return
  }

  const previousTimer = bodyPulseTimers.get(className)
  if (previousTimer) {
    window.clearTimeout(previousTimer)
  }

  document.body.classList.remove(className)
  void document.body.offsetWidth
  document.body.classList.add(className)

  const timer = window.setTimeout(() => {
    document.body.classList.remove(className)
    bodyPulseTimers.delete(className)
  }, duration)

  bodyPulseTimers.set(className, timer)
}

function commitUiMutation(mutator, options = {}) {
  const {
    preserveFocus = false,
    pulseClass = '',
    pulseDuration = 420,
  } = options

  const applyMutation = () => {
    mutator()
    render({ preserveFocus })
  }

  if (pulseClass) {
    pulseBodyClass(pulseClass, pulseDuration)
  }

  if (!state.settings.motion || typeof document.startViewTransition !== 'function') {
    applyMutation()
    return
  }

  try {
    document.startViewTransition(() => {
      applyMutation()
    })
  } catch {
    applyMutation()
  }
}

function openSettingsTab(tab) {
  commitUiMutation(() => {
    state.commandPaletteOpen = false
    state.commandQuery = ''
    state.commandPaletteIndex = 0
    const opening = !state.settingsOpen
    state.settingsOpen = true
    state.settingsTab = tab
    if (opening) {
      state.settingsAnimating = true
      if (settingsAnimationTimer) {
        window.clearTimeout(settingsAnimationTimer)
      }
      settingsAnimationTimer = window.setTimeout(() => {
        state.settingsAnimating = false
        settingsAnimationTimer = null
      }, 320)
    }
  }, { pulseClass: 'ui-settings-pulse', pulseDuration: 460 })
}

function revealSettingsTab(tab) {
  commitUiMutation(() => {
    state.settingsTab = tab
  }, { pulseClass: 'ui-settings-pulse', pulseDuration: 360 })
}

function closeSettingsPanel() {
  commitUiMutation(() => {
    state.settingsOpen = false
    state.settingsAnimating = false
  }, { pulseClass: 'ui-settings-pulse', pulseDuration: 300 })
}

function toggleCompactMode() {
  commitUiMutation(() => {
    state.settings.compact = !state.settings.compact
    persistSettings()
    animateCompactToggle()
  }, { pulseClass: 'ui-panorama-pulse', pulseDuration: 520 })
}

function toggleUltraCompactMode() {
  commitUiMutation(() => {
    state.settings.ultraCompact = !state.settings.ultraCompact
    if (state.settings.ultraCompact) {
      state.settings.workspaceMode = 'classic'
      state.settings.tabView = false
    }
    persistSettings()
    animateCompactToggle()
  }, { pulseClass: 'ui-panorama-pulse', pulseDuration: 560 })
}

function setWorkspaceMode(mode) {
  commitUiMutation(() => {
    state.settings.workspaceMode = workspaceModes.includes(mode) ? mode : 'classic'
    state.settings.tabView = state.settings.workspaceMode === 'tab'
    persistSettings()
    animateCompactToggle()
  }, { pulseClass: 'ui-panorama-pulse', pulseDuration: 520 })
}

function setTabLayout(layout) {
  commitUiMutation(() => {
    state.settings.tabLayout = ['cards', 'kanban'].includes(layout) ? layout : 'cards'
    persistSettings()
  }, { pulseClass: 'ui-filter-pulse', pulseDuration: 420 })
}

function setMapLayer(layer) {
  commitUiMutation(() => {
    state.settings.mapLayer = ['dark', 'satellite'].includes(layer) ? layer : 'dark'
    persistSettings()
  }, { pulseClass: 'ui-panorama-pulse', pulseDuration: 420 })
}

function setTodayPanelMode(mode) {
  commitUiMutation(() => {
    state.todayPanelMode = mode === 'queue' ? 'queue' : 'today'
  }, { pulseClass: 'ui-panel-pulse', pulseDuration: 360 })
}

function toggleMapLocationPanel(key) {
  if (!key) {
    return
  }

  commitUiMutation(() => {
    state.mapLocationPanels[key] = !isMapLocationPanelOpen(key)
  }, { pulseClass: 'ui-panel-pulse', pulseDuration: 320 })
}

function toggleMultiSelectMode() {
  commitUiMutation(() => {
    state.multiSelectMode = !state.multiSelectMode
    if (!state.multiSelectMode) {
      state.selectedIds = []
      state.bulkEditorOpen = false
    } else {
      triggerBulkModePulse()
    }
  }, { pulseClass: 'ui-filter-pulse', pulseDuration: 420 })
}

function toggleLeftRail() {
  commitUiMutation(() => {
    state.settings.leftRailVisible = !state.settings.leftRailVisible
    persistSettings()
  }, { pulseClass: 'ui-panorama-pulse', pulseDuration: 460 })
}

function toggleRightRail() {
  commitUiMutation(() => {
    state.settings.rightRailVisible = !state.settings.rightRailVisible
    persistSettings()
  }, { pulseClass: 'ui-panorama-pulse', pulseDuration: 460 })
}

function openBulkEditor(mode = 'all') {
  if (!state.selectedIds.length) {
    return
  }

  state.bulkEditorMode = mode
  state.bulkEditorOpen = true
  render({ preserveFocus: false })
}

function closeBulkEditor() {
  state.bulkEditorOpen = false
  state.bulkEditorMode = 'all'
  render({ preserveFocus: false })
}

function openProfilePanel() {
  if (profileCloseTimer) {
    window.clearTimeout(profileCloseTimer)
    profileCloseTimer = null
  }
  state.profileOpen = true
  state.profileClosing = false
  render({ preserveFocus: false })
}

function toggleProfilePanel() {
  if (state.profileOpen || state.profileClosing) {
    closeProfilePanel()
    return
  }

  openProfilePanel()
}

function toggleBriefPanel() {
  state.briefOpen = !state.briefOpen
  render({ preserveFocus: false })
}

function toggleQuickCapturePanel(mode = 'memory') {
  if (state.quickCaptureOpen) {
    state.quickCaptureOpen = false
    render({ preserveFocus: false })
    return
  }

  state.quickCaptureOpen = true
  state.quickCaptureMode = mode
  state.quickCaptureRecordId = state.selectedId || state.quickCaptureRecordId
  render({ preserveFocus: false })
}

function toggleNetworkPanel() {
  state.networkOpen = !state.networkOpen
  render({ preserveFocus: false })
}

function replayTutorial() {
  state.commandPaletteOpen = false
  state.commandQuery = ''
  state.commandPaletteIndex = 0
  state.settingsOpen = false
  state.settingsAnimating = false
  state.settings.tutorialSeen = false
  state.onboardingStep = 0
  state.onboardingOpen = true
  prepareOnboardingStep()
  persistSettings()
  render({ preserveFocus: false })
}

function prepareOnboardingStep() {
  const step = onboardingSteps[state.onboardingStep] || onboardingSteps[0]
  if (!step) {
    return
  }

  if (step.target && /left-rail|module/.test(step.target)) {
    state.settings.leftRailVisible = true
  }

  if (step.target && /inspector/.test(step.target)) {
    state.settings.workspaceMode = 'classic'
    state.settings.rightRailVisible = true
  }

  if (step.target === 'inspector-basics') {
    state.inspectorPanels.basics = true
  }
}

function runCommandById(commandId) {
  const command = getCommandPaletteCommands(getSelectedRecord()).find((entry) => entry.id === commandId)
  if (!command) {
    return
  }
  state.commandPaletteOpen = false
  state.commandQuery = ''
  state.commandPaletteIndex = 0
  command.run()
}

function getCommandPaletteCommands(selectedRecord) {
  const commands = [
    { id: 'search', group: 'Jump', label: 'Search roster', shortcut: '/', run: () => focusAfterRender('search') },
    { id: 'add-person', group: 'Create', label: 'Add person', shortcut: 'N', run: () => addPerson() },
    { id: 'settings', group: 'Jump', label: 'Open settings', shortcut: 'G', run: () => openSettingsTab('general') },
    { id: 'shortcuts', group: 'Jump', label: 'Open all keys', shortcut: '?', run: () => openSettingsTab('shortcuts') },
    { id: 'compact', group: 'View', label: state.settings.compact ? 'Switch to full view' : 'Switch to compact view', shortcut: 'C', run: () => toggleCompactMode() },
    { id: 'ultra-compact', group: 'View', label: state.settings.ultraCompact ? 'Turn off ultra compact mode' : 'Turn on ultra compact mode', shortcut: '', run: () => toggleUltraCompactMode() },
    { id: 'classic-view', group: 'View', label: 'Switch to Classic CRM', shortcut: '', run: () => setWorkspaceMode('classic') },
    { id: 'tab-view', group: 'View', label: 'Switch to Tab view', shortcut: '', run: () => setWorkspaceMode('tab') },
    { id: 'map-view', group: 'View', label: 'Switch to Map view', shortcut: '', run: () => setWorkspaceMode('map') },
    { id: 'relationships-view', group: 'View', label: 'Switch to Relationships', shortcut: '', run: () => setWorkspaceMode('relationships') },
    { id: 'timeline-view', group: 'View', label: 'Switch to Timeline', shortcut: '', run: () => setWorkspaceMode('timeline') },
    { id: 'toggle-multi', group: 'Select', label: state.multiSelectMode ? 'Finish multi-select' : 'Start multi-select', shortcut: 'S', run: () => toggleMultiSelectMode() },
    { id: 'bulk-editor', group: 'Select', label: 'Open bulk editor', shortcut: '', run: () => openBulkEditor('all') },
    { id: 'toggle-left', group: 'Layout', label: state.settings.leftRailVisible ? 'Hide left rail' : 'Show left rail', shortcut: '[', run: () => toggleLeftRail() },
    { id: 'toggle-right', group: 'Layout', label: state.settings.rightRailVisible ? 'Hide inspector' : 'Show inspector', shortcut: ']', run: () => toggleRightRail() },
    { id: 'open-today', group: 'Jump', label: 'Open Today queue', shortcut: '', run: () => { state.sidebarPanels.today = true; render({ preserveFocus: false }) } },
    { id: 'import-csv', group: 'Data', label: 'Import CSV', shortcut: '', run: () => openCsvImportPicker() },
    { id: 'import-memory', group: 'Data', label: 'Import memory file', shortcut: 'I', run: () => { state.pendingImportMode = 'merge'; openImportPicker() } },
    { id: 'export-memory', group: 'Data', label: 'Export memory file', shortcut: 'X', run: () => exportMemoryFile() },
    { id: 'tutorial', group: 'Help', label: 'Replay onboarding', shortcut: '', run: () => replayTutorial() },
    { id: 'all-people', group: 'Jump', label: 'Go to All people', shortcut: '1', run: () => setFilter('all') },
    { id: 'attention', group: 'Jump', label: 'Go to Needs attention', shortcut: '2', run: () => setFilter('needs-attention') },
  ]

  if (selectedRecord) {
    commands.push(
      { id: 'mark-touched', group: 'Selected person', label: 'Mark touched today', shortcut: 'M', run: () => { updateSelectedRecord('lastContact', todayStamp()); triggerTouchReward() } },
      { id: 'meeting-brief', group: 'Selected person', label: 'Open meeting brief', shortcut: 'B', run: () => { state.briefOpen = true; render({ preserveFocus: false }) } },
      { id: 'quick-capture', group: 'Selected person', label: 'Open quick capture', shortcut: 'Q', run: () => { state.quickCaptureOpen = true; state.quickCaptureMode = 'memory'; state.quickCaptureRecordId = state.selectedId || state.quickCaptureRecordId; render({ preserveFocus: false }) } },
      { id: 'full-profile', group: 'Selected person', label: 'Open full profile', shortcut: 'P', run: () => openProfilePanel() },
      { id: 'orbit', group: 'Selected person', label: 'Open orbit', shortcut: 'U', run: () => { state.networkOpen = true; render({ preserveFocus: false }) } },
      { id: 'archive', group: 'Selected person', label: selectedRecord.archived ? 'Restore person' : 'Archive person', shortcut: 'A', run: () => setSelectedArchived(!selectedRecord.archived) },
      { id: 'focus-memory', group: 'Selected person', label: 'Focus memory composer', shortcut: 'E', run: () => focusAfterRender('memory-text') },
      { id: 'focus-tags', group: 'Selected person', label: 'Focus tags', shortcut: 'T', run: () => focusAfterRender('record-tags') },
      { id: 'focus-context', group: 'Selected person', label: 'Focus active context', shortcut: 'F', run: () => focusAfterRender('record-focus') },
      { id: 'focus-notes', group: 'Selected person', label: 'Focus notes', shortcut: 'O', run: () => focusAfterRender('record-notes') },
    )
  }

  return commands
}

function getVisibleCommandPaletteCommands(selectedRecord) {
  const query = normalizePersonKey(state.commandQuery)
  const commands = getCommandPaletteCommands(selectedRecord)
  if (!query) {
    return commands
  }

  return commands.filter((command) =>
    [command.label, command.group, command.shortcut]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(query),
  )
}

function buildCommandPalettePanel(selectedRecord) {
  if (!state.commandPaletteOpen) {
    return ''
  }

  const commands = getVisibleCommandPaletteCommands(selectedRecord)
  const activeIndex = Math.min(state.commandPaletteIndex, Math.max(commands.length - 1, 0))
  const grouped = new Map()

  commands.forEach((command, index) => {
    const bucket = grouped.get(command.group) || []
    bucket.push({ ...command, index })
    grouped.set(command.group, bucket)
  })

  return `
    <div class="command-palette-overlay open" data-overlay="command-palette">
      <section class="command-palette-panel" role="dialog" aria-modal="true" aria-label="Quick actions">
        <div class="command-palette-header">
          <div>
            <p class="eyebrow">Quick actions</p>
            <h2>Move through Roster fast.</h2>
          </div>
          <button class="settings-close" data-action="close-command-palette" aria-label="Close quick actions">Close</button>
        </div>

        <label class="command-palette-search">
          <input
            type="search"
            data-command-query
            data-focus-key="command-palette"
            placeholder="What do you want to do?"
            value="${escapeAttribute(state.commandQuery)}"
          />
        </label>

        <div class="command-palette-list">
          ${
            commands.length
              ? Array.from(grouped.entries())
                  .map(
                    ([group, items]) => `
                      <section class="command-palette-group">
                        <p class="eyebrow">${escapeHtml(group)}</p>
                        <div class="command-palette-group__list">
                          ${items
                            .map(
                              (command) => `
                                <button
                                  class="command-palette-item ${command.index === activeIndex ? 'is-active' : ''}"
                                  type="button"
                                  data-action="run-command"
                                  data-command-id="${escapeAttribute(command.id)}"
                                  data-command-index="${command.index}"
                                >
                                  <span class="command-palette-item__copy">
                                    <strong>${escapeHtml(command.label)}</strong>
                                    <small>${escapeHtml(command.group)}</small>
                                  </span>
                                  ${command.shortcut ? `<span class="key-pill">${escapeHtml(command.shortcut)}</span>` : ''}
                                </button>
                              `,
                            )
                            .join('')}
                        </div>
                      </section>
                    `,
                  )
                  .join('')
              : `
                <div class="empty-state empty-state--palette">
                  <p class="eyebrow">No matches</p>
                  <h3>Nothing matches that action yet.</h3>
                  <p class="empty-copy">Try “settings”, “map”, “archive”, or “search”.</p>
                </div>
              `
          }
        </div>
      </section>
    </div>
  `
}

function handleClick(event) {
  const target = event.target

  if (!(target instanceof HTMLElement)) {
    return
  }

      const overlay = target.closest('[data-overlay]')
  if (overlay instanceof HTMLElement) {
    if (overlay.dataset.overlay === 'command-palette' && !target.closest('.command-palette-panel')) {
      state.commandPaletteOpen = false
      state.commandQuery = ''
      state.commandPaletteIndex = 0
      render({ preserveFocus: false })
      return
    }

    if (overlay.dataset.overlay === 'settings' && !target.closest('.settings-panel')) {
      closeSettingsPanel()
      return
    }

    if (overlay.dataset.overlay === 'profile' && !target.closest('.profile-panel')) {
      closeProfilePanel()
      return
    }

    if (overlay.dataset.overlay === 'brief' && !target.closest('.brief-panel')) {
      state.briefOpen = false
      render({ preserveFocus: false })
      return
    }

    if (overlay.dataset.overlay === 'quick-capture' && !target.closest('.quick-capture-panel')) {
      state.quickCaptureOpen = false
      render({ preserveFocus: false })
      return
    }

    if (overlay.dataset.overlay === 'bulk-editor' && !target.closest('.bulk-editor-panel')) {
      closeBulkEditor()
      return
    }

    if (overlay.dataset.overlay === 'network' && !target.closest('.network-panel')) {
      state.networkOpen = false
      render({ preserveFocus: false })
      return
    }

    if (overlay.dataset.overlay === 'onboarding' && !target.closest('.onboarding-panel')) {
      state.settings.tutorialSeen = true
      state.onboardingOpen = false
      persistSettings()
      render({ preserveFocus: false })
      return
    }
  }

  const panelToggle = target.closest('[data-toggle-panel]')
  if (panelToggle instanceof HTMLElement) {
    if (panelToggle.dataset.toggleBehavior === 'all-inspector') {
      toggleInspectorEverything()
      return
    }
    togglePanel(panelToggle.dataset.togglePanel)
    return
  }

  const action = target.closest('[data-action]')
  if (action instanceof HTMLElement) {
    const actionName = action.dataset.action

    switch (actionName) {
      case 'add-person':
        addPerson()
        return
      case 'open-command-palette':
        state.commandPaletteOpen = true
        state.commandQuery = ''
        state.commandPaletteIndex = 0
        render({ preserveFocus: false })
        window.requestAnimationFrame(() => focusByKey('command-palette'))
        return
      case 'close-command-palette':
        state.commandPaletteOpen = false
        state.commandQuery = ''
        state.commandPaletteIndex = 0
        render({ preserveFocus: false })
        return
      case 'run-command':
        runCommandById(action.dataset.commandId)
        return
      case 'open-settings':
        openSettingsTab('general')
        return
      case 'toggle-compact':
        toggleCompactMode()
        return
      case 'set-workspace-mode':
        setWorkspaceMode(action.dataset.workspaceMode)
        return
      case 'set-tab-layout':
        setTabLayout(action.dataset.tabLayout)
        return
      case 'set-map-layer':
        setMapLayer(action.dataset.mapLayer)
        return
      case 'fit-map':
        fitRosterMapToVisiblePeople()
        return
      case 'toggle-multi-select':
        toggleMultiSelectMode()
        return
      case 'set-today-panel-mode':
        setTodayPanelMode(action.dataset.todayPanelMode)
        return
      case 'toggle-map-location':
        toggleMapLocationPanel(action.dataset.mapLocationKey)
        return
      case 'toggle-left-rail':
        toggleLeftRail()
        return
      case 'toggle-right-rail':
        toggleRightRail()
        return
      case 'open-shortcuts-tab':
        openSettingsTab('shortcuts')
        return
      case 'close-settings':
        closeSettingsPanel()
        return
      case 'reset-roster':
        state.records = cloneInitialRecords()
        state.selectedId = state.records[0] ? state.records[0].id : null
        state.filter = 'all'
        state.query = ''
        state.drafts = {}
        restoreDraftsForSelected(state.selectedId)
        persistRecords()
        persistDrafts()
        render({ preserveFocus: false })
        return
      case 'export-memory-file':
        exportMemoryFile()
        return
      case 'copy-memory-file':
        copyMemoryFile()
        return
      case 'import-memory-merge':
        state.pendingImportMode = 'merge'
        openImportPicker()
        return
      case 'import-memory-replace':
        state.pendingImportMode = 'replace'
        openImportPicker()
        return
      case 'import-csv':
        openCsvImportPicker()
        return
      case 'import-activity':
        openActivityImportPicker()
        return
      case 'mark-touched':
        updateSelectedRecord('lastContact', todayStamp())
        triggerTouchReward()
        return
      case 'open-brief':
        state.briefOpen = true
        render({ preserveFocus: false })
        return
      case 'close-brief':
        state.briefOpen = false
        render({ preserveFocus: false })
        return
      case 'copy-brief':
        copyMeetingBrief()
        return
      case 'open-quick-capture':
        state.quickCaptureOpen = true
        state.quickCaptureMode = action.dataset.quickCaptureMode || state.quickCaptureMode
        state.quickCaptureRecordId = state.selectedId || state.quickCaptureRecordId
        render({ preserveFocus: false })
        return
      case 'close-quick-capture':
        state.quickCaptureOpen = false
        render({ preserveFocus: false })
        return
      case 'open-bulk-editor':
        openBulkEditor(action.dataset.bulkMode || 'all')
        return
      case 'close-bulk-editor':
        closeBulkEditor()
        return
      case 'apply-bulk-editor':
        applyBulkEditor()
        return
      case 'open-network':
        state.networkOpen = true
        render({ preserveFocus: false })
        return
      case 'close-network':
        state.networkOpen = false
        render({ preserveFocus: false })
        return
      case 'set-quick-capture-mode':
        state.quickCaptureMode = action.dataset.quickCaptureMode || 'memory'
        render({ preserveFocus: false })
        return
      case 'save-quick-capture':
        commitQuickCapture()
        return
      case 'archive-person':
        setSelectedArchived(true)
        return
      case 'restore-person':
        setSelectedArchived(false)
        return
      case 'clear-search':
        state.query = ''
        render({ preserveFocus: false })
        focusByKey('search')
        return
      case 'focus-memory':
        focusAfterRender('memory-text')
        return
      case 'open-profile':
        openProfilePanel()
        return
      case 'close-profile':
        closeProfilePanel()
        return
      case 'toggle-profile-edit':
        state.profileEditOpen = !state.profileEditOpen
        render({ preserveFocus: false })
        return
      case 'upload-avatar':
        openAvatarPicker()
        return
      case 'remove-avatar':
        updateSelectedRecord('avatar', '', { render: true })
        return
      case 'commit-tag-draft':
        commitTagDraft()
        return
      case 'commit-group-draft':
        commitGroupDraft()
        return
      case 'commit-touch-style-draft':
        commitTouchStyleDraft()
        return
      case 'commit-related-draft':
        commitRelatedDraft()
        return
      case 'clear-memory-draft':
        resetMemoryDraft()
        saveDraftsForSelected()
        render({ preserveFocus: false })
        focusByKey('memory-text')
        return
      case 'reset-defaults':
        state.settings.defaults = { ...defaultContactSettings }
        persistSettings()
        render({ preserveFocus: false })
        return
      case 'add-tier':
        addCustomTier()
        return
      case 'remove-tier':
        removeCustomTier(action.dataset.tierKey)
        return
      case 'remove-global-group':
        removeGroupEverywhere(action.dataset.groupValue)
        return
      case 'remove-global-tag':
        removeTagEverywhere(action.dataset.tagValue)
        return
      case 'rerun-tutorial':
        state.settings.tutorialSeen = false
        persistSettings()
        state.onboardingStep = 0
        state.onboardingOpen = true
        render({ preserveFocus: false })
        return
      case 'mark-tutorial-seen':
        state.settings.tutorialSeen = true
        persistSettings()
        render({ preserveFocus: false })
        return
      case 'skip-tutorial':
      case 'finish-tutorial':
        state.settings.tutorialSeen = true
        state.onboardingOpen = false
        persistSettings()
        render({ preserveFocus: false })
        return
      case 'next-tutorial-step':
        state.onboardingStep = Math.min(state.onboardingStep + 1, onboardingSteps.length - 1)
        prepareOnboardingStep()
        render({ preserveFocus: false })
        return
      case 'prev-tutorial-step':
        state.onboardingStep = Math.max(state.onboardingStep - 1, 0)
        prepareOnboardingStep()
        render({ preserveFocus: false })
        return
      case 'delete-person':
        removeSelectedRecord()
        return
      case 'bulk-mark-touched':
        runBulkAction('touch')
        triggerTouchReward()
        return
      case 'bulk-add-tag':
        openBulkEditor('add-tag')
        return
      case 'bulk-remove-tag':
        openBulkEditor('remove-tag')
        return
      case 'bulk-add-group':
        openBulkEditor('add-group')
        return
      case 'bulk-remove-group':
        openBulkEditor('remove-group')
        return
      case 'bulk-mass-editor':
        openBulkEditor('all')
        return
      case 'bulk-archive':
        runBulkAction('archive')
        return
      case 'bulk-restore':
        runBulkAction('restore')
        return
      case 'clear-selection':
        state.selectedIds = []
        render({ preserveFocus: false })
        return
      case 'merge-duplicates':
        mergeDuplicateGroup(String(action.dataset.duplicateIds || '').split(',').filter(Boolean))
        return
      case 'apply-csv-review':
        applyCsvImportReview()
        return
      case 'clear-csv-review':
        state.csvImportReview = null
        render({ preserveFocus: false })
        return
      case 'apply-activity-review':
        applyActivityImportReview()
        return
      case 'clear-activity-review':
        state.activityImportReview = null
        render({ preserveFocus: false })
        return
      case 'enable-notifications':
        requestReminderPermission()
        return
      case 'send-reminder-preview':
        sendReminderDigest({ force: true })
        return
      default:
        break
    }
  }

  const memoryDelete = target.closest('[data-remove-memory]')
  if (memoryDelete instanceof HTMLElement) {
    removeMemory(memoryDelete.dataset.removeMemory)
    return
  }

  const addTagButton = target.closest('[data-add-tag]')
  if (addTagButton instanceof HTMLElement) {
    addTagToSelectedRecord(addTagButton.dataset.addTag)
    return
  }

  const addGroupButton = target.closest('[data-add-group]')
  if (addGroupButton instanceof HTMLElement) {
    addGroupToSelectedRecord(addGroupButton.dataset.addGroup)
    return
  }

  const removeTagButton = target.closest('[data-remove-tag]')
  if (removeTagButton instanceof HTMLElement) {
    removeTagFromSelectedRecord(removeTagButton.dataset.removeTag)
    return
  }

  const removeGroupButton = target.closest('[data-remove-group]')
  if (removeGroupButton instanceof HTMLElement) {
    removeGroupFromSelectedRecord(removeGroupButton.dataset.removeGroup)
    return
  }

  const removeTouchStyleButton = target.closest('[data-remove-touch-style]')
  if (removeTouchStyleButton instanceof HTMLElement) {
    removeCustomTouchStyle(removeTouchStyleButton.dataset.removeTouchStyle)
    return
  }

  const removeRelatedButton = target.closest('[data-remove-related]')
  if (removeRelatedButton instanceof HTMLElement) {
    removeRelatedFromSelectedRecord(removeRelatedButton.dataset.removeRelated)
    return
  }

  const addRelatedButton = target.closest('[data-add-related]')
  if (addRelatedButton instanceof HTMLElement) {
    addRelatedPersonToSelectedRecord(addRelatedButton.dataset.addRelated)
    return
  }

  const toggleSelectButton = target.closest('[data-toggle-select]')
  if (toggleSelectButton instanceof HTMLElement) {
    toggleBulkSelection(toggleSelectButton.dataset.toggleSelect)
    return
  }

  const filterButtonElement = target.closest('[data-filter]')
  if (filterButtonElement instanceof HTMLElement) {
    setFilter(filterButtonElement.dataset.filter)
    return
  }

  const groupFilterButton = target.closest('[data-filter-group]')
  if (groupFilterButton instanceof HTMLElement) {
    state.groupFilter = groupFilterButton.dataset.filterGroup || ''
    render({ preserveFocus: false })
    return
  }

  const tagFilterButton = target.closest('[data-filter-tag]')
  if (tagFilterButton instanceof HTMLElement) {
    state.tagFilter = tagFilterButton.dataset.filterTag || ''
    render({ preserveFocus: false })
    return
  }

  const settingsTabButton = target.closest('[data-settings-tab]')
  if (settingsTabButton instanceof HTMLElement) {
    revealSettingsTab(settingsTabButton.dataset.settingsTab || 'general')
    return
  }

  const tierButtonElement = target.closest('[data-expand-tier]')
  if (tierButtonElement instanceof HTMLElement) {
    const tier = tierButtonElement.dataset.expandTier
    state.expandedTier = state.expandedTier === tier ? '' : tier
    render({ preserveFocus: false })
    return
  }

  const selectButton = target.closest('[data-select]')
  if (selectButton instanceof HTMLElement) {
    const selectedId = selectButton.dataset.select
    selectRecord(selectedId, { sourceElement: selectButton })
    if (selectedId && selectButton.dataset.openProfileSelect === 'true' && !state.multiSelectMode) {
      openProfilePanel()
    }
  }
}

function handleInput(event) {
  const target = event.target

  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) {
    return
  }

  if (target.hasAttribute('data-search')) {
    state.query = target.value
    render()
    return
  }

  if (target.dataset.commandQuery != null) {
    state.commandQuery = target.value
    state.commandPaletteIndex = 0
    render()
    return
  }

  if (target.hasAttribute('data-tag-input')) {
    state.tagDraft = target.value
    saveDraftsForSelected()
    if (event.type === 'change' && target.value.trim()) {
      commitTagDraft()
      return
    }
    return
  }

  if (target.hasAttribute('data-group-input')) {
    state.groupDraft = target.value
    saveDraftsForSelected()
    if (event.type === 'change' && target.value.trim()) {
      commitGroupDraft()
      return
    }
    return
  }

  if (target.hasAttribute('data-touch-style-input')) {
    state.touchStyleDraft = target.value
    if (event.type === 'change' && target.value.trim()) {
      commitTouchStyleDraft()
    }
    return
  }

  if (target.hasAttribute('data-related-input')) {
    state.relatedDraft = target.value
    saveDraftsForSelected()
    return
  }

  if (target.id === 'memory-import-input') {
    importMemoryFile(target.files ? target.files[0] : null)
    return
  }

  if (target.id === 'csv-import-input') {
    importCsvFile(target.files ? target.files[0] : null)
    return
  }

  if (target.id === 'activity-import-input') {
    importActivityFile(target.files ? target.files[0] : null)
    return
  }

  if (target.id === 'avatar-input') {
    importAvatarFile(target.files ? target.files[0] : null)
    return
  }

  const uiFilter = target.dataset.uiFilter
  if (uiFilter) {
    if (uiFilter === 'tier') {
      setFilter(target.value || 'all')
      return
    } else if (uiFilter === 'group') {
      state.groupFilter = target.value
    } else if (uiFilter === 'tag') {
      state.tagFilter = target.value
    } else if (uiFilter === 'sort') {
      state.sortMode = target.value || 'attention'
    } else if (uiFilter === 'direction') {
      state.sortDirection = target.value || 'desc'
    }
    render({ preserveFocus: false })
    return
  }

  const csvMapHeader = target.dataset.csvMapHeader
  if (csvMapHeader && state.csvImportReview) {
    state.csvImportReview.mapping[csvMapHeader] = target.value
    render({ preserveFocus: false })
    return
  }

  const recordField = target.dataset.recordField
  if (recordField) {
    if (target.hasAttribute('data-profile-groups')) {
      updateSelectedRecord('groups', String(target.value).split(',').map((group) => normalizeGroup(group)).filter(Boolean), { render: event.type === 'change' })
      return
    }

    if (target.hasAttribute('data-profile-tags')) {
      updateSelectedRecord('tags', String(target.value).split(',').map((tag) => normalizeTag(tag)).filter(Boolean), { render: event.type === 'change' })
      return
    }

    const shouldRender =
      event.type === 'change' ||
      target instanceof HTMLSelectElement ||
      target.type === 'date' ||
      target.type === 'number' ||
      target.type === 'range'

    if (recordField === 'cadenceDays') {
      updateSelectedRecord(recordField, Math.max(1, Number(target.value) || 1), { render: shouldRender })
      return
    }

    if (recordField === 'bondHealth') {
      const nextValue = clamp(Number(target.value) || 0, 0, 100)
      const fieldHead = target.closest('label')?.querySelector('[data-bond-output], [data-bond-output-inline]')
      if (fieldHead instanceof HTMLElement) {
        fieldHead.textContent = `${nextValue}%`
      }
      updateSelectedRecord(recordField, nextValue, { render: event.type === 'change' })
      return
    }

    updateSelectedRecord(recordField, target.value, { render: shouldRender })
    return
  }

  const memoryField = target.dataset.memoryField
  if (memoryField) {
    state.memoryDraft[memoryField] = target.value
    saveDraftsForSelected()
    return
  }

  const settingField = target.dataset.settingField
  if (settingField) {
    const reminderField = target.dataset.reminderField
    if (reminderField) {
      if (reminderField === 'enabled') {
        state.settings.reminders.enabled = target instanceof HTMLInputElement ? target.checked : Boolean(target.value)
      } else if (reminderField === 'hour') {
        state.settings.reminders.hour = clamp(Number(target.value) || defaultSettings.reminders.hour, 0, 23)
      } else if (reminderField === 'birthdayLeadDays') {
        state.settings.reminders.birthdayLeadDays = clamp(Number(target.value) || defaultSettings.reminders.birthdayLeadDays, 0, 30)
      } else if (reminderField === 'meetingLeadDays') {
        state.settings.reminders.meetingLeadDays = clamp(Number(target.value) || defaultSettings.reminders.meetingLeadDays, 0, 14)
      } else if (reminderField === 'range') {
        state.settings.reminders.range = target.value || defaultSettings.reminders.range
      }
    } else {
      state.settings[settingField] = target instanceof HTMLInputElement && target.type === 'checkbox'
        ? target.checked
        : settingField === 'scale'
          ? clamp(Number(target.value) || defaultSettings.scale, 60, 100)
          : target.value
      if (settingField === 'workspaceMode') {
        state.settings.workspaceMode = workspaceModes.includes(target.value) ? target.value : 'classic'
        state.settings.tabView = state.settings.workspaceMode === 'tab'
      } else if (settingField === 'ultraCompact' && state.settings.ultraCompact) {
        state.settings.workspaceMode = 'classic'
        state.settings.tabView = false
      }
    }
    persistSettings()
    applySettings()
    startReminderLoop()
    if (settingField === 'compact' || settingField === 'ultraCompact' || settingField === 'tabView' || settingField === 'workspaceMode') {
      animateCompactToggle()
    }
    if (settingField === 'scale' || settingField === 'compact' || settingField === 'ultraCompact' || settingField === 'tabView' || settingField === 'workspaceMode' || reminderField) {
      render({ preserveFocus: false })
    }
    return
  }

  const bulkField = target.dataset.bulkField
  if (bulkField) {
    state.bulkDraft[bulkField] = target.value
    return
  }

  const featureField = target.dataset.featureField
  if (featureField) {
    state.settings.features[featureField] = target instanceof HTMLInputElement ? target.checked : Boolean(target.value)
    if (featureField === 'tabViewToggle' && !state.settings.features[featureField]) {
      state.settings.tabView = false
      state.settings.workspaceMode = 'classic'
    }
    if (featureField === 'compactToggle' && !state.settings.features[featureField]) {
      state.settings.compact = false
    }
    if (featureField === 'shortcutDock' && !state.settings.features[featureField]) {
      state.settings.hints = false
    }
    persistSettings()
    render({ preserveFocus: false })
    return
  }

  const defaultField = target.dataset.defaultField
  if (defaultField) {
    if (defaultField === 'cadenceDays') {
      state.settings.defaults[defaultField] = Math.max(1, Number(target.value) || 1)
    } else if (defaultField === 'bondHealth') {
      state.settings.defaults[defaultField] = clamp(Number(target.value) || 0, 0, 100)
    } else if (defaultField === 'tags') {
      state.settings.defaults.tags = String(target.value)
        .split(',')
        .map((tag) => normalizeTag(tag))
        .filter(Boolean)
    } else if (defaultField === 'groups') {
      state.settings.defaults.groups = String(target.value)
        .split(',')
        .map((group) => normalizeGroup(group))
        .filter(Boolean)
    } else {
      state.settings.defaults[defaultField] = target.value
    }

    persistSettings()
  }

  const tierDraftField = target.dataset.tierDraftField
  if (tierDraftField) {
    state.tierDraft[tierDraftField] = target.value
    return
  }

  const quickCaptureField = target.dataset.quickCaptureField
  if (quickCaptureField) {
    if (quickCaptureField === 'recordId') {
      state.quickCaptureRecordId = target.value || state.selectedId
      render({ preserveFocus: false })
    } else {
      state.quickCaptureDraft[quickCaptureField] = target.value
    }
  }
}

function handleSubmit(event) {
  const target = event.target

  if (!(target instanceof HTMLFormElement)) {
    return
  }

  if (target.dataset.form === 'memory') {
    event.preventDefault()
    addMemory()
  }
}

function handleKeydown(event) {
  const key = event.key.toLowerCase()
  const typing = isTypingTarget(event.target)

  if (
    event.target instanceof HTMLTextAreaElement &&
    event.target.dataset.memoryField === 'text' &&
    (event.metaKey || event.ctrlKey) &&
    event.key === 'Enter'
  ) {
    event.preventDefault()
    addMemory()
    return
  }

  if (event.target instanceof HTMLInputElement && event.target.hasAttribute('data-tag-input')) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      commitTagDraft()
      return
    }

    if (event.key === 'Backspace' && !event.target.value.trim()) {
      const record = getSelectedRecord()
      if (record && record.tags.length) {
        event.preventDefault()
        removeTagFromSelectedRecord(record.tags[record.tags.length - 1])
      }
      return
    }
  }

  if (event.target instanceof HTMLInputElement && event.target.hasAttribute('data-group-input')) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      commitGroupDraft()
      return
    }

    if (event.key === 'Backspace' && !event.target.value.trim()) {
      const record = getSelectedRecord()
      if (record && record.groups.length) {
        event.preventDefault()
        removeGroupFromSelectedRecord(record.groups[record.groups.length - 1])
      }
      return
    }
  }

  if (event.target instanceof HTMLInputElement && event.target.hasAttribute('data-touch-style-input')) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      commitTouchStyleDraft()
      return
    }
  }

  if (event.target instanceof HTMLInputElement && event.target.hasAttribute('data-related-input') && event.key === 'Enter') {
    event.preventDefault()
    commitRelatedDraft()
    return
  }

  if ((event.metaKey || event.ctrlKey) && event.key === ',') {
    event.preventDefault()
    openSettingsTab('general')
    return
  }

  if ((event.metaKey || event.ctrlKey) && key === 'k') {
    event.preventDefault()
    state.commandPaletteOpen = !state.commandPaletteOpen
    state.commandQuery = ''
    state.commandPaletteIndex = 0
    render({ preserveFocus: false })
    if (state.commandPaletteOpen) {
      window.requestAnimationFrame(() => focusByKey('command-palette'))
    }
    return
  }

  if (state.commandPaletteOpen) {
    const visibleCommands = getVisibleCommandPaletteCommands(getSelectedRecord())

    if (event.key === 'Escape') {
      event.preventDefault()
      state.commandPaletteOpen = false
      state.commandQuery = ''
      state.commandPaletteIndex = 0
      render({ preserveFocus: false })
      return
    }

    if (event.key === 'ArrowDown' || (!typing && key === 'j')) {
      event.preventDefault()
      if (visibleCommands.length) {
        setCommandPaletteIndex((state.commandPaletteIndex + 1) % visibleCommands.length)
      }
      return
    }

    if (event.key === 'ArrowUp' || (!typing && key === 'k')) {
      event.preventDefault()
      if (visibleCommands.length) {
        setCommandPaletteIndex((state.commandPaletteIndex - 1 + visibleCommands.length) % visibleCommands.length)
      }
      return
    }

    if (event.key === 'Enter' && visibleCommands.length) {
      event.preventDefault()
      runCommandById(visibleCommands[state.commandPaletteIndex]?.id)
      return
    }
  }

  if (event.key === 'Escape' && state.profileOpen) {
    event.preventDefault()
    closeProfilePanel()
    return
  }

  if (event.key === 'Escape' && state.briefOpen) {
    event.preventDefault()
    state.briefOpen = false
    render({ preserveFocus: false })
    return
  }

  if (event.key === 'Escape' && state.quickCaptureOpen) {
    event.preventDefault()
    state.quickCaptureOpen = false
    render({ preserveFocus: false })
    return
  }

  if (event.key === 'Escape' && state.bulkEditorOpen) {
    event.preventDefault()
    closeBulkEditor()
    return
  }

  if (event.key === 'Escape' && state.networkOpen) {
    event.preventDefault()
    state.networkOpen = false
    render({ preserveFocus: false })
    return
  }

  if (event.key === 'Escape' && state.onboardingOpen) {
    event.preventDefault()
    state.settings.tutorialSeen = true
    state.onboardingOpen = false
    persistSettings()
    render({ preserveFocus: false })
    return
  }

  if (event.key === 'Escape' && state.settingsOpen) {
    event.preventDefault()
    closeSettingsPanel()
    return
  }

  if (typing) {
    return
  }

  switch (key) {
    case '/':
      event.preventDefault()
      focusByKey('search')
      break
    case 'n':
      event.preventDefault()
      addPerson()
      break
    case 'g':
      event.preventDefault()
      if (state.settingsOpen && state.settingsTab === 'general') {
        closeSettingsPanel()
      } else {
        openSettingsTab('general')
      }
      break
    case '?':
      event.preventDefault()
      openSettingsTab('shortcuts')
      break
    case 'm':
      event.preventDefault()
      updateSelectedRecord('lastContact', todayStamp())
      triggerTouchReward()
      break
    case 'a':
      event.preventDefault()
      setSelectedArchived(!getSelectedRecord()?.archived)
      break
    case 'p':
      event.preventDefault()
      toggleProfilePanel()
      break
    case 'e':
      event.preventDefault()
      focusAfterRender('memory-text')
      break
    case 'q':
      event.preventDefault()
      toggleQuickCapturePanel('memory')
      break
    case 'b':
      event.preventDefault()
      toggleBriefPanel()
      break
    case 'c':
      event.preventDefault()
      toggleCompactMode()
      break
    case 't':
      event.preventDefault()
      focusAfterRender('record-tags')
      break
    case 'f':
      event.preventDefault()
      focusAfterRender('record-focus')
      break
    case 'o':
      event.preventDefault()
      focusAfterRender('record-notes')
      break
    case 'i':
      event.preventDefault()
      state.pendingImportMode = 'merge'
      openImportPicker()
      break
    case 'u':
      event.preventDefault()
      toggleNetworkPanel()
      break
    case 's':
      event.preventDefault()
      toggleMultiSelectMode()
      break
    case 'x':
      event.preventDefault()
      exportMemoryFile()
      break
    case '[':
      event.preventDefault()
      toggleLeftRail()
      break
    case ']':
      event.preventDefault()
      toggleRightRail()
      break
    case 'j':
    case 'arrowdown':
      event.preventDefault()
      moveSelection(1)
      break
    case 'k':
    case 'arrowup':
      event.preventDefault()
      moveSelection(-1)
      break
    case '1':
      event.preventDefault()
      setFilter('all')
      break
    case '2':
      event.preventDefault()
      setFilter('needs-attention')
      break
    case '3':
      event.preventDefault()
      setFilter('inner-circle')
      break
    case '4':
      event.preventDefault()
      setFilter('close')
      break
    case '5':
      event.preventDefault()
      setFilter('medium')
      break
    case '6':
      event.preventDefault()
      setFilter('acquaintance')
      break
    default:
      if ((event.metaKey || event.ctrlKey) && key === 'a') {
        event.preventDefault()
        const visible = getVisibleRecords(state.records, state.query, state.filter, todayStamp())
        state.multiSelectMode = true
        state.selectedIds = visible.map((record) => record.id)
        render({ preserveFocus: false })
      }
      break
  }
}

function setFilter(filter) {
  commitUiMutation(() => {
    state.filter = filter
    if (tierMeta[filter]) {
      state.expandedTier = filter
    }
    const visible = getVisibleRecords(state.records, state.query, state.filter, todayStamp())
    if (visible.length && !visible.some((record) => record.id === state.selectedId)) {
      state.selectedId = visible[0].id
      restoreDraftsForSelected(state.selectedId)
    }
  }, { pulseClass: 'ui-filter-pulse', pulseDuration: 420 })
}

function togglePanel(token) {
  const [scope, key] = String(token || '').split(':')
  if (!scope || !key) {
    return
  }

  if (scope === 'sidebar' && key in state.sidebarPanels) {
    commitUiMutation(() => {
      state.sidebarPanels[key] = !state.sidebarPanels[key]
    }, { pulseClass: 'ui-panel-pulse', pulseDuration: 340 })
    return
  }

  if (scope === 'inspector' && key in state.inspectorPanels) {
    commitUiMutation(() => {
      state.inspectorPanels[key] = !state.inspectorPanels[key]
    }, { pulseClass: 'ui-panel-pulse', pulseDuration: 340 })
  }
}

function toggleInspectorEverything() {
  commitUiMutation(() => {
    const nextState = !Object.values(state.inspectorPanels).every(Boolean)
    state.inspectorPanels = Object.fromEntries(
      Object.keys(state.inspectorPanels).map((key) => [key, nextState]),
    )
  }, { pulseClass: 'ui-panel-pulse', pulseDuration: 380 })
}

function triggerTouchReward() {
  document.body.classList.remove('touch-reward')
  void document.body.offsetWidth
  document.body.classList.add('touch-reward')
  if (touchRewardTimer) {
    window.clearTimeout(touchRewardTimer)
  }
  touchRewardTimer = window.setTimeout(() => {
    document.body.classList.remove('touch-reward')
    touchRewardTimer = null
  }, 900)
}

function triggerBulkModePulse() {
  document.body.classList.remove('bulk-mode-pulse')
  void document.body.offsetWidth
  document.body.classList.add('bulk-mode-pulse')
  window.setTimeout(() => {
    document.body.classList.remove('bulk-mode-pulse')
  }, 520)
}

function closeProfilePanel() {
  if (!state.profileOpen && !state.profileClosing) {
    return
  }

  if (profileCloseTimer) {
    window.clearTimeout(profileCloseTimer)
    profileCloseTimer = null
  }

  state.profileEditOpen = false

  if (!state.settings.motion) {
    state.profileOpen = false
    state.profileClosing = false
    render({ preserveFocus: false })
    return
  }

  state.profileClosing = true
  render({ preserveFocus: false })

  profileCloseTimer = window.setTimeout(() => {
    state.profileOpen = false
    state.profileClosing = false
    profileCloseTimer = null
    render({ preserveFocus: false })
  }, PROFILE_CLOSE_MS)
}

function selectRecord(id, options = {}) {
  if (!id || id === state.selectedId) {
    return
  }

  state.selectedId = id
  state.quickCaptureRecordId = id
  restoreDraftsForSelected(id)
  const workspaceMode = getWorkspaceMode()

  if (workspaceMode === 'map') {
    revealMapLocationPanelsForRecord(id)
  }

  if (workspaceMode === 'classic') {
    updateSelectionUI({ sourceElement: options.sourceElement })
  } else {
    render({ preserveFocus: false })
  }
}

function revealMapLocationPanelsForRecord(id) {
  const group = getVisibleLocationGroups(todayStamp()).find((entry) => entry.records.some((record) => record.id === id))
  if (!group) {
    return
  }

  const region = resolveLocationRegion(group.city)
  state.mapLocationPanels[`region:${region.key}`] = true
  state.mapLocationPanels[`city:${group.key}`] = true
}

function moveSelection(direction) {
  const visible = getVisibleRecords(state.records, state.query, state.filter, todayStamp())
  if (!visible.length) {
    return
  }

  const currentIndex = visible.findIndex((record) => record.id === state.selectedId)
  const safeIndex = currentIndex === -1 ? 0 : currentIndex
  const nextIndex = (safeIndex + direction + visible.length) % visible.length
  if (visible[nextIndex]?.id === state.selectedId) {
    return
  }

  state.selectedId = visible[nextIndex].id
  state.quickCaptureRecordId = state.selectedId
  restoreDraftsForSelected(state.selectedId)
  if (getWorkspaceMode() === 'classic') {
    updateSelectionUI({ scrollIntoView: true })
  } else {
    render({ preserveFocus: false })
  }
}

function addPerson() {
  const defaults = state.settings.defaults
  const newRecord = {
    id: makeId(),
    name: 'New person',
    archived: false,
    tier: defaults.tier,
    city: defaults.city,
    createdAt: todayStamp(),
    lastContact: todayStamp(),
    cadenceDays: defaults.cadenceDays,
    touchStyle: defaults.touchStyle,
    bondHealth: defaults.bondHealth,
    focus: '',
    notes: '',
    tags: defaults.tags.slice(),
    groups: defaults.groups.slice(),
    relatedIds: [],
    avatar: '',
    contact: createEmptyContactCard(),
    memories: [],
  }

  state.records.unshift(newRecord)
  state.selectedId = newRecord.id
  state.quickCaptureRecordId = newRecord.id
  state.filter = 'all'
  state.query = ''
  clearDraftsForRecord(newRecord.id)
  restoreDraftsForSelected(newRecord.id)
  persistRecords()
  render({ preserveFocus: false })
  focusByKey('record-name')
}

function toggleBulkSelection(id) {
  if (!id || !state.multiSelectMode) {
    return
  }

  state.selectedIds = state.selectedIds.includes(id)
    ? state.selectedIds.filter((entry) => entry !== id)
    : [...state.selectedIds, id]

  render({ preserveFocus: false })
  window.requestAnimationFrame(() => {
    pulseElement(app?.querySelector(`[data-select="${id}"]`) || null)
  })
}

function runBulkAction(action) {
  if (!state.selectedIds.length) {
    return
  }

  const selectedRecords = state.records.filter((record) => state.selectedIds.includes(record.id))
  if (action === 'archive') {
    const warning = buildBulkArchiveMessage(selectedRecords, true)
    if (warning && !window.confirm(warning)) {
      return
    }
  }

  if (action === 'restore') {
    const warning = buildBulkArchiveMessage(selectedRecords, false)
    if (warning && !window.confirm(warning)) {
      return
    }
  }

  state.records = state.records.map((record) => {
    if (!state.selectedIds.includes(record.id)) {
      return record
    }

    if (action === 'touch') {
      return { ...record, lastContact: todayStamp() }
    }

    if (action === 'archive') {
      return { ...record, archived: true }
    }

    if (action === 'restore') {
      return { ...record, archived: false }
    }

    return record
  })

  persistRecords()
  render({ preserveFocus: false })
}

function buildRecordRiskSummary(record) {
  const notes = []

  if (record.tier && record.tier !== 'acquaintance') {
    notes.push(`they are in ${tierMeta[record.tier]?.label || record.tier}`)
  }
  if (record.groups?.length) {
    notes.push(`${record.groups.length} group${record.groups.length === 1 ? '' : 's'}`)
  }
  if (record.tags?.length) {
    notes.push(`${record.tags.length} tag${record.tags.length === 1 ? '' : 's'}`)
  }
  if (record.memories?.length) {
    notes.push(`${record.memories.length} memor${record.memories.length === 1 ? 'y' : 'ies'}`)
  }
  if (record.relatedIds?.length) {
    notes.push(`${record.relatedIds.length} linked relationship${record.relatedIds.length === 1 ? '' : 's'}`)
  }

  return notes
}

function buildArchiveMessage(record, archived) {
  if (!record) {
    return ''
  }

  const details = buildRecordRiskSummary(record)
  if (archived) {
    return details.length
      ? `Archive ${record.name}?\n\nThis is reversible and you can restore them later.\n\nRoster is asking because ${details.join(', ')}.`
      : `Archive ${record.name}?\n\nThis is reversible and you can restore them later from Archived.`
  }

  return `Restore ${record.name} to the active roster?`
}

function buildDeleteMessage(record) {
  if (!record) {
    return ''
  }

  const details = buildRecordRiskSummary(record)
  return details.length
    ? `Delete ${record.name} permanently?\n\nThis cannot be undone.\n\nRoster is asking because ${details.join(', ')}.`
    : `Delete ${record.name} permanently?\n\nThis cannot be undone.`
}

function buildBulkArchiveMessage(records, archived) {
  if (!records.length) {
    return ''
  }

  const richRecords = records.filter((record) => buildRecordRiskSummary(record).length)
  if (archived) {
    return richRecords.length
      ? `Archive ${records.length} people?\n\nThis is reversible and you can restore them later.\n\n${richRecords.length} of them already have tiers, tags, groups, memories, or linked people.`
      : `Archive ${records.length} people?\n\nThis is reversible and you can restore them later.`
  }

  return `Restore ${records.length} ${records.length === 1 ? 'person' : 'people'} to the active roster?`
}

function removeSelectedRecord() {
  const record = getSelectedRecord()
  if (!record) {
    return
  }

  if (!window.confirm(buildDeleteMessage(record))) {
    return
  }

  state.records = state.records.filter((entry) => entry.id !== record.id)
  state.selectedIds = state.selectedIds.filter((entry) => entry !== record.id)
  state.selectedId = state.records[0] ? state.records[0].id : null
  clearDraftsForRecord(record.id)
  restoreDraftsForSelected(state.selectedId)
  persistRecords()
  render({ preserveFocus: false })
}

function openImportPicker() {
  const input = document.querySelector('#memory-import-input')
  if (input instanceof HTMLInputElement) {
    input.value = ''
    input.click()
  }
}

function openCsvImportPicker() {
  const input = document.querySelector('#csv-import-input')
  if (input instanceof HTMLInputElement) {
    input.value = ''
    input.click()
  }
}

function openActivityImportPicker() {
  const input = document.querySelector('#activity-import-input')
  if (input instanceof HTMLInputElement) {
    input.value = ''
    input.click()
  }
}

async function importMemoryFile(file) {
  if (!file) {
    return
  }

  try {
    const text = await file.text()
    const parsed = JSON.parse(text)
    const records = parseMemoryFile(parsed)
    const importedSettings = extractImportedSettings(parsed)
    const importMode = state.pendingImportMode || 'replace'

    if (!records.length) {
      window.alert('This file did not contain any people to import.')
      return
    }

    const nextRecords =
      importMode === 'merge'
        ? mergeImportedRecords(state.records, records)
        : records

    const prompt =
      importMode === 'merge'
        ? `Merge ${records.length} imported people into the current roster?`
        : `Import ${records.length} people from this memory file and replace the current roster?`

    if (!window.confirm(prompt)) {
      return
    }

    state.records = nextRecords
    state.selectedId = nextRecords[0] ? nextRecords[0].id : null
    state.filter = 'all'
    state.query = ''
    if (importedSettings) {
      state.settings = normalizeSettings({
        ...state.settings,
        ...importedSettings,
        defaults: {
          ...state.settings.defaults,
          ...(importedSettings.defaults || {}),
        },
      })
      persistSettings()
    }
    if (importMode !== 'merge') {
      state.drafts = {}
      persistDrafts()
    }
    restoreDraftsForSelected(state.selectedId)
    persistRecords()
    render({ preserveFocus: false })
  } catch (error) {
    window.alert(`Import failed. Please use a valid Roster memory file.\n\n${error instanceof Error ? error.message : String(error)}`)
  } finally {
    state.pendingImportMode = 'replace'
  }
}

async function importCsvFile(file) {
  if (!file) {
    return
  }

  try {
    const text = await file.text()
    const rows = parseCsvText(text)
    if (!rows.length) {
      window.alert('This CSV did not contain any importable contacts.')
      return
    }

    const headers = Object.keys(rows[0] || {})
    state.csvImportReview = {
      fileName: file.name,
      headers,
      rows,
      mapping: inferCsvMapping(headers),
    }
    openSettingsTab('data')
  } catch (error) {
    window.alert(`CSV import failed.\n\n${error instanceof Error ? error.message : String(error)}`)
  }
}

async function importActivityFile(file) {
  if (!file) {
    return
  }

  try {
    const text = await file.text()
    const review = buildActivityImportReviewState(file.name, text)
    state.activityImportReview = review
    openSettingsTab('data')
  } catch (error) {
    window.alert(`Activity import failed.\n\n${error instanceof Error ? error.message : String(error)}`)
  }
}

function exportMemoryFile() {
  const payload = buildMemoryFile()
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `roster-memory-${todayStamp()}.json`
  link.click()
  URL.revokeObjectURL(url)
}

async function copyMemoryFile() {
  const payload = JSON.stringify(buildMemoryFile(), null, 2)

  try {
    await navigator.clipboard.writeText(payload)
    window.alert('Memory file JSON copied to the clipboard.')
  } catch {
    window.alert('Copy failed. Use Export JSON instead.')
  }
}

function applyCsvImportReview() {
  const review = state.csvImportReview
  if (!review) {
    return
  }

  const importedRecords = review.rows
    .map((row) => mapCsvRowToRecord(row, review.mapping))
    .filter(Boolean)

  if (!importedRecords.length) {
    window.alert('The current mapping does not produce any importable contacts yet.')
    return
  }

  if (!window.confirm(`Import ${importedRecords.length} contacts from ${review.fileName} and merge them into your roster?`)) {
    return
  }

  state.records = mergeImportedRecords(state.records, importedRecords)
  state.filter = 'all'
  state.selectedId = state.records[0] ? state.records[0].id : null
  state.csvImportReview = null
  persistRecords()
  restoreDraftsForSelected(state.selectedId)
  const duplicateGroups = getDuplicateGroups(state.records)
  if (duplicateGroups.length) {
    openSettingsTab('data')
    return
  }
  render({ preserveFocus: false })
}

function applyActivityImportReview() {
  const review = state.activityImportReview
  if (!review || !review.matches.length) {
    return
  }

  state.records = state.records.map((record) => {
    const match = review.matches.find((entry) => entry.record.id === record.id)
    if (!match) {
      return record
    }

    const importedMemory = {
      id: makeId(),
      date: match.latestDate,
      text: `Imported ${match.sources.join(', ')} activity. ${match.reason}`,
    }

    return {
      ...record,
      lastContact: match.latestDate > record.lastContact ? match.latestDate : record.lastContact,
      memories: [importedMemory, ...record.memories]
        .sort((first, second) => second.date.localeCompare(first.date))
        .slice(0, 50),
    }
  })

  state.activityImportReview = null
  persistRecords()
  render({ preserveFocus: false })
}

async function copyMeetingBrief() {
  const record = getSelectedRecord()
  if (!record) {
    return
  }

  const brief = buildMeetingBrief(record, todayStamp())
  const payload = [
    `${record.name} meeting brief`,
    '',
    'Snapshot',
    ...brief.snapshot.map((item) => `- ${item}`),
    '',
    'Context',
    ...brief.context.map((item) => `- ${item}`),
    '',
    'Talk tracks',
    ...brief.prompts.map((item) => `- ${item}`),
    '',
    'Memory cues',
    ...(brief.memories.length ? brief.memories.map((item) => `- ${item}`) : ['- No saved memories yet']),
  ].join('\n')

  try {
    await navigator.clipboard.writeText(payload)
    window.alert('Meeting brief copied to the clipboard.')
  } catch {
    window.alert('Could not copy the meeting brief.')
  }
}

function commitQuickCapture() {
  const recordId = state.quickCaptureRecordId || state.selectedId
  const record = state.records.find((entry) => entry.id === recordId)
  if (!record) {
    return
  }

  if (state.quickCaptureMode === 'touch') {
    state.selectedId = record.id
    state.quickCaptureRecordId = record.id
    state.quickCaptureOpen = false
    state.records = state.records.map((entry) =>
      entry.id === record.id
        ? {
            ...entry,
            lastContact: todayStamp(),
          }
        : entry,
    )
    persistRecords()
    triggerTouchReward()
    render({ preserveFocus: false })
    return
  }

  if (state.quickCaptureMode === 'tag') {
    state.selectedId = record.id
    state.quickCaptureRecordId = record.id
    state.quickCaptureOpen = false
    addTagToSelectedRecord(state.quickCaptureDraft.tag)
    state.quickCaptureDraft.tag = ''
    return
  }

  const memoryText = state.quickCaptureDraft.memory.trim()
  if (!memoryText) {
    focusByKey('quick-capture-memory')
    return
  }

  const memory = {
    id: makeId(),
    date: todayStamp(),
    text: memoryText,
  }

  state.records = state.records.map((entry) =>
    entry.id === record.id
      ? {
          ...entry,
          memories: [memory, ...entry.memories].sort((first, second) => second.date.localeCompare(first.date)),
        }
      : entry,
  )

  state.quickCaptureDraft.memory = ''
  state.quickCaptureOpen = false
  persistRecords()
  render({ preserveFocus: false })
}

async function requestReminderPermission() {
  if (typeof Notification === 'undefined') {
    window.alert('Notifications are not supported in this environment.')
    return
  }

  const permission = await Notification.requestPermission()
  if (permission === 'granted') {
    state.settings.reminders.enabled = true
    persistSettings()
    startReminderLoop()
    sendReminderDigest({ force: true })
    render({ preserveFocus: false })
    return
  }

  render({ preserveFocus: false })
}

function setSelectedArchived(archived) {
  const record = getSelectedRecord()
  if (!record) {
    return
  }

  if (!window.confirm(buildArchiveMessage(record, archived))) {
    return
  }

  state.records = state.records.map((entry) =>
    entry.id === record.id
      ? {
          ...entry,
          archived,
        }
      : entry,
  )

  const nextVisible = getVisibleRecords(state.records, state.query, state.filter, todayStamp())
  if (!nextVisible.some((entry) => entry.id === record.id)) {
    state.selectedId = nextVisible[0]?.id || state.records.find((entry) => !entry.archived)?.id || null
  }

  persistRecords()
  restoreDraftsForSelected(state.selectedId)
  render({ preserveFocus: false })
}

function applyBulkEditor() {
  if (!state.selectedIds.length) {
    closeBulkEditor()
    return
  }

  const nextTier = state.bulkDraft.tier
  const nextTouchStyle = normalizeTouchStyle(state.bulkDraft.touchStyle)
  const nextCity = String(state.bulkDraft.city || '').trim()
  const nextCadence = Math.max(1, Number(state.bulkDraft.cadenceDays) || 0)
  const addTag = normalizeTag(state.bulkDraft.addTag)
  const removeTag = normalizeTag(state.bulkDraft.removeTag)
  const addGroup = normalizeGroup(state.bulkDraft.addGroup)
  const removeGroup = normalizeGroup(state.bulkDraft.removeGroup)

  state.records = state.records.map((record) => {
    if (!state.selectedIds.includes(record.id)) {
      return record
    }

    let nextRecord = { ...record }

    if (nextTier) {
      nextRecord.tier = nextTier
    }
    if (nextTouchStyle) {
      nextRecord.touchStyle = nextTouchStyle
    }
    if (nextCity) {
      nextRecord.city = nextCity
    }
    if (nextCadence) {
      nextRecord.cadenceDays = nextCadence
    }
    if (addTag && !nextRecord.tags.includes(addTag)) {
      nextRecord.tags = [...nextRecord.tags, addTag].sort((a, b) => a.localeCompare(b))
    }
    if (removeTag) {
      nextRecord.tags = nextRecord.tags.filter((tag) => tag !== removeTag)
    }
    if (addGroup && !nextRecord.groups.includes(addGroup)) {
      nextRecord.groups = [...nextRecord.groups, addGroup].sort((a, b) => a.localeCompare(b))
    }
    if (removeGroup) {
      nextRecord.groups = nextRecord.groups.filter((group) => group !== removeGroup)
    }

    return standardizeRecord(nextRecord)
  })

  state.bulkDraft = {
    tier: '',
    city: '',
    touchStyle: '',
    cadenceDays: '',
    addTag: '',
    removeTag: '',
    addGroup: '',
    removeGroup: '',
  }
  persistRecords()
  closeBulkEditor()
}

function setCommandPaletteIndex(nextIndex) {
  state.commandPaletteIndex = nextIndex

  const panel = app?.querySelector('.command-palette-panel')
  if (!(panel instanceof HTMLElement)) {
    render({ preserveFocus: false })
    return
  }

  const items = Array.from(panel.querySelectorAll('.command-palette-item'))
  items.forEach((item, index) => {
    item.classList.toggle('is-active', index === nextIndex)
  })

  const activeItem = items[nextIndex]
  if (activeItem instanceof HTMLElement) {
    activeItem.scrollIntoView({ block: 'nearest' })
  }
}

function addMemory() {
  const record = getSelectedRecord()
  const memoryText = state.memoryDraft.text.trim()

  if (!record || !memoryText) {
    focusByKey('memory-text')
    return
  }

  const memory = {
    id: makeId(),
    date: state.memoryDraft.date || todayStamp(),
    text: memoryText,
  }

  state.records = state.records.map((entry) =>
    entry.id === record.id
      ? {
          ...entry,
          memories: [memory, ...entry.memories].sort((first, second) => second.date.localeCompare(first.date)),
        }
      : entry,
  )

  resetMemoryDraft()
  saveDraftsForSelected()
  persistRecords()
  render({ preserveFocus: false })
  focusByKey('memory-text')
}

function removeMemory(memoryId) {
  const record = getSelectedRecord()
  if (!record) {
    return
  }

  state.records = state.records.map((entry) =>
    entry.id === record.id
      ? {
          ...entry,
          memories: entry.memories.filter((memory) => memory.id !== memoryId),
        }
      : entry,
  )

  persistRecords()
  render({ preserveFocus: false })
}

function updateSelectedRecord(key, value, options = {}) {
  const selectedRecord = getSelectedRecord()
  if (!selectedRecord) {
    return
  }

  const { render: shouldRender = true } = options

  state.records = state.records.map((record) =>
    record.id === selectedRecord.id
      ? standardizeRecord(setPathValue(record, key, value))
      : record,
  )

  persistRecords()
  if (shouldRender) {
    render()
  }
}

function commitTagDraft() {
  addTagToSelectedRecord(state.tagDraft)
}

function commitGroupDraft() {
  addGroupToSelectedRecord(state.groupDraft)
}

function commitRelatedDraft() {
  addRelatedPersonToSelectedRecord(state.relatedDraft)
}

function commitTouchStyleDraft() {
  addCustomTouchStyle(state.touchStyleDraft)
}

function addTagToSelectedRecord(tag) {
  const record = getSelectedRecord()
  const nextTag = normalizeTag(tag)

  if (!record || !nextTag) {
    focusByKey('record-tags')
    return
  }

  if (record.tags.some((entry) => String(entry || '').toLowerCase() === nextTag)) {
    state.tagDraft = ''
    saveDraftsForSelected()
    render({ preserveFocus: false })
    focusByKey('record-tags')
    return
  }

  state.records = state.records.map((entry) =>
    entry.id === record.id
      ? {
          ...entry,
          tags: [...entry.tags, nextTag].sort((first, second) => first.localeCompare(second)),
        }
      : entry,
  )

  state.tagDraft = ''
  saveDraftsForSelected()
  persistRecords()
  render({ preserveFocus: false })
  focusByKey('record-tags')
}

function addGroupToSelectedRecord(group) {
  const record = getSelectedRecord()
  const nextGroup = normalizeGroup(group)

  if (!record || !nextGroup) {
    focusByKey('record-groups')
    return
  }

  if (record.groups.some((entry) => String(entry || '').toLowerCase() === nextGroup)) {
    state.groupDraft = ''
    saveDraftsForSelected()
    render({ preserveFocus: false })
    focusByKey('record-groups')
    return
  }

  state.records = state.records.map((entry) =>
    entry.id === record.id
      ? {
          ...entry,
          groups: [...entry.groups, nextGroup].sort((first, second) => first.localeCompare(second)),
        }
      : entry,
  )

  state.groupDraft = ''
  saveDraftsForSelected()
  persistRecords()
  render({ preserveFocus: false })
  focusByKey('record-groups')
}

function addRelatedPersonToSelectedRecord(value) {
  const record = getSelectedRecord()
  if (!record) {
    return
  }

  const target = findRecordByNameOrId(value)
  if (!target || target.id === record.id) {
    focusByKey('record-related')
    return
  }

  state.records = state.records.map((entry) => {
    if (entry.id === record.id) {
      return {
        ...entry,
        relatedIds: Array.from(new Set([...entry.relatedIds, target.id])),
      }
    }

    if (entry.id === target.id) {
      return {
        ...entry,
        relatedIds: Array.from(new Set([...entry.relatedIds, record.id])),
      }
    }

    return entry
  })

  state.relatedDraft = ''
  saveDraftsForSelected()
  persistRecords()
  render({ preserveFocus: false })
  focusByKey('record-related')
}

function addCustomTouchStyle(value) {
  const nextStyle = normalizeTouchStyle(value)
  if (!nextStyle) {
    focusByKey('setting-touch-style')
    return
  }

  const touchStyles = getTouchStyles()
  if (touchStyles.some((style) => String(style || '').toLowerCase() === nextStyle.toLowerCase())) {
    state.touchStyleDraft = ''
    render({ preserveFocus: false })
    focusByKey('setting-touch-style')
    return
  }

  state.settings.customTouchStyles = resolveTouchStyles(state.settings.customTouchStyles, [nextStyle]).filter(
    (style) => !baseTouchStyles.includes(style),
  )
  state.touchStyleDraft = ''
  persistSettings()
  render({ preserveFocus: false })
  focusByKey('setting-touch-style')
}

function removeCustomTouchStyle(value) {
  const nextStyle = normalizeTouchStyle(value)
  if (!nextStyle) {
    return
  }

  state.settings.customTouchStyles = (state.settings.customTouchStyles || []).filter(
    (style) => String(style || '').toLowerCase() !== nextStyle.toLowerCase(),
  )

  if (String(state.settings.defaults.touchStyle || '').toLowerCase() === nextStyle.toLowerCase()) {
    state.settings.defaults.touchStyle = defaultContactSettings.touchStyle
  }

  state.records = state.records.map((record) =>
    String(record.touchStyle || '').toLowerCase() === nextStyle.toLowerCase()
      ? { ...record, touchStyle: defaultTouchStyleForTier(record.tier) }
      : record,
  )

  persistSettings()
  persistRecords()
  render({ preserveFocus: false })
}

function addCustomTier() {
  const nextTier = normalizeTierDefinition(state.tierDraft)
  if (!nextTier) {
    openSettingsTab('extra')
    return
  }

  state.settings.customTiers = [...(state.settings.customTiers || []), nextTier]
  syncTierConfig(state.settings)
  state.tierDraft = {
    label: '',
    cadenceHint: '',
    description: '',
  }
  persistSettings()
  render({ preserveFocus: false })
}

function removeCustomTier(key) {
  if (!key) {
    return
  }

  const fallbackTier = defaultContactSettings.tier
  state.settings.customTiers = (state.settings.customTiers || []).filter((tier) => tier.key !== key)
  syncTierConfig(state.settings)
  state.records = state.records.map((record) =>
    record.tier === key
      ? {
          ...record,
          tier: fallbackTier,
        }
      : record,
  )

  if (state.settings.defaults.tier === key) {
    state.settings.defaults.tier = fallbackTier
  }

  if (state.filter === key) {
    state.filter = 'all'
  }

  persistSettings()
  persistRecords()
  render({ preserveFocus: false })
}

function removeTagEverywhere(value) {
  const target = normalizeTag(value)
  if (!target) {
    return
  }

  state.records = state.records.map((record) => ({
    ...record,
    tags: record.tags.filter((tag) => tag !== target),
  }))
  state.settings.defaults.tags = (state.settings.defaults.tags || []).filter((tag) => tag !== target)
  if (state.tagFilter === target) {
    state.tagFilter = ''
  }
  persistRecords()
  persistSettings()
  render({ preserveFocus: false })
}

function removeGroupEverywhere(value) {
  const target = normalizeGroup(value)
  if (!target) {
    return
  }

  state.records = state.records.map((record) => ({
    ...record,
    groups: record.groups.filter((group) => group !== target),
  }))
  state.settings.defaults.groups = (state.settings.defaults.groups || []).filter((group) => group !== target)
  if (state.groupFilter === target) {
    state.groupFilter = ''
  }
  persistRecords()
  persistSettings()
  render({ preserveFocus: false })
}

function removeTagFromSelectedRecord(tag) {
  const record = getSelectedRecord()
  if (!record || !tag) {
    return
  }

  state.records = state.records.map((entry) =>
    entry.id === record.id
      ? {
          ...entry,
          tags: entry.tags.filter((existing) => String(existing || '').toLowerCase() !== tag.toLowerCase()),
        }
      : entry,
  )

  persistRecords()
  render({ preserveFocus: false })
}

function removeGroupFromSelectedRecord(group) {
  const record = getSelectedRecord()
  if (!record || !group) {
    return
  }

  state.records = state.records.map((entry) =>
    entry.id === record.id
      ? {
          ...entry,
          groups: entry.groups.filter((existing) => String(existing || '').toLowerCase() !== group.toLowerCase()),
        }
      : entry,
  )

  persistRecords()
  render({ preserveFocus: false })
}

function removeRelatedFromSelectedRecord(relatedId) {
  const record = getSelectedRecord()
  if (!record || !relatedId) {
    return
  }

  state.records = state.records.map((entry) => {
    if (entry.id === record.id || entry.id === relatedId) {
      return {
        ...entry,
        relatedIds: entry.relatedIds.filter((id) => id !== (entry.id === record.id ? relatedId : record.id)),
      }
    }

    return entry
  })

  persistRecords()
  render({ preserveFocus: false })
}

function getSelectedRecord() {
  return state.records.find((record) => record.id === state.selectedId) || state.records[0] || null
}

function getVisibleRecords(records, query, filter, today) {
  const normalizedQuery = query.trim().toLowerCase()

  return records
    .filter((record) => {
      if (filter === 'archived') {
        return !!record.archived
      }

      if (record.archived) {
        return false
      }

      if (filter === 'needs-attention') {
        return getAttentionState(record, today).rank < 2
      }

      if (filter !== 'all' && record.tier !== filter) {
        return false
      }

      if (state.groupFilter && !record.groups.includes(state.groupFilter)) {
        return false
      }

      if (state.tagFilter && !record.tags.includes(state.tagFilter)) {
        return false
      }

      return true
    })
    .filter((record) => {
      if (!normalizedQuery) {
        return true
      }

      const haystack = [
        record.name,
        record.city,
        record.focus,
        record.notes,
        record.tags.join(' '),
        record.groups.join(' '),
        Object.values(record.contact || {}).join(' '),
        record.touchStyle,
        record.memories.map((memory) => memory.text).join(' '),
        tierMeta[record.tier].label,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(normalizedQuery)
    })
    .sort((first, second) => compareRecords(first, second, today))
}

function compareRecords(first, second, today) {
  const direction = state.sortDirection === 'asc' ? 1 : -1

  if (state.sortMode === 'name') {
    return first.name.localeCompare(second.name) * direction
  }

  if (state.sortMode === 'created') {
    return first.createdAt.localeCompare(second.createdAt) * direction
  }

  if (state.sortMode === 'group') {
    const firstGroup = first.groups[0] || 'zzz'
    const secondGroup = second.groups[0] || 'zzz'
    return (firstGroup.localeCompare(secondGroup) || first.name.localeCompare(second.name)) * direction
  }

  if (state.sortMode === 'tag') {
    const firstTag = first.tags[0] || 'zzz'
    const secondTag = second.tags[0] || 'zzz'
    return (firstTag.localeCompare(secondTag) || first.name.localeCompare(second.name)) * direction
  }

  const firstAttention = getAttentionState(first, today)
  const secondAttention = getAttentionState(second, today)

  if (firstAttention.rank !== secondAttention.rank) {
    return firstAttention.rank - secondAttention.rank
  }

  if (firstAttention.daysUntil !== secondAttention.daysUntil) {
    return firstAttention.daysUntil - secondAttention.daysUntil
  }

  return first.name.localeCompare(second.name)
}

function tonePriority(tone) {
  if (tone === 'overdue') return 0
  if (tone === 'soon') return 1
  return 2
}

function getCityGroups(records, today) {
  const groups = new Map()

  for (const record of records) {
    const city = normalizeLocationLabel(record.city) || 'Unmapped'
    const key = city.toLowerCase()
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        city,
        coordinates: getLocationCoordinates(city),
        records: [],
      })
    }
    groups.get(key).records.push(record)
  }

  return Array.from(groups.values())
    .map((group) => ({
      ...group,
      records: group.records.slice().sort((first, second) => compareRecords(first, second, today)),
    }))
    .sort((first, second) => {
      if (first.coordinates && !second.coordinates) return -1
      if (!first.coordinates && second.coordinates) return 1
      return first.city.localeCompare(second.city)
    })
}

function normalizeLocationLabel(value) {
  return String(value || '').trim().replace(/\s+/g, ' ')
}

function getLocationCoordinates(location) {
  const normalized = normalizeLocationLabel(location).toLowerCase()
  if (!normalized || normalized === 'unmapped') {
    return null
  }

  if (geocodeCache[normalized]?.lat != null && geocodeCache[normalized]?.lng != null) {
    return {
      lat: Number(geocodeCache[normalized].lat),
      lng: Number(geocodeCache[normalized].lng),
      source: geocodeCache[normalized].source || 'cache',
    }
  }

  return resolveCityCoordinates(normalized)
}

function resolveCityCoordinates(city) {
  const normalized = String(city || '').toLowerCase()
  const matches = [
    { match: 'dubai', lat: 25.2048, lng: 55.2708 },
    { match: 'abu dhabi', lat: 24.4539, lng: 54.3773 },
    { match: 'united arab emirates', lat: 23.4241, lng: 53.8478 },
    { match: 'riyadh', lat: 24.7136, lng: 46.6753 },
    { match: 'saudi arabia', lat: 23.8859, lng: 45.0792 },
    { match: 'doha', lat: 25.2854, lng: 51.531 },
    { match: 'qatar', lat: 25.3548, lng: 51.1839 },
    { match: 'istanbul', lat: 41.0082, lng: 28.9784 },
    { match: 'cairo', lat: 30.0444, lng: 31.2357 },
    { match: 'egypt', lat: 26.8206, lng: 30.8025 },
    { match: 'paris', lat: 48.8566, lng: 2.3522 },
    { match: 'france', lat: 46.2276, lng: 2.2137 },
    { match: 'london', lat: 51.5072, lng: -0.1276 },
    { match: 'united kingdom', lat: 55.3781, lng: -3.436 },
    { match: 'berlin', lat: 52.52, lng: 13.405 },
    { match: 'amsterdam', lat: 52.3676, lng: 4.9041 },
    { match: 'netherlands', lat: 52.1326, lng: 5.2913 },
    { match: 'zurich', lat: 47.3769, lng: 8.5417 },
    { match: 'switzerland', lat: 46.8182, lng: 8.2275 },
    { match: 'rome', lat: 41.9028, lng: 12.4964 },
    { match: 'barcelona', lat: 41.3874, lng: 2.1686 },
    { match: 'spain', lat: 40.4637, lng: -3.7492 },
    { match: 'lisbon', lat: 38.7223, lng: -9.1393 },
    { match: 'portugal', lat: 39.3999, lng: -8.2245 },
    { match: 'new york', lat: 40.7128, lng: -74.006 },
    { match: 'toronto', lat: 43.6532, lng: -79.3832 },
    { match: 'canada', lat: 56.1304, lng: -106.3468 },
    { match: 'miami', lat: 25.7617, lng: -80.1918 },
    { match: 'san francisco', lat: 37.7749, lng: -122.4194 },
    { match: 'los angeles', lat: 34.0522, lng: -118.2437 },
    { match: 'united states', lat: 37.0902, lng: -95.7129 },
    { match: 'singapore', lat: 1.3521, lng: 103.8198 },
    { match: 'tokyo', lat: 35.6762, lng: 139.6503 },
    { match: 'japan', lat: 36.2048, lng: 138.2529 },
    { match: 'seoul', lat: 37.5665, lng: 126.978 },
    { match: 'south korea', lat: 35.9078, lng: 127.7669 },
    { match: 'hong kong', lat: 22.3193, lng: 114.1694 },
    { match: 'mumbai', lat: 19.076, lng: 72.8777 },
    { match: 'delhi', lat: 28.6139, lng: 77.209 },
    { match: 'bangalore', lat: 12.9716, lng: 77.5946 },
    { match: 'india', lat: 20.5937, lng: 78.9629 },
    { match: 'sydney', lat: -33.8688, lng: 151.2093 },
    { match: 'australia', lat: -25.2744, lng: 133.7751 },
    { match: 'cape town', lat: -33.9249, lng: 18.4241 },
    { match: 'south africa', lat: -30.5595, lng: 22.9375 },
  ]

  const found = matches.find((entry) => normalized.includes(entry.match))
  return found ? { lat: found.lat, lng: found.lng, source: 'seed' } : null
}

function getVisibleLocationGroups(today = todayStamp()) {
  const visibleRecords = getVisibleRecords(state.records, state.query, state.filter, today)
  return getCityGroups(visibleRecords, today)
}

function syncInteractiveMap() {
  const mapCanvas = document.querySelector('[data-map-canvas]')
  const workspaceMode = getWorkspaceMode()
  const L = window.L

  if (!(mapCanvas instanceof HTMLElement) || workspaceMode !== 'map' || !L) {
    return
  }

  if (rosterMap && rosterMap.getContainer() !== mapCanvas) {
    rosterMap.remove()
    rosterMap = null
    rosterMapMarkersLayer = null
    rosterMapTileLayers = {}
  }

  if (!rosterMap) {
    rosterMap = L.map(mapCanvas, {
      zoomControl: true,
      minZoom: 2,
      worldCopyJump: true,
    }).setView([20, 0], 2)

    rosterMapTileLayers = {
      dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
      }),
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
      }),
    }
    rosterMapMarkersLayer = L.layerGroup().addTo(rosterMap)
  } else {
    rosterMap.invalidateSize()
  }

  Object.entries(rosterMapTileLayers).forEach(([key, layer]) => {
    if (key === state.settings.mapLayer) {
      if (!rosterMap.hasLayer(layer)) {
        layer.addTo(rosterMap)
      }
    } else if (rosterMap.hasLayer(layer)) {
      rosterMap.removeLayer(layer)
    }
  })

  if (rosterMapMarkersLayer) {
    rosterMapMarkersLayer.clearLayers()
  }

  const today = todayStamp()
  const locationGroups = getVisibleLocationGroups(today)
  const bounds = []

  for (const group of locationGroups) {
    if (!group.coordinates?.lat || !group.coordinates?.lng) {
      queueGeocodeLocation(group.city)
      continue
    }

    const strongestTone = group.records
      .map((record) => getAttentionState(record, today).tone)
      .sort((first, second) => tonePriority(first) - tonePriority(second))[0]

    const primaryRecord = group.records[0]
    const marker = L.marker([group.coordinates.lat, group.coordinates.lng], {
      icon: L.divIcon({
        className: '',
        html: `
          <button class="map-pin map-pin--${strongestTone} ${primaryRecord.id === state.selectedId ? 'is-selected' : ''}" type="button">
            <span class="map-pin__pulse"></span>
            <span class="map-pin__count">${group.records.length}</span>
          </button>
        `,
        iconSize: [54, 54],
        iconAnchor: [27, 27],
      }),
    })

    marker.on('click', () => {
      selectRecord(primaryRecord.id)
    })

    marker.bindTooltip(`${group.city} · ${group.records.length} ${group.records.length === 1 ? 'person' : 'people'}`, {
      direction: 'top',
      offset: [0, -18],
      className: 'map-tooltip',
    })

    marker.addTo(rosterMapMarkersLayer)
    bounds.push([group.coordinates.lat, group.coordinates.lng])
  }

  if (bounds.length) {
    const latLngBounds = L.latLngBounds(bounds)
    const current = rosterMap.getBounds()
    if (!current.isValid() || !current.contains(latLngBounds)) {
      rosterMap.fitBounds(latLngBounds.pad(0.28), { animate: true, duration: 0.7 })
    }
  }
}

function fitRosterMapToVisiblePeople() {
  if (!rosterMap) {
    return
  }
  const groups = getVisibleLocationGroups()
  const bounds = groups
    .filter((group) => group.coordinates?.lat && group.coordinates?.lng)
    .map((group) => [group.coordinates.lat, group.coordinates.lng])
  if (bounds.length) {
    rosterMap.fitBounds(bounds, { padding: [36, 36], animate: true, duration: 0.75 })
  }
}

async function queueGeocodeLocation(location) {
  const label = normalizeLocationLabel(location).toLowerCase()
  if (!label || label === 'unmapped' || geocodePending.has(label) || geocodeCache[label]?.lat != null) {
    return
  }

  geocodePending.add(label)
  try {
    const response = await window.fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(location)}`, {
      headers: {
        Accept: 'application/json',
      },
    })
    if (!response.ok) {
      return
    }
    const results = await response.json()
    const result = Array.isArray(results) ? results[0] : null
    if (!result?.lat || !result?.lon) {
      return
    }
    geocodeCache[label] = {
      lat: Number(result.lat),
      lng: Number(result.lon),
      source: 'nominatim',
      label: result.display_name || location,
    }
    persistGeocodeCache()
    if (getWorkspaceMode() === 'map') {
      render({ preserveFocus: false })
    }
  } catch {
    // Ignore geocode failures; the map can still render known points.
  } finally {
    geocodePending.delete(label)
  }
}

function buildTimelineEvents(records, today) {
  const events = []

  for (const record of records) {
    const attention = getAttentionState(record, today)
    events.push({
      id: `${record.id}-next`,
      date: getNextTouchDate(record),
      label: attention.label,
      tone: attention.tone,
      title: 'Next touch scheduled',
      description: `${record.touchStyle} planned with a ${record.cadenceDays}-day rhythm.`,
      record,
    })

    events.push({
      id: `${record.id}-last`,
      date: record.lastContact,
      label: 'Last touch',
      tone: 'steady',
      title: 'Last contact',
      description: `Last touched via ${record.touchStyle}${record.city ? ` in ${record.city}` : ''}.`,
      record,
    })

    events.push({
      id: `${record.id}-created`,
      date: record.createdAt,
      label: 'Added',
      tone: 'steady',
      title: 'Added to Roster',
      description: `${record.name} was added to your roster with ${record.tags.length} ${record.tags.length === 1 ? 'tag' : 'tags'}.`,
      record,
    })

    for (const memory of record.memories.slice(0, 5)) {
      events.push({
        id: memory.id,
        date: memory.date,
        label: 'Memory',
        tone: 'soon',
        title: 'Memory captured',
        description: truncate(memory.text, 160),
        record,
      })
    }
  }

  return events
    .sort((first, second) => {
      const order = second.date.localeCompare(first.date)
      return state.sortDirection === 'asc' ? -order : order
    })
    .slice(0, 80)
}

function getAttentionState(record, today) {
  const nextTouch = getNextTouchDate(record)
  const daysUntil = differenceInDays(today, nextTouch)

  if (daysUntil < 0) {
    return {
      tone: 'overdue',
      label: `Overdue ${Math.abs(daysUntil)}d`,
      rank: 0,
      daysUntil,
    }
  }

  if (daysUntil <= 7) {
    return {
      tone: 'soon',
      label: daysUntil === 0 ? 'Due today' : `Due in ${daysUntil}d`,
      rank: 1,
      daysUntil,
    }
  }

  return {
    tone: 'steady',
    label: `On track ${daysUntil}d`,
    rank: 2,
    daysUntil,
  }
}

function getNextTouchDate(record) {
  return addDays(record.lastContact, record.cadenceDays)
}

function applySettings() {
  const workspaceMode = getWorkspaceMode()
  document.body.dataset.theme = state.settings.theme
  document.body.dataset.workspaceMode = workspaceMode
  document.body.classList.toggle('motion-off', !state.settings.motion)
  document.body.classList.toggle('dense-ui', !!state.settings.dense)
  document.body.classList.toggle('compact-view', !!state.settings.compact)
  document.body.classList.toggle('ultra-compact-view', workspaceMode === 'classic' && !!state.settings.ultraCompact)
  document.body.classList.toggle('tab-view', workspaceMode === 'tab')
  document.documentElement.style.setProperty('--frame-scale', String(state.settings.scale / 100))
}

function loadReminderLog() {
  try {
    const raw = window.localStorage.getItem(REMINDER_LOG_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function persistReminderLog() {
  window.localStorage.setItem(REMINDER_LOG_KEY, JSON.stringify(state.reminderLog))
}

function startReminderLoop() {
  if (reminderTimer) {
    window.clearInterval(reminderTimer)
    reminderTimer = null
  }

  if (!state.settings.reminders.enabled) {
    return
  }

  sendReminderDigest()
  reminderTimer = window.setInterval(() => {
    sendReminderDigest()
  }, 60 * 1000)
}

function sendReminderDigest({ force = false } = {}) {
  if (!state.settings.reminders.enabled && !force) {
    return
  }

  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') {
    return
  }

  const now = new Date()
  const hour = now.getHours()
  const today = todayStamp()
  if (!force && hour < state.settings.reminders.hour) {
    return
  }

  const activeRecords = state.records.filter((record) => !record.archived)
  const todayItems = getTodayReviewRecords(activeRecords, today)
  const weekItems = state.settings.reminders.range === 'week'
    ? getThisWeekReviewRecords(activeRecords, today, state.settings.reminders.birthdayLeadDays, state.settings.reminders.meetingLeadDays)
    : []
  const items = [...todayItems, ...weekItems].slice(0, 4)
  if (!items.length) {
    return
  }

  const digestKey = `${today}:${state.settings.reminders.range}`
  if (!force && state.reminderLog[digestKey]) {
    return
  }

  const lines = items.map(({ record, reason }) => `${record.name}: ${reason}`).join('\n')
  new Notification('Roster reminder', {
    body: lines,
    tag: `roster-digest-${digestKey}`,
  })

  state.reminderLog[digestKey] = new Date().toISOString()
  persistReminderLog()
}

function loadRecords() {
  try {
    const raw = window.localStorage.getItem(RECORDS_KEY)
    if (!raw) {
      return cloneInitialRecords()
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return cloneInitialRecords()
    }

    return parsed.map(standardizeRecord).filter(Boolean)
  } catch {
    return cloneInitialRecords()
  }
}

function loadSettings() {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY)
    if (!raw) {
      return normalizeSettings()
    }

    const parsed = JSON.parse(raw)
    return normalizeSettings(parsed)
  } catch {
    return normalizeSettings()
  }
}

function loadDrafts() {
  try {
    const raw = window.localStorage.getItem(DRAFTS_KEY)
    if (!raw) {
      return {}
    }

    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') {
      return {}
    }

    return Object.fromEntries(
      Object.entries(parsed)
        .filter(([, value]) => value && typeof value === 'object')
        .map(([key, value]) => [
          key,
          {
            tagDraft: String(value.tagDraft || ''),
            groupDraft: String(value.groupDraft || ''),
            relatedDraft: String(value.relatedDraft || ''),
            memoryDraft: {
              date: isValidStamp(value.memoryDraft?.date) ? value.memoryDraft.date : todayStamp(),
              text: String(value.memoryDraft?.text || ''),
            },
          },
        ]),
    )
  } catch {
    return {}
  }
}

function loadGeocodeCache() {
  try {
    const raw = window.localStorage.getItem(GEOCODE_CACHE_KEY)
    if (!raw) {
      return {}
    }
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function persistRecords() {
  window.localStorage.setItem(RECORDS_KEY, JSON.stringify(state.records))
}

function persistSettings() {
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings))
}

function persistDrafts() {
  window.localStorage.setItem(DRAFTS_KEY, JSON.stringify(state.drafts))
}

function persistGeocodeCache() {
  window.localStorage.setItem(GEOCODE_CACHE_KEY, JSON.stringify(geocodeCache))
}

function resetMemoryDraft() {
  state.memoryDraft = createEmptyMemoryDraft()
}

function resetTagDraft() {
  state.tagDraft = ''
}

function resetGroupDraft() {
  state.groupDraft = ''
}

function resetRelatedDraft() {
  state.relatedDraft = ''
}

function createEmptyMemoryDraft() {
  return {
    date: todayStamp(),
    text: '',
  }
}

function createEmptyContactCard() {
  return {
    email: '',
    phone: '',
    whatsapp: '',
    telegram: '',
    linkedin: '',
    instagram: '',
    snapchat: '',
    tiktok: '',
    x: '',
    website: '',
    company: '',
    birthday: '',
    address: '',
  }
}

function saveDraftsForSelected() {
  if (!state.selectedId) {
    return
  }

  state.drafts[state.selectedId] = {
    tagDraft: state.tagDraft,
    groupDraft: state.groupDraft,
    relatedDraft: state.relatedDraft,
    memoryDraft: { ...state.memoryDraft },
  }
  persistDrafts()
}

function restoreDraftsForSelected(id) {
  const saved = id ? state.drafts[id] : null
  state.tagDraft = saved ? String(saved.tagDraft || '') : ''
  state.groupDraft = saved ? String(saved.groupDraft || '') : ''
  state.relatedDraft = saved ? String(saved.relatedDraft || '') : ''
  state.memoryDraft = saved
    ? {
        date: isValidStamp(saved.memoryDraft?.date) ? saved.memoryDraft.date : todayStamp(),
        text: String(saved.memoryDraft?.text || ''),
      }
    : createEmptyMemoryDraft()
}

function clearDraftsForRecord(id) {
  if (!id) {
    return
  }

  delete state.drafts[id]
  persistDrafts()
}

function normalizeSettings(value = {}) {
  const defaults = value.defaults && typeof value.defaults === 'object' ? value.defaults : {}
  const customTouchStyles = Array.isArray(value.customTouchStyles)
    ? value.customTouchStyles
    : typeof value.customTouchStyles === 'string'
      ? value.customTouchStyles.split(',')
      : []
  const customTiers = Array.isArray(value.customTiers) ? value.customTiers : []
  const resolvedTierDefinitions = resolveTierDefinitions(customTiers)
  const resolvedTierKeys = resolvedTierDefinitions.map((tier) => tier.key)
  const resolvedTouchStyles = resolveTouchStyles(customTouchStyles, [defaults.touchStyle])
  const featureDefaults = defaultSettings.features
  const featureFlags = value.features && typeof value.features === 'object' ? value.features : {}

  const workspaceMode = workspaceModes.includes(value.workspaceMode)
    ? value.workspaceMode
    : value.tabView
      ? 'tab'
      : defaultSettings.workspaceMode

  return {
    theme: themeOptions.some((theme) => theme.value === value.theme) ? value.theme : defaultSettings.theme,
    motion: typeof value.motion === 'boolean' ? value.motion : defaultSettings.motion,
    dense: typeof value.dense === 'boolean' ? value.dense : defaultSettings.dense,
    hints: typeof value.hints === 'boolean' ? value.hints : defaultSettings.hints,
    compact: typeof value.compact === 'boolean' ? value.compact : defaultSettings.compact,
    ultraCompact: typeof value.ultraCompact === 'boolean' ? value.ultraCompact : defaultSettings.ultraCompact,
    leftRailVisible: typeof value.leftRailVisible === 'boolean' ? value.leftRailVisible : defaultSettings.leftRailVisible,
    rightRailVisible: typeof value.rightRailVisible === 'boolean' ? value.rightRailVisible : defaultSettings.rightRailVisible,
    workspaceMode,
    tabLayout: ['cards', 'kanban'].includes(value.tabLayout) ? value.tabLayout : defaultSettings.tabLayout,
    mapLayer: ['dark', 'satellite'].includes(value.mapLayer) ? value.mapLayer : defaultSettings.mapLayer,
    tabView: workspaceMode === 'tab',
    scale: clamp(Number(value.scale) || defaultSettings.scale, 60, 100),
    customTouchStyles: resolvedTouchStyles.filter((style) => !baseTouchStyles.includes(style)),
    customTiers: resolvedTierDefinitions.filter((tier) => !baseTierDefinitions.some((base) => base.key === tier.key)),
    features: {
      sidebarViews: typeof featureFlags.sidebarViews === 'boolean' ? featureFlags.sidebarViews : featureDefaults.sidebarViews,
      sidebarToday: typeof featureFlags.sidebarToday === 'boolean' ? featureFlags.sidebarToday : featureDefaults.sidebarToday,
      sidebarTiers: typeof featureFlags.sidebarTiers === 'boolean' ? featureFlags.sidebarTiers : featureDefaults.sidebarTiers,
      sidebarGroups: typeof featureFlags.sidebarGroups === 'boolean' ? featureFlags.sidebarGroups : featureDefaults.sidebarGroups,
      sidebarTags: typeof featureFlags.sidebarTags === 'boolean' ? featureFlags.sidebarTags : featureDefaults.sidebarTags,
      sidebarQueue: typeof featureFlags.sidebarQueue === 'boolean' ? featureFlags.sidebarQueue : featureDefaults.sidebarQueue,
      compactToggle: typeof featureFlags.compactToggle === 'boolean' ? featureFlags.compactToggle : featureDefaults.compactToggle,
      tabViewToggle: typeof featureFlags.tabViewToggle === 'boolean' ? featureFlags.tabViewToggle : featureDefaults.tabViewToggle,
      shortcutDock: typeof featureFlags.shortcutDock === 'boolean' ? featureFlags.shortcutDock : featureDefaults.shortcutDock,
    },
    reminders: {
      enabled: typeof value.reminders?.enabled === 'boolean' ? value.reminders.enabled : defaultSettings.reminders.enabled,
      range: ['today', 'week'].includes(value.reminders?.range) ? value.reminders.range : defaultSettings.reminders.range,
      hour: clamp(Number(value.reminders?.hour) || defaultSettings.reminders.hour, 0, 23),
      birthdayLeadDays: clamp(Number(value.reminders?.birthdayLeadDays) || defaultSettings.reminders.birthdayLeadDays, 0, 30),
      meetingLeadDays: clamp(Number(value.reminders?.meetingLeadDays) || defaultSettings.reminders.meetingLeadDays, 0, 14),
    },
    defaults: {
      tier: resolvedTierKeys.includes(defaults.tier) ? defaults.tier : defaultContactSettings.tier,
      touchStyle: resolvedTouchStyles.includes(normalizeTouchStyle(defaults.touchStyle))
        ? normalizeTouchStyle(defaults.touchStyle)
        : defaultContactSettings.touchStyle,
      cadenceDays: Math.max(1, Number(defaults.cadenceDays) || defaultContactSettings.cadenceDays),
      bondHealth: clamp(Number(defaults.bondHealth) || defaultContactSettings.bondHealth, 0, 100),
      city: String(defaults.city || defaultContactSettings.city),
      tags: Array.isArray(defaults.tags)
        ? defaults.tags.map((tag) => normalizeTag(tag)).filter(Boolean)
        : typeof defaults.tags === 'string'
          ? defaults.tags
              .split(',')
              .map((tag) => normalizeTag(tag))
              .filter(Boolean)
          : defaultContactSettings.tags.slice(),
      groups: Array.isArray(defaults.groups)
        ? defaults.groups.map((group) => normalizeGroup(group)).filter(Boolean)
        : typeof defaults.groups === 'string'
          ? defaults.groups
              .split(',')
              .map((group) => normalizeGroup(group))
              .filter(Boolean)
          : defaultContactSettings.groups.slice(),
    },
    tutorialSeen: typeof value.tutorialSeen === 'boolean' ? value.tutorialSeen : defaultSettings.tutorialSeen,
  }
}

function cloneInitialRecords() {
  return initialRecords.map((record) => ({
    ...record,
    tags: record.tags.slice(),
    groups: record.groups.slice(),
    relatedIds: record.relatedIds.slice(),
    contact: { ...record.contact },
    memories: record.memories.map((memory) => ({ ...memory })),
  }))
}

function createSeedMemory(daysOffset, text) {
  return {
    id: makeId(),
    date: addDays(todayStamp(), daysOffset),
    text: String(text || '').trim(),
  }
}

function createSeedRecord({
  name,
  tier,
  lastContactOffsetDays = -7,
  cadenceDays,
  tags = [],
  city = '',
  groups = [],
  createdOffsetDays = -15,
  touchStyle = '',
  bondHealth = null,
  focus = '',
  notes = '',
  relatedIds = [],
  avatar = '',
  contact = {},
  memories = [],
}) {
  return {
    id: slugify(name),
    name,
    archived: false,
    tier,
    city,
    createdAt: addDays(todayStamp(), createdOffsetDays),
    lastContact: addDays(todayStamp(), lastContactOffsetDays),
    cadenceDays,
    touchStyle: touchStyle || (tier === 'inner-circle' ? 'Call' : tier === 'close' ? 'Coffee' : 'Text'),
    bondHealth:
      typeof bondHealth === 'number'
        ? clamp(bondHealth, 0, 100)
        : tier === 'inner-circle'
          ? 88
          : tier === 'close'
            ? 78
            : tier === 'medium'
              ? 66
              : 54,
    focus,
    notes,
    tags,
    groups,
    relatedIds,
    avatar,
    contact: {
      ...createEmptyContactCard(),
      ...contact,
    },
    memories: memories.map((memory) => ({ ...memory })),
  }
}

function summaryTile(label, value, detail) {
  return `
    <div class="summary-tile">
      <span>${label}</span>
      ${buildAnimatedValue(String(value), `summary-${slugify(label)}`, { tag: 'strong', className: 'summary-value animated-value--large' })}
      <small>${detail}</small>
    </div>
  `
}

function filterButton(key, label, note, count) {
  const filterKeyHints = {
    all: '1',
    'needs-attention': '2',
    'inner-circle': '3',
    close: '4',
    medium: '5',
    acquaintance: '6',
  }

  return `
    <button class="filter-button ${state.filter === key ? 'active' : ''}" data-filter="${key}" ${keyHintAttrs(filterKeyHints[key] || '')}>
      <span>
        <strong>${label}</strong>
        <small>${note}</small>
      </span>
      <em>${buildAnimatedValue(String(count), `filter-${key}-count`, { tag: 'span', className: 'filter-count' })}</em>
    </button>
  `
}

function getViewTitle(filter) {
  if (filter === 'all') return 'All contacts'
  if (filter === 'needs-attention') return 'Reach out'
  if (filter === 'archived') return 'Archive'
  if (tierMeta[filter]) return tierMeta[filter].label
  return 'Roster'
}

function metricCard(label, value, tone, detail = '') {
  return `
    <div class="metric-card">
      <span>${label}</span>
      ${buildAnimatedValue(String(value), `metric-${slugify(label)}`, { tag: 'strong', className: `${tone ? `metric-value tone-${tone}` : ''}`.trim() })}
      ${detail ? `<small>${detail}</small>` : ''}
    </div>
  `
}

function buildAnimatedValue(value, key, options = {}) {
  const { tag = 'span', className = '' } = options
  const display = String(value)
  const previousDisplay = animatedValueHistory.get(key) || display
  animatedValueHistory.set(key, display)
  const stableClass = previousDisplay === display ? 'is-static' : ''

  return `
    <${tag} class="animated-value ${className} ${stableClass}" aria-label="${escapeAttribute(display)}">
      <span class="animated-value__current">${escapeHtml(display)}</span>
      ${previousDisplay === display ? '' : `<span class="animated-value__previous" aria-hidden="true">${escapeHtml(previousDisplay)}</span>`}
    </${tag}>
  `
}

function buildAnimatedText(value, key, options = {}) {
  const { tag = 'span', className = '' } = options
  const display = String(value || '')
  const previousDisplay = animatedTextHistory.get(key) || display
  animatedTextHistory.set(key, display)
  const stableClass = previousDisplay === display ? 'is-static' : ''

  return `
    <${tag} class="animated-text ${className} ${stableClass}" aria-label="${escapeAttribute(display)}">
      <span class="animated-text__current">${escapeHtml(display)}</span>
      ${previousDisplay === display ? '' : `<span class="animated-text__previous" aria-hidden="true">${escapeHtml(previousDisplay)}</span>`}
    </${tag}>
  `
}

function filterLabel(filter) {
  if (filter === 'all') {
    return 'All people'
  }

  if (filter === 'needs-attention') {
    return 'Needs attention'
  }

  if (filter === 'archived') {
    return 'Archived'
  }

  return tierMeta[filter].label
}

function truncate(value, maxLength) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value
}

function slugify(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function normalizeTouchStyle(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
}

function resolveTouchStyles(customStyles = [], extraStyles = []) {
  const styles = new Map()

  ;[...baseTouchStyles, ...customStyles, ...extraStyles]
    .map((style) => normalizeTouchStyle(style))
    .filter(Boolean)
    .forEach((style) => {
      const key = style.toLowerCase()
      if (!styles.has(key)) {
        styles.set(key, style)
      }
    })

  return Array.from(styles.values())
}

function getTouchStyles(extraStyles = []) {
  return resolveTouchStyles(state.settings.customTouchStyles || [], Array.isArray(extraStyles) ? extraStyles : [extraStyles])
}

function hydrateCaptureIntent() {
  const params = new URLSearchParams(window.location.search)
  const capture = params.get('capture')
  if (capture && ['memory', 'tag', 'touch'].includes(capture)) {
    state.quickCaptureOpen = true
    state.quickCaptureMode = capture
  }
}

function addDays(stamp, days) {
  const date = parseStamp(stamp)
  date.setDate(date.getDate() + days)
  return formatStamp(date)
}

function differenceInDays(start, end) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  const delta = parseStamp(end).getTime() - parseStamp(start).getTime()
  return Math.round(delta / millisecondsPerDay)
}

function parseStamp(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function formatStamp(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatShortDate(value) {
  return shortDate.format(parseStamp(value))
}

function formatLongDate(value) {
  return longDate.format(parseStamp(value))
}

function formatCompactDate(value) {
  return compactDate.format(parseStamp(value))
}

function formatReconnectTiming(daysUntil) {
  if (daysUntil < 0) {
    return 'Reconnect now'
  }

  if (daysUntil === 0) {
    return 'Reconnect today'
  }

  return `Reconnect in ${daysUntil} day${daysUntil === 1 ? '' : 's'}`
}

function todayStamp() {
  return formatStamp(new Date())
}

function getBirthdayState(record, today) {
  const birthday = String(record.contact?.birthday || '')
  if (!isValidStamp(birthday)) {
    return null
  }

  const [, month, day] = birthday.split('-')
  const [currentYear] = today.split('-')
  let nextBirthday = `${currentYear}-${month}-${day}`
  if (nextBirthday < today) {
    nextBirthday = `${Number(currentYear) + 1}-${month}-${day}`
  }
  const daysUntil = differenceInDays(today, nextBirthday)
  return {
    daysUntil,
    date: nextBirthday,
  }
}

function getTodayReviewRecords(records, today) {
  return records
    .map((record) => {
      const attention = getAttentionState(record, today)
      const birthday = getBirthdayState(record, today)

      if (attention.daysUntil <= 0) {
        return { record, rank: 0, reason: 'Reconnect now' }
      }

      if (birthday && birthday.daysUntil <= 14) {
        return { record, rank: 1, reason: birthday.daysUntil === 0 ? 'Birthday today' : `Birthday in ${birthday.daysUntil}d` }
      }

      if (attention.daysUntil <= 7) {
        return { record, rank: 2, reason: `Due in ${attention.daysUntil}d` }
      }

      return null
    })
    .filter(Boolean)
    .sort((first, second) => first.rank - second.rank || compareRecords(first.record, second.record, today))
}

function getThisWeekReviewRecords(records, today, birthdayLeadDays = 7, meetingLeadDays = 1) {
  return records
    .map((record) => {
      const attention = getAttentionState(record, today)
      const birthday = getBirthdayState(record, today)

      if (attention.daysUntil > 0 && attention.daysUntil <= meetingLeadDays) {
        return { record, rank: 0, reason: `Prep brief ${attention.daysUntil}d before` }
      }

      if (attention.daysUntil > 0 && attention.daysUntil <= 14) {
        return { record, rank: 1, reason: `Reconnect in ${attention.daysUntil}d` }
      }

      if (birthday && birthday.daysUntil > 0 && birthday.daysUntil <= birthdayLeadDays) {
        return { record, rank: 2, reason: `Birthday in ${birthday.daysUntil}d` }
      }

      return null
    })
    .filter(Boolean)
    .sort((first, second) => first.rank - second.rank || compareRecords(first.record, second.record, today))
}

function makeId() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID()
  }

  return `friend-${Math.random().toString(36).slice(2, 10)}`
}

function isTypingTarget(target) {
  return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement
}

function getTagSuggestions(record, draft) {
  const pool = Array.from(
    new Set([
      ...suggestedTags,
      ...state.records.flatMap((entry) => entry.tags),
    ]),
  )

  const normalizedDraft = normalizeTag(draft)
  const existing = new Set(record.tags.map((tag) => String(tag || '').toLowerCase()))

  return pool
    .map((tag) => String(tag || '').toLowerCase())
    .filter((tag) => !existing.has(tag))
    .filter((tag) => (normalizedDraft ? tag.includes(normalizedDraft) : true))
    .slice(0, normalizedDraft ? 8 : 6)
}

function statusHeadline(attention) {
  if (attention.tone === 'overdue') {
    return 'Needs a check-in now'
  }

  if (attention.tone === 'soon') {
    return 'Next touch is coming up'
  }

  return 'Relationship is on track'
}

function buildMemoryFile() {
  return {
    format: 'friends-circle-memory-file',
    version: 4,
    exportedAt: new Date().toISOString(),
    readme: 'Human-readable memory file for Roster.',
    workspace: {
      theme: state.settings.theme,
      customTouchStyles: state.settings.customTouchStyles,
      reminders: state.settings.reminders,
      defaults: state.settings.defaults,
    },
    instructions: [
      'Each person is grouped into profile, contactCard, connectionPlan, relationship, groups, tags, relatedIds, and memories.',
      'Dates use the YYYY-MM-DD format so they stay editable in plain text.',
      'Importing this file replaces the current roster in the app unless you choose merge.',
    ],
    people: state.records.map((record) => ({
      summary: `${record.name} sits in ${tierMeta[record.tier].label}. Next touch is ${getNextTouchDate(record)} via ${record.touchStyle}.`,
      profile: {
        id: record.id,
        name: record.name,
        tierKey: record.tier,
        tierLabel: tierMeta[record.tier].label,
        city: record.city,
        createdAt: record.createdAt,
        avatar: record.avatar,
      },
      contactCard: {
        ...record.contact,
      },
      connectionPlan: {
        touchStyle: record.touchStyle,
        cadenceDays: record.cadenceDays,
        lastContact: record.lastContact,
        nextTouchDate: getNextTouchDate(record),
      },
      relationship: {
        bondHealth: record.bondHealth,
        focus: record.focus,
        notes: record.notes,
      },
      groups: record.groups,
      tags: record.tags,
      relatedIds: record.relatedIds,
      memories: record.memories.map((memory) => ({
        date: memory.date,
        text: memory.text,
      })),
    })),
  }
}

function parseMemoryFile(parsed) {
  const people = Array.isArray(parsed.people)
    ? parsed.people
    : Array.isArray(parsed.records)
      ? parsed.records
      : Array.isArray(parsed)
        ? parsed
        : null

  if (!people) {
    throw new Error('Expected a people array in the import file.')
  }

  return people.map(standardizeRecord).filter(Boolean)
}

function extractImportedSettings(parsed) {
  const workspace = parsed && typeof parsed.workspace === 'object' ? parsed.workspace : {}
  const settings = parsed && typeof parsed.settings === 'object' ? parsed.settings : {}
  const candidate = {
    theme: workspace.theme || settings.theme,
    customTouchStyles: workspace.customTouchStyles || settings.customTouchStyles,
    reminders: workspace.reminders || settings.reminders,
    defaults: workspace.defaults || settings.defaults,
  }

  if (!candidate.theme && !candidate.defaults && !candidate.customTouchStyles && !candidate.reminders) {
    return null
  }

  return candidate
}

function parseCsvText(text) {
  const rows = []
  let currentRow = []
  let currentValue = ''
  let insideQuotes = false

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index]
    const next = text[index + 1]

    if (character === '"') {
      if (insideQuotes && next === '"') {
        currentValue += '"'
        index += 1
      } else {
        insideQuotes = !insideQuotes
      }
      continue
    }

    if (character === ',' && !insideQuotes) {
      currentRow.push(currentValue)
      currentValue = ''
      continue
    }

    if ((character === '\n' || character === '\r') && !insideQuotes) {
      if (character === '\r' && next === '\n') {
        index += 1
      }
      currentRow.push(currentValue)
      rows.push(currentRow)
      currentRow = []
      currentValue = ''
      continue
    }

    currentValue += character
  }

  if (currentValue || currentRow.length) {
    currentRow.push(currentValue)
    rows.push(currentRow)
  }

  if (!rows.length) {
    return []
  }

  const headers = rows[0].map((header) => String(header || '').trim())
  return rows
    .slice(1)
    .filter((row) => row.some((value) => String(value || '').trim()))
    .map((row) => Object.fromEntries(headers.map((header, index) => [header, String(row[index] || '')])))
}

function getCsvFieldTargets() {
  return [
    { key: 'ignore', label: 'Ignore' },
    { key: 'name', label: 'Full name' },
    { key: 'givenName', label: 'Given name' },
    { key: 'familyName', label: 'Family name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'phoneSecondary', label: 'Secondary phone' },
    { key: 'website', label: 'Website' },
    { key: 'websiteSource', label: 'Source / website label' },
    { key: 'groupMembership', label: 'Group membership' },
    { key: 'city', label: 'City' },
    { key: 'birthday', label: 'Birthday' },
    { key: 'company', label: 'Company' },
    { key: 'title', label: 'Title' },
    { key: 'address', label: 'Address' },
    { key: 'notes', label: 'Notes' },
    { key: 'externalId', label: 'External ID' },
    { key: 'externalSource', label: 'External source' },
  ]
}

function inferCsvMapping(headers) {
  return Object.fromEntries(
    headers.map((header) => {
      const normalized = header.toLowerCase()
      let target = 'ignore'

      if (normalized === 'name' || normalized.includes('full name')) target = 'name'
      else if (normalized.includes('given')) target = 'givenName'
      else if (normalized.includes('family') || normalized.includes('last name')) target = 'familyName'
      else if (normalized.includes('e-mail') || normalized === 'email' || normalized.includes('email')) target = 'email'
      else if (normalized.includes('phone 1') || normalized === 'phone' || normalized.includes('mobile')) target = 'phone'
      else if (normalized.includes('phone 2') || normalized.includes('secondary phone')) target = 'phoneSecondary'
      else if (normalized.includes('website') && normalized.includes('type')) target = 'websiteSource'
      else if (normalized.includes('website')) target = 'website'
      else if (normalized.includes('group')) target = 'groupMembership'
      else if (normalized.includes('city')) target = 'city'
      else if (normalized.includes('birthday')) target = 'birthday'
      else if (normalized.includes('organization name') || normalized === 'company') target = 'company'
      else if (normalized.includes('organization title') || normalized === 'title') target = 'title'
      else if (normalized.includes('formatted') || normalized.includes('address')) target = 'address'
      else if (normalized === 'notes' || normalized.includes('note')) target = 'notes'
      else if (normalized.includes('external id') && normalized.includes('type')) target = 'externalSource'
      else if (normalized.includes('external id')) target = 'externalId'

      return [header, target]
    }),
  )
}

function mapCsvRowToRecord(row, mapping = inferCsvMapping(Object.keys(row || {}))) {
  const valueFor = (target) =>
    Object.entries(mapping)
      .filter(([, mappedTarget]) => mappedTarget === target)
      .map(([header]) => row[header])
      .filter(Boolean)
  const given = cleanImportValue(valueFor('givenName')[0])
  const family = cleanImportValue(valueFor('familyName')[0])
  const name = cleanImportValue(valueFor('name')[0]) || cleanImportValue(`${given} ${family}`) || firstDelimitedValue(valueFor('phone')[0]) || firstDelimitedValue(valueFor('email')[0])

  if (!name) {
    return null
  }

  const groupMembership = cleanImportValue(valueFor('groupMembership')[0])
  const tier = inferTier(groupMembership)
  const city = cleanImportValue(valueFor('city')[0])
  const emailValues = valueFor('email').flatMap((value) => parseTripleDelimitedValues(value))
  const phoneValues = valueFor('phone').concat(valueFor('phoneSecondary')).flatMap((value) => parseTripleDelimitedValues(value))
  const websiteType = cleanImportValue(valueFor('websiteSource')[0])
  const websiteValue = cleanImportValue(valueFor('website')[0])
  const birthday = normalizeImportedDate(valueFor('birthday')[0])
  const organizationName = cleanImportValue(valueFor('company')[0])
  const organizationTitle = cleanImportValue(valueFor('title')[0])
  const address = cleanImportValue(valueFor('address')[0])
  const sourceName = websiteType || cleanImportValue(valueFor('externalSource')[0])
  const importedGroups = extractImportedGroups(groupMembership)

  const notesParts = [
    cleanImportValue(valueFor('notes')[0]),
    birthday ? `Birthday: ${birthday}` : '',
    organizationName || organizationTitle
      ? `Organization: ${[organizationName, organizationTitle].filter(Boolean).join(' · ')}`
      : '',
    emailValues.length ? `Email: ${emailValues.join(' · ')}` : '',
    phoneValues.length ? `Phone: ${phoneValues.join(' · ')}` : '',
    address ? `Address: ${address}` : '',
    websiteValue ? `Website: ${websiteValue}` : '',
    sourceName ? `Imported from: ${sourceName}` : '',
  ].filter(Boolean)

  const tags = Array.from(
    new Set([
      ...extractGroupTags(groupMembership),
      ...parseTripleDelimitedValues(sourceName).map((value) => normalizeTag(value)),
    ].filter(Boolean)),
  )

  return standardizeRecord({
    id: cleanImportValue(valueFor('externalId')[0]) || slugify(name),
    name,
    tier,
    city,
    createdAt: todayStamp(),
    lastContact: todayStamp(),
    cadenceDays: defaultCadenceForTier(tier),
    touchStyle: defaultTouchStyleForTier(tier),
    bondHealth: defaultBondHealthForTier(tier),
    notes: notesParts.join('\n'),
    tags,
    groups: importedGroups,
    relatedIds: [],
    avatar: '',
    contact: {
      ...createEmptyContactCard(),
      email: emailValues[0] || '',
      phone: phoneValues[0] || '',
      whatsapp: phoneValues[0] || '',
      website: websiteValue || '',
      company: organizationName || organizationTitle || '',
      birthday: birthday || '',
      address: address || '',
    },
    memories: [],
    archived: false,
  })
}

function cleanImportValue(value) {
  return String(value || '').replace(/\s+/g, ' ').trim()
}

function normalizeImportedDate(value) {
  const cleaned = cleanImportValue(value)
  if (!cleaned) {
    return ''
  }

  if (isValidStamp(cleaned)) {
    return cleaned
  }

  const parsed = new Date(cleaned)
  if (Number.isNaN(parsed.getTime())) {
    return ''
  }

  return formatStamp(parsed)
}

function parseTripleDelimitedValues(value) {
  return String(value || '')
    .split(':::')
    .map((item) => cleanImportValue(item))
    .filter(Boolean)
}

function firstDelimitedValue(value) {
  return parseTripleDelimitedValues(value)[0] || ''
}

function extractGroupTags(groupMembership) {
  return parseTripleDelimitedValues(groupMembership)
    .map((value) => value.replace(/^\*/, '').trim())
    .map((value) => normalizeTag(value))
    .filter((value) => value && !['inner-circle', 'close', 'medium', 'acquaintance', 'mycontacts'].includes(value))
}

function extractImportedGroups(groupMembership) {
  return parseTripleDelimitedValues(groupMembership)
    .map((value) => value.replace(/^\*/, '').trim())
    .map((value) => normalizeGroup(value))
    .filter((value) => value && !['inner-circle', 'close', 'medium', 'acquaintance', 'mycontacts'].includes(value))
}
function defaultCadenceForTier(tier) {
  if (tier === 'inner-circle') return 7
  if (tier === 'close') return 14
  if (tier === 'medium') return 21
  return 45
}

function defaultTouchStyleForTier(tier) {
  if (tier === 'inner-circle') return 'Call'
  if (tier === 'close') return 'Coffee'
  return 'Text'
}

function defaultBondHealthForTier(tier) {
  if (tier === 'inner-circle') return 88
  if (tier === 'close') return 78
  if (tier === 'medium') return 66
  return 54
}

function buildActivityImportReviewState(fileName, text) {
  const events = fileName.toLowerCase().endsWith('.ics')
    ? parseIcsEvents(text)
    : parseActivityRows(parseCsvText(text))

  return {
    fileName,
    events,
    matches: matchActivitiesToRecords(events),
  }
}

function parseActivityRows(rows) {
  return rows
    .map((row) => {
      const entries = Object.entries(row)
      const findBy = (...patterns) =>
        entries.find(([header]) => patterns.some((pattern) => header.toLowerCase().includes(pattern)))?.[1] || ''
      const date = normalizeImportedDate(findBy('date', 'time', 'timestamp', 'start'))
      const name = cleanImportValue(findBy('name', 'contact', 'person'))
      const email = cleanImportValue(findBy('email'))
      const phone = cleanImportValue(findBy('phone'))
      const source = cleanImportValue(findBy('source', 'channel', 'app')) || 'activity import'
      const note = cleanImportValue(findBy('subject', 'title', 'message', 'summary', 'notes'))
      if (!date || (!name && !email && !phone)) {
        return null
      }
      return { date, name, email, phone, source, note }
    })
    .filter(Boolean)
}

function parseIcsEvents(text) {
  const blocks = String(text || '').split('BEGIN:VEVENT').slice(1)
  return blocks
    .map((block) => {
      const lines = block.split(/\r?\n/)
      const getLineValue = (prefixes) => {
        const line = lines.find((entry) => prefixes.some((prefix) => entry.startsWith(prefix)))
        return line ? line.split(':').slice(1).join(':') : ''
      }
      const rawDate = getLineValue(['DTSTART', 'DTSTART;VALUE=DATE'])
      const date = normalizeImportedDate(rawDate.replace(/^(\d{4})(\d{2})(\d{2}).*$/, '$1-$2-$3'))
      const note = cleanImportValue(getLineValue(['SUMMARY', 'DESCRIPTION']))
      const attendees = lines
        .filter((line) => line.startsWith('ATTENDEE') || line.startsWith('ORGANIZER'))
        .map((line) => line.split(':').slice(1).join(':'))
        .join(' ')
      const emailMatch = attendees.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
      const name = cleanImportValue(note.replace(/https?:\/\/\S+/g, ''))
      if (!date || (!name && !emailMatch)) {
        return null
      }
      return {
        date,
        name,
        email: emailMatch ? emailMatch[0] : '',
        phone: '',
        source: 'calendar',
        note,
      }
    })
    .filter(Boolean)
}

function matchActivitiesToRecords(events) {
  return state.records
    .filter((record) => !record.archived)
    .map((record) => {
      const matches = events.filter((event) => activityMatchesRecord(event, record))
      if (!matches.length) {
        return null
      }
      const latest = matches.slice().sort((first, second) => second.date.localeCompare(first.date))[0]
      const sources = Array.from(new Set(matches.map((match) => match.source || 'activity import')))
      return {
        record,
        latestDate: latest.date,
        sources,
        reason: latest.note || `Matched ${matches.length} imported activit${matches.length === 1 ? 'y' : 'ies'}.`,
      }
    })
    .filter(Boolean)
}

function activityMatchesRecord(event, record) {
  const normalizedEventName = normalizePersonKey(event.name)
  const normalizedRecordName = normalizePersonKey(record.name)
  const eventEmail = String(event.email || '').toLowerCase()
  const recordEmail = String(record.contact?.email || '').toLowerCase()
  const eventPhone = String(event.phone || '').replace(/\D+/g, '')
  const recordPhone = String(record.contact?.phone || '').replace(/\D+/g, '')

  if (eventEmail && recordEmail && eventEmail === recordEmail) {
    return true
  }

  if (eventPhone && recordPhone && eventPhone === recordPhone) {
    return true
  }

  if (normalizedEventName && normalizedRecordName && (normalizedEventName.includes(normalizedRecordName) || normalizedRecordName.includes(normalizedEventName))) {
    return true
  }

  return false
}

function standardizeRecord(record) {
  if (!record || typeof record !== 'object') {
    return null
  }

  const profile = record.profile && typeof record.profile === 'object' ? record.profile : {}
  const connectionPlan =
    record.connectionPlan && typeof record.connectionPlan === 'object' ? record.connectionPlan : {}
  const relationship =
    record.relationship && typeof record.relationship === 'object' ? record.relationship : {}
  const contactCard =
    record.contactCard && typeof record.contactCard === 'object'
      ? record.contactCard
      : record.contact && typeof record.contact === 'object'
        ? record.contact
        : {}

  const name = String(record.name || profile.name || '').trim()
  if (!name) {
    return null
  }

  const tierCandidate = [record.tier, record.tierKey, profile.tierKey]
    .map((value) => normalizeTierKey(value))
    .find(Boolean)
  const tier = tierCandidate || inferTier(profile.tierLabel || profile.tier || record.tierLabel || record.tier)

  return {
    id: String(record.id || profile.id || slugify(name) || makeId()),
    name,
    archived: Boolean(record.archived),
    tier,
    city: String(record.city || profile.city || ''),
    createdAt: isValidStamp(record.createdAt || profile.createdAt)
      ? String(record.createdAt || profile.createdAt)
      : todayStamp(),
    lastContact: isValidStamp(record.lastContact || connectionPlan.lastContact)
      ? String(record.lastContact || connectionPlan.lastContact)
      : todayStamp(),
    cadenceDays: Math.max(1, Number(record.cadenceDays ?? connectionPlan.cadenceDays) || 21),
    touchStyle: normalizeTouchStyle(record.touchStyle || connectionPlan.touchStyle) || 'Text',
    bondHealth: clamp(Number(record.bondHealth ?? relationship.bondHealth) || 70, 0, 100),
    focus: String(record.focus || relationship.focus || ''),
    notes: String(record.notes || relationship.notes || ''),
    tags: Array.isArray(record.tags)
      ? record.tags.map((tag) => normalizeTag(tag)).filter(Boolean)
      : [],
    groups: Array.isArray(record.groups)
      ? record.groups.map((group) => normalizeGroup(group)).filter(Boolean)
      : [],
    relatedIds: Array.isArray(record.relatedIds)
      ? record.relatedIds.map((id) => String(id)).filter(Boolean)
      : [],
    avatar: String(record.avatar || profile.avatar || ''),
    contact: {
      ...createEmptyContactCard(),
      ...Object.fromEntries(Object.entries(contactCard).map(([key, value]) => [key, String(value || '')])),
    },
    memories: Array.isArray(record.memories)
      ? record.memories
          .map((memory) => ({
            id: String(memory.id || makeId()),
            date: isValidStamp(memory.date) ? memory.date : todayStamp(),
            text: String(memory.text || '').trim(),
          }))
          .filter((memory) => memory.text)
      : [],
  }
}
function mergeImportedRecords(currentRecords, importedRecords) {
  const merged = currentRecords.map((record) => standardizeRecord(record)).filter(Boolean)

  for (const imported of importedRecords) {
    const normalizedImported = standardizeRecord(imported)
    if (!normalizedImported) {
      continue
    }

    const matchIndex = merged.findIndex(
      (existing) =>
        existing.id === normalizedImported.id ||
        normalizePersonKey(existing.name) === normalizePersonKey(normalizedImported.name),
    )

    if (matchIndex === -1) {
      merged.push(normalizedImported)
      continue
    }

    merged[matchIndex] = mergeRecordData(merged[matchIndex], normalizedImported)
  }

  return merged.sort((first, second) => first.name.localeCompare(second.name))
}

function mergeRecordData(currentRecord, importedRecord) {
  const tags = Array.from(
    new Set([...currentRecord.tags, ...importedRecord.tags].map((tag) => normalizeTag(tag)).filter(Boolean)),
  ).sort((first, second) => first.localeCompare(second))

  const groups = Array.from(
    new Set([...currentRecord.groups, ...importedRecord.groups].map((group) => normalizeGroup(group)).filter(Boolean)),
  ).sort((first, second) => first.localeCompare(second))

  const relatedIds = Array.from(
    new Set([...currentRecord.relatedIds, ...importedRecord.relatedIds].map((id) => String(id)).filter(Boolean)),
  )

  const memories = Array.from(
    new Map(
      [...currentRecord.memories, ...importedRecord.memories].map((memory) => [
        `${memory.date}:${memory.text.trim().toLowerCase()}`,
        {
          id: memory.id || makeId(),
          date: isValidStamp(memory.date) ? memory.date : todayStamp(),
          text: memory.text.trim(),
        },
      ]),
    ).values(),
  ).sort((first, second) => second.date.localeCompare(first.date))

  return {
    ...currentRecord,
    ...importedRecord,
    archived: Boolean(currentRecord.archived || importedRecord.archived),
    createdAt: isValidStamp(currentRecord.createdAt) ? currentRecord.createdAt : importedRecord.createdAt,
    tags,
    groups,
    relatedIds,
    contact: {
      ...createEmptyContactCard(),
      ...currentRecord.contact,
      ...importedRecord.contact,
    },
    avatar: importedRecord.avatar || currentRecord.avatar,
    memories,
  }
}

function getDuplicateGroups(records) {
  const buckets = new Map()

  for (const record of records) {
    const keys = [
      `name:${normalizePersonKey(record.name)}`,
      record.contact?.email ? `email:${String(record.contact.email).trim().toLowerCase()}` : '',
      record.contact?.phone ? `phone:${String(record.contact.phone).replace(/\D+/g, '')}` : '',
    ].filter(Boolean)

    for (const key of keys) {
      const bucket = buckets.get(key) || []
      bucket.push(record)
      buckets.set(key, bucket)
    }
  }

  const groups = []
  const seen = new Set()

  for (const bucket of buckets.values()) {
    const unique = Array.from(new Map(bucket.map((record) => [record.id, record])).values())
    if (unique.length < 2) {
      continue
    }
    const signature = unique.map((record) => record.id).sort().join('|')
    if (seen.has(signature)) {
      continue
    }
    seen.add(signature)
    groups.push(unique)
  }

  return groups.sort((first, second) => first[0].name.localeCompare(second[0].name))
}

function mergeDuplicateGroup(ids) {
  const uniqueIds = Array.from(new Set(ids.filter(Boolean)))
  if (uniqueIds.length < 2) {
    return
  }

  const records = uniqueIds.map((id) => state.records.find((record) => record.id === id)).filter(Boolean)
  if (records.length < 2) {
    return
  }

  const [base, ...rest] = records
  const merged = rest.reduce((current, record) => mergeRecordData(current, record), base)

  if (!window.confirm(`Merge ${records.length} possible duplicates into ${base.name}?`)) {
    return
  }

  state.records = state.records
    .filter((record) => !uniqueIds.includes(record.id) || record.id === base.id)
    .map((record) => (record.id === base.id ? merged : record))

  for (const id of uniqueIds.slice(1)) {
    clearDraftsForRecord(id)
  }

  state.selectedId = merged.id
  state.selectedIds = state.selectedIds.filter((id) => !uniqueIds.slice(1).includes(id))
  restoreDraftsForSelected(state.selectedId)
  persistRecords()
  render({ preserveFocus: false })
}

function normalizePersonKey(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function inferTier(value) {
  const normalized = String(value || '').toLowerCase()
  const matchingTier = tierOrder.find((tierKey) => {
    const meta = tierMeta[tierKey]
    return normalized.includes(tierKey) || normalized.includes(String(meta?.label || '').toLowerCase())
  })
  if (matchingTier) {
    return matchingTier
  }
  return 'acquaintance'
}

function isValidStamp(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ''))
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function normalizeTag(value) {
  return String(value || '')
    .split(',')
    .pop()
    .trim()
    .toLowerCase()
}

function normalizeGroup(value) {
  return String(value || '')
    .split(',')
    .pop()
    .trim()
    .toLowerCase()
}

function setPathValue(record, key, value) {
  if (!key.includes('.')) {
    return {
      ...record,
      [key]: value,
    }
  }

  const [scope, field] = key.split('.')
  return {
    ...record,
    [scope]: {
      ...(record[scope] || {}),
      [field]: value,
    },
  }
}

function getUniqueGroups(records) {
  return Array.from(new Set(records.flatMap((record) => record.groups || []))).sort((first, second) => first.localeCompare(second))
}

function getUniqueTags(records) {
  return Array.from(new Set(records.flatMap((record) => record.tags || []))).sort((first, second) => first.localeCompare(second))
}

function getGroupSuggestions(record, draft) {
  const pool = getUniqueGroups(state.records)
  const normalizedDraft = normalizeGroup(draft)
  const existing = new Set(record.groups.map((group) => String(group || '').toLowerCase()))

  return pool
    .map((group) => String(group || '').toLowerCase())
    .filter((group) => !existing.has(group))
    .filter((group) => (normalizedDraft ? group.includes(normalizedDraft) : true))
    .slice(0, normalizedDraft ? 8 : 6)
}

function getAvailableRelationOptions(record) {
  const existing = new Set(record.relatedIds)
  return state.records
    .filter((candidate) => candidate.id !== record.id && !existing.has(candidate.id))
    .sort((first, second) => first.name.localeCompare(second.name))
}

function getRelatedSuggestions(record, draft) {
  const normalizedDraft = normalizePersonKey(draft)
  return getAvailableRelationOptions(record)
    .filter((candidate) => (normalizedDraft ? normalizePersonKey(candidate.name).includes(normalizedDraft) : true))
    .slice(0, normalizedDraft ? 6 : 4)
}

function getRelatedRecords(record) {
  return (record.relatedIds || [])
    .map((relatedId) => state.records.find((candidate) => candidate.id === relatedId))
    .filter(Boolean)
}

function buildOrbitData(record) {
  const direct = getRelatedRecords(record)
    .sort((first, second) => getRelatedRecords(second).length - getRelatedRecords(first).length || first.name.localeCompare(second.name))
    .slice(0, 12)
  const directIds = new Set(direct.map((entry) => entry.id))
  const secondaryMap = new Map()
  const edges = []

  direct.forEach((related) => {
    edges.push({ from: record, to: related, type: 'direct' })

    getRelatedRecords(related).forEach((candidate) => {
      if (candidate.id === record.id || directIds.has(candidate.id)) {
        return
      }
      if (!secondaryMap.has(candidate.id)) {
        secondaryMap.set(candidate.id, candidate)
      }
    })
  })

  const secondary = Array.from(secondaryMap.values())
    .sort((first, second) => getRelatedRecords(second).length - getRelatedRecords(first).length || first.name.localeCompare(second.name))
    .slice(0, 24)

  secondary.forEach((candidate) => {
    direct.forEach((related) => {
      if (related.relatedIds.includes(candidate.id)) {
        edges.push({ from: related, to: candidate, type: 'secondary' })
      }
    })
  })

  const centerNode = buildOrbitNode(record, 50, 50, 'center')
  const directRadius = clamp(24 + direct.length * 1.2, 27, 34)
  const secondaryRadius = clamp(directRadius + 14 + secondary.length * 0.3, 40, 46)
  const directNodes = placeOrbitRing(direct, directRadius, 'direct')
  const secondaryNodes = placeOrbitRing(secondary, secondaryRadius, 'secondary', -72)
  const nodeLookup = new Map([centerNode, ...directNodes, ...secondaryNodes].map((node) => [node.id, node]))

  return {
    direct,
    secondary,
    nodes: [centerNode, ...directNodes, ...secondaryNodes],
    edges: edges
      .map((edge) => ({
        type: edge.type,
        from: nodeLookup.get(edge.from.id),
        to: nodeLookup.get(edge.to.id),
      }))
      .filter((edge) => edge.from && edge.to),
  }
}

function placeOrbitRing(records, radius, ring, startAngle = -90) {
  if (!records.length) {
    return []
  }

  return records.map((record, index) => {
    const angle = ((360 / records.length) * index + startAngle) * (Math.PI / 180)
    const x = 50 + Math.cos(angle) * radius
    const y = 50 + Math.sin(angle) * radius
    return buildOrbitNode(record, x, y, ring)
  })
}

function buildOrbitNode(record, x, y, ring) {
  const initials = record.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'R'

  return {
    id: record.id,
    name: record.name,
    avatar: record.avatar,
    initials,
    ring,
    x,
    y,
  }
}

function findRecordByNameOrId(value) {
  const normalized = normalizePersonKey(value)
  return state.records.find(
    (record) => record.id === value || normalizePersonKey(record.name) === normalized,
  ) || null
}

function buildRecordAvatar(record, size = 'small') {
  const initials = escapeHtml(
    record.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'R',
  )

  return `
    <div class="avatar avatar--${size}">
      ${record.avatar ? `<img src="${escapeAttribute(record.avatar)}" alt="${escapeAttribute(record.name)}" />` : `<span>${initials}</span>`}
    </div>
  `
}

function contactCompletionCount(record) {
  const values = Object.values(record.contact || {}).filter((value) => String(value || '').trim())
  return values.length
}

function buildContactLink(key, value) {
  const safeValue = escapeHtml(value)
  const href = contactHrefFor(key, value)
  if (!href) {
    return `<strong>${safeValue}</strong>`
  }

  return `<a href="${escapeAttribute(href)}" target="_blank" rel="noreferrer">${safeValue}</a>`
}

function contactHrefFor(key, value) {
  const raw = String(value || '').trim()
  if (!raw) {
    return ''
  }

  if (key === 'email') {
    return `mailto:${raw}`
  }

  if (key === 'phone') {
    return `tel:${raw.replace(/\s+/g, '')}`
  }

  if (key === 'whatsapp') {
    return `https://wa.me/${raw.replace(/[^\d+]/g, '').replace(/^\+/, '')}`
  }

  if (key === 'telegram') {
    return `https://t.me/${raw.replace(/^@/, '')}`
  }

  if (key === 'linkedin') {
    return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  }

  if (key === 'instagram') {
    return `https://instagram.com/${raw.replace(/^@/, '')}`
  }

  if (key === 'snapchat') {
    return `https://www.snapchat.com/add/${raw.replace(/^@/, '')}`
  }

  if (key === 'tiktok') {
    return `https://www.tiktok.com/@${raw.replace(/^@/, '')}`
  }

  if (key === 'x') {
    return `https://x.com/${raw.replace(/^@/, '')}`
  }

  if (key === 'company' || key === 'birthday' || key === 'address') {
    return ''
  }

  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
}

function animateCompactToggle() {
  document.body.classList.add('compact-pulse')
  if (compactPulseTimer) {
    window.clearTimeout(compactPulseTimer)
  }
  compactPulseTimer = window.setTimeout(() => {
    document.body.classList.remove('compact-pulse')
  }, 280)
}

function handleDragOver(event) {
  const target = event.target
  if (!(target instanceof HTMLElement)) {
    return
  }

  const zone = target.closest('[data-drop-zone]')
  if (!zone) {
    return
  }

  event.preventDefault()
  zone.classList.add('is-drag-over')
}

function handleDrop(event) {
  const target = event.target
  if (!(target instanceof HTMLElement)) {
    return
  }

  const zone = target.closest('[data-drop-zone]')
  if (!(zone instanceof HTMLElement)) {
    return
  }

  event.preventDefault()
  zone.classList.remove('is-drag-over')
  const file = event.dataTransfer?.files?.[0]
  if (!file) {
    return
  }

  if (zone.dataset.dropZone === 'csv') {
    importCsvFile(file)
    return
  }

  if (zone.dataset.dropZone === 'avatar') {
    state.pendingAvatarId = state.selectedId
    importAvatarFile(file)
  }
}

function initCustomCursor() {
  if (!window.matchMedia('(pointer:fine)').matches || !document.documentElement) {
    if (cursorCleanup) {
      cursorCleanup()
      cursorCleanup = null
    }
    document.documentElement.classList.remove('has-custom-cursor')
    document.body.classList.remove('cursor-visible', 'cursor-interactive', 'cursor-pressed')
    return
  }

  document.documentElement.classList.add('has-custom-cursor')
  const ring = document.querySelector('[data-cursor-ring]')
  const dot = document.querySelector('[data-cursor-dot]')
  if (!(ring instanceof HTMLElement) || !(dot instanceof HTMLElement)) {
    return
  }

  const updateInteractiveState = (target) => {
    const interactive = target instanceof Element && target.closest('button, a, input, select, textarea, label, [role="button"], .record-card, .tab-contact-card, .tier-person, .token-filter, .command-palette-item')
    document.body.classList.toggle('cursor-interactive', Boolean(interactive))
  }

  const moveCursor = (event) => {
    const x = event.clientX
    const y = event.clientY
    ring.style.left = `${x}px`
    ring.style.top = `${y}px`
    dot.style.left = `${x}px`
    dot.style.top = `${y}px`
    document.body.classList.add('cursor-visible')
    updateInteractiveState(event.target)
  }

  const hideCursor = () => {
    document.body.classList.remove('cursor-visible', 'cursor-interactive')
  }

  const pointerDown = () => {
    document.body.classList.add('cursor-pressed')
  }

  const pointerUp = () => {
    document.body.classList.remove('cursor-pressed')
  }

  const pointerOver = (event) => {
    updateInteractiveState(event.target)
  }

  window.addEventListener('pointermove', moveCursor)
  window.addEventListener('pointerleave', hideCursor)
  window.addEventListener('blur', hideCursor)
  window.addEventListener('pointerdown', pointerDown)
  window.addEventListener('pointerup', pointerUp)
  document.addEventListener('pointerover', pointerOver)

  cursorCleanup = () => {
    window.removeEventListener('pointermove', moveCursor)
    window.removeEventListener('pointerleave', hideCursor)
    window.removeEventListener('blur', hideCursor)
    window.removeEventListener('pointerdown', pointerDown)
    window.removeEventListener('pointerup', pointerUp)
    document.removeEventListener('pointerover', pointerOver)
  }
}

function openAvatarPicker() {
  state.pendingAvatarId = state.selectedId
  const input = document.querySelector('#avatar-input')
  if (input instanceof HTMLInputElement) {
    input.value = ''
    input.click()
  }
}

async function importAvatarFile(file) {
  if (!file || !state.pendingAvatarId) {
    return
  }

  try {
    const dataUrl = await readImageAsDataUrl(file)
    const targetId = state.pendingAvatarId
    state.pendingAvatarId = null
    state.records = state.records.map((record) =>
      record.id === targetId
        ? {
            ...record,
            avatar: dataUrl,
          }
        : record,
    )
    persistRecords()
    render({ preserveFocus: false })
  } catch (error) {
    window.alert(`Avatar import failed. ${error instanceof Error ? error.message : String(error)}`)
  }
}

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read the image file.'))
    reader.onload = () => {
      const image = new Image()
      image.onerror = () => reject(new Error('Could not decode the image.'))
      image.onload = () => {
        const maxSize = 512
        const scale = Math.min(maxSize / image.width, maxSize / image.height, 1)
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(image.width * scale))
        canvas.height = Math.max(1, Math.round(image.height * scale))
        const context = canvas.getContext('2d')
        if (!context) {
          reject(new Error('Could not create an image canvas.'))
          return
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/png'))
      }
      image.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

function updateSelectionUI({ scrollIntoView = false, sourceElement = null } = {}) {
  if (!app) {
    return
  }

  const selectedRecord = getSelectedRecord()
  const today = todayStamp()
  const selectedSelector = state.selectedId ? `.record-card[data-select="${state.selectedId}"]` : ''
  const inspectorPanel = app.querySelector('.panel.inspector')
  const profileOverlay = app.querySelector('.profile-overlay')
  const inspectorScrollTop = inspectorPanel instanceof HTMLElement ? inspectorPanel.scrollTop : 0
  const profileScrollTop = profileOverlay instanceof HTMLElement ? profileOverlay.scrollTop : 0
  const inspectorHeight = inspectorPanel instanceof HTMLElement ? inspectorPanel.offsetHeight : 0

  app.querySelectorAll('.record-card.selected').forEach((card) => {
    card.classList.remove('selected')
  })

  if (selectedSelector) {
    const selectedCard = app.querySelector(selectedSelector)
    if (selectedCard instanceof HTMLElement) {
      selectedCard.classList.add('selected')
      if (scrollIntoView) {
        selectedCard.scrollIntoView({ block: 'nearest', inline: 'nearest' })
      }
      pulseElement(selectedCard)
    }
  }

  if (inspectorPanel instanceof HTMLElement) {
    if (inspectorHeight) {
      inspectorPanel.style.minHeight = `${inspectorHeight}px`
    }
    inspectorPanel.innerHTML = buildInspectorPanel(selectedRecord, today)
    inspectorPanel.scrollTop = inspectorScrollTop
    window.requestAnimationFrame(() => {
      inspectorPanel.style.minHeight = ''
      inspectorPanel.classList.remove('panel-refresh')
      void inspectorPanel.offsetWidth
      inspectorPanel.classList.add('panel-refresh')
    })
  }

  if (profileOverlay instanceof HTMLElement) {
    profileOverlay.outerHTML = buildProfilePanel(selectedRecord, today)
    const nextProfileOverlay = app.querySelector('.profile-overlay')
    if (nextProfileOverlay instanceof HTMLElement) {
      nextProfileOverlay.scrollTop = profileScrollTop
    }
  }

  const liveName = app.querySelector('[data-live-selected-name]')
  if (liveName instanceof HTMLElement) {
    liveName.textContent = selectedRecord?.name || 'nobody yet'
    liveName.classList.remove('sidebar-name-refresh')
    void liveName.offsetWidth
    liveName.classList.add('sidebar-name-refresh')
  }

  window.requestAnimationFrame(() => {
    const selectedCard = selectedSelector ? app.querySelector(selectedSelector) : null
    positionSelectionRail({ animate: true })
    if (sourceElement instanceof HTMLElement && selectedCard instanceof HTMLElement && sourceElement !== selectedCard) {
      animateSelectionBridge(sourceElement, selectedCard)
    }
  })
}

function positionSelectionRail({ animate = true } = {}) {
  const shell = app?.querySelector('[data-selection-shell]')
  const rail = shell?.querySelector('[data-selection-rail]')
  const selectedCard = shell?.querySelector('.record-card.selected')
  const selectedRow = selectedCard?.closest('li')

  if (!(shell instanceof HTMLElement) || !(rail instanceof HTMLElement) || !(selectedCard instanceof HTMLElement) || !(selectedRow instanceof HTMLElement)) {
    if (rail instanceof HTMLElement) {
      rail.classList.remove('visible')
    }
    return
  }

  const top = selectedRow.offsetTop
  const height = selectedRow.offsetHeight

  rail.classList.toggle('no-animate', !animate)
  rail.style.transform = `translate3d(0, ${top}px, 0)`
  rail.style.height = `${height}px`
  rail.classList.add('visible')

  if (!animate) {
    window.requestAnimationFrame(() => {
      rail.classList.remove('no-animate')
    })
  }
}

function animateSelectionBridge(sourceElement, targetElement) {
  if (document.body.classList.contains('motion-off')) {
    return
  }

  const sourceRect = sourceElement.getBoundingClientRect()
  const targetRect = targetElement.getBoundingClientRect()
  const orb = document.createElement('div')
  orb.className = 'selection-orb'
  orb.style.left = `${sourceRect.left + sourceRect.width / 2}px`
  orb.style.top = `${sourceRect.top + sourceRect.height / 2}px`
  document.body.appendChild(orb)

  const deltaX = targetRect.left + Math.min(targetRect.width * 0.18, 140) - (sourceRect.left + sourceRect.width / 2)
  const deltaY = targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2)

  orb.animate(
    [
      { transform: 'translate(-50%, -50%) scale(0.82)', opacity: 0 },
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.95, offset: 0.16 },
      { transform: `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.72)`, opacity: 0 },
    ],
    {
      duration: 520,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
  ).finished.finally(() => {
    orb.remove()
  })
}

function pulseElement(element) {
  if (!(element instanceof HTMLElement) || document.body.classList.contains('motion-off')) {
    return
  }

  element.classList.remove('selection-surge')
  void element.offsetWidth
  element.classList.add('selection-surge')
}

function captureFocus() {
  const active = document.activeElement

  if (!(active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement || active instanceof HTMLSelectElement)) {
    return null
  }

  if (!active.dataset.focusKey) {
    return null
  }

  return {
    focusKey: active.dataset.focusKey,
    selectionStart: typeof active.selectionStart === 'number' ? active.selectionStart : null,
    selectionEnd: typeof active.selectionEnd === 'number' ? active.selectionEnd : null,
  }
}

function restoreFocus(snapshot) {
  if (!snapshot) {
    return
  }

  const selector = `[data-focus-key="${snapshot.focusKey}"]`
  const field = document.querySelector(selector)

  if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) {
    return
  }

  field.focus({ preventScroll: true })

  if (
    (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) &&
    snapshot.selectionStart != null &&
    snapshot.selectionEnd != null
  ) {
    field.setSelectionRange(snapshot.selectionStart, snapshot.selectionEnd)
  }
}

function focusByKey(focusKey) {
  const field = document.querySelector(`[data-focus-key="${focusKey}"]`)
  if (field instanceof HTMLElement) {
    field.focus()
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeAttribute(value) {
  return escapeHtml(value == null ? '' : value)
}
