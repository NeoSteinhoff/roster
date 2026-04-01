const billing = window.ROSTER_BILLING || { plans: {}, portalUrl: '', contactEmail: 'hello@roster.so' }

const yearlyToggle = document.querySelector('[data-billing-toggle]')
const pricingCards = Array.from(document.querySelectorAll('[data-plan-key]'))
const planActions = Array.from(document.querySelectorAll('[data-plan-action]'))
const portalLinks = Array.from(document.querySelectorAll('[data-portal-link]'))
const yearlySavings = document.querySelector('[data-yearly-savings]')

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

function updatePricingMode() {
  const yearly = Boolean(yearlyToggle?.checked)
  document.body.dataset.billingMode = yearly ? 'yearly' : 'monthly'

  pricingCards.forEach((card) => {
    const key = card.getAttribute('data-plan-key')
    const plan = billing.plans[key]
    if (!plan) return

    const priceNode = card.querySelector('[data-plan-price]')
    const cadenceNode = card.querySelector('[data-plan-cadence]')
    const metaNode = card.querySelector('[data-plan-meta]')

    if (!priceNode || !cadenceNode || !metaNode) return

    if (key === 'free') {
      priceNode.textContent = '$0'
      cadenceNode.textContent = 'forever'
      metaNode.textContent = 'Local-first workspace for one device.'
      return
    }

    if (yearly && key === 'proYearly') {
      priceNode.textContent = formatPrice(plan.priceYearly)
      cadenceNode.textContent = 'per year'
      metaNode.textContent = 'Best value for founders, operators, and creators.'
      return
    }

    const monthlyValue = plan.priceMonthly
    priceNode.textContent = formatPrice(monthlyValue)
    cadenceNode.textContent = 'per month'
    metaNode.textContent = key === 'proYearly'
      ? 'Annual plan billed yearly through Stripe Checkout.'
      : 'Monthly plan billed through Stripe Checkout.'
  })

  if (yearlySavings) {
    const monthly = billing.plans.proMonthly?.priceMonthly || 0
    const yearlyTotal = billing.plans.proYearly?.priceYearly || 0
    const monthlyEquivalent = yearlyTotal ? Math.round((monthly * 12 - yearlyTotal) / 12 * 100) / 100 : 0
    yearlySavings.textContent = yearly ? `You save ${formatPrice(monthlyEquivalent)}/mo on annual` : 'Switch to annual to save'
  }

  planActions.forEach((button) => {
    const monthlyKey = button.getAttribute('data-plan-action')
    const key = yearly && monthlyKey === 'proMonthly' ? 'proYearly' : monthlyKey
    const href = getPlanHref(key)
    button.setAttribute('href', href)
    button.dataset.missingBilling = href.startsWith('mailto:') ? 'true' : 'false'
  })
}

function updatePortalLinks() {
  portalLinks.forEach((link) => {
    if (billing.portalUrl) {
      link.href = billing.portalUrl
      link.removeAttribute('aria-disabled')
    } else {
      link.href = `mailto:${billing.contactEmail}?subject=${encodeURIComponent('Roster billing help')}`
      link.setAttribute('aria-disabled', 'true')
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
