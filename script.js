(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menuButton.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  }));

  let language = 'en';
  const languageButton = document.querySelector('#language-toggle');
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next === 'hi' ? 'hi' : 'en';
    document.querySelectorAll('[data-en][data-hi]').forEach(el => {
      const value = el.dataset[next];
      if (value !== undefined) el.innerHTML = value;
    });
    languageButton.textContent = next === 'en' ? 'हिंदी' : 'English';
    languageButton.setAttribute('aria-label', next === 'en' ? 'Switch to Hindi' : 'Switch to English');
    document.querySelector('#name').placeholder = next === 'en' ? 'Name / नाम' : 'नाम / Name';
    document.querySelector('#message').placeholder = next === 'en' ? 'Location, requirement, number of staff…' : 'स्थान, जरूरत, कर्मचारियों की संख्या…';
  }
  languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'hi' : 'en'));

  document.querySelector('#year').textContent = new Date().getFullYear();
  document.querySelector('#enquiry-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const service = document.querySelector('#service').selectedOptions[0].textContent.trim();
    const message = document.querySelector('#message').value.trim();
    if (!name || !service || !message) return;
    const prefix = language === 'hi' ? 'नमस्ते HIND SECURITY FORCE & SERVICES,\nमेरा नाम ' : 'Hello HIND SECURITY FORCE & SERVICES,\nMy name is ';
    const serviceLine = language === 'hi' ? '\nमुझे इस सेवा की आवश्यकता है: ' : '\nI am enquiring about: ';
    const messageLine = language === 'hi' ? '\nमेरी जानकारी: ' : '\nRequirement details: ';
    const text = prefix + name + serviceLine + service + messageLine + message;
    const url = 'https://wa.me/919822662108?text=' + encodeURIComponent(text);
    document.querySelector('#form-status').textContent = language === 'hi' ? 'WhatsApp में आपका संदेश खोला जा रहा है…' : 'Opening your message in WhatsApp…';
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();