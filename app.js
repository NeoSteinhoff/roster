const RECORDS_KEY = 'friends-circle-crm.static.v4'
const SETTINGS_KEY = 'friends-circle-crm.settings.v1'
const DRAFTS_KEY = 'friends-circle-crm.drafts.v1'
const REMINDER_LOG_KEY = 'friends-circle-crm.reminders.v1'
const APP_VERSION = '0.9.0'
const PROFILE_CLOSE_MS = 220

const tierOrder = ['inner-circle', 'close', 'medium', 'acquaintance']
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
  { key: 'general', label: 'General' },
  { key: 'defaults', label: 'Defaults' },
  { key: 'shortcuts', label: 'Shortcuts' },
  { key: 'data', label: 'Data' },
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
  { keys: '/', action: 'Search roster' },
  { keys: 'N', action: 'Add person' },
  { keys: 'G', action: 'Open settings' },
  { keys: '?', action: 'Open shortcuts tab' },
  { keys: 'J / K', action: 'Move selection' },
  { keys: 'M', action: 'Mark touched today' },
  { keys: 'A', action: 'Archive or restore person' },
  { keys: 'P', action: 'Open full profile' },
  { keys: 'B', action: 'Open meeting brief' },
  { keys: 'Q', action: 'Open quick capture' },
  { keys: 'E', action: 'Focus memory' },
  { keys: 'T', action: 'Focus tags' },
  { keys: 'F', action: 'Focus active context' },
  { keys: 'O', action: 'Focus notes' },
  { keys: 'I', action: 'Import memory file' },
  { keys: 'X', action: 'Export memory file' },
  { keys: 'Cmd/Ctrl + ,', action: 'Open settings' },
  { keys: 'Cmd/Ctrl + Enter', action: 'Save memory' },
  { keys: '1-6', action: 'Jump filters' },
  { keys: 'Esc', action: 'Close settings' },
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

const tierMeta = {
  'inner-circle': {
    label: 'Inner circle',
    cadenceHint: 'Touch weekly',
    description: 'Your closest people. Prioritize them first.',
  },
  close: {
    label: 'Close',
    cadenceHint: 'Every 10-14 days',
    description: 'Strong friendships that deserve active upkeep.',
  },
  medium: {
    label: 'Medium',
    cadenceHint: 'Every 2-4 weeks',
    description: 'Solid friends who can drift if you do not stay intentional.',
  },
  acquaintance: {
    label: 'Acquaintance',
    cadenceHint: 'Monthly or event-based',
    description: 'Lighter relationships, social orbit, and warm intros.',
  },
}

const initialRecords = [
  createSeedRecord('Ivan Wazir', 'inner-circle', '2026-03-25', 7, ['local', 'business'], 'Dubai'),
  createSeedRecord('Silver Rottweiler', 'close', '2026-03-08', 14, ['dog', 'loyal', 'local']),
  createSeedRecord('Karoline Berg', 'close', '2026-03-18', 10, ['creative', 'europe', 'travel'], 'Dubai'),
  createSeedRecord('Rayan Shayara', 'inner-circle', '2026-03-28', 7, ['family', 'local']),
  createSeedRecord('Rayhan', 'medium', '2026-03-01', 21, ['long-distance', 'friend']),
  createSeedRecord('Gaspard', 'acquaintance', '2026-02-12', 45, ['social', 'europe']),
]

const defaultSettings = {
  theme: 'mesh',
  motion: true,
  dense: false,
  hints: true,
  compact: false,
  scale: 67,
  customTouchStyles: [],
  reminders: {
    enabled: false,
    range: 'week',
    hour: 9,
    birthdayLeadDays: 7,
    meetingLeadDays: 1,
  },
  defaults: { ...defaultContactSettings },
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
    views: true,
    today: true,
    tiers: true,
    groups: true,
    tags: true,
    queue: true,
  },
  inspectorPanels: {
    basics: true,
    notes: true,
    contact: true,
    related: true,
    memory: true,
  },
  settingsOpen: false,
  profileOpen: false,
  profileClosing: false,
  profileEditOpen: false,
  briefOpen: false,
  quickCaptureOpen: false,
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
  memoryDraft: {
    date: todayStamp(),
    text: '',
  },
}

