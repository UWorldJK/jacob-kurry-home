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
  tagline: 'Backend & infrastructure engineer. I build distributed services and the infrastructure that connects, orchestrates, and scales them.',
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
    subtitle: 'Founder',
    where: 'startup',
    when: '2026 – present',
    image: 'react-ts, express, supabase, plaid',
    labels: { role: 'founder', stage: 'building' },
    events: [
      'Founded Janus, a digital asset vault that shows a family their whole online footprint (banks, investments, loans, insurance, subscriptions) as one picture, so they can plan who will need access to what.',
      'Created an NLP model that reads a family’s email to find every institution they use; banks link directly through Plaid, with everything stored in Supabase.',
      'Runs an AI agent on a cron job that keeps checking for new accounts, so the picture stays current without anyone pressing a button.',
      'Structured the app as a TypeScript monorepo: React + Vite frontend and an Express backend with Jest unit and integration tests.',
      'Containerized both services, with GitHub Actions publishing images to Docker Hub and Helm charts with Istio VirtualServices for Kubernetes.',
      'Designed for older adults first: large type, high contrast, 44px targets, and calm over alarming.',
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
  {
    id: 'market-etl',
    kind: 'job',
    podName: 'market-etl-k7p2c',
    title: 'Market ETL Pipeline',
    subtitle: 'Personal project',
    where: 'GitHub',
    when: 'runs daily',
    image: 'python, duckdb, pandas',
    labels: { type: 'etl', schedule: 'daily' },
    events: [
      'End-to-end ETL that extracts historical stock data from the yfinance API.',
      'Computes moving averages and P/E ratios and loads cleaned tables into DuckDB.',
      'Daily runs orchestrated with GitHub CI.',
    ],
  },
  {
    id: 'wildfire-risk',
    kind: 'cronjob',
    podName: 'wildfire-risk-2938412-vn6hs',
    title: 'Wildfire Risk Prediction',
    subtitle: 'Personal project',
    where: 'western U.S.',
    when: 'daily risk score',
    image: 'python, scikit-learn',
    labels: { type: 'ml', model: 'gbdt+rf' },
    events: [
      'Random forest and gradient-boosted classifiers that forecast large-wildfire risk across the western U.S. and emit a daily risk score.',
      'A pipeline that aligns GridMet weather, LANDFIRE terrain and fuel, MODIS vegetation imagery, and MTBS burn records onto one spatial grid and daily time step.',
      'A medallion-style warehouse with raw and processed layers and versioned ingestion scripts.',
    ],
  },
];
