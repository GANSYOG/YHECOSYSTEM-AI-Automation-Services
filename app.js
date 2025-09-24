document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Smooth scroll to sections
    document.querySelectorAll('a.nav__link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // ROI Calculator
    const roiForm = document.getElementById('roiForm');
    const savingsEl = document.getElementById('savings');

    roiForm.addEventListener('submit', e => {
        e.preventDefault();
        const homeSize = parseFloat(document.getElementById('homeSize').value);
        const energyBill = parseFloat(document.getElementById('energyBill').value);

        if (homeSize && energyBill) {
            // Example calculation: 15% monthly savings on energy bill
            const savings = energyBill * 0.15;
            savingsEl.textContent = formatINR(savings);
        } else {
            savingsEl.textContent = '-';
        }
    });

    // Indian currency formatter
    function formatINR(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
        }).format(amount);
    }
});

// Chatbot popup function placeholder
function openChatbot() {
    alert('Chatbot coming soon!');
}
