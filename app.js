const RECORDS_KEY = 'friends-circle-crm.static.v4'
const SETTINGS_KEY = 'friends-circle-crm.settings.v1'
const DRAFTS_KEY = 'friends-circle-crm.drafts.v1'
const APP_VERSION = '0.7.0'

const tierOrder = ['inner-circle', 'close', 'medium', 'acquaintance']
const touchStyles = ['Text', 'Call', 'Coffee', 'Dinner', 'Voice note']
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
  expandedTier: 'inner-circle',
  settingsOpen: false,
  profileOpen: false,
  profileEditOpen: false,
  settings: loadSettings(),
  settingsTab: 'general',
  pendingImportMode: 'replace',
  pendingAvatarId: null,
  drafts: loadDrafts(),
  tagDraft: '',
  groupDraft: '',
  relatedDraft: '',
  memoryDraft: {
    date: todayStamp(),
    text: '',
  },
}

state.selectedId = state.records[0] ? state.records[0].id : null
restoreDraftsForSelected(state.selectedId)

const app = document.querySelector('#app')
let compactPulseTimer = null
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
            <img class="brand-logo" src="./assets/roster-logo.svg?v=20260401b" alt="Roster logo" />
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
          <section class="panel-block">
            <div class="panel-heading">
              <p class="eyebrow">Views</p>
              <h2>Filter the circle.</h2>
              <p class="sidebar-context">Focused on <strong data-live-selected-name>${escapeHtml(selectedRecord?.name || 'nobody yet')}</strong></p>
            </div>

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
          </section>

          <section class="panel-block">
            <div class="panel-heading">
              <p class="eyebrow">Tiers</p>
              <h3>Open a lane and jump to people.</h3>
            </div>

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
          </section>

          <section class="panel-block">
            <div class="panel-heading">
              <p class="eyebrow">Today</p>
              <h3>One-click review queue.</h3>
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
          </section>

          <section class="panel-block">
            <div class="panel-heading">
              <p class="eyebrow">Groups</p>
              <h3>Custom lanes across your roster.</h3>
            </div>

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
          </section>

          <section class="panel-block">
            <div class="panel-heading">
              <p class="eyebrow">Tags</p>
              <h3>Fast cuts across shared context.</h3>
            </div>

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
          </section>

          <section class="panel-block">
            <div class="panel-heading">
              <p class="eyebrow">Attention queue</p>
              <h3>Who to reach out to next.</h3>
            </div>

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
          </section>
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
                                <span class="record-select-toggle ${isBulkSelected ? 'active' : ''}" data-toggle-select="${record.id}" aria-label="${isBulkSelected ? 'Deselect person' : 'Select person'}" role="button">
                                  <span></span>
                                </span>
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
    <input id="memory-import-input" type="file" accept=".json,application/json" hidden />
    <input id="csv-import-input" type="file" accept=".csv,text/csv" hidden />
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

