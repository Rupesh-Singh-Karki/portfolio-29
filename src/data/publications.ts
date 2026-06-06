import type { Publication } from '../types';

export const publications: Publication[] = [
  {
    id: 'pub-1',
    title: 'A Comprehensive Survey in ANN Based Customer Churn Prediction',
    type: 'Research Paper',
    platform: 'International Conference on Data Analytics and Management (ICDAM-2025)',
    authors: ['Rupesh Singh Karki', 'Laksh Krishna Sharma', 'Prachi Dhaiya', 'Umang Kant'],
    date: 'October 2025',
    abstract: 'This study examines customer churn prediction in telecom and subscription services using demographic, usage, billing, and engagement data. It compares multiple machine-learning models before and after hyperparameter tuning, showing that feature engineering and optimization significantly improve prediction accuracy and support stronger retention strategies.',
    readTime: '12 min read',
    doi: '10.1007/978-3-032-03751-0_25',
    url: 'https://doi.org/10.1007/978-3-032-03751-0_25',
    tags: ['Machine Learning', 'Data Analytics', 'Customer Churn Prediction'],
  },
];
