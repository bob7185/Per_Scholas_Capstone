import axios from 'axios';
import 'dotenv/config.js';
import { db } from './config/dbconnect.js';

// Generate a project for each user
const generateProjects = (users, numberOfProjects) => {
    const projects = [];
    const templates = [
        { projectName: 'HR Analytics', description: 'Create a tool for the HR team to track employee performance.' },
        { projectName: 'Training Platform', description: 'Build an online platform to onboard new employees and upskill existing teams efficiently.' },
        { projectName: 'Website Redesign', description: 'Redesign the company\'s website to improve user experience.' },
        { projectName: 'Mobile App Development', description: 'Develop a new mobile app for our services.' },
        { projectName: 'Marketing Campaign', description: 'Plan and execute the new marketing campaign.' },
        { projectName: 'Data Migration', description: 'Migrate all data to the new system.' },
        { projectName: 'Customer Feedback Analysis', description: 'Analyze the feedback received from customers.' }
    ];
    for (let i = 0; i < numberOfProjects; i++) {
        // Generate a random user to allocate it a project
        const user = users[Math.floor(Math.random() * users.length)];
        const randomProject = {
            ...templates[Math.floor(Math.random() * templates.length)],
            startDate: new Date(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
            status: 'In Progress',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: user._id
        };
        projects.push(randomProject);
    }
    return projects;
};

// Generate tasks for each project
const generateTasks = (projects, numberOfTasks) => {
    const tasks = [];
    const templates = [
        { name: 'Complete Project Proposal', description: 'Draft and submit the project proposal by Friday.', priority: 'High' },
        { name: 'Team Meeting', description: 'Attend the team meeting at 10 AM.', priority: 'Medium' },
        { name: 'Code Review', description: 'Review the pull requests submitted by the team.', priority: 'Low' },
        { name: 'Client Presentation', description: 'Prepare slides for the client presentation next week.', priority: 'High' },
        { name: 'Update Documentation', description: 'Update the project documentation with the latest changes.', priority: 'Low' }
    ];
    projects.forEach(project => {
        for (let i = 0; i < numberOfTasks; i++) {
            tasks.push({
                ...templates[Math.floor(Math.random() * templates.length)],
                status: 'Pending',
                dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
                createdAt: new Date(),
                updatedAt: new Date(),
                projectId: project._id,
                userId: project.userId
            });
        }
    });
    return tasks;
};

// Seed database function
const seedDatabase = async () => {
    console.log('Seeding database...');
    try {
        const usersCollection = db.collection('users');
        const tasksCollection = db.collection('tasks');
        const projectsCollection = db.collection('projects');
        // Get 10 random users from the Random User API
        const response = await axios.get('https://randomuser.me/api/?results=10');
        const users = response.data.results.map(user => ({
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            username: user.login.username,
            password: user.login.sha1, 
            picture: user.picture.large,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }));

        console.log(`Users fetched from API`);

        // Insert users and map inserted IDs
        const insertedUsers = await usersCollection.insertMany(users);
        const userArray = Object.values(insertedUsers.insertedIds).map((id, index) => ({
            ...users[index],
            _id: id
        }));

        // Generate projects and insert them
        const projects = generateProjects(userArray, 7);
        const insertedProjects = await projectsCollection.insertMany(projects);
        const projectArray = Object.values(insertedProjects.insertedIds).map((id, index) => ({
            ...projects[index],
            _id: id
        }));
        // Generate tasks and insert them
        const tasks = generateTasks(projectArray, 8);
        await tasksCollection.insertMany(tasks);
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
    finally {
     
        console.log('Exiting process.');
        process.exit(0); 
    }
};

seedDatabase();
