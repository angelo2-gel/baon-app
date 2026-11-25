
const view = document.getElementById('view');
const toastEl = document.getElementById('toast');

/* ---------- helpers ---------- */

const ESC = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
};

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (ch) => ESC[ch]);

function toast(msg, action) {
    toastEl.innerHTML = `<span>${esc(msg)}</span>`;

    if (action) {
        const button = document.createElement('button');
        button.textContent = action.label;
        button.onclick = action.run;
        toastEl.append(button);
    }

    toastEl.hidden = false;

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
        toastEl.hidden = true;
    }, 3000);
}

/* ---------- pages ---------- */

function renderHome() {
    view.innerHTML = `
        <section class="card">
            <h2>Home</h2>
            <p class="muted">Your remaining baon will show here.</p>
        </section>
    `;
}

function renderAdd() {
    view.innerHTML = `
        <section class="card">
            <h2>Add Expense</h2>
            <p class="muted">The expense form will go here.</p>
        </section>
    `;
}

function renderHistory() {
    view.innerHTML = `
        <section class="card">
            <h2>History</h2>
            <p class="muted">Your expenses will be listed here.</p>
        </section>
    `;
}

function renderSettings() {
    view.innerHTML = `
        <section class="card">
            <h2>My Baon</h2>
            <p class="muted">Manage your baon settings here.</p>
        </section>
    `;
}

/* ---------- routes ---------- */

const routes = {
    home: renderHome,
    add: renderAdd,
    history: renderHistory,
    settings: renderSettings
};

/* ---------- router ---------- */

async function router() {
    const name = location.hash.replace('#/', '') || 'home';

    const render = routes[name] || renderHome;

    document.querySelectorAll('.tabbar a').forEach((link) => {
        link.classList.toggle(
            'active',
            link.dataset.route === name
        );
    });

    await render();

    window.scrollTo(0, 0);

    view.focus({ preventScroll: true });
}

/* ---------- navigation ---------- */

window.addEventListener('hashchange', router);

/* ---------- initialization ---------- */

router();
