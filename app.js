/* ═══════════════════════════════════════════════════════════
   scripts/app.js
   QuickWash Car Washing Service — All JavaScript

   Sections:
     1.  DOM Element References
     2.  Modal — Open / Close
     3.  Form Validation
     4.  Form Submission (with simulated async)
     5.  Hamburger Menu (Mobile)
     6.  Toast Notification
     7.  Scroll Fade-In Animations (IntersectionObserver)

   NOTE: This file is loaded at the END of <body> in index.html,
   so all HTML elements exist before this code runs.
═══════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────
   1. DOM ELEMENT REFERENCES
   querySelector / getElementById grabs
   elements from the HTML to work with.
───────────────────────────────────────── */

// All "Book Now" / "Get Started" buttons (there are several across the page)
const openBtns = document.querySelectorAll('.btn-book');

// The dark dim overlay that covers the whole screen
const modalOverlay = document.getElementById('modalOverlay');

// The ✕ close button inside the modal
const closeBtn = document.getElementById('closeModal');

// The form div inside the modal
const bookingForm = document.getElementById('bookingForm');

// The success message div inside the modal (hidden until form submits)
const successMsg = document.getElementById('successMsg');

// Individual form inputs
const inputName    = document.getElementById('inputName');
const inputEmail   = document.getElementById('inputEmail');
const inputPhone   = document.getElementById('inputPhone');
const inputService = document.getElementById('inputService');

// The "Confirm Booking" submit button
const submitBtn = document.getElementById('submitBooking');

// Hamburger icon button (top-right on mobile)
const menuToggle = document.getElementById('menuToggle');

// The <ul> that holds nav links
const navLinks = document.getElementById('navLinks');

// Toast bar (bottom-right notification)
const toast     = document.getElementById('toast');
const toastText = document.getElementById('toastText');


/* ─────────────────────────────────────────
   2. MODAL — OPEN / CLOSE
   The modal is hidden with CSS by default.
   We toggle the CSS class "open" to show it.
───────────────────────────────────────── */

/**
 * openModal()
 * Shows the booking modal and resets it to a clean state.
 */
function openModal() {
  modalOverlay.classList.add('open');   // CSS: .modal-overlay.open { display: flex }
  bookingForm.style.display = 'block';  // Make sure form is visible, not success msg
  successMsg.style.display  = 'none';   // Hide success message from a previous booking
  resetForm();                          // Clear old input values and error states
}

/**
 * closeModal()
 * Hides the booking modal.
 */
function closeModal() {
  modalOverlay.classList.remove('open');  // CSS hides it: display: none
}

// --- Attach open listeners ---
// We use forEach because querySelectorAll returns a NodeList (array-like),
// not a single element. Every "Book Now" button gets the same handler.
openBtns.forEach(function(btn) {
  btn.addEventListener('click', openModal);
});

// --- Attach close listeners ---

// 1) ✕ button click
closeBtn.addEventListener('click', closeModal);

// 2) Click OUTSIDE the modal box (on the dark overlay itself)
//    e.target is the element the user clicked.
//    If they clicked the overlay (not the box inside it), close.
modalOverlay.addEventListener('click', function(e) {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// 3) Press Escape key anywhere on the page
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});


/* ─────────────────────────────────────────
   3. FORM VALIDATION
   We validate fields before submitting.
   Errors are shown by adding/removing the
   CSS class "error" on the parent .form-group.
───────────────────────────────────────── */

/**
 * setError(groupId, hasError)
 * Adds or removes the "error" CSS class on a form group.
 *
 * @param {string}  groupId  — The id of the .form-group div  (e.g. "fg-name")
 * @param {boolean} hasError — true = show error, false = clear error
 */
function setError(groupId, hasError) {
  var group = document.getElementById(groupId);
  if (hasError) {
    group.classList.add('error');     // CSS shows red border + error text
  } else {
    group.classList.remove('error'); // CSS hides error text
  }
}

/**
 * isValidEmail(email)
 * Uses a Regular Expression (regex) to test email format.
 * Regex breakdown:  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 *   ^          — start of string
 *   [^\s@]+    — one or more chars that are NOT space or @
 *   @          — literal @
 *   [^\s@]+    — domain name part
 *   \.         — literal dot
 *   [^\s@]+    — extension (com, org, etc.)
 *   $          — end of string
 *
 * @param  {string}  email
 * @returns {boolean}
 */
function isValidEmail(email) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

/**
 * validateForm()
 * Checks all required fields. Marks errors where needed.
 *
 * @returns {boolean} — true if ALL fields pass, false if ANY fail
 */
