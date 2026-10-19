/**
 * Faculty of Computing LMS - University of Sri Jayewardenepura
 * UI/UX Redesign Controller
 * Addressing 8 Usability Flaws via Modern Interaction Design
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================= State Management =================
  const state = {
    currentView: 'dashboard',
    theme: localStorage.getItem('foc_lms_theme') || 'light',
    fontSize: localStorage.getItem('foc_lms_font') || 'normal',
    coursesFilter: 'ALL',
    semesterFilter: 'ALL',
    noticeFilter: 'ALL',
    submissionFilter: 'ALL',
    enrolledCourses: [
      {
        id: 'se3042',
        code: 'SE3042',
        title: 'Software Architecture & Cloud Engineering',
        dept: 'DSE',
        deptName: 'Software Engineering',
        instructor: 'Dr. Chinthaka Wickramasinghe',
        progress: 68,
        credits: 3.0,
        unreadNotices: 1,
        materialsCount: 14,
        nextTask: 'Assignment 02: Kubernetes Helm Deployment',
        dueDate: 'Sunday, 11:59 PM',
        urgent: true
      },
      {
        id: 'cs3012',
        code: 'CS3012',
        title: 'Advanced Operating Systems & Distributed Architecture',
        dept: 'DCS',
        deptName: 'Computer Science',
        instructor: 'Prof. Prasad Jayaweera',
        progress: 75,
        credits: 3.0,
        unreadNotices: 0,
        materialsCount: 18,
        nextTask: 'Distributed Consensus Lab Report',
        dueDate: 'In 6 days',
        urgent: false
      },
      {
        id: 'se3023',
        code: 'SE3023',
        title: 'Mobile Application Development with Flutter',
        dept: 'DSE',
        deptName: 'Software Engineering',
        instructor: 'Dr. Ravimal Bandara',
        progress: 82,
        credits: 3.0,
        unreadNotices: 1,
        materialsCount: 12,
        nextTask: 'Milestone 2: State Management Demo',
        dueDate: 'Nov 02',
        urgent: false
      },
      {
        id: 'cs3033',
        code: 'CS3033',
        title: 'Machine Learning & Predictive Modeling',
        dept: 'DCS',
        deptName: 'Computer Science',
        instructor: 'Dr. Thilini Dahanayake',
        progress: 55,
        credits: 3.0,
        unreadNotices: 2,
        materialsCount: 16,
        nextTask: 'Kaggle Competition Dataset Analysis',
        dueDate: 'Nov 05',
        urgent: false
      },
      {
        id: 'dis3012',
        code: 'DIS3012',
        title: 'Enterprise Information Systems & IT Governance',
        dept: 'DIS',
        deptName: 'Information Systems',
        instructor: 'Mr. K. Samarasinghe',
        progress: 90,
        credits: 2.0,
        unreadNotices: 0,
        materialsCount: 10,
        nextTask: 'Case Study: ERP Implementation Failure',
        dueDate: 'Nov 08',
        urgent: false
      },
      {
        id: 'dds3021',
        code: 'DDS3021',
        title: 'Big Data Technologies & Cloud Warehousing',
        dept: 'DDS',
        deptName: 'Data Science',
        instructor: 'Dr. Asanka Perera',
        progress: 60,
        credits: 3.0,
        unreadNotices: 0,
        materialsCount: 15,
        nextTask: 'Apache Spark Streaming Pipeline',
        dueDate: 'Nov 12',
        urgent: false
      }
    ],
    materials: [
      {
        id: 'mat1',
        title: 'SE3042 - Week 9 Lecture: Microservices Communication & gRPC',
        code: 'SE3042',
        type: 'PDF Slides',
        size: '4.8 MB',
        date: '2 days ago',
        category: 'Lecture Slides'
      },
      {
        id: 'mat2',
        title: 'CS3012 - Lab Sheet 04: Inter-Process Communication & POSIX Threads',
        code: 'CS3012',
        type: 'PDF Lab Guide',
        size: '1.2 MB',
        date: 'Yesterday',
        category: 'Lab Sheet'
      },
      {
        id: 'mat3',
        title: 'SE3023 - Flutter BLoC Architecture Source Code Archive',
        code: 'SE3023',
        type: 'ZIP Codebase',
        size: '15.4 MB',
        date: '3 days ago',
        category: 'Source Code'
      },
      {
        id: 'mat4',
        title: 'CS3033 - Tutorial 03: Gradient Descent & Neural Backpropagation',
        code: 'CS3033',
        type: 'PDF Handout',
        size: '2.6 MB',
        date: 'Oct 14',
        category: 'Tutorial'
      }
    ],
    notices: [
      {
        id: 'n1',
        category: 'URGENT',
        categoryLabel: 'Critical Notice',
        badgeClass: 'urgent',
        title: 'End-of-Semester 1 Examination Timetable & Admission Card Download',
        date: 'Oct 18, 2026 • 04:30 PM',
        author: "Dean's Office, Faculty of Computing",
        content: 'All 3rd Year undergraduates eligible for Semester 1 examinations must download their official admission forms and verify their hall allocations. Duly signed admission forms must be presented at the examination hall.',
        attachment: 'USJ_FOC_Exam_Timetable_Y3S1.pdf (1.4 MB)'
      },
      {
        id: 'n2',
        category: 'ACADEMIC',
        categoryLabel: 'Academic',
        badgeClass: 'academic',
        title: 'Industrial Training / Internship Orientation Seminar 2026',
        date: 'Oct 17, 2026 • 10:00 AM',
        author: 'Industrial Placement Unit (IPU)',
        content: 'A mandatory briefing session for all Year 3 students on internship guidelines, CV preparation, and partner tech company interviews will be held via Zoom this Thursday at 5:00 PM.',
        attachment: 'Internship_Guideline_V3.pdf (850 KB)'
      },
      {
        id: 'n3',
        category: 'EXAM',
        categoryLabel: 'Examination',
        badgeClass: 'exam',
        title: 'Registration for Repeat Candidates – Semester 1 Modules',
        date: 'Oct 15, 2026 • 02:15 PM',
        author: 'Senior Assistant Registrar (Examinations)',
        content: 'Repeat application forms for all Department of Software Engineering and Computer Science modules are now open on the LMS student portal until October 25th.',
        attachment: 'Repeat_Application_Form_2026.pdf (420 KB)'
      },
      {
        id: 'n4',
        category: 'CAREER',
        categoryLabel: 'Career & Industry',
        badgeClass: 'career',
        title: 'WSO2 & IFS Campus Hackathon – Registration Extended',
        date: 'Oct 12, 2026 • 11:30 AM',
        author: 'FOC IEEE Student Branch',
        content: 'Teams of up to 4 undergraduates can participate in the annual Inter-Faculty Hackathon. Grand prizes include internship opportunities and enterprise cloud credits.',
        attachment: 'Hackathon_Rulebook_2026.pdf (2.1 MB)'
      }
    ],
    deadlines: [
      {
        id: 'd1',
        code: 'SE3042',
        title: 'Assignment 02: Kubernetes Cluster Deployment with Helm',
        due: 'Sunday, Oct 22 • 11:59 PM',
        status: 'PENDING',
        urgent: true
      },
      {
        id: 'd2',
        code: 'CS3012',
        title: 'Lab 04: POSIX Semaphores & Shared Memory Buffer',
        due: 'Tuesday, Oct 24 • 05:00 PM',
        status: 'PENDING',
        urgent: true
      },
      {
        id: 'd3',
        code: 'SE3023',
        title: 'Milestone 2: Flutter E-Commerce Application State Flow',
        due: 'Nov 02 • 11:59 PM',
        status: 'PENDING',
        urgent: false
      },
      {
        id: 'd4',
        code: 'CS3033',
        title: 'Assignment 01: Multi-Class Image Classification in PyTorch',
        due: 'Oct 10 (Closed)',
        status: 'SUBMITTED',
        urgent: false
      }
    ],
    usabilityFlaws: [
      {
        id: 1,
        title: 'Cluttered Homepage Layout',
        heuristic: 'Aesthetic and Minimalist Design (Nielsen #8)',
        targetElement: '#tab-dashboard',
        original: 'The homepage dumps announcements, promoted courses, endless category trees, results, and feedback forms in one overwhelming scrolling page.',
        solution: 'Replaced with a clean, modular dashboard featuring dedicated navigational tabs (My Courses, Notices, Tasks, Results) and high-priority cards.'
      },
      {
        id: 2,
        title: 'Difficult Course Navigation',
        heuristic: 'Efficiency of Use & Flexibility (Nielsen #7)',
        targetElement: '#tab-courses',
        original: 'Courses were buried inside deep multi-level department and academic year folders, requiring 4 to 6 clicks just to reach lecture slides.',
        solution: 'Introduced an instant "My Enrolled Courses" view with direct access to weekly materials, one-click slide downloads, and progress indicators.'
      },
      {
        id: 3,
        title: 'Limited Visibility of Search Functionality',
        heuristic: 'Recognition Rather than Recall (Nielsen #6)',
        targetElement: '#global-search-input',
        original: 'Search was tucked away inside sub-indexes, forcing users to recall category hierarchies rather than directly searching modules.',
        solution: 'Prominently positioned a global search bar in the sticky header with Ctrl+K shortcut, instant autocomplete, and course/file tag filters.'
      },
      {
        id: 4,
        title: 'Inconsistent Content & Placeholder "Lorem Ipsum"',
        heuristic: 'Consistency and Standards (Nielsen #4)',
        targetElement: '#dashboard-courses-grid',
        original: 'Homepage mixed inconsistent card styles, unstyled attachments, and contained embarrassing "Lorem Ipsum" filler promotional copy.',
        solution: 'Completely eliminated placeholder copy with authentic USJ Faculty of Computing curriculum data, unified design system tokens, and cohesive typography.'
      },
      {
        id: 5,
        title: 'Potential Accessibility Difficulties (WCAG 2.1)',
        heuristic: 'Accessibility and Inclusivity',
        targetElement: '#a11y-btn',
        original: 'Poor contrast ratios, lack of focus rings, unorganized headings, and absence of assistive toolbars made navigation difficult for visually impaired students.',
        solution: 'Added high-contrast mode, dynamic font resizer (A-/A+), keyboard skip links, clear focus indicators, and WCAG AA contrast compliance.'
      },
      {
        id: 6,
        title: 'Potential Mobile Usability Issues',
        heuristic: 'Flexibility and Mobile Ergonomics',
        targetElement: '#mobile-menu-toggle',
        original: 'Desktop-oriented long lists and tables caused severe horizontal scrolling and tiny tap targets on smartphones.',
        solution: 'Engineered a responsive drawer menu, touch-friendly bottom navigation bar (>44px touch targets), and collapsible responsive cards.'
      },
      {
        id: 7,
        title: 'Announcements Mixed with Other Content',
        heuristic: 'Visibility of System Status & Importance (Nielsen #1)',
        targetElement: '#tab-announcements',
        original: 'Urgent exam dates and circulars were scattered randomly among promotional posts and course categories, causing missed deadlines.',
        solution: 'Created a standalone Notice Hub with priority categorization (Urgent, Exam, Academic), date stamps, and prominent critical alert banners.'
      },
      {
        id: 8,
        title: 'Limited Visibility of Support Information',
        heuristic: 'Help and Documentation (Nielsen #10)',
        targetElement: '#header-help-btn',
        original: 'LMS admin contacts, password reset links, and helpdesk numbers were buried at the bottom footer of a massive page.',
        solution: 'Integrated a prominent "Help & Support" button in the top navigation, quick coordinator contacts card, expandable FAQs, and support ticketing.'
      }
    ]
  };

  // ================= Initialize App =================
  initTheme();
  renderEnrolledCourses();
  renderMaterials();
  renderDeadlines();
  renderMiniNotices();
  renderFullNotices();
  renderUsabilityMatrix();
  renderSidebarCourses();
  setupEventListeners();

  // ================= Theme & Accessibility Functions =================
  function initTheme() {
    document.body.setAttribute('data-theme', state.theme);
    document.body.setAttribute('data-font-size', state.fontSize);

    // Sync A11y menu buttons
    document.querySelectorAll('[data-set-theme]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-set-theme') === state.theme);
    });
    document.querySelectorAll('[data-font]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-font') === state.fontSize);
    });
  }

  function setTheme(theme) {
    state.theme = theme;
    localStorage.setItem('foc_lms_theme', theme);
    document.body.setAttribute('data-theme', theme);
    document.querySelectorAll('[data-set-theme]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-set-theme') === theme);
    });
    showToast(`Theme switched to ${theme.toUpperCase()} mode`, 'info');
  }

  function setFontSize(size) {
    state.fontSize = size;
    localStorage.setItem('foc_lms_font', size);
    document.body.setAttribute('data-font-size', size);
    document.querySelectorAll('[data-font]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-font') === size);
    });
  }

  // ================= Rendering Functions =================
  function renderSidebarCourses() {
    const list = document.getElementById('sidebar-enrolled-courses');
    if (!list) return;
    list.innerHTML = state.enrolledCourses.map(course => `
      <li>
        <a href="#" class="sidebar-course-link" data-open-course="${course.id}">
          <span>${course.title.length > 22 ? course.title.substring(0, 22) + '...' : course.title}</span>
          <span class="sidebar-course-code">${course.code}</span>
        </a>
      </li>
    `).join('');
  }

  function renderEnrolledCourses() {
    const grid = document.getElementById('dashboard-courses-grid');
    const fullGrid = document.getElementById('full-courses-container');
    if (!grid && !fullGrid) return;

    let filtered = state.enrolledCourses;
    if (state.coursesFilter !== 'ALL') {
      filtered = filtered.filter(c => c.dept === state.coursesFilter);
    }

    const html = filtered.map(course => `
      <div class="course-card" data-course-id="${course.id}" tabindex="0" role="button" aria-label="Open course ${course.code} ${course.title}">
        <div class="course-card-top">
          <div class="course-badge-row">
            <span class="dept-pill ${course.dept.toLowerCase()}">${course.dept}</span>
            <span class="code-pill">${course.code}</span>
          </div>
          <h3>${course.title}</h3>
          <div class="instructor-meta">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>${course.instructor}</span>
          </div>
        </div>

        <div class="course-card-bottom">
          <div class="progress-meta-row">
            <span>Course Progress</span>
            <strong>${course.progress}%</strong>
          </div>
          <div class="course-progress-bar">
            <div class="course-progress-fill" style="width: ${course.progress}%;"></div>
          </div>
          <div class="quick-open-link">
            <span>Enter Module</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>
      </div>
    `).join('');

    if (grid) grid.innerHTML = html;
    if (fullGrid) fullGrid.innerHTML = html;

    const countDisp = document.getElementById('course-count-display');
    if (countDisp) countDisp.textContent = `${filtered.length} Active Courses`;
  }

  function renderMaterials() {
    const list = document.getElementById('dashboard-materials-list');
    if (!list) return;
    list.innerHTML = state.materials.map(mat => `
      <div class="material-item">
        <div class="mat-details">
          <div class="mat-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div class="mat-info">
            <strong>${mat.title}</strong>
            <small>${mat.type} • ${mat.size} • Uploaded ${mat.date}</small>
          </div>
        </div>
        <button class="btn-dl-res" data-download-mat="${mat.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; vertical-align:middle; margin-right:4px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download
        </button>
      </div>
    `).join('');
  }

  function renderDeadlines() {
    const dashFeed = document.getElementById('dashboard-deadline-feed');
    const fullList = document.getElementById('full-submission-list');

    // Dashboard mini feed
    if (dashFeed) {
      dashFeed.innerHTML = state.deadlines.slice(0, 3).map(task => `
        <div class="task-item ${task.urgent ? 'urgent' : ''}">
          <div class="task-top">
            <span class="task-course">${task.code}</span>
            <span class="countdown-badge ${task.urgent ? 'urgent' : 'normal'}">${task.status === 'SUBMITTED' ? 'Submitted' : 'Pending'}</span>
          </div>
          <h4>${task.title}</h4>
          <div class="task-actions">
            <span class="task-due">${task.due}</span>
            <button class="btn-quick-submit" data-submit-task="${task.id}">${task.status === 'SUBMITTED' ? 'View Slip' : 'Submit File'}</button>
          </div>
        </div>
      `).join('');
    }

    // Full table view
    if (fullList) {
      let filtered = state.deadlines;
      if (state.submissionFilter !== 'ALL') {
        filtered = filtered.filter(d => d.status === state.submissionFilter);
      }
      fullList.innerHTML = filtered.map(task => `
        <div class="sub-row">
          <div class="sub-row-meta">
            <span class="sub-code-badge">${task.code}</span>
            <h4>${task.title}</h4>
            <span>Due Date: <strong>${task.due}</strong></span>
          </div>
          <span class="sub-status-pill ${task.status === 'SUBMITTED' ? 'completed' : 'pending'}">${task.status}</span>
          <button class="btn-solid-primary" data-submit-task="${task.id}">${task.status === 'SUBMITTED' ? 'Review Submission' : 'Upload Assignment'}</button>
        </div>
      `).join('');
    }
  }

  function renderMiniNotices() {
    const feed = document.getElementById('dashboard-mini-notices');
    if (!feed) return;
    feed.innerHTML = state.notices.slice(0, 3).map(n => `
      <div class="mini-notice-item" data-open-notice="${n.id}">
        <div class="mini-notice-meta">
          <span class="badge-mini-cat">${n.category}</span>
          <span>${n.date}</span>
        </div>
        <h4>${n.title}</h4>
      </div>
    `).join('');
  }

  function renderFullNotices() {
    const feed = document.getElementById('full-notices-container');
    if (!feed) return;

    let filtered = state.notices;
    if (state.noticeFilter !== 'ALL') {
      filtered = filtered.filter(n => n.category === state.noticeFilter);
    }

    feed.innerHTML = filtered.map(n => `
      <article class="notice-card ${n.category === 'URGENT' ? 'urgent' : ''}">
        <div class="notice-top-meta">
          <div class="notice-badge-group">
            <span class="badge-${n.category === 'URGENT' ? 'urgent' : 'category'}">${n.categoryLabel}</span>
            <span class="notice-author">By ${n.author}</span>
          </div>
          <time class="notice-date-stamp">${n.date}</time>
        </div>
        <h2>${n.title}</h2>
        <p>${n.content}</p>
        ${n.attachment ? `
          <div class="notice-attachment-box">
            <div class="att-info">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              <span>${n.attachment}</span>
            </div>
            <button class="btn-att-download" data-download-attachment="${n.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download PDF
            </button>
          </div>
        ` : ''}
      </article>
    `).join('');
  }

  function renderUsabilityMatrix() {
    const container = document.getElementById('usability-matrix-container');
    if (!container) return;

    container.innerHTML = state.usabilityFlaws.map(flaw => `
      <div class="audit-card">
        <div>
          <div class="audit-header">
            <span class="problem-number">Problem #${flaw.id}</span>
            <span class="heuristic-tag">${flaw.heuristic}</span>
          </div>
          <h3 class="audit-title">${flaw.title}</h3>
          <div class="audit-comparison-box">
            <div class="orig-problem">
              <strong>Old LMS Usability Flaw:</strong>
              ${flaw.original}
            </div>
            <div class="redesign-fix">
              <strong>Our HCI Solution:</strong>
              ${flaw.solution}
            </div>
          </div>
        </div>
        <button class="btn-test-fix" data-inspect-target="${flaw.targetElement}">
          Inspect Fix in UI &rarr;
        </button>
      </div>
    `).join('');
  }

  // ================= Event Listeners & Navigation =================
  function setupEventListeners() {
    // 1. Primary Navigation Tabs Switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = btn.getAttribute('data-view');
        switchView(view);
      });
    });

    // Mobile Bottom Navigation Tabs
    document.querySelectorAll('.mobile-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        if (view) switchView(view);
      });
    });

    // Banner inspect button
    const bannerInspectBtn = document.getElementById('open-usability-inspector-btn');
    if (bannerInspectBtn) {
      bannerInspectBtn.addEventListener('click', () => {
        switchView('usability');
      });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const appSidebar = document.getElementById('app-sidebar');
    if (mobileMenuBtn && appSidebar) {
      mobileMenuBtn.addEventListener('click', () => {
        const isOpen = appSidebar.classList.toggle('open');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      });
    }

    // 2. Accessibility Menu Controls
    const a11yBtn = document.getElementById('a11y-btn');
    const a11yMenu = document.getElementById('a11y-menu');
    if (a11yBtn && a11yMenu) {
      a11yBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = a11yMenu.style.display === 'none';
        a11yMenu.style.display = isHidden ? 'block' : 'none';
        a11yBtn.setAttribute('aria-expanded', isHidden);
      });
    }

    document.querySelectorAll('[data-set-theme]').forEach(btn => {
      btn.addEventListener('click', () => {
        setTheme(btn.getAttribute('data-set-theme'));
      });
    });

    document.querySelectorAll('[data-font]').forEach(btn => {
      btn.addEventListener('click', () => {
        setFontSize(btn.getAttribute('data-font'));
      });
    });

    // 3. Prominent Help & Support Center Modal (Solves Problem #8)
    const helpBtn = document.getElementById('header-help-btn');
    const mobileHelpBtn = document.getElementById('mobile-help-btn');
    const sidebarHelpBtn = document.getElementById('sidebar-support-open');
    const centerHelpBtn = document.getElementById('btn-open-help-center');
    const helpModal = document.getElementById('help-modal-overlay');
    const closeHelpBtn = document.getElementById('close-help-modal-btn');

    const openHelp = () => {
      if (helpModal) {
        helpModal.style.display = 'flex';
        helpModal.setAttribute('aria-hidden', 'false');
      }
    };
    const closeHelp = () => {
      if (helpModal) {
        helpModal.style.display = 'none';
        helpModal.setAttribute('aria-hidden', 'true');
      }
    };

    if (helpBtn) helpBtn.addEventListener('click', openHelp);
    if (mobileHelpBtn) mobileHelpBtn.addEventListener('click', openHelp);
    if (sidebarHelpBtn) sidebarHelpBtn.addEventListener('click', openHelp);
    if (centerHelpBtn) centerHelpBtn.addEventListener('click', openHelp);
    if (closeHelpBtn) closeHelpBtn.addEventListener('click', closeHelp);
    if (helpModal) {
      helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal) closeHelp();
      });
    }

    // Help Ticket Submission Simulation
    const ticketForm = document.getElementById('help-ticket-form');
    if (ticketForm) {
      ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();
        closeHelp();
        showToast('Support Ticket #8492 submitted to FOC Helpdesk. Check your student email.', 'success');
        ticketForm.reset();
      });
    }

    // 4. Global Search (Solves Problem #3)
    const searchInput = document.getElementById('global-search-input');
    const searchDropdown = document.getElementById('search-suggestions-dropdown');
    const suggestionsList = document.getElementById('suggestions-list');
    const searchClear = document.getElementById('search-clear-btn');

    if (searchInput) {
      // Hotkey Ctrl + K or '/'
      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          searchInput.focus();
          searchInput.select();
        } else if (e.key === 'Escape') {
          closeSearchDropdown();
        }
      });

      searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length > 0) {
          searchClear.style.display = 'block';
          performSearch(query);
        } else {
          searchClear.style.display = 'none';
          closeSearchDropdown();
        }
      });

      if (searchClear) {
        searchClear.addEventListener('click', () => {
          searchInput.value = '';
          searchClear.style.display = 'none';
          closeSearchDropdown();
          searchInput.focus();
        });
      }
    }

    function performSearch(query) {
      const results = [];

      // Match courses
      state.enrolledCourses.forEach(c => {
        if (c.code.toLowerCase().includes(query) || c.title.toLowerCase().includes(query) || c.instructor.toLowerCase().includes(query)) {
          results.push({
            type: 'course',
            tag: c.code,
            title: c.title,
            sub: `${c.instructor} • ${c.deptName}`,
            action: () => openCourseDrawer(c.id)
          });
        }
      });

      // Match materials
      state.materials.forEach(m => {
        if (m.title.toLowerCase().includes(query) || m.code.toLowerCase().includes(query)) {
          results.push({
            type: 'material',
            tag: m.type,
            title: m.title,
            sub: `${m.size} • ${m.category}`,
            action: () => {
              showToast(`Downloading: ${m.title}`, 'info');
              closeSearchDropdown();
            }
          });
        }
      });

      // Match notices
      state.notices.forEach(n => {
        if (n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query)) {
          results.push({
            type: 'notice',
            tag: n.category,
            title: n.title,
            sub: n.date,
            action: () => {
              switchView('announcements');
              closeSearchDropdown();
            }
          });
        }
      });

      renderSearchDropdown(results);
    }

    function renderSearchDropdown(results) {
      if (!suggestionsList || !searchDropdown) return;
      if (results.length === 0) {
        suggestionsList.innerHTML = `<div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No matching modules, materials, or notices found for "${searchInput.value}".</div>`;
      } else {
        suggestionsList.innerHTML = results.map((item, idx) => `
          <div class="suggestion-item" data-search-idx="${idx}" tabindex="0">
            <div class="suggestion-meta">
              <span class="suggestion-tag ${item.type}">${item.tag}</span>
              <div>
                <div class="suggestion-title">${item.title}</div>
                <div class="suggestion-sub">${item.sub}</div>
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        `).join('');

        suggestionsList.querySelectorAll('.suggestion-item').forEach((elem, idx) => {
          elem.addEventListener('click', () => {
            results[idx].action();
            closeSearchDropdown();
          });
        });
      }
      searchDropdown.style.display = 'block';
    }

    function closeSearchDropdown() {
      if (searchDropdown) searchDropdown.style.display = 'none';
    }

    // 5. Course Drawer Interaction
    const courseDrawerOverlay = document.getElementById('course-drawer-overlay');
    const closeDrawerBtn = document.getElementById('close-course-drawer-btn');

    document.addEventListener('click', (e) => {
      const card = e.target.closest('[data-course-id]');
      const sideLink = e.target.closest('[data-open-course]');
      if (card) {
        openCourseDrawer(card.getAttribute('data-course-id'));
      } else if (sideLink) {
        e.preventDefault();
        openCourseDrawer(sideLink.getAttribute('data-open-course'));
      }
    });

    if (closeDrawerBtn && courseDrawerOverlay) {
      closeDrawerBtn.addEventListener('click', () => {
        courseDrawerOverlay.style.display = 'none';
      });
      courseDrawerOverlay.addEventListener('click', (e) => {
        if (e.target === courseDrawerOverlay) {
          courseDrawerOverlay.style.display = 'none';
        }
      });
    }

    // Course Drawer Tabs
    document.querySelectorAll('.drawer-tab-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.drawer-tab-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const paneId = `drawer-pane-${tab.getAttribute('data-drawer-tab')}`;
        document.querySelectorAll('.drawer-content-pane').forEach(p => p.style.display = 'none');
        const targetPane = document.getElementById(paneId);
        if (targetPane) targetPane.style.display = 'block';
      });
    });

    // 6. Assignment Submission Modal
    const subModal = document.getElementById('submission-modal-overlay');
    const closeSubModalBtn = document.getElementById('close-submission-modal-btn');
    const cancelSubBtn = document.getElementById('cancel-submission-btn');
    const confirmSubBtn = document.getElementById('confirm-submission-btn');
    const fileDropzone = document.getElementById('file-dropzone');
    const fileInput = document.getElementById('submission-file-input');
    const filePreview = document.getElementById('selected-file-preview');
    const integrityCheckbox = document.getElementById('integrity-checkbox');
    const removeFileBtn = document.getElementById('remove-file-btn');

    document.addEventListener('click', (e) => {
      const submitBtn = e.target.closest('[data-submit-task]');
      const openSubmitModalBtn = e.target.closest('#btn-open-submit-modal');
      if (submitBtn || openSubmitModalBtn) {
        if (subModal) {
          subModal.style.display = 'flex';
          subModal.setAttribute('aria-hidden', 'false');
        }
      }
    });

    const closeSubmissionModal = () => {
      if (subModal) {
        subModal.style.display = 'none';
        subModal.setAttribute('aria-hidden', 'true');
        resetSubmissionForm();
      }
    };

    if (closeSubModalBtn) closeSubModalBtn.addEventListener('click', closeSubmissionModal);
    if (cancelSubBtn) cancelSubBtn.addEventListener('click', closeSubmissionModal);
    if (subModal) {
      subModal.addEventListener('click', (e) => {
        if (e.target === subModal) closeSubmissionModal();
      });
    }

    if (fileDropzone && fileInput) {
      fileDropzone.addEventListener('click', () => fileInput.click());
      fileDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileDropzone.classList.add('dragover');
      });
      fileDropzone.addEventListener('dragleave', () => fileDropzone.classList.remove('dragover'));
      fileDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        fileDropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
          handleFileSelected(e.dataTransfer.files[0].name, '3.8 MB');
        }
      });
      fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
          handleFileSelected(fileInput.files[0].name, `${(fileInput.files[0].size / (1024*1024)).toFixed(1)} MB`);
        }
      });
    }

    function handleFileSelected(name, size) {
      if (fileDropzone) fileDropzone.style.display = 'none';
      if (filePreview) {
        filePreview.style.display = 'flex';
        document.getElementById('preview-file-name').textContent = name;
        document.getElementById('preview-file-size').textContent = `${size} • Ready for upload`;
      }
      checkSubmissionValidity();
    }

    if (removeFileBtn) {
      removeFileBtn.addEventListener('click', resetSubmissionForm);
    }

    if (integrityCheckbox) {
      integrityCheckbox.addEventListener('change', checkSubmissionValidity);
    }

    function checkSubmissionValidity() {
      const hasFile = filePreview && filePreview.style.display !== 'none';
      const isAgreed = integrityCheckbox && integrityCheckbox.checked;
      if (confirmSubBtn) {
        confirmSubBtn.disabled = !(hasFile && isAgreed);
      }
    }

    function resetSubmissionForm() {
      if (fileDropzone) fileDropzone.style.display = 'flex';
      if (filePreview) filePreview.style.display = 'none';
      if (integrityCheckbox) integrityCheckbox.checked = false;
      if (confirmSubBtn) confirmSubBtn.disabled = true;
    }

    if (confirmSubBtn) {
      confirmSubBtn.addEventListener('click', () => {
        closeSubmissionModal();
        showToast('Assignment successfully submitted! Digital receipt generated.', 'success');
        // Update state
        const task = state.deadlines[0];
        if (task) task.status = 'SUBMITTED';
        renderDeadlines();
      });
    }

    // 7. Filter Pills for Courses
    document.querySelectorAll('[data-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-filter]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.coursesFilter = chip.getAttribute('data-filter');
        renderEnrolledCourses();
      });
    });

    document.querySelectorAll('[data-course-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-course-filter]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.coursesFilter = chip.getAttribute('data-course-filter');
        renderEnrolledCourses();
      });
    });

    // 8. Notice Category Filter Pills
    document.querySelectorAll('[data-notice-cat]').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('[data-notice-cat]').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.noticeFilter = pill.getAttribute('data-notice-cat');
        renderFullNotices();
      });
    });

    // 9. Notifications Bell Dropdown
    const notifBtn = document.getElementById('notif-bell-btn');
    const notifDropdown = document.getElementById('notif-dropdown');
    const notifsList = document.getElementById('notif-items-list');

    if (notifsList) {
      notifsList.innerHTML = state.notices.slice(0, 3).map(n => `
        <div class="notif-item unread" data-open-notice="${n.id}">
          <div class="notif-title">${n.title}</div>
          <div class="notif-time">${n.date}</div>
        </div>
      `).join('');
    }

    if (notifBtn && notifDropdown) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = notifDropdown.style.display === 'none';
        notifDropdown.style.display = isHidden ? 'block' : 'none';
      });
    }

    const markReadBtn = document.getElementById('mark-notifs-read');
    if (markReadBtn) {
      markReadBtn.addEventListener('click', () => {
        document.querySelectorAll('.notif-item').forEach(item => item.classList.remove('unread'));
        const badge = document.querySelector('.badge-count');
        if (badge) badge.style.display = 'none';
        showToast('All notifications marked as read', 'info');
      });
    }

    // 10. Profile Dropdown
    const profileBtn = document.getElementById('profile-toggle-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    if (profileBtn && profileDropdown) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = profileDropdown.style.display === 'none';
        profileDropdown.style.display = isHidden ? 'block' : 'none';
      });
    }

    // 11. Usability Inspector Target Buttons
    document.addEventListener('click', (e) => {
      const inspectBtn = e.target.closest('[data-inspect-target]');
      if (inspectBtn) {
        const targetSelector = inspectBtn.getAttribute('data-inspect-target');
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
          // If in another view, switch to it
          if (targetSelector.includes('dashboard') || targetSelector.includes('grid')) {
            switchView('dashboard');
          } else if (targetSelector.includes('courses')) {
            switchView('courses');
          } else if (targetSelector.includes('announcements')) {
            switchView('announcements');
          }

          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetElement.classList.add('pulse-highlight');
            showToast(`Inspecting fix: highlighted component on screen`, 'info');
            setTimeout(() => targetElement.classList.remove('pulse-highlight'), 3000);
          }, 150);
        }
      }

      // Download Action simulation
      const dlBtn = e.target.closest('[data-download-mat], [data-download-attachment], #btn-download-admission, #btn-download-transcript');
      if (dlBtn) {
        e.preventDefault();
        showToast('Generating official PDF from Faculty server...', 'info');
        setTimeout(() => {
          showToast('File download started successfully.', 'success');
        }, 800);
      }
    });

    // Close popups on click outside
    document.addEventListener('click', (e) => {
      if (notifDropdown && !notifDropdown.contains(e.target) && e.target !== notifBtn) {
        notifDropdown.style.display = 'none';
      }
      if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== profileBtn) {
        profileDropdown.style.display = 'none';
      }
      if (a11yMenu && !a11yMenu.contains(e.target) && e.target !== a11yBtn) {
        a11yMenu.style.display = 'none';
      }
      if (searchDropdown && !searchDropdown.contains(e.target) && e.target !== searchInput) {
        closeSearchDropdown();
      }
    });

    // Link triggers
    const viewAllNoticesBtn = document.getElementById('view-all-notices-btn');
    const viewAllNoticesAlert = document.getElementById('btn-view-all-notices-alert');
    if (viewAllNoticesBtn) viewAllNoticesBtn.addEventListener('click', () => switchView('announcements'));
    if (viewAllNoticesAlert) viewAllNoticesAlert.addEventListener('click', () => switchView('announcements'));

    const viewAllDeadlinesBtn = document.getElementById('view-all-deadlines-btn');
    if (viewAllDeadlinesBtn) viewAllDeadlinesBtn.addEventListener('click', () => switchView('deadlines'));

    // Stat pills quick navigation on Dashboard hero card
    document.querySelectorAll('.stat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        if (pill.classList.contains('highlight-deadline')) {
          switchView('deadlines');
        } else if (pill.classList.contains('highlight-alert')) {
          switchView('announcements');
        } else if (pill.querySelector('#stat-enrolled-count')) {
          switchView('courses');
        } else {
          switchView('results');
        }
      });
    });

    // Quick Navigation Hub Cards navigation
    document.querySelectorAll('[data-nav-dest]').forEach(card => {
      card.addEventListener('click', () => {
        const dest = card.getAttribute('data-nav-dest');
        if (dest) switchView(dest);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const dest = card.getAttribute('data-nav-dest');
          if (dest) switchView(dest);
        }
      });
    });

    const hubSupportCard = document.getElementById('hub-card-support');
    if (hubSupportCard) {
      hubSupportCard.addEventListener('click', openHelp);
      hubSupportCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openHelp();
        }
      });
    }
  }

  // ================= Helper Functions =================
  function switchView(viewName) {
    state.currentView = viewName;

    // Update Navigation Tab Buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const isTarget = btn.getAttribute('data-view') === viewName;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget);
    });

    // Update Mobile Nav
    document.querySelectorAll('.mobile-nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
    });

    // Update View Panels
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `view-${viewName}`);
    });

    // Close mobile drawer if open
    const sidebar = document.getElementById('app-sidebar');
    if (sidebar) sidebar.classList.remove('open');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openCourseDrawer(courseId) {
    const course = state.enrolledCourses.find(c => c.id === courseId);
    if (!course) return;

    document.getElementById('drawer-course-title').textContent = course.title;
    document.getElementById('drawer-course-code').textContent = course.code;
    document.getElementById('drawer-course-dept').textContent = course.dept;
    document.getElementById('drawer-instructor-name').textContent = course.instructor;

    const overlay = document.getElementById('course-drawer-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
      overlay.setAttribute('aria-hidden', 'false');
    }
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>' : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'}
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }
});
