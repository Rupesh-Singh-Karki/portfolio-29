import type { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'SociolinQ',
    role: 'Full Stack Developer Intern',
    type: 'Internship',
    location: 'Remote',
    locationType: 'Remote',
    startDate: 'Aug 2025',
    endDate: 'Present',
    current: true,
    achievements: [
      'Migrated the codebase from Context API to Redux, improving state management for large components and reducing unnecessary rerenders, resulting in an overall load performance improvement of ~25%.',
      'Implemented frontend performance optimizations (debouncing, lazy loading, and persisted reducers) to reduce redundant API calls and expensive renders, cutting API overhead by ~30% and page rerender time by ~40%.',
      'Architected a role-based access control (RBAC) system and multi-level approval workflows, enabling secure and structured data operations across organizational hierarchies.',
      'Designed and implemented approval-driven data workflows ensuring that all critical information changes pass through designated approvers, maintaining data integrity and enforcing secure modifications in controlled environments.',
      'Implemented a robust multi-tenancy system for the core ERP product, enabling secure data isolation, scalable tenant management, and customized data partitioning across the platform.',
      'Leveraged Redis for caching and state management within FastAPI services, reducing redundant database queries and improving response times for frequently accessed endpoints.',
      'Optimized PostgreSQL performance through advanced indexing strategies and query tuning, achieving 20–30% faster data retrieval across critical modules.',
      'Applied backend optimization techniques such as request batching, caching strategies, and efficient schema design to improve system scalability and reliability.',
      'Built a reusable activity logging system using decorators to track endpoint-level changes, ensuring auditability, traceability, and easier debugging in production.',
      'Developed a fault-tolerant S3 transaction handler with rollback mechanisms, maintaining data consistency during partial failures in file upload workflows.',
      'Designed and delivered a full-featured React Slate text editor used in production: custom watermarks, page layout controls, and import/parsing pipelines for DOCX, PDF, and XLSX.',
      'Orchestrated serverless cron jobs using AWS EventBridge and AWS Lambda to automate scheduled background tasks and system maintenance.',
      'Integrated AWS CloudWatch for centralized logging and continuous monitoring of company data, enhancing infrastructure visibility and proactive issue resolution.',
      'Streamlined CI/CD pipelines by developing GitHub Actions workflows (ecr.yml and deploy.yml) for automated Docker image building and faster, reliable deployments.',
    ],
    techStack: ['React', 'Redux', 'FastAPI', 'PostgreSQL', 'Redis', 'AWS S3', 'AWS Lambda', 'AWS CloudWatch', 'GitHub Actions', 'Slate'],
  }
];
