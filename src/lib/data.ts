export type RoleKey = 'backend' | 'frontend' | 'devops' | 'ai'

export interface Role {
  key: RoleKey
  label: string
  short: string
  accent: string
  accentSoft: string
  accentRing: string
  tagline: string
  heroSub: string
  status: 'shipped' | 'building'
  version: string
  progress?: number
  eta?: string
  buildLog?: string[]
}

export interface SkillItem {
  name: string
  roles: RoleKey[]
}

export interface SkillCategory {
  name: string
  items: SkillItem[]
}

export interface TagItem {
  name: string
  roles: RoleKey[]
}

export interface Project {
  id: string
  name: string
  desc: string
  impact: string
  roles: RoleKey[]
  tags: TagItem[]
}

export interface ExperienceItem {
  org: string
  role: string
  when: string
  kind: 'work' | 'edu'
  bullets: string[]
}

export interface LearningItem {
  name: string
  value: number
}

export interface Metric {
  label: string
  value: string
}

export const ROLES: Record<RoleKey, Role> = {
  backend: {
    key: 'backend',
    label: 'Backend',
    short: 'BE',
    accent: '#10b981',
    accentSoft: 'rgba(16, 185, 129, 0.15)',
    accentRing: 'rgba(16, 185, 129, 0.45)',
    tagline: 'I build backends that scale.',
    heroSub: 'APIs, queues, caches, and the boring-fast plumbing in between.',
    status: 'shipped',
    version: 'v2.4.1',
  },
  frontend: {
    key: 'frontend',
    label: 'Frontend',
    short: 'FE',
    accent: '#8b5cf6',
    accentSoft: 'rgba(139, 92, 246, 0.15)',
    accentRing: 'rgba(139, 92, 246, 0.45)',
    tagline: 'I ship UIs that convert.',
    heroSub: 'Pixel-honest interfaces in React, TypeScript, and Tailwind.',
    status: 'shipped',
    version: 'v1.8.0',
  },
  devops: {
    key: 'devops',
    label: 'DevOps',
    short: 'DevOps',
    accent: '#f59e0b',
    accentSoft: 'rgba(245, 158, 11, 0.15)',
    accentRing: 'rgba(245, 158, 11, 0.45)',
    tagline: 'I automate infra that never sleeps.',
    heroSub: 'Docker, Kubernetes, GCP, CI/CD — pipelines that fix themselves.',
    status: 'building',
    version: 'v0.6-rc',
    progress: 65,
    eta: "Q3 '26",
    buildLog: [
      '✓ docker · multi-stage builds',
      '✓ k8s · ingress + autoscaling configured',
      '✓ ci/cd · github actions, GCP deploy',
      '⟳ terraform · learning module composition',
      '⟳ istio · service mesh — in progress',
      '○ argocd · gitops — queued',
    ],
  },
  ai: {
    key: 'ai',
    label: 'AI Engineer',
    short: 'AI',
    accent: '#06b6d4',
    accentSoft: 'rgba(6, 182, 212, 0.15)',
    accentRing: 'rgba(6, 182, 212, 0.45)',
    tagline: 'I wire LLMs into products.',
    heroSub: 'RAG, embeddings, function calling — production, not demos.',
    status: 'building',
    version: 'v0.4-alpha',
    progress: 40,
    eta: "Q4 '26",
    buildLog: [
      '✓ llm apis · openai, anthropic, function calling',
      '✓ embeddings · cosine search at 70K scale',
      '✓ pgvector · hybrid retrieval working',
      '⟳ langchain.js · graph orchestration',
      '⟳ evals · ragas, trulens — wiring up',
      '○ agents · multi-step tool use — researching',
    ],
  },
}