state.selectedId = state.records[0] ? state.records[0].id : null
state.quickCaptureRecordId = state.selectedId
restoreDraftsForSelected(state.selectedId)
hydrateCaptureIntent()

const app = document.querySelector('#app')
let compactPulseTimer = null
let profileCloseTimer = null
let reminderTimer = null
const animatedValueHistory = new Map()

if (app) {
  app.addEventListener('click', handleClick)
  app.addEventListener('input', handleInput)
  app.addEventListener('change', handleInput)
  app.addEventListener('submit', handleSubmit)
  app.addEventListener('dragover', handleDragOver)
  app.addEventListener('drop', handleDrop)
}

document.addEventListener('keydown', handleKeydown)

render({ preserveFocus: false })
startReminderLoop()

function render({ preserveFocus = true } = {}) {
  if (!app) {
    return
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

  app.innerHTML = `
    <div class="app-frame" style="--frame-scale:${state.settings.scale / 100}">
    <div class="crm-shell">
      <header class="hero">
        <div class="hero-copy">
          <div class="brand-lockup">
            <img class="brand-logo" src="./assets/roster-logo.svg?v=20260401e" alt="Roster logo" />
            <div class="brand-lockup__text">
              <p class="eyebrow">Roster</p>
              <small>The friend CRM</small>
            </div>
          </div>
          <h1>Your people, clearly remembered.</h1>
          <p class="hero-summary">
            Track the relationships that matter, keep memory attached to each person, and move through your roster with less friction.
          </p>
          <div class="button-row">
            <button class="button button-primary" data-action="add-person">Add person</button>
            <button class="button button-secondary" data-action="open-settings">Settings</button>
            <button class="button button-secondary ${state.settings.compact ? 'button-active' : ''}" data-action="toggle-compact">
              ${state.settings.compact ? 'Full view' : 'Compact view'}
            </button>
            ${state.settings.hints ? buildPowerDock() : ''}
          </div>
        </div>

        <div class="summary-grid">
          ${summaryTile('People tracked', activeRecords.length, 'Only your active roster lives here')}
          ${summaryTile('Needs attention', needsAttentionCount, `${overdueCount} overdue right now`)}
          ${summaryTile('Memories saved', memoryCount, 'Stored context for future you')}
          ${summaryTile('Average bond', `${averageHealth}%`, 'Live relationship health across active people')}
        </div>
      </header>

      <main class="workspace">
        <aside class="panel">
          <div class="sidebar-stack">
            ${buildSidebarSection(
              'views',
              'Views',
              'Filter the circle.',
              `Focused on ${escapeHtml(selectedRecord?.name || 'nobody yet')}`,
              `
                <p class="sidebar-context">Focused on <strong data-live-selected-name>${escapeHtml(selectedRecord?.name || 'nobody yet')}</strong></p>
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
              `<span class="settings-pill">${buildAnimatedValue(String(activeRecords.length), 'sidebar-active-count', { tag: 'span', className: 'inline-count' })} active</span>`,
            )}

            ${buildSidebarSection(
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
            )}

            ${buildSidebarSection(
              'today',
              'Today',
              'One-click review queue.',
              'Birthdays, reconnects, and what deserves a touch today or this week.',
              `
                <div class="queue-cluster">
                  <div class="queue-cluster__head">
                    <strong>Today</strong>
                    <small>${todayQueue.length ? `${todayQueue.length} live item${todayQueue.length === 1 ? '' : 's'}` : 'Nothing urgent today'}</small>
                  </div>
                  <ul class="plain-list queue-list">
                    ${
                      todayQueue.length
                        ? todayQueue
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
                        : '<li class="empty-copy">Nothing urgent today. Your circle is in good shape.</li>'
                    }
                  </ul>
                </div>
                <div class="queue-cluster">
                  <div class="queue-cluster__head">
                    <strong>This week</strong>
                    <small>${thisWeekQueue.length ? `${thisWeekQueue.length} upcoming` : 'No new nudges this week'}</small>
                  </div>
                  <ul class="plain-list queue-list">
                    ${
                      thisWeekQueue.length
                        ? thisWeekQueue
                            .map(
                              ({ record, reason }) => `
                                <li>
                                  <button class="queue-item" data-select="${record.id}">
                                    <span>
                                      <strong>${escapeHtml(record.name)}</strong>
                                      <small>${escapeHtml(reason)}</small>
                                    </span>
                                    <i class="status-pill tone-${getAttentionState(record, today).tone}">${formatShortDate(getNextTouchDate(record))}</i>
                                  </button>
                                </li>
                              `,
                            )
                            .join('')
                        : '<li class="empty-copy">No additional follow-ups creeping up this week.</li>'
                    }
                  </ul>
                </div>
              `,
              `<span class="settings-pill">${buildAnimatedValue(String(todayQueue.length + thisWeekQueue.length), 'today-queue-count', { tag: 'span', className: 'inline-count' })} queued</span>`,
            )}

            ${buildSidebarSection(
              'groups',
              'Groups',
              'Custom lanes across your roster.',
              'Flexible collections layered on top of the core tiers.',
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
              groupOptions.length ? `<span class="settings-pill">${groupOptions.length} groups</span>` : '',
            )}

            ${buildSidebarSection(
              'tags',
              'Tags',
              'Fast cuts across shared context.',
              'Use tags as the quick language of your relationships.',
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
              topTagOptions.length ? `<span class="settings-pill">${topTagOptions.length} live</span>` : '',
            )}

            ${buildSidebarSection(
              'queue',
              'Attention queue',
              'Who to reach out to next.',
              'Your priority list, sorted by urgency.',
              `
                <ul class="plain-list queue-list">
                  ${topQueue
                    .map((record) => {
                      const attention = getAttentionState(record, today)
                      return `
                        <li>
                          <button class="queue-item" data-select="${record.id}">
                            <span>
                              <strong>${escapeHtml(record.name)}</strong>
                              <small>${tierMeta[record.tier].label}</small>
                            </span>
                            <i class="status-pill tone-${attention.tone}">${attention.label}</i>
                          </button>
                        </li>
                      `
                    })
                    .join('')}
                </ul>
              `,
              `<span class="settings-pill">${buildAnimatedValue(String(topQueue.length), 'top-queue-count', { tag: 'span', className: 'inline-count' })} shown</span>`,
            )}
          </div>
        </aside>

        <section class="panel">
          <div class="roster-header roster-header--stacked">
            <div class="panel-heading">
              <p class="eyebrow">Roster</p>
              <h2>${buildAnimatedValue(String(visibleRecords.length), 'visible-records-count', { tag: 'span', className: 'inline-count animated-value--large' })} people in view</h2>
            </div>

            <div class="roster-toolbar">
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
              >
                ${state.multiSelectMode ? 'Done selecting' : 'Select multiple'}
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
                    <button class="button button-secondary" type="button" data-action="bulk-archive">Archive</button>
                    <button class="button button-secondary" type="button" data-action="bulk-restore">Restore</button>
                    <button class="button button-secondary" type="button" data-action="clear-selection">Clear</button>
                  </div>
                </div>
              `
              : ''
          }

          <label class="search-field">
            <span class="search-label">Search by name, notes, memory, tag, group, or socials</span>
            <div class="search-shell">
              <input
                data-search
                data-focus-key="search"
                id="search-input"
                type="search"
                placeholder="Search your people"
                value="${escapeAttribute(state.query)}"
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
                <div class="record-list-shell" data-selection-shell>
                  <div class="selection-rail" data-selection-rail></div>
                  <ul class="plain-list record-list record-list--animated ${state.settings.compact ? 'record-list--compact' : ''}">
                    ${visibleRecords
                      .map((record) => {
                      const attention = getAttentionState(record, today)
                      const isSelected = activeSelectedId === record.id
                      const isBulkSelected = state.selectedIds.includes(record.id)
                      const latestMemory = record.memories[0]
                      const nextTouch = getNextTouchDate(record)
                      return `
                        <li>
                          <button class="record-card ${isSelected ? 'selected' : ''}" data-select="${record.id}">
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
                              state.settings.compact
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
                      })
                      .join('')}
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

        <aside class="panel inspector">
          ${buildInspectorPanel(selectedRecord, today)}
        </aside>
      </main>
    </div>

    ${buildSettingsPanel(duplicateGroups)}
    ${buildProfilePanel(selectedRecord, today)}
    ${buildMeetingBriefPanel(selectedRecord, today)}
    ${buildQuickCapturePanel(selectedRecord)}
    ${buildMobileQuickBar(selectedRecord)}
    <input id="memory-import-input" type="file" accept=".json,application/json" hidden />
    <input id="csv-import-input" type="file" accept=".csv,text/csv" hidden />
    <input id="activity-import-input" type="file" accept=".csv,.ics,.txt,text/csv,text/calendar,text/plain" hidden />
    <input id="avatar-input" type="file" accept="image/*" hidden />
    </div>
  `

  if (focusSnapshot) {
    restoreFocus(focusSnapshot)
  }

  window.requestAnimationFrame(() => {
    positionSelectionRail({ animate: false })
  })
}

function buildCollapsibleSection({ scope, key, eyebrow, title, summary = '', badge = '', content = '', open = true, className = '' }) {
  return `
    <section class="collapsible-section collapsible-section--${scope} ${open ? 'is-open' : 'is-closed'} ${className}">
      <button class="collapsible-toggle" type="button" data-toggle-panel="${scope}:${key}" aria-expanded="${open ? 'true' : 'false'}">
        <span class="collapsible-toggle__copy">
          ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
          <strong>${title}</strong>
          ${summary ? `<small>${summary}</small>` : ''}
        </span>
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

