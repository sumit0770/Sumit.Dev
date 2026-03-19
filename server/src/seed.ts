import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project';
import Skill from './models/Skill';
import Experience from './models/Experience';
import OpenSource from './models/OpenSource';

dotenv.config();

const seed = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/sumit_portfolio';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
      OpenSource.deleteMany({}),
    ]);

    // Seed Projects
    await Project.insertMany([
      {
        title: 'SoundStake',
        description: 'A decentralized music streaming platform leveraging IPFS for storage and Ethereum for royalty distribution. Implemented gas-optimized smart contracts.',
        tags: ['Solidity', 'Next.js', 'IPFS', 'Ethereum'],
        githubUrl: 'https://github.com/sumit0770/Sound_Stake',
        demoUrl: 'https://soundstake.vercel.app/',
        featured: true,
        order: 1,
      },
      {
        title: 'CodeSync',
        description: 'Cross-platform code synchronization utility. Maintains consistency of codebases across multiple devices with automated conflict resolution.',
        tags: ['Python', 'Bash', 'Cloud APIs', 'Git'],
        githubUrl: 'https://github.com/sumit0770/Code-Sync',
        demoUrl: 'https://github.com/sumit0770/Code-Sync',
        featured: true,
        order: 2,
      },
      {
        title: 'Smart Traffic System',
        description: 'AI-powered urban management system using YOLOv5 for real-time vehicle detection, improving traffic efficiency by 30%.',
        tags: ['Python', 'OpenCV', 'YOLO', 'Flask'],
        githubUrl: 'https://github.com/sumit0770/Smart_Traffic_Management-main',
        demoUrl: 'https://github.com/sumit0770/Smart_Traffic_Management-main',
        featured: true,
        order: 3,
      },
    ]);

    // Seed Skills
    await Skill.insertMany([
      { category: 'Languages', icon: 'Code2', skills: ['TypeScript', 'JavaScript', 'Python', 'C++', 'Solidity'], order: 1 },
      { category: 'Frontend', icon: 'Globe', skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Redux'], order: 2 },
      { category: 'Backend & DB', icon: 'Terminal', skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis'], order: 3 },
      { category: 'Blockchain', icon: 'Cpu', skills: ['Ethereum', 'Web3.js', 'Ethers.js', 'IPFS', 'Smart Contracts'], order: 4 },
    ]);

    // Seed Experience
    await Experience.insertMany([
      {
        role: 'Operating System Expert',
        company: 'Turing',
        period: 'Feb 2026 - Present',
        description: 'Executed complex system-level workflows and provided technical walkthroughs to refine agent reasoning. Delivered 120+ production-grade demonstrations.',
        order: 1,
      },
    ]);

    // Seed Open Source
    await OpenSource.insertMany([
      {
        repo: 'sunny2kk9/Blockchain',
        title: 'PR #17: Feature Implementation',
        description: 'Contributed core logic improvements to the blockchain repository, enhancing transaction validation speed.',
        status: 'Merged',
        url: 'https://github.com/sunny2kk9/Blockchain/pull/17',
        order: 1,
      },
      {
        repo: 'sunny2kk9/Blockchain',
        title: 'PR #52: Bug Fix & Optimization',
        description: 'Resolved critical concurrency issues and optimized memory usage for node synchronization.',
        status: 'Merged',
        url: 'https://github.com/sunny2kk9/Blockchain/pull/52',
        order: 2,
      },
      {
        repo: 'sunny2kk9/Blockchain',
        title: 'PR #95: Documentation & Tests',
        description: 'Added comprehensive test suites and updated documentation for better developer onboarding.',
        status: 'Merged',
        url: 'https://github.com/sunny2kk9/Blockchain/pull/95',
        order: 3,
      },
    ]);

    console.log('🌱 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
