"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { StructuredData, PlaybookArticleSchema } from '@/components/StructuredData';
import { Eyebrow } from '@/components/ui/eyebrow';
import { NewsletterCTA } from '@/components/newsletter/NewsletterCTA';

const ProductPlaybook = () => {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<Record<string, boolean>>({});

  const playbook = {
    crossCutting: {
      title: "Cross-Cutting Themes",
      subtitle: "Foundational Elements Across All Phases",
      gotcha: "Most teams treat these as docs to write later. The ones that ship wire up analytics, feedback, and risk tracking before the first line of product code, because retrofitting them hurts.",
      sections: [
        {
          name: "Customer Feedback & Research",
          items: [
            { title: "Continuous Discovery", desc: "Regular customer interviews, surveys, usability testing throughout all phases" },
            { title: "Feedback Channels", desc: "In-app feedback, support tickets, NPS, user forums, social listening" },
            { title: "Research Repository", desc: "Centralized insights database, tagging system, access for all teams" },
            { title: "Customer Advisory Board", desc: "Strategic customers for deep partnership and co-innovation" }
          ]
        },
        {
          name: "Data & Analytics Strategy",
          items: [
            { title: "Metrics Framework", desc: "North Star metric, OKRs, KPIs for each phase. For AI products, include model performance metrics, prediction accuracy, and business impact measures" },
            { title: "Analytics Infrastructure", desc: "Event tracking, data warehouse, BI tools (Amplitude, Mixpanel, Tableau). AI products require specialized ML monitoring tools like Weights & Biases, MLflow" },
            { title: "Data Governance", desc: "Data quality, ownership, privacy compliance, retention policies. Critical for AI products due to regulatory requirements and model training needs" },
            { title: "Experimentation Platform", desc: "A/B testing framework, feature flags, statistical rigor. AI products need sophisticated experimentation for model variants and feature combinations" },
            { title: "Dashboards & Reporting", desc: "Real-time dashboards, weekly/monthly reports, data democratization. Include model performance dashboards and drift detection alerts" }
          ]
        },
        {
          name: "Risk Management",
          items: [
            { title: "Risk Register", desc: "Identify technical, market, operational, financial risks. For AI products, include model bias, data poisoning, adversarial attacks, and regulatory compliance risks" },
            { title: "Mitigation Plans", desc: "Contingency plans for top risks, ownership assignment. AI products need specific plans for model degradation, data quality issues, and ethical concerns" },
            { title: "Crisis Management", desc: "Security breach protocol, PR crisis, service outage response. Include AI-specific crisis scenarios like biased outputs, model failures, and data breaches" },
            { title: "Regular Risk Reviews", desc: "Quarterly risk assessment, update mitigation strategies. AI products require continuous monitoring of model performance and ethical implications" }
          ]
        },
        {
          name: "Stakeholder Management",
          items: [
            { title: "Stakeholder Mapping", desc: "Identify all stakeholders, influence vs interest matrix" },
            { title: "Communication Plan", desc: "Regular updates, format by audience, feedback mechanisms" },
            { title: "Executive Alignment", desc: "Monthly business reviews, strategic alignment, resource requests" },
            { title: "Cross-Functional Sync", desc: "Engineering, design, sales, marketing, support alignment" }
          ]
        },
        {
          name: "Financial Planning & Management",
          items: [
            { title: "Budget Planning", desc: "Headcount, tools, infrastructure, marketing spend allocation" },
            { title: "ROI Projections", desc: "Revenue forecasts, cost models, break-even analysis" },
            { title: "Financial Tracking", desc: "Monthly actuals vs budget, variance analysis, reforecasting" },
            { title: "Investment Cases", desc: "Business cases for major investments, payback calculations" }
          ]
        },
        {
          name: "AI Product Strategy",
          items: [
            { title: "Defensibility Framework", desc: "Build moats through data network effects, proprietary workflows, and domain expertise. Focus on creating switching costs and unique value propositions" },
            { title: "Value Chain Innovation", desc: "Identify new value chains that AI enables. Don't just automate existing processes; reimagine entire workflows and create new business models" },
            { title: "Competitive Differentiation", desc: "Move beyond feature parity to fundamental workflow transformation. Build products that competitors can't easily replicate due to data advantages" },
            { title: "Ethical AI Governance", desc: "Establish responsible AI practices, bias detection, transparency, and review processes as a principle from day one. The implementation (guardrails, evals, human-in-the-loop) lives in the Agentic Engineering section of Phase 2" }
          ]
        }
      ]
    },
    strategy: {
      title: "Phase 1: Strategy",
      subtitle: "Define the What and Why",
      gotcha: "The common mistake is falling in love with a solution before validating the problem. If you cannot quantify how big and how painful the problem is, you are not ready to build.",
      sections: [
        {
          name: "Vision & Mission",
          items: [
            { title: "Product Vision Statement", desc: "Long-term aspirational goal (3-5 years), inspirational and clear" },
            { title: "Mission Statement", desc: "Clear purpose: what problem are we solving and for whom?" },
            { title: "Strategic Objectives", desc: "3-5 key objectives aligned with company strategy" },
            { title: "Success Criteria", desc: "How will we measure if we've achieved our vision?" }
          ]
        },
        {
          name: "User Research & Personas",
          items: [
            { title: "Customer Discovery", desc: "Jobs-to-be-done interviews, ethnographic research, contextual inquiry" },
            { title: "User Personas", desc: "3-5 detailed personas with goals, pain points, behaviors" },
            { title: "Customer Journey Mapping", desc: "Current state vs future state, touchpoints, emotions, pain points" },
            { title: "Empathy Maps", desc: "What users think, feel, say, do: deep empathy building" }
          ]
        },
        {
          name: "Problem & Solution",
          items: [
            { title: "Problem Discovery", desc: "Customer interviews, pain point analysis, observation" },
            { title: "Problem Validation", desc: "Quantify the problem: how big, how frequent, how painful?" },
            { title: "Solution Hypothesis", desc: "Proposed solution and why it's better than alternatives" },
            { title: "Value Proposition Canvas", desc: "Customer jobs, pains, gains vs product features, pain relievers, gain creators" },
            { title: "Competitive Analysis", desc: "Direct competitors, substitutes, alternatives: SWOT analysis" },
            { title: "Differentiation Strategy", desc: "What makes us 10x better? Defensible moat?" }
          ]
        },
        {
          name: "Market Sizing & Business Model",
          items: [
            { title: "TAM (Total Addressable Market)", desc: "Total market demand for the solution: top down and bottom up" },
            { title: "SAM (Serviceable Addressable Market)", desc: "Segment we can reach with our channels and capabilities" },
            { title: "SOM (Serviceable Obtainable Market)", desc: "Realistic market share we can capture (Year 1-3)" },
            { title: "Market Trends", desc: "Growth trajectory, regulatory changes, technology shifts, macro trends" },
            { title: "Business Model Canvas", desc: "Revenue streams, cost structure, key partners, channels, resources" },
            { title: "Unit Economics", desc: "CAC, LTV, gross margin, payback period, economics by segment" }
          ]
        },
        {
          name: "Strategic Alternatives & Feasibility",
          items: [
            { title: "Build vs Buy vs Partner", desc: "Should we build in-house, acquire, or partner?" },
            { title: "Technical Feasibility", desc: "Proof of concepts, technology risk assessment, architecture spikes" },
            { title: "Regulatory & Legal Review", desc: "IP strategy, patents, compliance requirements, legal risks" },
            { title: "Resource Assessment", desc: "Do we have the skills, budget, time? What's missing?" }
          ]
        },
        {
          name: "Product Roadmapping",
          items: [
            { title: "Feature Prioritization Framework", desc: "RICE, Value vs Effort, Kano Model, ICE: choose and apply consistently" },
            { title: "MVP Definition", desc: "Minimum Viable Product: smallest feature set for validation" },
            { title: "Phased Rollout Plan", desc: "MVP → V1.0 → V2.0: clear themes and goals per phase" },
            { title: "Timeline & Milestones", desc: "Key dates, dependencies, critical path, buffer time" },
            { title: "Resource Requirements", desc: "Team size, skills needed, budget allocation, tools" },
            { title: "Success Metrics by Phase", desc: "What does good look like at each milestone?" }
          ]
        }
      ]
    },
    build: {
      title: "Phase 2: Build (Product Execution)",
      subtitle: "Build and Validate",
      gotcha: "Teams over-invest in architecture and under-invest in shipping something real users touch. A perfect system nobody has tried is just an expensive guess.",
      sections: [
        {
          name: "Development Planning",
          items: [
            { title: "Technical Architecture", desc: "System design, tech stack, scalability, reliability, security by design" },
            { title: "Data Architecture", desc: "Data models, storage, pipelines, privacy, governance" },
            { title: "Team Structure", desc: "Squad model, roles (eng, design, PM, QA), RACI, decision-making" },
            { title: "Sprint Planning", desc: "Agile/Scrum setup, sprint length (2 weeks), ceremonies, definition of done" },
            { title: "Development Methodology", desc: "Agile, Scrum, Kanban, Scrumban: define your process" },
            { title: "Tool Stack Setup", desc: "Jira, Figma, GitHub, Slack, CI/CD pipeline, monitoring tools" }
          ]
        },
        {
          name: "Product Development",
          items: [
            { title: "User Stories & Requirements", desc: "Detailed specs, acceptance criteria, edge cases, wire flows" },
            { title: "Design System", desc: "UI/UX design, prototypes, design tokens, component library" },
            { title: "Accessibility (A11y)", desc: "WCAG 2.1 AA compliance, screen readers, keyboard navigation, color contrast" },
            { title: "Internationalization (i18n)", desc: "Multi-language support, RTL, date/time formats, currency" },
            { title: "Development Sprints", desc: "2-week sprints, daily standups, sprint reviews, retrospectives" },
            { title: "API & Integration Design", desc: "RESTful/GraphQL APIs, third-party integrations, webhooks" },
            { title: "Security & Compliance", desc: "Security reviews, penetration testing, GDPR, SOC2, data encryption" }
          ]
        },
        {
          name: "Custom Models & Fine-Tuning (If Applicable)",
          items: [
            { title: "Data Strategy", desc: "Training data collection, labeling, quality, and synthetic data. Most agentic products need none of this; reach for a custom model only when prompting plus retrieval provably falls short" },
            { title: "Model Development", desc: "Algorithm selection, training or fine-tuning pipeline, hyperparameter tuning. Weigh it against the cost of staying on a frontier API you do not have to maintain" },
            { title: "Orchestration, Evals & Guardrails", desc: "The production concerns (tracing, evaluation, guardrails, MLOps, human-in-the-loop) live in the Agentic Engineering section below. This is where most of the real reliability work happens" }
          ]
        },
        {
          name: "Quality Assurance & DevOps",
          items: [
            { title: "Testing Strategy", desc: "Unit, integration, E2E, performance, security, accessibility testing" },
            { title: "Test Automation", desc: "CI/CD pipeline, automated test coverage, regression testing" },
            { title: "Bug Tracking & Resolution", desc: "Bug triage, prioritization (P0-P3), resolution SLAs" },
            { title: "Code Quality", desc: "Code reviews, static analysis, technical debt tracking, documentation" },
            { title: "Performance Benchmarks", desc: "Load testing, stress testing, response times, uptime SLAs" },
            { title: "DevOps & Infrastructure", desc: "CI/CD, blue-green deployment, monitoring, alerting, incident response" }
          ]
        },
        {
          name: "Documentation & Knowledge",
          items: [
            { title: "Technical Documentation", desc: "Architecture docs, API docs, system diagrams, runbooks" },
            { title: "User Documentation", desc: "Help center, FAQs, tutorials, video guides" },
            { title: "Internal Knowledge Base", desc: "Decision logs, ADRs, onboarding docs, tribal knowledge capture" }
          ]
        },
        {
          name: "Vendor & Partner Management",
          items: [
            { title: "Third-Party Integrations", desc: "Vendor selection, contract negotiation, integration planning" },
            { title: "SLA Management", desc: "Vendor SLAs, escalation procedures, performance monitoring" },
            { title: "Dependency Tracking", desc: "Critical dependencies, risk mitigation, backup plans" }
          ]
        },
        {
          name: "Pre-Launch Validation",
          items: [
            { title: "Alpha Testing", desc: "Internal testing, dogfooding, stakeholder feedback, bug bash" },
            { title: "Beta Program", desc: "Select external users, structured feedback, NDA, early access benefits" },
            { title: "Product-Market Fit Signals", desc: "Usage patterns, retention, satisfaction scores, qualitative feedback" },
            { title: "Launch Readiness Review", desc: "Go/no-go criteria, risk assessment, rollback plan, support readiness" }
          ]
        }
      ]
    },
    agentic: {
      title: "Phase 2 · Agentic Engineering",
      subtitle: "The Engineering Core of Build",
      gotcha: "The demo that works once is not the product. Almost every failed Gen AI project died here: no evals, no tracing, no guardrails, so nobody could tell why it broke or trust it with real work.",
      sections: [
        {
          name: "Agent Orchestration & Control Flow",
          items: [
            { title: "Topology Decision", desc: "Start with the simplest thing that works: a single agent with good tools beats a multi-agent swarm until you can prove you need handoffs. Add agents for separation of concerns, not because it demos well" },
            { title: "Workflow vs Autonomy", desc: "Use deterministic, coded workflows for steps you already understand; reserve open-ended agent loops for the genuinely ambiguous parts. The most reliable systems are mostly workflow with a small autonomous core" },
            { title: "Explicit State Management", desc: "Make agent state a structured object you can log, inspect, and replay, not something buried in conversation history. Recursive loops need a termination condition and a step budget or they run forever" },
            { title: "Routing & Decomposition", desc: "Break complex tasks into a planner that decomposes and workers that execute. Route by intent and difficulty so easy requests never hit your most expensive path" },
            { title: "Loop Control", desc: "Cap iterations, detect no-progress loops, and define explicit success and failure exits. An agent that cannot finish is worse than one that fails fast" }
          ]
        },
        {
          name: "Context Engineering & Memory",
          items: [
            { title: "Context Budgeting", desc: "Treat the context window as a scarce budget, not a dumping ground. More context is not better; irrelevant tokens degrade reasoning and cost money. Curate ruthlessly" },
            { title: "Retrieval (RAG) Quality", desc: "Retrieval quality, not the LLM, is usually the bottleneck. Invest in chunking, embeddings, and re-ranking, and evaluate retrieval on its own before blaming the model" },
            { title: "Memory Layers", desc: "Separate short-term (this task), long-term (durable facts), and episodic memory. Decide what persists, what expires, and how memory gets written, or it becomes noise" },
            { title: "Prompt & Instruction Design", desc: "Version system prompts like code. Be specific, give examples, and state what the agent must not do. Tool descriptions are prompts too: vague schemas cause bad calls" },
            { title: "Grounding & Citations", desc: "Force answers to cite retrieved sources so outputs are checkable and hallucinations become visible. Ungrounded confidence is the failure mode that erodes trust fastest" }
          ]
        },
        {
          name: "Tool & Action Design",
          items: [
            { title: "Tool Schema Design", desc: "Tools are the agent's API to the world. Clear names, typed arguments, and tight descriptions matter more than model choice for reliable tool-calling" },
            { title: "Idempotency & Side Effects", desc: "Assume the agent will retry, double-call, or call out of order. Make write actions idempotent and reversible where possible; never let a retry charge a card twice" },
            { title: "Least-Privilege Permissions", desc: "Give each tool only the access it needs. An agent with broad write access is a security incident waiting to happen" },
            { title: "Error Handling & Recovery", desc: "Return structured, actionable errors the agent can reason about, not raw stack traces. How a tool fails decides whether the agent recovers or spirals" },
            { title: "Approval Gates", desc: "Put irreversible or high-stakes actions (moving money, emailing customers, deleting data) behind explicit human or policy approval" }
          ]
        },
        {
          name: "Evaluation & Testing",
          items: [
            { title: "Eval Harness First", desc: "Build the eval before you optimize. Without a way to measure task success you are tuning prompts by vibes. This is the single highest-leverage investment in an agent project" },
            { title: "Golden Datasets", desc: "Curate representative test cases, including the messy and adversarial ones. Grow the set every time you find a failure in production" },
            { title: "LLM-as-Judge", desc: "Use models to grade open-ended outputs against rubrics for scale, but calibrate the judge against human labels so you can trust the score" },
            { title: "Regression Testing in CI", desc: "Every prompt, model, or tool change can silently break something that worked. Run evals in CI and gate releases on them" },
            { title: "Offline vs Online Eval", desc: "Offline evals catch regressions before ship; online signals (task completion, escalation rate, thumbs-down) tell you what actually happens with real users. You need both" }
          ]
        },
        {
          name: "Observability & Tracing",
          items: [
            { title: "End-to-End Tracing", desc: "Trace every run as a tree of steps: prompts, tool calls, retrievals, outputs. When an agent misbehaves you debug the trace instead of guessing. Non-negotiable for production" },
            { title: "Cost & Latency Telemetry", desc: "Track tokens, dollars, and latency per step and per task, not just per request. This is where margins live or die" },
            { title: "Prompt & Completion Logging", desc: "Log inputs and outputs (with PII handling) so you can reproduce failures and mine real usage for new eval cases" },
            { title: "Drift & Quality Monitoring", desc: "Watch for silent degradation from provider model updates, data drift, and prompt rot. Alert on success-rate drops, not just errors" },
            { title: "Replay & Debugging", desc: "Be able to replay a failed run with the same inputs. Reproducibility turns a flaky bug report into a fixable test case" }
          ]
        },
        {
          name: "Guardrails, Safety & Reliability",
          items: [
            { title: "Input & Output Validation", desc: "Validate structured outputs against a schema and reject or repair malformed responses before they reach downstream systems" },
            { title: "Prompt Injection Defense", desc: "Treat all retrieved and user content as untrusted. Anything in the context can try to hijack the agent; isolate instructions from data and constrain what tools untrusted input can trigger" },
            { title: "Hallucination Mitigation", desc: "Ground answers in retrieval, let the model abstain when unsure, and verify critical facts with a tool rather than trusting generation" },
            { title: "Fallbacks & Graceful Degradation", desc: "Plan for the model being slow, wrong, or down: timeouts, retries with backoff, model fallback routing, and a safe default when all else fails" },
            { title: "PII & Content Safety", desc: "Redact sensitive data on the way in and filter unsafe content on the way out. Compliance is a launch blocker, not a follow-up" }
          ]
        },
        {
          name: "Cost, Latency & Human-in-the-Loop",
          items: [
            { title: "Model Tiering", desc: "Route with a cheap, fast model and escalate to an expensive one only for hard steps. Paying frontier prices for trivial calls kills unit economics" },
            { title: "Caching & Reuse", desc: "Cache prompts, embeddings, and tool results aggressively. Prompt caching and memoized retrieval cut both cost and latency" },
            { title: "Latency Engineering", desc: "Stream responses, parallelize independent tool calls, and precompute what you can. Perceived speed is part of the product" },
            { title: "Unit Economics per Task", desc: "Know your fully-loaded cost per completed task and how it scales with usage. AI features can run negative margins at scale if you do not" },
            { title: "Human-in-the-Loop Design", desc: "Decide where humans review, correct, or approve, and use confidence thresholds to escalate only the uncertain cases" },
            { title: "Feedback Loops", desc: "Wire thumbs-up/down and corrections back into evals and fine-tuning. The compounding advantage comes from the loop, not the base model" }
          ]
        }
      ]
    },
    launch: {
      title: "Phase 3: Launch (GTM)",
      subtitle: "Go to Market",
      gotcha: "Most launches over-index on the launch-day spike and under-build the boring machine (onboarding, sales enablement, support) that turns attention into retained customers.",
      sections: [
        {
          name: "Market & Competitive Intelligence",
          items: [
            { title: "Market Research", desc: "Customer segments, buyer personas, decision-making process, budget authority" },
            { title: "Competitive Intelligence", desc: "Competitor features, pricing, positioning, strengths/weaknesses, market share" },
            { title: "Market Timing", desc: "Why now? Market readiness, seasonal factors, competitive windows" },
            { title: "Regulatory Landscape", desc: "Compliance requirements, certifications needed, regulatory risks" },
            { title: "Analyst Relations", desc: "Gartner, Forrester briefings, Magic Quadrant positioning" }
          ]
        },
        {
          name: "Product Positioning & Branding",
          items: [
            { title: "Target Customer Segments", desc: "Primary and secondary segments, ICP (Ideal Customer Profile)" },
            { title: "Positioning Statement", desc: "For [target] who [need], our product is [category] that [benefit]" },
            { title: "Differentiation Strategy", desc: "What makes us different and better? Competitive advantages" },
            { title: "Brand Identity", desc: "Visual identity, tone of voice, brand guidelines, design system" },
            { title: "Category Creation", desc: "Are we creating a new category or competing in existing?" }
          ]
        },
        {
          name: "Product Messaging & Content",
          items: [
            { title: "Value Proposition", desc: "Core message: why should customers care? Elevator pitch" },
            { title: "Key Messages by Audience", desc: "3-5 key points for each buyer persona" },
            { title: "Feature-Benefit Mapping", desc: "How features translate to customer benefits and business outcomes" },
            { title: "Sales Narrative & Pitch", desc: "The story we tell, demo flow, objection handling, proof points" },
            { title: "Content Strategy", desc: "Blog posts, case studies, whitepapers, videos, webinars" },
            { title: "Thought Leadership", desc: "Speaking engagements, articles, podcast appearances" }
          ]
        },
        {
          name: "Pricing, Packaging & Contracts",
          items: [
            { title: "Pricing Strategy", desc: "Value-based, competitive, cost-plus, penetration vs skimming" },
            { title: "Pricing Tiers", desc: "Free, Basic, Pro, Enterprise: feature and usage differentiation" },
            { title: "Packaging Options", desc: "Bundles, add-ons, modules, good-better-best" },
            { title: "Contract Terms", desc: "Trial period, commitment terms (monthly/annual), cancellation policy" },
            { title: "SLA Commitments", desc: "Uptime guarantees, support response times, performance benchmarks" },
            { title: "Legal Documentation", desc: "Terms of service, privacy policy, data processing agreements" }
          ]
        },
        {
          name: "Distribution & Channel Strategy",
          items: [
            { title: "Go-to-Market Motion", desc: "Product-led, sales-led, hybrid, community-led" },
            { title: "Distribution Channels", desc: "Direct, partners, resellers, marketplaces (AWS, Azure, etc.)" },
            { title: "Channel Partner Program", desc: "Partner recruitment, enablement, incentives, co-marketing" },
            { title: "Marketplace Strategy", desc: "App stores, SaaS marketplaces, integration directories" },
            { title: "Platform & Ecosystem", desc: "APIs for third parties, developer relations, SDK/documentation" }
          ]
        },
        {
          name: "Sales & Customer Success Setup",
          items: [
            { title: "Sales Enablement", desc: "Training, demo scripts, pitch decks, battle cards, objection handling" },
            { title: "Sales Tools", desc: "CRM setup, sales collateral, ROI calculators, proposal templates" },
            { title: "Customer Success Playbooks", desc: "Onboarding flows, adoption milestones, health scores" },
            { title: "Support Infrastructure", desc: "Help desk, knowledge base, chatbot, support team training" },
            { title: "Customer Onboarding", desc: "Welcome emails, product tours, setup assistance, first value delivered" }
          ]
        },
        {
          name: "Launch Execution & Communications",
          items: [
            { title: "Launch Strategy", desc: "Soft launch vs hard launch, phased rollout, target audiences" },
            { title: "Launch Timeline", desc: "T-minus countdown, key milestones, coordination across teams" },
            { title: "Marketing Campaign", desc: "Email, social, paid ads, content marketing, SEO, events" },
            { title: "PR & Communications", desc: "Press releases, media outreach, influencer partnerships" },
            { title: "Internal Launch", desc: "All-hands announcement, internal enablement, celebration" },
            { title: "Launch Metrics Dashboard", desc: "Day 1, Week 1, Month 1 tracking - signups, activation, retention" },
            { title: "Launch Risk Management", desc: "Rollback plan, crisis communication, on-call schedule" }
          ]
        }
      ]
    },
    scale: {
      title: "Phase 4: Scale (Post Launch)",
      subtitle: "Grow and Optimize",
      gotcha: "The trap is chasing new acquisition while a leaky retention bucket drains it. Fix activation and retention before you pour money into the top of the funnel.",
      sections: [
        {
          name: "Product-Market Fit Validation",
          items: [
            { title: "PMF Assessment", desc: "Sean Ellis test (40% very disappointed), retention cohorts, usage intensity" },
            { title: "Customer Satisfaction", desc: "NPS, CSAT, customer interviews, churn analysis" },
            { title: "Value Delivery Metrics", desc: "Time to value, aha moments, feature adoption, engagement depth" },
            { title: "Economic Validation", desc: "LTV:CAC ratio >3, payback <12 months, gross margin >70%" }
          ]
        },
        {
          name: "Product-Led Growth Motion",
          items: [
            { title: "Activation Optimization", desc: "Time to value, onboarding completion rate, aha moment achievement" },
            { title: "Viral Loops & Referrals", desc: "Referral programs, sharing mechanisms, network effects, invite flows" },
            { title: "Self-Service Model", desc: "Freemium optimization, free-to-paid conversion, product-qualified leads" },
            { title: "In-Product Education", desc: "Tooltips, tutorials, empty states, feature discovery, progressive disclosure" },
            { title: "Growth Experiments", desc: "A/B testing roadmap, experimentation velocity, learning documentation" }
          ]
        },
        {
          name: "Optimize Acquisition & Activation",
          items: [
            { title: "Acquisition Channels", desc: "SEO, SEM, content, partnerships, events - double down on what works" },
            { title: "Channel Mix Optimization", desc: "Budget allocation, CAC by channel, channel saturation analysis" },
            { title: "Conversion Rate Optimization", desc: "Landing pages, signup flows, checkout, trial conversion" },
            { title: "Onboarding Flow Refinement", desc: "User onboarding, time to first value, setup completion, drop-off analysis" },
            { title: "Customer Segmentation", desc: "Identify high-value segments, personalization, targeted campaigns" },
            { title: "CAC Reduction", desc: "Efficiency improvements, organic growth, referral programs" }
          ]
        },
        {
          name: "Retention & Engagement",
          items: [
            { title: "Usage Analytics", desc: "Feature adoption, engagement patterns, power user behaviors, cohort analysis" },
            { title: "Retention Programs", desc: "Email campaigns, push notifications, re-engagement, win-back campaigns" },
            { title: "Churn Analysis", desc: "Why customers leave, early warning signals, exit interviews" },
            { title: "Customer Health Scores", desc: "Predictive models for churn risk and expansion opportunity" },
            { title: "Community Building", desc: "User forums, events, champions program, user groups" },
            { title: "Feature Enhancement", desc: "Iterative improvements based on feedback and data, feature requests" },
            { title: "Customer Expansion", desc: "Cross-sell, upsell motions, usage-based growth, account expansion" }
          ]
        },
        {
          name: "Monetization & Pricing Optimization",
          items: [
            { title: "Pricing Experiments", desc: "Test different price points, packaging, discount strategies" },
            { title: "Expansion Revenue", desc: "Upsell, cross-sell, usage-based pricing optimization, add-ons" },
            { title: "Unit Economics Review", desc: "Track LTV:CAC ratio, payback period, gross margin improvement" },
            { title: "Monetization Features", desc: "Premium features, add-ons, professional services, enterprise features" },
            { title: "Contract Optimization", desc: "Annual vs monthly, multi-year deals, volume discounts, enterprise deals" },
            { title: "Packaging Refinement", desc: "Feature migration between tiers, new tier creation, bundling strategy" }
          ]
        },
        {
          name: "Scale Operations & Infrastructure",
          items: [
            { title: "Infrastructure Scaling", desc: "Performance optimization, cost efficiency, auto-scaling, multi-region" },
            { title: "Team Scaling", desc: "Hiring plan, org structure, onboarding, knowledge management" },
            { title: "Process Optimization", desc: "Automation, operational excellence, efficiency gains, documentation" },
            { title: "Technical Debt Management", desc: "Code refactoring, platform modernization, architecture evolution" },
            { title: "Security & Compliance", desc: "Regular audits, certifications (SOC2, ISO), vulnerability management" }
          ]
        },
        {
          name: "Market Expansion & Innovation",
          items: [
            { title: "Geographic Expansion", desc: "New regions, localization, local partnerships, regulatory compliance" },
            { title: "Vertical Expansion", desc: "New industries, vertical-specific features, case studies" },
            { title: "Segment Expansion", desc: "SMB to Enterprise, B2C to B2B, new buyer personas" },
            { title: "Innovation Pipeline", desc: "Next generation features, product line extensions, new products" },
            { title: "Competitive Response", desc: "Monitor competitors, rapid response, feature parity, differentiation" },
            { title: "M&A Strategy", desc: "Acquisition targets, integration planning, build vs buy decisions" }
          ]
        },
        {
          name: "Strategic Metrics & Governance",
          items: [
            { title: "North Star Metric", desc: "Single metric that captures core value delivery" },
            { title: "OKRs & KPIs", desc: "Quarterly objectives, measurable key results, alignment cascading" },
            { title: "Dashboard Reviews", desc: "Weekly business reviews, monthly board reviews, data-driven decisions" },
            { title: "Experimentation Review", desc: "Learning synthesis, failed experiment analysis, knowledge sharing" },
            { title: "Strategic Planning", desc: "Annual planning, 3-year roadmap, resource allocation" }
          ]
        },
        {
          name: "Sustainability & Product Lifecycle",
          items: [
            { title: "Sustainability Strategy", desc: "Environmental impact, carbon footprint, ESG initiatives" },
            { title: "Feature Deprecation", desc: "Sunset process, customer migration, communication strategy" },
            { title: "Product End-of-Life", desc: "When to retire products, customer transition, data migration" },
            { title: "Platform Governance", desc: "API versioning, backward compatibility, breaking changes" }
          ]
        }
      ]
    }
  };

  const togglePhase = (phase: string) => {
    setExpandedPhase(expandedPhase === phase ? null : phase);
  };

  // Expand a phase and scroll it into view; used by the table of contents and
  // by deep links (e.g. /product-playbook#scale).
  const goToPhase = useCallback((phase: string) => {
    setExpandedPhase(phase);
    if (typeof window !== "undefined" && window.history.replaceState) {
      window.history.replaceState(null, "", `#${phase}`);
    }
    // Defer the scroll so the phase has rendered its expanded content first.
    requestAnimationFrame(() => {
      document
        .getElementById(`phase-${phase}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  // On load, honor a deep link to a specific phase.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && hash in playbook) {
      setExpandedPhase(hash);
      requestAnimationFrame(() => {
        document
          .getElementById(`phase-${hash}`)
          ?.scrollIntoView({ block: "start" });
      });
    }
    // playbook is a stable literal defined in render; intentionally run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSection = (phase: string, section: number) => {
    const key = `${phase}-${section}`;
    setExpandedSection(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData type="Article" data={PlaybookArticleSchema} />
      
      {/* Header */}
          <header className="border-b border-border py-8">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex items-center justify-between">
                <div>
                  <Link 
                    href="/"
                    className="text-2xl font-light text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    Binu Babu
                  </Link>
                  <p className="text-sm text-muted-foreground font-light">AI Product Consultant</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground font-light">AI & Gen AI Agents Playbook</p>
                  <p className="text-xs text-muted-foreground font-light">Strategic Framework for Agentic Orchestration</p>
                </div>
              </div>
            </div>
          </header>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-16 max-w-3xl">
          <Eyebrow>Playbook</Eyebrow>
          <h1 className="mt-6 text-5xl font-thin tracking-tight text-foreground md:text-6xl">
            AI &amp; Gen AI Agents Playbook
          </h1>
          <p className="mt-6 text-lg font-light leading-relaxed text-muted-foreground">
            This is the actual checklist I work from when taking an AI product
            from idea to scale: cross-cutting themes, then strategy, engineering,
            orchestration, and growth. It is long on purpose. You are meant to
            cherry-pick what fits your situation, not follow it like a recipe.
          </p>
        </div>

        {/* Strategic Context */}
        <div className="mb-12 border border-border p-8">
          <h3 className="text-xl font-light text-foreground mb-6">Strategic Context: The AI Revolution</h3>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-muted-foreground font-light">
            <div>
              <h4 className="font-light text-foreground mb-3">The Shift to Agentic AI</h4>
              <p className="mb-4">We are moving beyond text generation to autonomous execution. Defensibility no longer comes from the model itself (which is commoditized), but from the orchestration of agentic workflows that integrate with proprietary data.</p>
              <p>Focus on building systems that solve complex, multi-step business problems through reliable tool-calling and recursive state management.</p>
            </div>
            <div>
              <h4 className="font-light text-foreground mb-3">Engineering for Reliability</h4>
              <p className="mb-4">Most Gen AI experiments never make it to production, and it is usually an engineering problem rather than a model one. This playbook focuses on the work that makes agents reliable, observable, and safe enough for real enterprise use.</p>
              <p>Build products that fundamentally change how work gets done, creating new value chains through agentic autonomy.</p>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mb-12 border border-border p-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-foreground flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-light text-foreground mb-4">How to Use This Playbook</h3>
              <ul className="space-y-3 text-sm text-muted-foreground font-light">
                    <li><strong className="text-foreground">Foundations, then four phases</strong>: Cross-Cutting Themes apply throughout; Strategy, Build, Launch, and Scale run in sequence. Phase 2 has two parts: the general Build work and the Agentic Engineering that makes AI products reliable</li>
                    <li><strong className="text-foreground">Start with Cross-Cutting Themes</strong>: Establish these foundational elements before Phase 1</li>
                    <li><strong className="text-foreground">Sequential but Iterative</strong>: Follow the phases in order, but expect to loop back as you learn</li>
                    <li><strong className="text-foreground">Customize for Context</strong>: Not every item applies to every product. Prioritize based on your needs</li>
                    <li><strong className="text-foreground">Metrics-Driven</strong>: Define success metrics at each phase and track religiously</li>
                    <li><strong className="text-foreground">Cross-Functional</strong>: This requires engineering, design, sales, marketing, and support throughout</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Table of contents: jump to any section (expands + scrolls). */}
        <nav aria-label="Playbook contents" className="mb-12 border border-border p-8">
          <h3 className="mb-6 text-xl font-light text-foreground">Jump to a section</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(playbook).map(([key, phase]) => (
              <button
                key={key}
                onClick={() => goToPhase(key)}
                className="group flex items-start justify-between gap-3 border border-border p-4 text-left transition-all hover:border-foreground"
              >
                <span>
                  <span className="block font-light text-foreground">{phase.title}</span>
                  <span className="mt-1 block text-sm font-light text-muted-foreground">
                    {phase.subtitle}
                  </span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </button>
            ))}
          </div>
        </nav>

        <div className="space-y-6">
          {Object.entries(playbook).map(([key, phase]) => (
            <div
              key={key}
              id={`phase-${key}`}
              className={`scroll-mt-6 border border-border overflow-hidden`}
            >
              <button
                onClick={() => togglePhase(key)}
                className="w-full p-8 flex items-center justify-between hover:bg-muted transition-all"
              >
                <div className="text-left">
                  <h2 className="text-2xl font-light text-foreground">{phase.title}</h2>
                  <p className="text-muted-foreground mt-2 font-light">{phase.subtitle}</p>
                </div>
                {expandedPhase === key ? (
                  <ChevronDown className="w-6 h-6 text-foreground" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-foreground" />
                )}
              </button>

              {expandedPhase === key && (
                <div className="bg-background border-t border-border">
                  {/* Point-of-view callout: the opinionated take for this phase. */}
                  <div className="border-b border-border bg-muted/40 px-8 py-5">
                    <p className="text-sm font-light leading-relaxed text-muted-foreground">
                      <span className="font-medium text-foreground">What most teams get wrong: </span>
                      {phase.gotcha}
                    </p>
                  </div>
                  {phase.sections.map((section, idx) => (
                    <div key={idx} className="border-b border-border last:border-b-0">
                      <button
                        onClick={() => toggleSection(key, idx)}
                        className="w-full p-6 flex items-center justify-start hover:bg-muted transition-all"
                      >
                        <h3 className="text-lg font-light text-foreground flex-1 text-left">
                          {section.name}
                        </h3>
                        <div className="ml-4 flex-shrink-0">
                          {expandedSection[`${key}-${idx}`] ? (
                            <ChevronDown className="w-5 h-5 text-foreground" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-foreground" />
                          )}
                        </div>
                      </button>

                      {expandedSection[`${key}-${idx}`] && (
                        <div className="px-6 pb-6 space-y-4">
                          {section.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="flex gap-4 p-4 border border-border hover:border-foreground transition-all"
                            >
                              <CheckCircle2 className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-light text-foreground">
                                  {item.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-2 font-light">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 border border-border p-8">
          <h3 className="text-xl font-light text-foreground mb-6">Strategic Success Factors</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground font-light">
            <div className="border border-border p-6">
              <h4 className="font-light text-foreground mb-3">Customer Centricity</h4>
              <p>Always start with customer needs, validate continuously, and iterate based on feedback. In AI products, this means understanding not just what customers want, but how AI can fundamentally change their workflows and outcomes.</p>
            </div>
            <div className="border border-border p-6">
              <h4 className="font-light text-foreground mb-3">Data-Driven Decisions</h4>
              <p>Define metrics early, measure everything, let data guide your strategy. AI products require sophisticated measurement frameworks that capture both technical performance and business impact.</p>
            </div>
            <div className="border border-border p-6">
              <h4 className="font-light text-foreground mb-3">Speed & Iteration</h4>
              <p>Ship fast, learn quickly, and iterate. Perfect is the enemy of good. In AI development, rapid iteration is crucial for model improvement and feature validation.</p>
            </div>
            <div className="border border-border p-6">
              <h4 className="font-light text-foreground mb-3">Cross-Functional Collaboration</h4>
              <p>Break down silos, align teams, and work together toward shared goals. AI products require deep collaboration between product, engineering, data science, and business teams.</p>
            </div>
          </div>
        </div>

        {/* Email capture: turn readers into subscribers (feeds the newsletter). */}
        <NewsletterCTA
          title="Get the playbook updates"
          description="I refine this as the agentic stack changes. Drop your email and I will send the occasional update, plus new deep-dive posts. No spam."
          buttonLabel="Send it to me"
        />

        {/* Primary conversion: book a call. */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border border-border p-8 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-light text-foreground">Building something agentic?</h3>
            <p className="mt-2 max-w-xl font-light leading-relaxed text-muted-foreground">
              If you want a second set of eyes on strategy, architecture, or what
              to ship next, let us talk through it.
            </p>
          </div>
          <a
            href="https://calendar.app.google/8aUmjsXDvFni8wF38"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-shrink-0 items-center gap-3 bg-foreground px-8 py-4 font-light text-background transition-all duration-300 hover:bg-foreground/80"
          >
            <span>Book a strategy call</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-border py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between">
              <div>
                <Link 
                  href="/"
                  className="text-lg font-light text-foreground hover:text-muted-foreground transition-colors duration-300"
                >
                  Binu Babu
                </Link>
                <p className="text-sm text-muted-foreground font-light">AI Product Consultant</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground font-light">Contact</p>
                <a 
                  href="https://calendar.app.google/8aUmjsXDvFni8wF38"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground font-light hover:text-foreground transition-colors"
                >
                  Book a Strategy Call
                </a>
                <p className="text-xs text-muted-foreground font-light">linkedin.com/in/binubdaniel</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground font-light text-center">
                Use it as a starting point, adapt it to your context, and lean
                toward customer outcomes over technical perfection. If it helps,
                let me know.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProductPlaybook;