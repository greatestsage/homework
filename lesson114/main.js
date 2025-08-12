(function () {
    const openBtn = document.getElementById('open-modal');
    const overlay = document.getElementById('modal-overlay');
    const modal = overlay.querySelector('.modal');
    const closeBtn = document.getElementById('modal-close');
    const cancelBtn = overlay.querySelector('[data-action="cancel"]');
    const backdrop = overlay.querySelector('[data-close="backdrop"]');
    let lastActive = null;

    function getFocusable(el) {
        return Array.from(el.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )).filter(e => e.offsetWidth > 0 || e.offsetHeight > 0 || e === document.activeElement);
    }

    function openModal() {
        lastActive = document.activeElement;
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        window.setTimeout(() => {
            const focusables = getFocusable(modal);
            if (focusables.length) focusables[0].focus();
            else modal.focus();
        }, 50);
        document.addEventListener('keydown', onKeyDown, true);
        document.addEventListener('focus', enforceFocus, true);
    }

    function closeModal(returnFocus = true) {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKeyDown, true);
        document.removeEventListener('focus', enforceFocus, true);
        if (returnFocus && lastActive && typeof lastActive.focus === 'function') {
            lastActive.focus();
        }
    }

    function onKeyDown(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal();
            return;
        }
        if (e.key === 'Tab') {
            const focusables = getFocusable(modal);
            if (focusables.length === 0) {
                e.preventDefault();
                return;
            }
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    }

    function enforceFocus(e) {
        if (!overlay.classList.contains('open')) return;
        if (modal.contains(e.target)) return;
        e.stopPropagation();
        modal.focus();
    }

    // события
    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', () => closeModal(true));
    cancelBtn.addEventListener('click', () => closeModal(true));
    backdrop.addEventListener('click', () => closeModal(true));

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal(true);
    });

    const form = document.getElementById('sample-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = {
            name: form.name.value.trim(),
            msg: form.msg.value.trim()
        };
        alert('Сообщение отправлено:\\nИмя: ' + (data.name || '(пусто)') + '\\nСообщение: ' + (data.msg || '(пусто)'));
        closeModal(true);
        form.reset();
    });

    overlay.addEventListener('touchmove', function (e) {
        if (modal.contains(e.target)) return;
        e.preventDefault();
    }, { passive: false });
})();