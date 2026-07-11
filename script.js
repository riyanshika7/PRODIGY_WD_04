// === 1. ScrollSpy: Dynamic Active Navigation Links ===
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  let currentSectionId = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= (sectionTop - 180)) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
});

// === 2. Smooth Scrolling for Navigation Links ===
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      window.scrollTo({
        top: targetEl.offsetTop - 70, // Offset for sticky navbar
        behavior: 'smooth'
      });
    }
  });
});

// === 3. Interactive Project Card Mouse Tracker (Hover Glow Effect) ===
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// === 4. Dynamic Project Filter System ===
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button styling
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const tags = card.getAttribute('data-tags') || '';
      if (filterValue === 'all' || tags.split(' ').includes(filterValue)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// === 5. Skills Section Intersection Observer (Animate Progress Bars on Scroll) ===
const skillsSection = document.querySelector('#skills');
const progressBars = document.querySelectorAll('.skill-progress');

if (skillsSection && progressBars.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const level = bar.getAttribute('data-level');
          bar.style.width = level;
        });
        observer.unobserve(skillsSection); // Trigger animation once
      }
    });
  }, { threshold: 0.15 });

  observer.observe(skillsSection);
}

// === 6. Hero Title Typewriter Effect ===
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 65);
    }
  }
  window.addEventListener('DOMContentLoaded', typeWriter);
}

// === 7. Recruiter Arena: Coding Riddle Interactive Logic ===
const quizOptions = document.querySelectorAll('.opt-btn');
const feedbackContainer = document.getElementById('puzzle-feedback');

quizOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    // Reset previous option classes
    quizOptions.forEach(b => {
      b.classList.remove('correct-choice', 'wrong-choice');
    });

    const chosenVal = opt.getAttribute('data-value');
    if (chosenVal === 'number') {
      opt.classList.add('correct-choice');
      feedbackContainer.innerHTML = `
        <span class="feedback-success">🎉 Correct! JavaScript treats NaN (Not-a-Number) as a 'number' type. Resume Unlocked!</span>
        <br>
        <a href="resume.pdf" download="Riyanshika_Resume.pdf" class="download-link" id="resume-download-btn">📥 Download Resume PDF</a>
      `;
    } else {
      opt.classList.add('wrong-choice');
      feedbackContainer.innerHTML = `<span class="feedback-error">❌ Incorrect! Hint: Even though NaN stands for "Not-a-Number", typeof NaN evaluates to a standard primitive type. Try again!</span>`;
    }
  });
});

// === 8. Google Apps Script Helper (doPost) ===
// Maintained for form submissions tracking to Google Sheets
function doPost(e) {
  var spreadsheet = SpreadsheetApp.openById("1t3505J8czXrt7k_BO5lvjbACYWlq6tBFofrW16w-dXc8LpoMN3NPrdG1");
  var sheet = spreadsheet.getSheetByName("Sheet1");

  sheet.appendRow([
    new Date(),
    e.parameter.fullname,
    e.parameter.email,
    e.parameter.phone,
    e.parameter.subject,
    e.parameter.message
  ]);

  return ContentService.createTextOutput("Success");
}

// === 9. Contact Section: Copy Email Feature ===
const copyCard = document.getElementById('copy-email-card');
const copyBtn = document.getElementById('copy-email-btn');
if (copyCard && copyBtn) {
  copyCard.addEventListener('click', () => {
    const email = 'riyanshika0207@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      copyBtn.textContent = '✅';
      copyBtn.style.color = '#10b981';
      setTimeout(() => {
        copyBtn.textContent = '📋';
        copyBtn.style.color = '';
      }, 2000);
    }).catch(err => {
      console.error('Could not copy email: ', err);
    });
  });
}
