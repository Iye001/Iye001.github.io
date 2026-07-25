/* =========================================================
   MOBILE MENU
   ========================================================= */
document.getElementById('menuToggle').addEventListener('click', function () {
  document.getElementById('navLinks').classList.toggle('open');
});

document.querySelectorAll('#navLinks a').forEach(function (link) {
  link.addEventListener('click', function () {
    document.getElementById('navLinks').classList.remove('open');
  });
});

/* =========================================================
   AI WORKFLOW BUILDER SIMULATOR (demo section)
   ========================================================= */
const triggerBtns = document.querySelectorAll('.trigger-btn');
const actionBtns = document.querySelectorAll('.action-btn');
let selectedTrigger = null;
let selectedActions = [];

triggerBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    triggerBtns.forEach(b => b.classList.remove('active-trigger'));
    btn.classList.add('active-trigger');
    selectedTrigger = btn.getAttribute('data-value');
  });
});

actionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-value');
    if (selectedActions.includes(val)) {
      selectedActions = selectedActions.filter(a => a !== val);
      btn.classList.remove('active-action');
    } else {
      selectedActions.push(val);
      btn.classList.add('active-action');
    }
  });
});

document.getElementById('generateBtn').addEventListener('click', () => {
  const errorEl = document.getElementById('demoError');
  const output = document.getElementById('workflowOutput');
  output.innerHTML = '';

  if (!selectedTrigger) {
    errorEl.textContent = 'Please select a trigger first.';
    errorEl.style.display = 'block';
    return;
  }
  if (selectedActions.length === 0) {
    errorEl.textContent = 'Please select at least one action.';
    errorEl.style.display = 'block';
    return;
  }
  errorEl.style.display = 'none';

  const nodes = [selectedTrigger, ...selectedActions, 'Workflow Complete ✓'];

  nodes.forEach((label, i) => {
    const node = document.createElement('div');
    node.textContent = label;
    node.className = 'workflow-node' + (i === nodes.length - 1 ? ' final' : '');
    output.appendChild(node);

    if (i < nodes.length - 1) {
      const arrow = document.createElement('div');
      arrow.textContent = '→';
      arrow.className = 'workflow-arrow';
      output.appendChild(arrow);
      setTimeout(() => arrow.classList.add('visible'), i * 250 + 150);
    }

    setTimeout(() => node.classList.add('visible'), i * 250);
  });
});

/* =========================================================
   CONTACT FORM — Formspree submission
   ========================================================= */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const response = await fetch('https://formspree.io/f/mnjebzpn', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      status.textContent = "Thanks — your message has been sent. I'll get back to you soon.";
      status.style.color = '#34D399';
      status.style.display = 'block';
      form.reset();
    } else {
      status.textContent = 'Something went wrong. Please try again or email me directly.';
      status.style.color = '#F87171';
      status.style.display = 'block';
    }
  } catch (error) {
    status.textContent = 'Something went wrong. Please try again or email me directly.';
    status.style.color = '#F87171';
    status.style.display = 'block';
  }

  submitBtn.textContent = 'Send Message';
  submitBtn.disabled = false;
});
