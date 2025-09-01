
import 'dotenv/config';
import mongoose from 'mongoose';
import Profile from './models/profile.js';
import Project from './models/project.js';
import connectDB from './db.js';

const seedDatabase = async () => {
  try {
    
    await connectDB();
    
    
    console.log('Clearing the database...');
    await Profile.deleteMany({});
    await Project.deleteMany({});
    
    
    const projectsData = [
      {
        title: 'Super Admin Dashboard',
        description:
          'A secure admin dashboard with role-based access control for super admins. Features include detailed audit logs and data analytics. Built with the PERN (PostgreSQL, Express, React, Node.js) stack.',
        skills: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JavaScript'],
        links: [],
      },
      {
        title: 'Music Identification App (In Development)',
        description:
          'A Shazam-like application to identify music using audio fingerprinting. The backend leverages Python for the machine learning components, integrated with a MERN (MongoDB, Express, React, Node.js) stack.',
        skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Python', 'Machine Learning'],
        links: [],
      },
      {
        title: 'QuickShow - Movie Booking Platform (In Development)',
        description:
          'A cross-platform mobile application for browsing movies, selecting showtimes, and booking tickets securely. Built with React Native for the frontend and a Node.js backend to handle bookings and payments.',
        skills: ['React Native', 'Node.js', 'MongoDB', 'Stripe API', 'Express'],
        links: [],
      },
    ];

    
    const createdProjects = await Project.create(projectsData);
    console.log(`${createdProjects.length} projects have been created.`);

    
    console.log('Creating user profile...');
    const profileData = {
      name: 'Vidhut Raushan',
      email: 'vidhutraushan9@gmail.com', 
      education: [
        {
          institution: 'National Institute of Technology, Nagaland',
          degree: 'B.Tech in Computer Science and Engineering',
          year: 2027, 
        },
        {
          institution: 'Gaya College Gaya',
          degree: 'Intermediate',
          year: 2022,
        },
        {
          institution: 'Ambika Public School',
          degree: 'Matriculation',
          year: 2020,
        },
      ],
      skills: [
        { name: 'Data Structures & Algorithms', level: 8 },
        { name: 'Python', level: 6 },
        { name: 'C++', level: 7 },
        { name: 'Solidity', level: 6 },
        { name: 'Node.js', level: 6 },
        { name: 'React', level: 6 },
        { name: 'DBMS', level: 7 },
        { name: 'JavaScript', level: 5 },
        { name: 'TypeScript', level: 5 },
        { name: 'CSS', level: 5 },
        { name: 'Operating Systems', level: 6 },
        { name: 'Computer Networks', level: 6 },
      ],
    
      projects: createdProjects.map(p => p._id),
      work: [], // No work experience yet
      links: {
        github: 'https://github.com/vid0326',
        linkedin: 'www.linkedin.com/in/vidhut-raushan-29453628a',
        leetcode: 'https://leetcode.com/u/vid0326/'
      },
    };
    
    
    await Profile.create(profileData);
    console.log('Profile for Vidhut Raushan created successfully.');

    console.log('\nSeeding complete!');
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  } finally {
    
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
};


seedDatabase();
