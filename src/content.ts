// Single source of truth for site copy. Derived from public/cv.pdf.
// Phone number intentionally omitted.

export type Workload = {
  id: string;
  kind: 'pod' | 'job' | 'cronjob';
  /** Pod name as it appears in `kubectl get pods`. */
  podName: string;
  title: string;
  subtitle: string;
  where: string;
  when: string;
  image: string;
  labels: Record<string, string>;
  events: string[];
};

export const profile = {
  name: 'jacob-kurry',
  displayName: 'Jacob Kurry',
  email: 'jacobkurry1@gmail.com',
  location: 'Boulder, CO',
  github: 'https://github.com/UWorldJK',
  cv: '/cv.pdf',
  tagline:
    'Backend & infrastructure engineer. I build distributed services and the infrastructure that connects, orchestrates, and scales them: Kubernetes operators and Go networking for lunar missions, serverless RAG pipelines on Azure, and data lakehouses on AWS. I also found startups, where I do everything from go-to-market engineering to shipping the product.',
  education: {
    school: 'University of Colorado Boulder',
    degree: 'B.S. Computer Science, French',
    graduation: 'May 2027',
    gpa: '3.937',
    coursework: ['Object Oriented Design', 'Graduate Machine Learning', 'Artificial Intelligence', 'Algorithms', 'Linear Algebra', 'Networking Systems'],
  },
  skills: {
    languages: ['Go', 'Java', 'C/C++', 'Python', 'SQL', 'TypeScript', 'C#', 'Bash', 'Protobuf', 'Node.js'],
    platform: ['Kubernetes', 'Operators/CRDs', 'Docker', 'Helm', 'Istio', 'Terraform', 'Kind'],
    cloud: ['AWS EKS', 'Fargate', 'EC2', 'S3', 'Azure Functions', 'Event Grid', 'Blob Storage', 'AI Search'],
    delivery: ['ArgoCD', 'FluxCD', 'Bamboo', 'Jenkins', 'GitLab', 'Kafka', 'Redpanda'],
    observability: ['Prometheus', 'Grafana', 'Loki', 'Ginkgo', 'PyTest', 'JUnit', 'Jest'],
    data: ['PyTorch', 'scikit-learn', 'OpenCV', 'pandas', 'RAG', 'BM25 + vector search', 'Redis'],
    ai: ['Claude Code', 'MCP servers', 'Agentic workflows', 'Azure OpenAI'],
  },
};

