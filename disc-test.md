---
layout: home
title: "Client-Side DISC Engine"
description: "Discover Your Behavioral Profile"
date: "2026-11-11"
tags: ["DISC Assessment", "Personality Test", "Workplace Communication", "Professional Development", "Team Building", "Self Awareness", "Professional Behavioral Analysis"]
lang: en
seo:
  type: WebPage
scripts:
 - 'https://cdn.jsdelivr.net/npm/chart.js'
---
<style>
@media print {
  #intro-view,
  #quiz-view,
  .no-print {
    display: none !important;
  }

  #report-view {
    display: block !important;
  }

  .surface-card {
    border: 1px solid #ddd !important;
    box-shadow: none !important;
    break-inside: avoid;
  }

  [data-tabs] {
    display: none !important;
  }

  [data-tab-panel] {
    display: block !important;
  }
}
</style>

<!-- Intro Screen -->
<div id="intro-view" class="surface-card overflow-hidden">
  <div class="relative bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 px-6 py-12 text-white sm:px-10">
    <div class="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-brand-500/20 blur-3xl"></div>
    <div class="relative">
      <p class="text-xs font-bold uppercase tracking-[0.25em] text-brand-200">DISC Assessment</p>
      <h2 class="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">Discover Your DISC Profile</h2>
      <p class="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
        Understand your primary communication style, behavioral motivators, and decision-making habits. Complete this quick 8-question assessment to generate your personalized behavioral report.
      </p>
      <button onclick="startAssessment()" class="btn-primary mt-7"><span aria-hidden="true">&#9654;</span> Start Assessment</button>
    </div>
  </div>
  <div class="grid gap-4 p-6 sm:grid-cols-3">
    <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50"><p class="text-sm font-bold text-slate-900 dark:text-white">8 questions</p><p class="mt-1 text-xs text-slate-500 dark:text-slate-400">A quick, focused check-in.</p></div>
    <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50"><p class="text-sm font-bold text-slate-900 dark:text-white">4 dimensions</p><p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Dominance, Influence, Steadiness, Conscientiousness.</p></div>
    <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50"><p class="text-sm font-bold text-slate-900 dark:text-white">Instant report</p><p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Printable results, generated locally.</p></div>
  </div>
</div>

<!-- Questionnaire View -->
<div id="quiz-view" class="surface-card hidden overflow-hidden">
  <div class="border-b border-slate-200 p-5 sm:p-6 dark:border-slate-800">
    <div class="mb-3 flex flex-wrap items-center justify-between gap-3">
      <span id="question-step" class="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">Question 1 of 8</span>
      <span id="question-percent" class="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-950/60 dark:text-brand-200">12.5% Complete</span>
    </div>
    <div class="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" role="progressbar" aria-label="Assessment progress">
      <div id="quiz-progress-bar" class="h-full w-0 rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-[width] duration-300"></div>
    </div>
  </div>
  <div class="p-6 sm:p-8">
    <h3 id="question-title" class="font-display text-xl font-bold text-slate-900 dark:text-white"></h3>
    <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">Select the statement that best describes your natural behavioral tendency in a professional context.</p>
    <div id="options-group" class="mt-6 space-y-3"></div>
  </div>
  <div class="flex justify-between border-t border-slate-200 p-5 sm:p-6 dark:border-slate-800">
    <button id="btn-prev" onclick="prevQuestion()" class="btn-secondary hidden"><span aria-hidden="true">&larr;</span> Back</button>
    <button id="btn-next" onclick="nextQuestion()" disabled class="btn-primary ml-auto">Next <span aria-hidden="true">&rarr;</span></button>
  </div>
</div>

<!-- Executive Report View -->
<div id="report-view" class="hidden space-y-6">

  <div class="no-print flex flex-wrap items-center justify-between gap-3">
    <button onclick="resetAssessment()" class="btn-secondary"><span aria-hidden="true">&#8635;</span> Retake Test</button>
    <button onclick="window.print()" class="btn-primary"><span aria-hidden="true">&#9112;</span> Print / Save Report</button>
  </div>

  <div class="surface-card p-6 sm:p-8">
    <div class="grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
      <div>
        <span class="tag-pill">Behavioral Profile Output</span>
        <h2 id="dominant-style-name" class="mt-3 font-display text-3xl font-bold text-slate-900 dark:text-white">Dominance (The Driver)</h2>
        <p id="dominant-style-tagline" class="mt-2 text-base leading-relaxed text-slate-500 dark:text-slate-400"></p>
        <div class="mt-5 flex flex-wrap gap-2">
          <span id="badge-primary" class="tag-pill">Primary: Dominant</span>
          <span id="badge-secondary" class="tag-pill">Secondary: Steadiness</span>
        </div>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
        <p class="meta-text text-center">Score radar</p>
        <div class="mt-2 h-44"><canvas id="discChart"></canvas></div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
    <div class="surface-card border-l-4 border-l-[#dc3545] p-4">
      <p class="text-[10px] font-bold uppercase tracking-wide text-[#dc3545]">Dominance (D)</p>
      <p id="score-val-d" class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">0%</p>
      <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div id="bar-d" class="h-full w-0 rounded-full bg-[#dc3545] transition-[width] duration-500"></div></div>
    </div>
    <div class="surface-card border-l-4 border-l-[#d39e00] p-4">
      <p class="text-[10px] font-bold uppercase tracking-wide text-[#d39e00]">Influence (I)</p>
      <p id="score-val-i" class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">0%</p>
      <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div id="bar-i" class="h-full w-0 rounded-full bg-[#ffc107] transition-[width] duration-500"></div></div>
    </div>
    <div class="surface-card border-l-4 border-l-[#198754] p-4">
      <p class="text-[10px] font-bold uppercase tracking-wide text-[#198754]">Steadiness (S)</p>
      <p id="score-val-s" class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">0%</p>
      <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div id="bar-s" class="h-full w-0 rounded-full bg-[#198754] transition-[width] duration-500"></div></div>
    </div>
    <div class="surface-card border-l-4 border-l-[#0aa2c0] p-4">
      <p class="text-[10px] font-bold uppercase tracking-wide text-[#0aa2c0]">Conscientiousness (C)</p>
      <p id="score-val-c" class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">0%</p>
      <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div id="bar-c" class="h-full w-0 rounded-full bg-[#0dcaf0] transition-[width] duration-500"></div></div>
    </div>
  </div>

  <div class="surface-card overflow-hidden">
    <div class="border-b border-slate-200 px-4 pt-4 dark:border-slate-800">
      <div class="flex flex-wrap gap-2" data-tabs role="tablist" aria-label="Report sections">
        <button type="button" data-tab-target="#overview-pane" class="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm" role="tab" aria-selected="true"><span aria-hidden="true">&#9733;</span> Core Strengths</button>
        <button type="button" data-tab-target="#comm-pane" class="rounded-xl px-4 py-2 text-sm font-semibold text-slate-500" role="tab" aria-selected="false"><span aria-hidden="true">&#128172;</span> Communication Style</button>
        <button type="button" data-tab-target="#environment-pane" class="rounded-xl px-4 py-2 text-sm font-semibold text-slate-500" role="tab" aria-selected="false"><span aria-hidden="true">&#127970;</span> Work Environment</button>
        <button type="button" data-tab-target="#tips-pane" class="rounded-xl px-4 py-2 text-sm font-semibold text-slate-500" role="tab" aria-selected="false"><span aria-hidden="true">&#128161;</span> How Others Should Adapt</button>
      </div>
    </div>
    <div class="p-6 sm:p-8" data-tab-panels>
      <div id="overview-pane" data-tab-panel role="tabpanel">
        <h3 class="font-display text-lg font-bold text-slate-900 dark:text-white">Core Characteristics &amp; Key Strengths</h3>
        <div id="strengths-list" class="mt-4 grid gap-3 sm:grid-cols-2"></div>
      </div>
      <div id="comm-pane" data-tab-panel role="tabpanel" class="hidden">
        <h3 class="font-display text-lg font-bold text-slate-900 dark:text-white">Behavioral &amp; Interpersonal Style</h3>
        <p id="comm-description" class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300"></p>
      </div>
      <div id="environment-pane" data-tab-panel role="tabpanel" class="hidden">
        <h3 class="font-display text-lg font-bold text-slate-900 dark:text-white">Ideal Work Environment</h3>
        <div id="environment-list" class="mt-4 space-y-2"></div>
      </div>
      <div id="tips-pane" data-tab-panel role="tabpanel" class="hidden">
        <h3 class="font-display text-lg font-bold text-slate-900 dark:text-white">How Colleagues Should Communicate With You</h3>
        <p class="notice mt-4">Share these points with your team members to improve collaboration.</p>
        <ul id="tips-list" class="mt-3 divide-y divide-slate-100 dark:divide-slate-800"></ul>
      </div>
    </div>
  </div>
</div>

<!-- Logic & Scoring Script -->
<script>
    // Assessment Questions Data
    const questions = [
        {
            text: "When approaching a critical project deadline, your immediate priority is to:",
            options: [
                { text: "Take firm charge, make executive decisions, and drive straight for results.", trait: "D" },
                { text: "Rally the team, generate enthusiasm, and foster creative brainstorming.", trait: "I" },
                { text: "Maintain a steady pace, keep calm, and support team members directly.", trait: "S" },
                { text: "Analyze all requirements, verify accuracy, and adhere strictly to quality standards.", trait: "C" }
            ]
        },
        {
            text: "In group discussions and meetings, you are primarily recognized for:",
            options: [
                { text: "Directness, cutting to the chase, and challenging the status quo.", trait: "D" },
                { text: "High energy, persuasiveness, and expressive storytelling.", trait: "I" },
                { text: "Active listening, patience, and encouraging harmony among peers.", trait: "S" },
                { text: "Asking systematic questions, citing facts, and verifying logical consistency.", trait: "C" }
            ]
        },
        {
            text: "What type of work culture empowers you the most?",
            options: [
                { text: "Fast-paced, competitive environments with high autonomy and authority.", trait: "D" },
                { text: "Collaborative, socially dynamic environments with public recognition.", trait: "I" },
                { text: "Stable, predictable environments with clear expectations and supportive teams.", trait: "S" },
                { text: "Structured, orderly environments that prioritize quality, process, and accuracy.", trait: "C" }
            ]
        },
        {
            text: "Under heavy stress or unexpected pressure, you are most likely to:",
            options: [
                { text: "Become forceful, impatient, or overly commanding.", trait: "D" },
                { text: "Become overly talkative, emotional, or lose focus on administrative detail.", trait: "I" },
                { text: "Become hesitant, overly accommodating, or resistant to sudden change.", trait: "S" },
                { text: "Become perfectionistic, overly critical, or retreat into isolation.", trait: "C" }
            ]
        },
        {
            text: "How do you measure success in your primary role?",
            options: [
                { text: "By tangible results achieved and obstacles overcome.", trait: "D" },
                { text: "By positive relationships built and influence established.", trait: "I" },
                { text: "By long-term stability, team loyalty, and consistent performance.", trait: "S" },
                { text: "By error-free outputs, technical mastery, and compliance with standards.", trait: "C" }
            ]
        },
        {
            text: "When introducing a radical new change, your typical response is to:",
            options: [
                { text: "Embrace it boldly and focus immediately on new opportunities.", trait: "D" },
                { text: "Get excited about the possibilities and talk others into embracing it.", trait: "I" },
                { text: "Assess how it affects the team and prefer a step-by-step transition.", trait: "S" },
                { text: "Request detailed documentation, data, and rationale before agreeing.", trait: "C" }
            ]
        },
        {
            text: "Which statement best describes your natural communication style?",
            options: [
                { text: "Brief, direct, and outcome-oriented.", trait: "D" },
                { text: "Warm, energetic, and inspiring.", trait: "I" },
                { text: "Gentle, steady, and diplomatic.", trait: "S" },
                { text: "Formal, precise, and fact-focused.", trait: "C" }
            ]
        },
        {
            text: "What workplace dynamic causes you the greatest frustration?",
            options: [
                { text: "Indecisiveness, slow progress, and micromanagement.", trait: "D" },
                { text: "Strict routine, isolation, and pessimistic attitudes.", trait: "I" },
                { text: "Conflict, abrupt changes, and aggressive behavior.", trait: "S" },
                { text: "Carelessness, lack of standards, and illogical arguments.", trait: "C" }
            ]
        }
    ];

    // Detailed Metadata Dictionary for Profiles
    const profileDetails = {
        D: {
            name: "Dominance (The Driver)",
            tagline: "High D profiles are direct, decisive, problem-solvers who focus on getting immediate results.",
            strengths: [
                "Strong leadership during high-stakes crisis situations",
                "High drive for goal achievement and rapid execution",
                "Unafraid to make tough, uncomfortable decisions",
                "Overcomes obstacles with resilience and determination"
            ],
            communication: "High D individuals speak directly, plainly, and forcefully. They prefer brevity, zero fluff, and immediate focus on bottom-line results.",
            environment: [
                "High autonomy with minimal micromanagement",
                "Clear authority to make decisions and direct outcomes",
                "Challenging assignments with measurable targets"
            ],
            tips: [
                "Be brief, direct, and get straight to the point.",
                "Focus on results and solutions, not problems or small talk.",
                "Provide choices and allow them to maintain control over decisions."
            ]
        },
        I: {
            name: "Influence (The Inspirer)",
            tagline: "High I profiles are outgoing, enthusiastic, optimistic, and highly relationship-driven.",
            strengths: [
                "Exceptional persuasion, networking, and relationship building",
                "High enthusiasm that boosts team morale and engagement",
                "Creative problem-solving through collaborative dialogue",
                "Inspires others toward a shared vision"
            ],
            communication: "High I individuals are warm, expressive, and conversational. They communicate with enthusiasm and value personal connections before diving into data.",
            environment: [
                "Social, collaborative, and team-oriented workspaces",
                "Public recognition for contributions and achievements",
                "Freedom from rigid, monotonous routine"
            ],
            tips: [
                "Be warm, friendly, and allow time for light social interaction.",
                "Express enthusiasm for their ideas and acknowledge their creative input.",
                "Put agreement details in writing, as they prefer big-picture discussions over administrative details."
            ]
        },
        S: {
            name: "Steadiness (The Supporter)",
            tagline: "High S profiles are patient, reliable, calm, and dedicated team players.",
            strengths: [
                "High dependability, loyalty, and steady execution",
                "Exceptional active listening and conflict mediation skills",
                "Builds long-term trust and cohesive working relationships",
                "Methodical approach to complex, multi-step procedures"
            ],
            communication: "High S individuals communicate calmly, tactfully, and supportively. They listen attentively and seek consensus before making major shifts.",
            environment: [
                "Stable, predictable work environment with minimal sudden disruptions",
                "Cooperative team culture where harmony is valued",
                "Clear, step-by-step expectations and advance notice for change"
            ],
            tips: [
                "Approach discussions with a calm, friendly, and patient tone.",
                "Provide clear, logical steps when introducing new procedures or changes.",
                "Show genuine appreciation for their steady contributions."
            ]
        },
        C: {
            name: "Conscientiousness (The Analyst)",
            tagline: "High C profiles are precise, analytical, systematic, and focused on quality and accuracy.",
            strengths: [
                "Rigorous attention to detail and high quality standards",
                "Systematic analysis of data and risk factors",
                "Creates clear structure, organization, and documented standards",
                "Objective, fact-based problem solving"
            ],
            communication: "High C individuals communicate formally, precisely, and logically. They rely heavily on data, facts, and structure rather than intuition or emotion.",
            environment: [
                "Quiet, structured workspace that permits deep focus",
                "Clear rules, procedures, and quality benchmarks",
                "Opportunities to develop specialized expertise"
            ],
            tips: [
                "Come prepared with facts, data, and logical reasoning.",
                "Avoid emotional appeals; stick to objective standards.",
                "Give them time to evaluate information thoroughly before requiring a decision."
            ]
        }
    };

    // State variables
    let currentIdx = 0;
    let answers = new Array(questions.length).fill(null);
    let chartObj = null;

    function startAssessment() {
        document.getElementById('intro-view').classList.add('hidden');
        document.getElementById('quiz-view').classList.remove('hidden');
        renderQuizStep();
    }

    function renderQuizStep() {
        const q = questions[currentIdx];
        document.getElementById('question-step').innerText = `Question ${currentIdx + 1} of ${questions.length}`;
        
        const pct = Math.round(((currentIdx + 1) / questions.length) * 100);
        document.getElementById('question-percent').innerText = `${pct}% Complete`;
        document.getElementById('quiz-progress-bar').style.width = `${pct}%`;

        document.getElementById('question-title').innerText = q.text;

        const optsContainer = document.getElementById('options-group');
        optsContainer.innerHTML = '';

        q.options.forEach((opt, index) => {
            const isSelected = answers[currentIdx] === opt.trait;
            const card = document.createElement('div');
            card.className = `flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-left text-sm transition ${isSelected ? 'border-brand-500 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20 dark:bg-brand-950/40 dark:text-brand-100' : 'border-slate-200 bg-white hover:border-brand-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-brand-600'}`;
            card.onclick = () => selectOption(opt.trait);

            card.innerHTML = `
                <input class="mt-0.5 size-4 shrink-0 accent-brand-600" type="radio" name="discOption" id="opt-${index}" value="${opt.trait}" ${isSelected ? 'checked' : ''}>
                <label class="flex-1 font-medium leading-relaxed text-slate-700 dark:text-slate-200" for="opt-${index}">
                    ${opt.text}
                </label>
            `;
            optsContainer.appendChild(card);
        });

        // Button controls
        const btnPrev = document.getElementById('btn-prev');
        if (currentIdx > 0) {
            btnPrev.classList.remove('hidden');
        } else {
            btnPrev.classList.add('hidden');
        }

        const btnNext = document.getElementById('btn-next');
        btnNext.disabled = answers[currentIdx] === null;
        btnNext.innerHTML = currentIdx === questions.length - 1 ? 'Generate Dashboard <span aria-hidden="true">&#10003;</span>' : 'Next <span aria-hidden="true">&rarr;</span>';
    }

    function selectOption(trait) {
        answers[currentIdx] = trait;
        renderQuizStep();
    }

    function nextQuestion() {
        if (answers[currentIdx] === null) return;
        if (currentIdx < questions.length - 1) {
            currentIdx++;
            renderQuizStep();
        } else {
            buildReport();
        }
    }

    function prevQuestion() {
        if (currentIdx > 0) {
            currentIdx--;
            renderQuizStep();
        }
    }

    function buildReport() {
        document.getElementById('quiz-view').classList.add('hidden');
        document.getElementById('report-view').classList.remove('hidden');

        // Calculate Raw Scores & Percentages
        const scores = { D: 0, I: 0, S: 0, C: 0 };
        answers.forEach(t => { if (scores[t] !== undefined) scores[t]++; });

        const total = questions.length;
        const pD = Math.round((scores.D / total) * 100);
        const pI = Math.round((scores.I / total) * 100);
        const pS = Math.round((scores.S / total) * 100);
        const pC = Math.round((scores.C / total) * 100);

        // Update Progress bars & Metric Labels
        document.getElementById('score-val-d').innerText = `${pD}%`;
        document.getElementById('bar-d').style.width = `${pD}%`;

        document.getElementById('score-val-i').innerText = `${pI}%`;
        document.getElementById('bar-i').style.width = `${pI}%`;

        document.getElementById('score-val-s').innerText = `${pS}%`;
        document.getElementById('bar-s').style.width = `${pS}%`;

        document.getElementById('score-val-c').innerText = `${pC}%`;
        document.getElementById('bar-c').style.width = `${pC}%`;

        // Sort traits by highest score
        const sorted = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
        const primaryKey = sorted[0];
        const secondaryKey = sorted[1];

        const primaryProfile = profileDetails[primaryKey];
        const secondaryProfile = profileDetails[secondaryKey];

        document.getElementById('dominant-style-name').innerText = primaryProfile.name;
        document.getElementById('dominant-style-tagline').innerText = primaryProfile.tagline;

        document.getElementById('badge-primary').innerText = `Primary: ${primaryProfile.name.split(' ')[0]}`;
        document.getElementById('badge-secondary').innerText = `Secondary: ${secondaryProfile.name.split(' ')[0]}`;

        // Populate Strengths Tab
        const strengthsList = document.getElementById('strengths-list');
        strengthsList.innerHTML = '';
        primaryProfile.strengths.forEach(s => {
            strengthsList.innerHTML += `
                <div class="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200">
                    <span class="text-emerald-500" aria-hidden="true">&#10003;</span>
                    <span>${s}</span>
                </div>
            `;
        });

        // Populate Communication Tab
        document.getElementById('comm-description').innerText = primaryProfile.communication;

        // Populate Environment Tab
        const envList = document.getElementById('environment-list');
        envList.innerHTML = '';
        primaryProfile.environment.forEach(e => {
            envList.innerHTML += `
                <div class="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200">
                    <span class="text-brand-500" aria-hidden="true">&#127970;</span>
                    <span>${e}</span>
                </div>
            `;
        });

        // Populate Tips Tab
        const tipsList = document.getElementById('tips-list');
        tipsList.innerHTML = '';
        primaryProfile.tips.forEach(t => {
            tipsList.innerHTML += `
                <li class="flex items-start gap-2 py-3 text-sm text-slate-700 dark:text-slate-200">
                    <span class="text-amber-500" aria-hidden="true">&#128161;</span>
                    <span>${t}</span>
                </li>
            `;
        });

        // Render Chart.js
        const ctx = document.getElementById('discChart').getContext('2d');
        if (chartObj) chartObj.destroy();

        chartObj = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Dominance (D)', 'Influence (I)', 'Steadiness (S)', 'Conscientiousness (C)'],
                datasets: [{
                    data: [scores.D, scores.I, scores.S, scores.C],
                    backgroundColor: ['#dc3545', '#ffc107', '#198754', '#0dcaf0']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    function resetAssessment() {
        currentIdx = 0;
        answers = new Array(questions.length).fill(null);
        document.getElementById('report-view').classList.add('hidden');
        document.getElementById('intro-view').classList.remove('hidden');
    }
</script>