function validateForm() {
  var isValid = true;

  // Check name: trim() removes leading/trailing whitespace
  if (!inputName.value.trim()) {
    setError('fg-name', true);
    isValid = false;
  } else {
    setError('fg-name', false);
  }

  // Check email format using our regex helper
  if (!isValidEmail(inputEmail.value.trim())) {
    setError('fg-email', true);
    isValid = false;
  } else {
    setError('fg-email', false);
  }

  // Check phone: just ensure it's not empty
  if (!inputPhone.value.trim()) {
    setError('fg-phone', true);
    isValid = false;
  } else {
    setError('fg-phone', false);
  }

  return isValid;
}

/**
 * resetForm()
 * Clears all inputs, errors, and resets the submit button text.
 * Called when the modal is opened so previous data doesn't linger.
 */
function resetForm() {
  inputName.value    = '';
  inputEmail.value   = '';
  inputPhone.value   = '';
  inputService.value = '';

  // Remove all error states
  setError('fg-name',  false);
  setError('fg-email', false);
  setError('fg-phone', false);

  // Restore submit button in case it was disabled
  submitBtn.textContent = 'Confirm Booking';
  submitBtn.disabled    = false;
}


/* ─────────────────────────────────────────
   4. FORM SUBMISSION
   We don't have a real server, so we simulate
   an async response using setTimeout().
   In a real project you'd use fetch() to POST
   to a backend API here.
───────────────────────────────────────── */

submitBtn.addEventListener('click', function() {

  // Step 1: Validate — stop immediately if any field fails
  var valid = validateForm();
  if (!valid) return;

  // Step 2: Show loading state on the button
  submitBtn.textContent = 'Booking…';
  submitBtn.disabled    = true;  // prevent double-clicks

  // Step 3: Simulate a server request with setTimeout
  //   setTimeout(callback, milliseconds)
  //   The function inside runs after 1200ms (1.2 seconds),
  //   as if we got a response from a server.
  setTimeout(function() {

    // Step 4a: Hide the form, show the success message
    bookingForm.style.display = 'none';
    successMsg.style.display  = 'block';

    // Step 4b: Show the toast notification (bottom-right)
    showToast('🎉 Booking confirmed! Check your email.');

    // Step 4c: Auto-close the modal after 3 more seconds
    //   This is a nested setTimeout — it fires 3000ms after the first one
    setTimeout(function() {
      closeModal();
    }, 3000);

  }, 1200); // end outer setTimeout
});


/* ─────────────────────────────────────────
   5. HAMBURGER MENU (Mobile)
   On small screens the nav links are hidden.
   Clicking the hamburger toggles .active on
   the <ul>, which CSS uses to show/hide it.
───────────────────────────────────────── */

/**
 * Toggle the "active" class on the nav <ul>.
 * classList.toggle() adds the class if absent, removes it if present.
 * This single line is the entire open/close logic.
 */
menuToggle.addEventListener('click', function() {
  navLinks.classList.toggle('active');
});

// When any nav link is tapped (on mobile), close the menu
// so the user isn't stuck with it open after navigating.
navLinks.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
    navLinks.classList.remove('active');
  });
});


/* ─────────────────────────────────────────
   6. TOAST NOTIFICATION
   A small bar that slides up from bottom-right.
   CSS transitions handle the animation;
   JS just adds/removes the "show" class.
───────────────────────────────────────── */

// We store the timer id so we can cancel it if showToast is called again
var toastTimer;

/**
 * showToast(message)
 * Displays a toast notification for 3 seconds.
 *
 * @param {string} message — Text to show in the toast
 */
function showToast(message) {
  // Update the text content
  toastText.textContent = message;

  // Add "show" class → CSS transition slides it up and fades it in
  toast.classList.add('show');

  // Cancel any existing timer (in case showToast was called twice quickly)
  clearTimeout(toastTimer);

  // After 3 seconds, remove "show" → CSS transition slides it back down
  toastTimer = setTimeout(function() {
    toast.classList.remove('show');
  }, 3000);
}


/* ─────────────────────────────────────────
   7. SCROLL FADE-IN ANIMATIONS
   IntersectionObserver watches elements and
   fires a callback when they enter the viewport.
   This is more performant than listening to
   the scroll event on every frame.
───────────────────────────────────────── */

/**
 * How IntersectionObserver works:
 *
 *   new IntersectionObserver(callback, options)
 *
 *   callback  — runs every time a watched element enters/leaves viewport
 *   options   — threshold: 0.15 means "fire when 15% is visible"
 *
 *   Inside the callback, "entries" is an array of observed elements.
 *   entry.isIntersecting = true  →  element just entered the viewport
 *   entry.isIntersecting = false →  element just left the viewport
 */
var scrollObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      // Apply the CSS fadeUp animation to this element
      entry.target.style.animation = 'fadeUp 0.6s ease both';

      // Stop watching this element after it has animated once
      // (so it doesn't re-animate if the user scrolls back up)
      scrollObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15   // trigger when 15% of the element is visible
});

// Tell the observer to watch every card on the page
document.querySelectorAll('.service-card, .pricing-card, .step-card')
  .forEach(function(card) {
    scrollObserver.observe(card);
  });
