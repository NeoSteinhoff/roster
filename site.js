const billing = window.ROSTER_BILLING || { plans: {}, portalUrl: '', contactEmail: 'hello@your-domain.com' }

const yearlyToggle = document.querySelector('[data-billing-toggle]')
const pricingCards = Array.from(document.querySelectorAll('[data-plan-key]'))
const planActions = Array.from(document.querySelectorAll('[data-plan-action]'))
const portalLinks = Array.from(document.querySelectorAll('[data-portal-link]'))
const yearlySavings = document.querySelector('[data-yearly-savings]')
const billingStatus = document.querySelector('[data-billing-status]')

function formatPrice(value) {
  if (!value && value !== 0) return ''
  return `$${value}`
}

function getPlanHref(key) {
  const plan = billing.plans[key]
  if (!plan) return '#'
  if (plan.href) return plan.href
  return `mailto:${billing.contactEmail}?subject=${encodeURIComponent(`Roster ${plan.label}`)}`
}

function getDisplayedPlanKey(baseKey, yearly) {
  if (!yearly) return baseKey
  if (baseKey === 'proMonthly') return 'proYearly'
  if (baseKey === 'maxMonthly') return 'maxYearly'
  return baseKey
}

function hasHostedBillingLink(key) {
  return Boolean(billing.plans[key]?.href)
}

function updateBillingStatus() {
  if (!billingStatus) return

  const hostedCheckoutReady = ['proMonthly', 'proYearly', 'maxMonthly', 'maxYearly'].some((key) => hasHostedBillingLink(key))
  billingStatus.textContent = hostedCheckoutReady
    ? 'Checkout is live for the plans you have configured. Unconfigured plans will fall back to email.'
    : 'Checkout links are not configured yet. Pricing buttons will open email so interested users can contact you directly.'
}

function updatePricingMode() {
  const yearly = Boolean(yearlyToggle?.checked)
  document.body.dataset.billingMode = yearly ? 'yearly' : 'monthly'

  pricingCards.forEach((card) => {
    const baseKey = card.getAttribute('data-plan-key')
    const key = getDisplayedPlanKey(baseKey, yearly)
    const plan = billing.plans[key]
    if (!plan) return

    const priceNode = card.querySelector('[data-plan-price]')
    const cadenceNode = card.querySelector('[data-plan-cadence]')
    const metaNode = card.querySelector('[data-plan-meta]')

    if (!priceNode || !cadenceNode || !metaNode) return

    if (baseKey === 'free') {
      priceNode.textContent = '$0'
      cadenceNode.textContent = 'forever'
      metaNode.textContent = 'Local-first workspace for one device.'
      return
    }

    if (yearly && plan.priceYearly) {
      priceNode.textContent = formatPrice(plan.priceYearly)
      cadenceNode.textContent = 'per year'
      metaNode.textContent = plan.metaYearly || plan.meta || ''
      return
    }

    priceNode.textContent = formatPrice(plan.priceMonthly)
    cadenceNode.textContent = 'per month'
    metaNode.textContent = plan.metaMonthly || plan.meta || ''
  })

  if (yearlySavings) {
    const proMonthly = billing.plans.proMonthly?.priceMonthly || 0
    const proYearly = billing.plans.proYearly?.priceYearly || 0
    if (yearly && proMonthly && proYearly) {
      const totalSavings = proMonthly * 12 - proYearly
      yearlySavings.textContent = `You save ${formatPrice(totalSavings)}/yr on Pro annual`
    } else {
      yearlySavings.textContent = 'Switch to annual to save'
    }
  }

  planActions.forEach((button) => {
    const baseKey = button.getAttribute('data-plan-action')
    const key = getDisplayedPlanKey(baseKey, yearly)
    const href = getPlanHref(key)
    const missingBilling = baseKey !== 'free' && href.startsWith('mailto:')
    button.setAttribute('href', href)
    button.dataset.missingBilling = missingBilling ? 'true' : 'false'

    if (baseKey === 'free') {
      button.textContent = 'Open the app'
      return
    }

    button.textContent = missingBilling
      ? `Contact for ${baseKey === 'maxMonthly' ? 'Roster Max' : 'Pro'}`
      : baseKey === 'maxMonthly'
        ? 'Join Max'
        : 'Start Pro'
  })

  updateBillingStatus()
}

function updatePortalLinks() {
  portalLinks.forEach((link) => {
    if (billing.portalUrl) {
      link.href = billing.portalUrl
      link.textContent = 'Manage billing'
      link.removeAttribute('aria-disabled')
    } else {
      link.href = `mailto:${billing.contactEmail}?subject=${encodeURIComponent('Roster billing help')}`
      link.textContent = 'Billing help'
      link.removeAttribute('aria-disabled')
    }
  })
}

yearlyToggle?.addEventListener('change', updatePricingMode)

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-scroll-to]')
  if (!trigger) return
  const target = document.querySelector(trigger.getAttribute('data-scroll-to'))
  if (!target) return
  event.preventDefault()
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

updatePortalLinks()
updatePricingMode()