function buildSidebarSection(key, eyebrow, title, summary, content, badge = '') {
  return buildCollapsibleSection({
    scope: 'sidebar',
    key,
    eyebrow,
    title,
    summary,
    badge,
    content,
    open: state.sidebarPanels[key] !== false,
  })
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

  return `
    <div class="inspector-overview">
      <article class="identity-hero" data-drop-zone="avatar">
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
        <div class="identity-hero__actions">
          <button class="button button-secondary" type="button" data-action="open-profile">Full profile</button>
          <button class="button button-secondary" type="button" data-action="upload-avatar">${record.avatar ? 'Change photo' : 'Add photo'}</button>
          ${record.avatar ? '<button class="button button-secondary" type="button" data-action="remove-avatar">Remove photo</button>' : ''}
        </div>
      </article>

      <article class="status-hero">
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
      </article>

      <div class="inspector-stats">
        ${metricCard('Bond health', `${record.bondHealth}%`, '', 'Relationship strength snapshot')}
        ${metricCard('Next touch', nextTouchLabel, '', `${record.touchStyle} · ${formatLongDate(nextTouchDate)}`)}
        ${metricCard('Cadence', `${record.cadenceDays} days`, '', 'Planned check-in spacing')}
        ${metricCard('Memories', `${record.memories.length}`, '', 'Saved notes and context')}
      </div>
    </div>

    <div class="inspector-actions">
      <button class="button button-primary" data-action="mark-touched">Mark touched today</button>
      <button class="button button-secondary" data-action="open-brief">Meeting brief</button>
      <button class="button button-secondary" data-action="focus-memory">Add memory</button>
      <button class="button button-secondary" data-action="${record.archived ? 'restore-person' : 'archive-person'}">
        ${record.archived ? 'Restore' : 'Archive'}
      </button>
    </div>

    <div class="inspector-stack">
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
        'Related people',
        'Linked relationships',
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
          <output class="bond-output" data-bond-output>${record.bondHealth}%</output>
        </div>
        <div class="bond-slider-row">
          <input data-record-field="bondHealth" data-focus-key="record-health" type="range" min="0" max="100" value="${record.bondHealth}" />
          <output class="bond-output bond-output--inline" data-bond-output-inline>${record.bondHealth}%</output>
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
            <span class="settings-pill">Flexible custom lanes</span>
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
            <span class="settings-pill">Enter to commit</span>
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
        <span class="settings-pill">Clickable relationship graph</span>
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
            <div class="settings-pill">Cmd/Ctrl + Enter to save</div>
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
          <button class="button button-secondary" type="button" data-action="${record.archived ? 'restore-person' : 'archive-person'}">
            ${record.archived ? 'Restore' : 'Archive'}
          </button>
          <button class="button button-danger" type="button" data-action="delete-person">Delete</button>
        </div>

        <div class="profile-hero" data-drop-zone="avatar">
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
  const prompts = [
    record.focus ? `Ask about ${record.focus}.` : `Open by asking what feels most alive for them right now.`,
    record.notes ? `Use your notes to reconnect naturally: ${truncate(record.notes, 110)}` : `Anchor the conversation with one concrete update you remember from last time.`,
    record.touchStyle ? `This relationship responds well to ${record.touchStyle.toLowerCase()} energy.` : `Use a tone that matches how you usually connect.`,
  ]

  if (birthday && birthday.daysUntil <= state.settings.reminders.birthdayLeadDays) {
    prompts.push(birthday.daysUntil === 0 ? 'Wish them happy birthday today.' : `Mention their birthday coming up on ${formatCompactDate(birthday.date)}.`)
  }

  return {
    intro: `${tierMeta[record.tier].label} relationship. ${attention.label}. Best next touch is ${record.touchStyle.toLowerCase()} on ${formatCompactDate(nextTouch)}.`,
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
    <div class="panel-heading">
      <p class="eyebrow">Inspector</p>
      <h2 class="inspector-name">${selectedRecord ? escapeHtml(selectedRecord.name) : 'No person selected'}</h2>
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
  return `
    <div class="settings-overlay ${state.settingsOpen ? 'open' : ''}" data-overlay="settings">
      <aside class="settings-panel" role="dialog" aria-modal="true" aria-label="Settings panel">
        <div class="settings-header">
          <div class="settings-copy">
            <p class="eyebrow">Settings</p>
            <h2>Run the workspace.</h2>
            <p class="settings-note">Faster controls, cleaner defaults, and better data handling for future-you.</p>
          </div>
          <button class="settings-close" data-action="close-settings" aria-label="Close settings">Close</button>
        </div>

        <div class="settings-tab-row" role="tablist" aria-label="Settings sections">
          ${settingsTabs
            .map(
              (tab) => `
                <button
                  class="settings-tab ${state.settingsTab === tab.key ? 'active' : ''}"
                  type="button"
                  role="tab"
                  aria-selected="${state.settingsTab === tab.key ? 'true' : 'false'}"
                  data-settings-tab="${tab.key}"
                >
                  ${tab.label}
                </button>
              `,
            )
            .join('')}
        </div>

        <div class="settings-body">
          ${buildSettingsTabContent(duplicateGroups)}
        </div>

        <div class="settings-footer settings-footer--panel">
          <span class="settings-pill">${themeOptions.find((theme) => theme.value === state.settings.theme)?.label || 'Mesh Night'}</span>
          <span class="motion-note">${state.settings.motion ? 'Motion on' : 'Motion off'}</span>
        </div>
      </aside>
    </div>
    </div>
  `
}

function buildSettingsTabContent(duplicateGroups = []) {
  switch (state.settingsTab) {
    case 'defaults':
      return buildDefaultsTab()
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
          <input type="checkbox" data-setting-field="compact" ${state.settings.compact ? 'checked' : ''} />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
        </label>
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
          <input type="checkbox" data-setting-field="hints" ${state.settings.hints ? 'checked' : ''} />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
        </label>
      </div>
    </section>

    <section class="settings-card settings-group">
      <p class="eyebrow">Scale</p>
      <div class="settings-row">
        <strong>Workspace scale</strong>
        <small>Default is 67% because the full layout breathes better at that size.</small>
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

      <div class="form-grid">
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

function buildShortcutsTab() {
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
        <strong>Reset to your seeded roster</strong>
        <small>Replaces the current workspace with the six-person base list you gave me.</small>
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

function handleClick(event) {
  const target = event.target

  if (!(target instanceof HTMLElement)) {
    return
  }

  const overlay = target.closest('[data-overlay]')
  if (overlay instanceof HTMLElement) {
    if (overlay.dataset.overlay === 'settings' && !target.closest('.settings-panel')) {
      state.settingsOpen = false
      render({ preserveFocus: false })
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
  }

  const panelToggle = target.closest('[data-toggle-panel]')
  if (panelToggle instanceof HTMLElement) {
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
      case 'open-settings':
        state.settingsOpen = true
        state.settingsTab = 'general'
        render({ preserveFocus: false })
        return
      case 'toggle-compact':
        state.settings.compact = !state.settings.compact
        persistSettings()
        animateCompactToggle()
        render({ preserveFocus: false })
        return
      case 'toggle-multi-select':
        state.multiSelectMode = !state.multiSelectMode
        if (!state.multiSelectMode) {
          state.selectedIds = []
        }
        render({ preserveFocus: false })
        return
      case 'open-shortcuts-tab':
        state.settingsOpen = true
        state.settingsTab = 'shortcuts'
        render({ preserveFocus: false })
        return
      case 'close-settings':
        state.settingsOpen = false
        render({ preserveFocus: false })
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
        focusByKey('memory-text')
        return
      case 'open-profile':
        if (profileCloseTimer) {
          window.clearTimeout(profileCloseTimer)
          profileCloseTimer = null
        }
        state.profileOpen = true
        state.profileClosing = false
        state.profileEditOpen = false
        render({ preserveFocus: false })
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
      case 'delete-person':
        removeSelectedRecord()
        return
      case 'bulk-mark-touched':
        runBulkAction('touch')
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
    state.settingsTab = settingsTabButton.dataset.settingsTab || 'general'
    render({ preserveFocus: false })
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
    selectRecord(selectButton.dataset.select, { sourceElement: selectButton })
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
      document.querySelectorAll('[data-bond-output], [data-bond-output-inline]').forEach((output) => {
        if (output instanceof HTMLElement) {
          output.textContent = `${nextValue}%`
        }
      })
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
    }
    persistSettings()
    applySettings()
    startReminderLoop()
    if (settingField === 'compact') {
      animateCompactToggle()
    }
    if (settingField === 'scale' || settingField === 'compact' || reminderField) {
      render({ preserveFocus: false })
    }
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
    state.settingsOpen = true
    state.settingsTab = 'general'
    render({ preserveFocus: false })
    return
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

  if (event.key === 'Escape' && state.settingsOpen) {
    event.preventDefault()
    state.settingsOpen = false
    render({ preserveFocus: false })
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
      state.settingsOpen = !state.settingsOpen
      if (state.settingsOpen) {
        state.settingsTab = 'general'
      }
      render({ preserveFocus: false })
      break
    case '?':
      event.preventDefault()
      state.settingsOpen = true
      state.settingsTab = 'shortcuts'
      render({ preserveFocus: false })
      break
    case 'm':
      event.preventDefault()
      updateSelectedRecord('lastContact', todayStamp())
      break
    case 'a':
      event.preventDefault()
      setSelectedArchived(!getSelectedRecord()?.archived)
      break
    case 'p':
      event.preventDefault()
      if (profileCloseTimer) {
        window.clearTimeout(profileCloseTimer)
        profileCloseTimer = null
      }
      state.profileOpen = true
      state.profileClosing = false
      render({ preserveFocus: false })
      break
    case 'e':
      event.preventDefault()
      focusByKey('memory-text')
      break
    case 'q':
      event.preventDefault()
      state.quickCaptureOpen = true
      state.quickCaptureMode = 'memory'
      state.quickCaptureRecordId = state.selectedId || state.quickCaptureRecordId
      render({ preserveFocus: false })
      break
    case 'b':
      event.preventDefault()
      state.briefOpen = true
      render({ preserveFocus: false })
      break
    case 't':
      event.preventDefault()
      focusByKey('record-tags')
      break
    case 'f':
      event.preventDefault()
      focusByKey('record-focus')
      break
    case 'o':
      event.preventDefault()
      focusByKey('record-notes')
      break
    case 'i':
      event.preventDefault()
      state.pendingImportMode = 'merge'
      openImportPicker()
      break
    case 'x':
      event.preventDefault()
      exportMemoryFile()
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
      break
  }
}

function setFilter(filter) {
  state.filter = filter
  if (tierMeta[filter]) {
    state.expandedTier = filter
  }
  const visible = getVisibleRecords(state.records, state.query, state.filter, todayStamp())
  if (visible.length && !visible.some((record) => record.id === state.selectedId)) {
    state.selectedId = visible[0].id
    restoreDraftsForSelected(state.selectedId)
  }
  render({ preserveFocus: false })
}

function togglePanel(token) {
  const [scope, key] = String(token || '').split(':')
  if (!scope || !key) {
    return
  }

  if (scope === 'sidebar' && key in state.sidebarPanels) {
    state.sidebarPanels[key] = !state.sidebarPanels[key]
    render({ preserveFocus: false })
    return
  }

  if (scope === 'inspector' && key in state.inspectorPanels) {
    state.inspectorPanels[key] = !state.inspectorPanels[key]
    render({ preserveFocus: false })
  }
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
  updateSelectionUI({ sourceElement: options.sourceElement })
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
  updateSelectionUI({ scrollIntoView: true })
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
}

function runBulkAction(action) {
  if (!state.selectedIds.length) {
    return
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

function removeSelectedRecord() {
  const record = getSelectedRecord()
  if (!record) {
    return
  }

  if (!window.confirm(`Remove ${record.name} from your CRM?`)) {
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
    state.settingsOpen = true
    state.settingsTab = 'data'
    render({ preserveFocus: false })
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
    state.settingsOpen = true
    state.settingsTab = 'data'
    render({ preserveFocus: false })
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
    state.settingsOpen = true
    state.settingsTab = 'data'
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
      ? setPathValue(record, key, value)
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

  if (record.tags.some((entry) => entry.toLowerCase() === nextTag)) {
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

  if (record.groups.some((entry) => entry.toLowerCase() === nextGroup)) {
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
  if (touchStyles.some((style) => style.toLowerCase() === nextStyle.toLowerCase())) {
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
    (style) => style.toLowerCase() !== nextStyle.toLowerCase(),
  )

  if (state.settings.defaults.touchStyle.toLowerCase() === nextStyle.toLowerCase()) {
    state.settings.defaults.touchStyle = defaultContactSettings.touchStyle
  }

  state.records = state.records.map((record) =>
    record.touchStyle.toLowerCase() === nextStyle.toLowerCase()
      ? { ...record, touchStyle: defaultTouchStyleForTier(record.tier) }
      : record,
  )

  persistSettings()
  persistRecords()
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
          tags: entry.tags.filter((existing) => existing.toLowerCase() !== tag.toLowerCase()),
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
          groups: entry.groups.filter((existing) => existing.toLowerCase() !== group.toLowerCase()),
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
  document.body.dataset.theme = state.settings.theme
  document.body.classList.toggle('motion-off', !state.settings.motion)
  document.body.classList.toggle('dense-ui', !!state.settings.dense)
  document.body.classList.toggle('compact-view', !!state.settings.compact)
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

function persistRecords() {
  window.localStorage.setItem(RECORDS_KEY, JSON.stringify(state.records))
}

function persistSettings() {
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings))
}

function persistDrafts() {
  window.localStorage.setItem(DRAFTS_KEY, JSON.stringify(state.drafts))
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
  const resolvedTouchStyles = resolveTouchStyles(customTouchStyles, [defaults.touchStyle])

  return {
    theme: themeOptions.some((theme) => theme.value === value.theme) ? value.theme : defaultSettings.theme,
    motion: typeof value.motion === 'boolean' ? value.motion : defaultSettings.motion,
    dense: typeof value.dense === 'boolean' ? value.dense : defaultSettings.dense,
    hints: typeof value.hints === 'boolean' ? value.hints : defaultSettings.hints,
    compact: typeof value.compact === 'boolean' ? value.compact : defaultSettings.compact,
    scale: clamp(Number(value.scale) || defaultSettings.scale, 60, 100),
    customTouchStyles: resolvedTouchStyles.filter((style) => !baseTouchStyles.includes(style)),
    reminders: {
      enabled: typeof value.reminders?.enabled === 'boolean' ? value.reminders.enabled : defaultSettings.reminders.enabled,
      range: ['today', 'week'].includes(value.reminders?.range) ? value.reminders.range : defaultSettings.reminders.range,
      hour: clamp(Number(value.reminders?.hour) || defaultSettings.reminders.hour, 0, 23),
      birthdayLeadDays: clamp(Number(value.reminders?.birthdayLeadDays) || defaultSettings.reminders.birthdayLeadDays, 0, 30),
      meetingLeadDays: clamp(Number(value.reminders?.meetingLeadDays) || defaultSettings.reminders.meetingLeadDays, 0, 14),
    },
    defaults: {
      tier: tierOrder.includes(defaults.tier) ? defaults.tier : defaultContactSettings.tier,
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

function createSeedRecord(name, tier, lastContact, cadenceDays, tags = [], city = '', groups = []) {
  return {
    id: slugify(name),
    name,
    archived: false,
    tier,
    city,
    createdAt: '2026-03-30',
    lastContact,
    cadenceDays,
    touchStyle: tier === 'inner-circle' ? 'Call' : tier === 'close' ? 'Coffee' : 'Text',
    bondHealth: tier === 'inner-circle' ? 88 : tier === 'close' ? 78 : tier === 'medium' ? 66 : 54,
    focus: '',
    notes: '',
    tags,
    groups,
    relatedIds: [],
    avatar: '',
    contact: createEmptyContactCard(),
    memories: [],
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
  return `
    <button class="filter-button ${state.filter === key ? 'active' : ''}" data-filter="${key}">
      <span>
        <strong>${label}</strong>
        <small>${note}</small>
      </span>
      <em>${buildAnimatedValue(String(count), `filter-${key}-count`, { tag: 'span', className: 'filter-count' })}</em>
    </button>
  `
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
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
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
  const existing = new Set(record.tags.map((tag) => tag.toLowerCase()))

  return pool
    .map((tag) => tag.toLowerCase())
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

  const tier = tierOrder.includes(record.tier)
    ? record.tier
    : tierOrder.includes(record.tierKey)
      ? record.tierKey
      : tierOrder.includes(profile.tierKey)
        ? profile.tierKey
        : inferTier(profile.tierLabel || profile.tier || record.tierLabel || record.tier)

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
  if (normalized.includes('inner')) {
    return 'inner-circle'
  }
  if (normalized.includes('close')) {
    return 'close'
  }
  if (normalized.includes('medium')) {
    return 'medium'
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
  const existing = new Set(record.groups.map((group) => group.toLowerCase()))

  return pool
    .map((group) => group.toLowerCase())
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