export const ROLE_ORDER: RoleKey[] = ['backend', 'frontend', 'devops', 'ai']

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Languages',
    items: [
      { name: 'JavaScript', roles: ['backend', 'frontend', 'devops', 'ai'] },
      { name: 'TypeScript', roles: ['backend', 'frontend', 'ai'] },
      { name: 'Python', roles: ['backend', 'ai', 'devops'] },
      { name: 'Java', roles: ['backend'] },
      { name: 'C++', roles: ['backend'] },
    ],
  },
  {
    name: 'Backend',
    items: [
      { name: 'Node.js', roles: ['backend', 'ai'] },
      { name: 'NestJS', roles: ['backend'] },
      { name: 'Fastify', roles: ['backend'] },
      { name: 'Express', roles: ['backend'] },
      { name: 'GraphQL', roles: ['backend', 'frontend'] },
      { name: 'gRPC', roles: ['backend'] },
      { name: 'REST', roles: ['backend', 'frontend'] },
    ],
  },
  {
    name: 'Frontend',
    items: [
      { name: 'React.js', roles: ['frontend'] },
      { name: 'Next.js', roles: ['frontend'] },
      { name: 'Tailwind CSS', roles: ['frontend'] },
      { name: 'Redux', roles: ['frontend'] },
    ],
  },
  {
    name: 'Data',
    items: [
      { name: 'MongoDB', roles: ['backend'] },
      { name: 'Redis', roles: ['backend', 'devops'] },
      { name: 'PostgreSQL', roles: ['backend', 'ai'] },
      { name: 'Firebase', roles: ['backend', 'frontend'] },
    ],
  },
  {
    name: 'DevOps · Infra',
    items: [
      { name: 'Docker', roles: ['devops', 'backend'] },
      { name: 'Kubernetes', roles: ['devops'] },
      { name: 'GCP', roles: ['devops'] },
      { name: 'AWS', roles: ['devops'] },
      { name: 'CI/CD', roles: ['devops'] },
      { name: 'GitHub Actions', roles: ['devops'] },
      { name: 'Nginx', roles: ['devops'] },
    ],
  },
  {
    name: 'AI · ML',
    items: [
      { name: 'LLM APIs', roles: ['ai'] },
      { name: 'Embeddings', roles: ['ai'] },
      { name: 'pgvector', roles: ['ai', 'backend'] },
      { name: 'RAG pipelines', roles: ['ai'] },
      { name: 'LangChain.js', roles: ['ai'] },
    ],
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'api-gateway',
    name: 'High-Performance API Gateway',
    desc: '12-stage middleware pipeline with Lua rate limiter, circuit breaker, K8s hot-reload and OpenTelemetry tracing.',
    impact: '1M+ req/day',
    roles: ['backend', 'devops'],
    tags: [
      { name: 'Node.js', roles: ['backend'] },
      { name: 'Lua', roles: ['backend'] },
      { name: 'Kubernetes', roles: ['devops'] },
      { name: 'OpenTelemetry', roles: ['devops'] },
      { name: 'Redis', roles: ['backend'] },
    ],
  },
  {
    id: 'auction-engine',
    name: 'Cricket Live Auction Engine',
    desc: 'Redis-first bidding with Redlock, Socket.io fan-out, Bull queues. Held under 5K concurrent users.',
    impact: '50ms bid latency',
    roles: ['backend'],
    tags: [
      { name: 'Redis', roles: ['backend'] },
      { name: 'Socket.io', roles: ['backend', 'frontend'] },
      { name: 'Bull', roles: ['backend'] },
      { name: 'Node.js', roles: ['backend'] },
    ],
  },
  {
    id: 'similarity',
    name: 'Player Similarity Engine',
    desc: 'HNSW-indexed vector search over 70K cricketers using cosine similarity and rich feature embeddings.',
    impact: '70K players indexed',
    roles: ['backend', 'ai'],
    tags: [
      { name: 'pgvector', roles: ['ai', 'backend'] },
      { name: 'HNSW', roles: ['ai'] },
      { name: 'PostgreSQL', roles: ['backend'] },
      { name: 'Python', roles: ['ai'] },
    ],
  },
  {
    id: 'live-score',
    name: 'Cricket Live Score Platform',
    desc: 'Real-time data ingestion across Redis + MongoDB with a management panel that supports revert-to-source.',
    impact: '99.9% uptime',
    roles: ['backend', 'devops'],
    tags: [
      { name: 'Redis', roles: ['backend'] },
      { name: 'MongoDB', roles: ['backend'] },
      { name: 'Docker', roles: ['devops'] },
      { name: 'Nginx', roles: ['devops'] },
    ],
  },
  {
    id: 'apollo-obs',
    name: 'Apollo Gateway Observability',
    desc: 'Prometheus, New Relic, Last9 OpenAPM and a compression middleware that cut payloads by 4×.',
    impact: '4× payload reduction',
    roles: ['devops', 'backend'],
    tags: [
      { name: 'Prometheus', roles: ['devops'] },
      { name: 'New Relic', roles: ['devops'] },
      { name: 'GraphQL', roles: ['backend'] },
      { name: 'Apollo', roles: ['backend'] },
    ],
  },
  {
    id: 'notif',
    name: 'Real-time Notification Pipeline',
    desc: 'Toss, wickets and milestones over Redis pub/sub with distributed locking and dedupe windows.',
    impact: '<200ms p99',
    roles: ['backend'],
    tags: [
      { name: 'Redis', roles: ['backend'] },
      { name: 'Pub/Sub', roles: ['backend'] },
      { name: 'Node.js', roles: ['backend'] },
    ],
  },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    org: 'Xarterian',
    role: 'Software Developer · Product Engineer',
    when: 'Apr 2024 — Present',
    kind: 'work',
    bullets: [
      'Owned an API gateway that sustained 1M+ req/day with sub-200ms p99 across 6 downstream services.',
      'Designed a Redis-first live auction engine — 5K concurrent users, Redlock for correctness, Socket.io for fan-out.',
      'Stood up Prometheus + Last9 observability on Apollo Gateway; cut wire payload size by ~4× via compression middleware.',
      'Shipped a vector-search player-similarity service (HNSW, pgvector) used by product surfaces and editors.',
    ],
  },
  {
    org: 'IIT Roorkee',
    role: 'B.Tech, Electrical Engineering',
    when: '2017 — 2021',
    kind: 'edu',
    bullets: [
      'AIR 1103, JEE Advanced.',
      'Coursework in algorithms, networks, signal processing and probability.',
    ],
  },
]

export const LEARNING: LearningItem[] = [
  { name: 'LLM APIs & function calling', value: 80 },
  { name: 'Vector DBs & RAG pipelines', value: 60 },
  { name: 'LangChain.js · LangGraph.js', value: 40 },
]

export const METRICS: Metric[] = [
  { label: 'req / day', value: '1M+' },
  { label: 'uptime', value: '99.9%' },
  { label: 'players indexed', value: '70K' },
  { label: 'p99 latency', value: '<200ms' },
]