function buildInspector(record, today) {
  const attention = getAttentionState(record, today)
  const tagSuggestions = getTagSuggestions(record, state.tagDraft)
  const groupSuggestions = getGroupSuggestions(record, state.groupDraft)
  const relatedRecords = getRelatedRecords(record)
  const relatedSuggestions = getRelatedSuggestions(record, state.relatedDraft)
  const nextTouchDate = getNextTouchDate(record)
  const nextTouchLabel = formatCompactDate(nextTouchDate)

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
      <button class="button button-secondary" data-action="focus-memory">Add memory</button>
      <button class="button button-secondary" data-action="${record.archived ? 'restore-person' : 'archive-person'}">
        ${record.archived ? 'Restore' : 'Archive'}
      </button>
    </div>

    <form class="editor-form">
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

      ${buildContactCard(record)}
      ${buildRelatedPeopleEditor(record, relatedRecords, relatedSuggestions)}

      <label class="wide">
        <span>Notes</span>
        <textarea
          data-record-field="notes"
          data-focus-key="record-notes"
          placeholder="Short factual notes that help future you remember context"
        >${escapeHtml(record.notes)}</textarea>
      </label>
    </form>

    <section class="memory-section">
      <div class="memory-head">
        <div class="panel-heading">
          <p class="eyebrow">Memory lane</p>
          <h3>${record.memories.length} memories saved</h3>
        </div>
        <span class="settings-pill">${record.memories.length ? 'Sticky recall' : 'Empty'}</span>
      </div>

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

function buildContactCard(record) {
  return `
    <details class="contact-card wide" open>
      <summary>
        <span>
          <strong>Contact card</strong>
          <small>Email, socials, website, and home address</small>
        </span>
        <em>Added ${formatCompactDate(record.createdAt)}</em>
      </summary>
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
    </details>
  `
}

function buildRelatedPeopleEditor(record, relatedRecords, relatedSuggestions) {
  return `
    <label class="wide">
      <span>Related people</span>
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
    </label>
  `
}

function buildProfilePanel(record, today) {
  if (!state.profileOpen || !record) {
    return ''
  }

  const attention = getAttentionState(record, today)
  const nextTouchDate = getNextTouchDate(record)
  const relatedRecords = getRelatedRecords(record)
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
    <div class="profile-overlay open" data-overlay="profile">
      <section class="profile-panel" role="dialog" aria-modal="true" aria-label="Full profile">
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
  `
}

function buildDefaultsTab() {
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
        <small>Import Google Contacts, Mesh, Clay, or other CRM CSVs and merge them into Roster without retyping everything.</small>
      </div>
      <div class="settings-actions-grid">
        <button class="button button-secondary" data-action="import-csv" type="button">Import CSV</button>
      </div>
      <div class="drop-zone" data-drop-zone="csv">
        Drop a CSV here to import contacts from Mesh, Clay, Google Contacts, or another CRM.
      </div>
    </section>

    <section class="settings-card settings-group">
      <p class="eyebrow">Memory file</p>
      <div class="settings-row">
        <strong>Readable import and export</strong>
        <small>Back up the roster as structured JSON, merge another file in, or replace the current roster in one step.</small>
      </div>
      <div class="settings-help">
        <span class="settings-pill">format: friends-circle-memory-file</span>
        <span class="settings-pill">version: 3</span>
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
        <small>Next up after this release: iPhone companion capture and native Mac menu bar reminders.</small>
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
      state.profileOpen = false
      render({ preserveFocus: false })
      return
    }
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
      case 'mark-touched':
        updateSelectedRecord('lastContact', todayStamp())
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
        state.profileOpen = true
        state.profileEditOpen = false
        render({ preserveFocus: false })
        return
      case 'close-profile':
        state.profileOpen = false
        state.profileEditOpen = false
        render({ preserveFocus: false })
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
    state.settings[settingField] = target instanceof HTMLInputElement && target.type === 'checkbox'
      ? target.checked
      : settingField === 'scale'
        ? clamp(Number(target.value) || defaultSettings.scale, 60, 100)
        : target.value
    persistSettings()
    applySettings()
    if (settingField === 'compact') {
      animateCompactToggle()
    }
    if (settingField === 'scale' || settingField === 'compact') {
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
    state.profileOpen = false
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
      state.profileOpen = true
      render({ preserveFocus: false })
      break
    case 'e':
      event.preventDefault()
      focusByKey('memory-text')
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

function selectRecord(id, options = {}) {
  if (!id || id === state.selectedId) {
    return
  }

  state.selectedId = id
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
  state.filter = 'all'
  state.query = ''
  clearDraftsForRecord(newRecord.id)
  restoreDraftsForSelected(newRecord.id)
  persistRecords()
  render({ preserveFocus: false })
  focusByKey('record-name')
}

function toggleBulkSelection(id) {
  if (!id) {
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
    const importedRecords = rows.map(mapCsvRowToRecord).filter(Boolean)

    if (!importedRecords.length) {
      window.alert('This CSV did not contain any importable contacts.')
      return
    }

    if (!window.confirm(`Import ${importedRecords.length} contacts from CSV and merge them into your roster?`)) {
      return
    }

    state.records = mergeImportedRecords(state.records, importedRecords)
    state.filter = 'all'
    state.selectedId = state.records[0] ? state.records[0].id : null
    persistRecords()
    restoreDraftsForSelected(state.selectedId)
    const duplicateGroups = getDuplicateGroups(state.records)
    if (duplicateGroups.length) {
      state.settingsOpen = true
      state.settingsTab = 'data'
    }
    render({ preserveFocus: false })
  } catch (error) {
    window.alert(`CSV import failed.\n\n${error instanceof Error ? error.message : String(error)}`)
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

  return {
    theme: themeOptions.some((theme) => theme.value === value.theme) ? value.theme : defaultSettings.theme,
    motion: typeof value.motion === 'boolean' ? value.motion : defaultSettings.motion,
    dense: typeof value.dense === 'boolean' ? value.dense : defaultSettings.dense,
    hints: typeof value.hints === 'boolean' ? value.hints : defaultSettings.hints,
    compact: typeof value.compact === 'boolean' ? value.compact : defaultSettings.compact,
    scale: clamp(Number(value.scale) || defaultSettings.scale, 60, 100),
    defaults: {
      tier: tierOrder.includes(defaults.tier) ? defaults.tier : defaultContactSettings.tier,
      touchStyle: touchStyles.includes(defaults.touchStyle) ? defaults.touchStyle : defaultContactSettings.touchStyle,
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
      <span class="animated-value__stack">
        <span>${escapeHtml(previousDisplay)}</span>
        <span>${escapeHtml(display)}</span>
      </span>
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
    version: 3,
    exportedAt: new Date().toISOString(),
    readme: 'Human-readable memory file for Roster.',
    workspace: {
      theme: state.settings.theme,
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
    defaults: workspace.defaults || settings.defaults,
  }

  if (!candidate.theme && !candidate.defaults) {
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

function mapCsvRowToRecord(row) {
  const given = cleanImportValue(row['Given Name'])
  const family = cleanImportValue(row['Family Name'])
  const name = cleanImportValue(row.Name) || cleanImportValue(`${given} ${family}`) || firstDelimitedValue(row['Phone 1 - Value']) || firstDelimitedValue(row['E-mail 1 - Value'])

  if (!name) {
    return null
  }

  const groupMembership = cleanImportValue(row['Group Membership'])
  const tier = inferTier(groupMembership)
  const city = cleanImportValue(row['Address 1 - City'])
  const emailValues = parseTripleDelimitedValues(row['E-mail 1 - Value'])
  const phoneValues = parseTripleDelimitedValues(row['Phone 1 - Value']).concat(parseTripleDelimitedValues(row['Phone 2 - Value']))
  const websiteType = cleanImportValue(row['Website 1 - Type'])
  const websiteValue = cleanImportValue(row['Website 1 - Value'])
  const birthday = cleanImportValue(row.Birthday)
  const organizationName = cleanImportValue(row['Organization Name'])
  const organizationTitle = cleanImportValue(row['Organization Title'])
  const address = cleanImportValue(row['Address 1 - Formatted'])
  const sourceName = websiteType || cleanImportValue(row['External ID 1 - Type'])
  const importedGroups = extractImportedGroups(groupMembership)

  const notesParts = [
    cleanImportValue(row.Notes),
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
    id: cleanImportValue(row['External ID 1 - Value']) || slugify(name),
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
    touchStyle: touchStyles.includes(record.touchStyle || connectionPlan.touchStyle)
      ? String(record.touchStyle || connectionPlan.touchStyle)
      : 'Text',
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

  if (!(shell instanceof HTMLElement) || !(rail instanceof HTMLElement) || !(selectedCard instanceof HTMLElement)) {
    if (rail instanceof HTMLElement) {
      rail.classList.remove('visible')
    }
    return
  }

  const shellRect = shell.getBoundingClientRect()
  const selectedRect = selectedCard.getBoundingClientRect()
  const top = selectedRect.top - shellRect.top

  rail.classList.toggle('no-animate', !animate)
  rail.style.transform = `translate3d(0, ${top}px, 0)`
  rail.style.height = `${selectedRect.height}px`
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