export const workloads: Workload[] = [
  {
    id: 'lunar-outpost',
    kind: 'pod',
    podName: 'lunar-outpost-7c9f8d-x2lqp',
    title: 'Lunar Outpost',
    subtitle: 'Stargate Ground Software, Infrastructure Intern',
    where: 'Golden, CO',
    when: 'May 2026 – Aug 2026',
    image: 'golang:1.23, k8s operator',
    labels: { team: 'stargate', mission: 'lv2', tier: 'ground-software' },
    events: [
      'Architected a Go network adapter that routes all command and telemetry traffic between mission control and lunar surface systems across multiple protocols, at ~10µs latency using goroutine/channel concurrency, with S3-backed file-state monitoring.',
      'Designed and owned the full lifecycle of a custom Link CRD for elastic, runtime-provisioned spacecraft networking, and extended the controller to probe live infrastructure and verify control/data-plane parity.',
      'Built a Kubernetes-native operator managing 5 CRD types that provisions spacecraft infrastructure (Istio, Prometheus, Redpanda, S3 volumes), with custom reconciliation, validating/mutating webhooks, a Kind end-to-end suite, and a CLI for operators.',
      'Refactored a TypeScript K8s client to generate, submit, and watch custom resources in real time; wired in ArgoCD/Flux GitOps, wrote Helm charts, and added Bamboo pipelines for dev and mission clusters.',
      'Created a sidecar, toggled by a field on the CRD, that applies ConfigMap changes to running pods in ~1s instead of waiting on kubelet sync, shipped to ECR by its own Bamboo pipeline.',
      'Built an OpenCV stereo rectification and depth-mapping plugin for the LV2 mission that turns calibrated camera pairs into depth maps and navigable paths on the mission front end.',
    ],
  },
  {
    id: 'pure-fishing',
    kind: 'pod',
    podName: 'pure-fishing-5b6d4c-q8wzt',
    title: 'Pure Fishing',
    subtitle: 'AI Development Intern, Team Lead',
    where: 'Remote',
    when: 'Sep 2025 – Dec 2025',
    image: 'azure-functions:python, react-ts',
    labels: { team: 'ai-dev', role: 'lead', cloud: 'azure' },
    events: [
      'Architected and deployed a knowledge base on Azure to pull siloed knowledge out of stakeholders: a three-part serverless system with an ingestion/custodial platform and a RAG application.',
      'Engineered 20 multi-modal pipelines on Azure AI services that turn unstructured data of any type into embeddings for a RAG chatbot and BM25 + vector semantic search.',
      'Implemented Azure Functions over REST and Event Grid to run the ETL and ingestion layers.',
      'Built the React + TypeScript front end for chat, semantic search, and file ingestion.',
      'Presented the system to the executive team and won Best Intern Project.',
    ],
  },
  {
    id: 'ula',
    kind: 'pod',
    podName: 'ula-ground-6f7a9e-m4rkd',
    title: 'United Launch Alliance',
    subtitle: 'Ground Software Engineering Intern',
    where: 'Centennial, CO',
    when: 'Jun 2025 – Aug 2025',
    image: 'python:3.11, pytest',
    labels: { team: 'ground-software', domain: 'launch' },
    events: [
      'Automated engine-simulation verification with 15 PyTest modules on the internal CATT API, validating 2k+ discrete and analog datapoints across redline, abort, and tare scenarios and cutting eight hours of manual QA.',
      'Developed a modular regression-testing framework (I/O abstractions, centralized logging, shared utilities, coding standards) running nightly in Bamboo CI.',
      'Made CATT command execution 3x faster with non-blocking waits and polling, kept backward compatibility, and held 90% unit coverage with parameterized fixtures and Mock.',
    ],
  },
  {
    id: 'janus',
    kind: 'pod',
    podName: 'janus-5d8f7b-r2kxv',
    title: 'Janus',
    subtitle: 'Founder & CEO',
    where: 'startup',
    when: '2026 – present',
    image: 'next.js, express, expo, supabase, plaid',
    labels: { role: 'founder', stage: 'pivoting', scope: 'gtm-to-product' },
    events: [
      'Founded Janus and am pivoting it from a digital asset vault to estate organization and settlement as a service: map everything a person has, then work out how their estate gets settled.',
      'Own everything from go-to-market engineering to building the product. Running customer discovery with adult children who recently settled a parent’s estate, older adults, and the attorneys, hospice, and funeral professionals who work with them.',
      'Built the GTM tooling myself: an outreach tracker, interview guides, and a local dashboard that tracks pace against targets and has Claude summarize interview notes into product changes, checking every quote against the note it cites.',
      'Designed Athena, the settlement engine: a pure TypeScript library where the same estate in gives the same decision out, backed by a database of per-institution procedures, category playbooks, and state rules (Colorado first), with hand-checked test estates and 56 planner scenarios as evals.',
      'Created an NLP email scanner that finds every institution a family uses: it groups Gmail by sender domain, has Claude triage senders on metadata and then review redacted message samples, and rescans only mail since the last scan, with an eval loop that scores prompt changes against real answers.',
      'Links banks through Plaid, re-synced by a scheduled job, and stores everything in Supabase Postgres behind row-level security; Plaid tokens use per-record envelope encryption under Cloud KMS, and documents sit in a private, CMEK-encrypted bucket.',
      'Added a chat agent that answers questions about a person’s own map using their own token, so row-level security decides what it can see; it refuses to start if any backend secret is in its environment.',
      'Structured it as a TypeScript monorepo: Next.js web app, Expo iOS app, Express backend and agent, deployed to Cloud Run by GitHub Actions, with a weekly cron that checks the settlement sources for staleness.',
      'Designed for older adults first: large type, high contrast, 44px targets, and calm over alarming.',
    ],
  },
  {
    id: 'lift2lift',
    kind: 'pod',
    podName: 'lift2lift-8a3e6f-p5jwc',
    title: 'Lift2Lift',
    subtitle: 'Co-founder & CTO',
    where: 'Boulder, CO',
    when: '2026 – present',
    image: 'next.js, expo, supabase, aws',
    labels: { platform: 'web+ios', partner: 'cu-freeride', stage: 'building' },
    events: [
      'Co-founded Lift2Lift, ski carpools for CU Boulder students: drivers post open seats, riders call shotgun, and every ride shows the snow forecast for that mountain on that day across 26 Colorado ski areas.',
      'Partnered with CU Freeride, a ski and snowboard club with 30k followers, and through them with the Ikon Pass; clubs get private communities with their own rides, events, and a calendar synced from Google Calendar.',
      'Wrote every screen once in React Native and ship it twice: on the web through Next.js 15 with react-native-web, and as an iOS app through Expo.',
      'Shipping the iOS app to the App Store: EAS production builds, TestFlight, and the reporting, blocking, and account-deletion flows App Review requires.',
      'Verifies drivers on AWS: Textract reads the license and its expiry date, Rekognition matches a selfie to the license photo, and Textract reads the insurance card, with neither the license nor the card image ever stored.',
      'Put the rules in Postgres so no client can get around them: @colorado.edu-only accounts, a seat-claiming function that locks the ride row so two people can’t take the last seat, row-level security covered by SQL tests, and the gas-money caps that keep it a legal carpool under Colorado law.',
      'Added live ride chat on Supabase Realtime, push reminders sent by a cron-driven edge function ahead of each leg, a check-in where the driver marks each passenger picked up or no-show, and two-sided ratings after every ride.',
    ],
  },
  {
    id: 'lfr-map',
    kind: 'job',
    podName: 'lfr-map-h4t9x',
    title: 'London Facial Recognition Map',
    subtitle: 'Personal project',
    where: 'London, UK',
    when: '2026',
    image: 'javascript, leaflet, python',
    labels: { type: 'civic-data', source: 'met-police' },
    events: [
      'Mapped live facial recognition in London as a community map: 332 Metropolitan Police deployments from the force’s published records, plus fixed and private cameras reported by the public, searchable by area, type, and date.',
      'Built a pipeline that extracts the Met’s PDF record to CSV in Python, flags out-of-order dates as typos, and geocodes each location through OpenStreetMap with a cache and hand-placed overrides that each say why.',
      'Kept the map honest, with nothing invented: corrected dates show next to the date as published, and reported cameras come in as GitHub issues that a maintainer approves.',
      'Shipped it as a static Leaflet site with no build step, no server, and no database.',
    ],
  },
  {
    id: 'wildfire-risk',
    kind: 'cronjob',
    podName: 'wildfire-risk-2938412-vn6hs',
    title: 'Wildfire Risk Prediction',
    subtitle: 'Data mining project, CU Boulder',
    where: 'western U.S.',
    when: 'daily risk score',
    image: 'python, scikit-learn, aws s3/glue/athena',
    labels: { type: 'ml', model: 'random-forest', data: 'lakehouse' },
    events: [
      'Trained a random forest classifier that forecasts large-wildfire risk across the western U.S. and emits a daily risk score, aimed at how fire-prone an area is rather than at a single ignition.',
      'Built the team’s AWS lakehouse (S3, Glue Data Catalog, Athena) holding 24 years, 2002–2025, of gridMET weather, LANDFIRE terrain and fuel, and MTBS burn records, replacing download scripts that each teammate ran on their own laptop.',
      'Wrote a CodeBuild job that ingests, integrates, and catalogs all three sources into a raw bronze layer, writing a manifest line per file with its source URL and sha256 so any result traces back to the exact data behind it.',
      'Added a silver layer for cleaned tables and Zarr grids, and a Python package that opens any dataset in one call, so every notebook reads the same versioned copy.',
      'Defined the whole stack in one CloudFormation template (shared IAM role, monthly budget alert) with deploy and teardown scripts, and covered the ingest and read paths with 104 pytest tests.',
    ],
  },
  {
    id: 'pool',
    kind: 'pod',
    podName: 'pool-6c4b9d-t7hqn',
    title: 'Pool',
    subtitle: 'Co-founder',
    where: 'startup',
    when: '2026 – present',
    image: 'next.js, supabase, docker',
    labels: { role: 'cofounder', stage: 'building' },
    events: [
      'Co-founded Pool, an app that gives families a calmer way to share the driving.',
      'Building on Next.js with Supabase for Postgres and auth, developed in Docker and shipped as a Vercel container.',
      'Planning accounts, ride planning, live location, notifications, and calendar sync next.',
    ],
  },
];
