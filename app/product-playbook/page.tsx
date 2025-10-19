"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

const ProductPlaybook = () => {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<Record<string, boolean>>({});

  const playbook = {
    crossCutting: {
      title: "Cross-Cutting Themes",
      subtitle: "Foundational Elements Across All Phases",
      color: "bg-yellow-50 border-yellow-300",
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
            { title: "Value Chain Innovation", desc: "Identify new value chains that AI enables. Don't just automate existing processes - reimagine entire workflows and create new business models" },
            { title: "Competitive Differentiation", desc: "Move beyond feature parity to fundamental workflow transformation. Build products that competitors can't easily replicate due to data advantages" },
            { title: "Ethical AI Governance", desc: "Establish responsible AI practices, bias detection, transparency measures, and ethical review processes from day one" },
            { title: "Technical Architecture", desc: "Design for AI-first: scalable ML infrastructure, real-time inference, model versioning, and continuous learning capabilities" }
          ]
        }
      ]
    },
    strategy: {
      title: "Phase 1: Strategy",
      subtitle: "Define the What and Why",
      color: "bg-blue-50 border-blue-200",
      sections: [
        {
          name: "Vision & Mission",
          items: [
            { title: "Product Vision Statement", desc: "Long-term aspirational goal (3-5 years), inspirational and clear" },
            { title: "Mission Statement", desc: "Clear purpose - what problem are we solving and for whom?" },
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
            { title: "Empathy Maps", desc: "What users think, feel, say, do - deep empathy building" }
          ]
        },
        {
          name: "Problem & Solution",
          items: [
            { title: "Problem Discovery", desc: "Customer interviews, pain point analysis, observation" },
            { title: "Problem Validation", desc: "Quantify the problem - how big, how frequent, how painful?" },
            { title: "Solution Hypothesis", desc: "Proposed solution and why it's better than alternatives" },
            { title: "Value Proposition Canvas", desc: "Customer jobs, pains, gains vs product features, pain relievers, gain creators" },
            { title: "Competitive Analysis", desc: "Direct competitors, substitutes, alternatives - SWOT analysis" },
            { title: "Differentiation Strategy", desc: "What makes us 10x better? Defensible moat?" }
          ]
        },
        {
          name: "Market Sizing & Business Model",
          items: [
            { title: "TAM (Total Addressable Market)", desc: "Total market demand for the solution - top down and bottom up" },
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
            { title: "Feature Prioritization Framework", desc: "RICE, Value vs Effort, Kano Model, ICE - choose and apply consistently" },
            { title: "MVP Definition", desc: "Minimum Viable Product - smallest feature set for validation" },
            { title: "Phased Rollout Plan", desc: "MVP → V1.0 → V2.0 - clear themes and goals per phase" },
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
      color: "bg-green-50 border-green-200",
      sections: [
        {
          name: "Development Planning",
          items: [
            { title: "Technical Architecture", desc: "System design, tech stack, scalability, reliability, security by design" },
            { title: "Data Architecture", desc: "Data models, storage, pipelines, privacy, governance" },
            { title: "Team Structure", desc: "Squad model, roles (eng, design, PM, QA), RACI, decision-making" },
            { title: "Sprint Planning", desc: "Agile/Scrum setup, sprint length (2 weeks), ceremonies, definition of done" },
            { title: "Development Methodology", desc: "Agile, Scrum, Kanban, Scrumban - define your process" },
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
          name: "AI/ML Development (If Applicable)",
          items: [
            { title: "Data Strategy", desc: "Training data collection, labeling, quality, synthetic data" },
            { title: "Model Development", desc: "Algorithm selection, training pipeline, hyperparameter tuning" },
            { title: "MLOps Setup", desc: "Model versioning, deployment pipeline, monitoring, retraining" },
            { title: "AI Ethics & Bias", desc: "Fairness assessment, bias detection, transparency, explainability" },
            { title: "Responsible AI", desc: "Safety guardrails, human-in-the-loop, feedback mechanisms" }
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
    launch: {
      title: "Phase 3: Launch (GTM)",
      subtitle: "Go to Market",
      color: "bg-purple-50 border-purple-200",
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
            { title: "Value Proposition", desc: "Core message - why should customers care? Elevator pitch" },
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
            { title: "Pricing Tiers", desc: "Free, Basic, Pro, Enterprise - feature and usage differentiation" },
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
      color: "bg-orange-50 border-orange-200",
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

  const toggleSection = (phase: string, section: number) => {
    const key = `${phase}-${section}`;
    setExpandedSection(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
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
                  <p className="text-sm text-muted-foreground font-light">AI Product Architect & Technology Consultant</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground font-light">Product Development Playbook</p>
                  <p className="text-xs text-muted-foreground font-light">Strategic Framework for AI Products</p>
                </div>
              </div>
            </div>
          </header>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-thin text-foreground mb-6">
            AI Product Development Playbook
          </h1>
          <div className="h-px w-32 bg-foreground mx-auto mb-6" />
          <p className="text-xl text-muted-foreground mb-4 font-light">
            Cross-Cutting Themes → Strategy → Build → Launch → Scale
          </p>
          <p className="text-sm text-muted-foreground font-light">
            Comprehensive framework for building defensible AI products in an era of disruption
          </p>
        </div>

        {/* Strategic Context */}
        <div className="mb-12 border border-border p-8">
          <h3 className="text-xl font-light text-foreground mb-6">Strategic Context: The AI Revolution</h3>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-muted-foreground font-light">
            <div>
              <h4 className="font-light text-foreground mb-3">Building Defensible AI Products</h4>
              <p className="mb-4">In an era where AI capabilities are becoming commoditized, true competitive advantage comes from building products that create defensible moats through data network effects, proprietary workflows, and deep domain expertise.</p>
              <p>Focus on creating products that become more valuable as they scale, where switching costs increase over time, and where your AI becomes uniquely tailored to your customers&apos; specific needs.</p>
            </div>
            <div>
              <h4 className="font-light text-foreground mb-3">Disruption in SaaS</h4>
              <p className="mb-4">Traditional SaaS models are being disrupted by AI-native products that deliver value through intelligence rather than just functionality. The winners will be those who reimagine entire workflows, not just automate existing processes.</p>
              <p>Build products that fundamentally change how work gets done, creating new value chains that didn&apos;t exist before AI made them possible.</p>
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
                <li><strong className="text-foreground">Start with Cross-Cutting Themes</strong> - These foundational elements should be established before Phase 1</li>
                <li><strong className="text-foreground">Sequential but Iterative</strong> - Follow phases in order, but expect to loop back as you learn</li>
                <li><strong className="text-foreground">Customize for Context</strong> - Not every item applies to every product. Prioritize based on your needs</li>
                <li><strong className="text-foreground">Metrics-Driven</strong> - Define success metrics at each phase and track religiously</li>
                <li><strong className="text-foreground">Cross-Functional</strong> - This requires engineering, design, sales, marketing, and support throughout</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(playbook).map(([key, phase]) => (
            <div
              key={key}
              className={`border border-border overflow-hidden`}
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
                  {phase.sections.map((section, idx) => (
                    <div key={idx} className="border-b border-border last:border-b-0">
                      <button
                        onClick={() => toggleSection(key, idx)}
                        className="w-full p-6 flex items-center justify-between hover:bg-muted transition-all"
                      >
                        <h3 className="text-lg font-light text-foreground">
                          {section.name}
                        </h3>
                        {expandedSection[`${key}-${idx}`] ? (
                          <ChevronDown className="w-5 h-5 text-foreground" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-foreground" />
                        )}
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
                <p className="text-sm text-muted-foreground font-light">AI Product Architect & Technology Consultant</p>
                <p className="text-xs text-muted-foreground font-light mt-2">
                  Trusted by companies to transform AI initiatives from concept to market success
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground font-light">Contact</p>
                <p className="text-xs text-muted-foreground font-light">binubabu@socife.com</p>
                <p className="text-xs text-muted-foreground font-light">linkedin.com/in/binubdaniel</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground font-light text-center">
                This playbook represents years of experience building AI products that drive real business value. 
                Use it as a framework, adapt it to your context, and always prioritize customer outcomes over technical perfection.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProductPlaybook;