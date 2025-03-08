const ProjectData = [
    {
        name: "Project Alpha",
        description: "A web-based dashboard for analytics",
        tasks: [
            {
                name: "Design UI",
                dueDate: "2025-09-01",
                progress: 30,
                priority: "High",
                completed: false,
                assignedMembers: ["Alice"], // 1 member assigned
            },
            {
                name: "Implement Backend",
                dueDate: "2025-09-05",
                progress: 70,
                priority: "Medium",
                completed: true,
                assignedMembers: ["Bob"], // 1 member assigned
            },
            {
                name: "Write Documentation",
                dueDate: "2025-09-10",
                progress: 10,
                priority: "Low",
                completed: false,
                assignedMembers: ["Alice", "Bob"], // 2 members assigned
            },
        ],
        members: ["Alice", "Bob", "Charlie", "Dana", "Eve", "Frank"], // Max 6 members
    },
    {
        name: "Project Beta",
        description: "Mobile app for task management",
        tasks: [
            {
                name: "Create Wireframes",
                dueDate: "2025-08-15",
                progress: 50,
                priority: "Medium",
                completed: false,
                assignedMembers: ["Charlie"], // 1 member assigned
            },
            {
                name: "Develop Login Screen",
                dueDate: "2025-08-20",
                progress: 80,
                priority: "High",
                completed: true,
                assignedMembers: ["Dana"], // 1 member assigned
            },
            {
                name: "Test App Performance",
                dueDate: "2025-08-25",
                progress: 20,
                priority: "Low",
                completed: false,
                assignedMembers: ["Charlie", "Dana"], // 2 members assigned
            },
        ],
        members: ["Charlie", "Dana", "Grace", "Hank", "Ivy", "Jack"], // Max 6 members
    },
    {
        name: "Project Gamma",
        description: "E-commerce platform development",
        tasks: [
            {
                name: "Design Product Pages",
                dueDate: "2025-10-01",
                progress: 40,
                priority: "High",
                completed: false,
                assignedMembers: ["Eve"], // 1 member assigned
            },
            {
                name: "Integrate Payment Gateway",
                dueDate: "2025-10-05",
                progress: 60,
                priority: "Medium",
                completed: false,
                assignedMembers: ["Frank"], // 1 member assigned
            },
            {
                name: "Optimize Database",
                dueDate: "2025-10-10",
                progress: 90,
                priority: "Low",
                completed: true,
                assignedMembers: ["Eve", "Frank"], // 2 members assigned
            },
        ],
        members: ["Eve", "Frank", "Karen", "Leo", "Mona", "Nina"], // Max 6 members
    },
    {
        name: "Project Delta",
        description: "Social media analytics tool",
        tasks: [
            {
                name: "Collect API Data",
                dueDate: "2025-07-01",
                progress: 70,
                priority: "High",
                completed: true,
                assignedMembers: ["Grace"], // 1 member assigned
            },
            {
                name: "Visualize Data",
                dueDate: "2025-07-05",
                progress: 50,
                priority: "Medium",
                completed: false,
                assignedMembers: ["Hank"], // 1 member assigned
            },
            {
                name: "Generate Reports",
                dueDate: "2025-07-10",
                progress: 30,
                priority: "Low",
                completed: false,
                assignedMembers: ["Grace", "Hank"], // 2 members assigned
            },
        ],
        members: ["Grace", "Hank", "Oscar", "Paul", "Quincy", "Rachel"], // Max 6 members
    },
    {
        name: "Project Epsilon",
        description: "AI-powered chatbot",
        tasks: [
            {
                name: "Train NLP Model",
                dueDate: "2025-11-01",
                progress: 20,
                priority: "High",
                completed: false,
                assignedMembers: ["Ivy"], // 1 member assigned
            },
            {
                name: "Integrate with Website",
                dueDate: "2025-11-05",
                progress: 40,
                priority: "Medium",
                completed: false,
                assignedMembers: ["Jack"], // 1 member assigned
            },
            {
                name: "Test Chatbot Responses",
                dueDate: "2025-11-10",
                progress: 60,
                priority: "Low",
                completed: true,
                assignedMembers: ["Ivy", "Jack"], // 2 members assigned
            },
        ],
        members: ["Ivy", "Jack", "Steve", "Tina", "Alice", "Bob"], // Max 6 members
    },
    {
        name: "Project Zeta",
        description: "Online learning platform",
        tasks: [
            {
                name: "Create Course Modules",
                dueDate: "2025-12-01",
                progress: 80,
                priority: "High",
                completed: true,
                assignedMembers: ["Karen"], // 1 member assigned
            },
            {
                name: "Develop Quiz Feature",
                dueDate: "2025-12-05",
                progress: 50,
                priority: "Medium",
                completed: false,
                assignedMembers: ["Leo"], // 1 member assigned
            },
            {
                name: "Launch Beta Version",
                dueDate: "2025-12-10",
                progress: 10,
                priority: "Low",
                completed: false,
                assignedMembers: ["Karen", "Leo"], // 2 members assigned
            },
        ],
        members: ["Karen", "Leo", "Charlie", "Dana", "Eve", "Frank"], // Max 6 members
    },
    {
        name: "Project Eta",
        description: "Fitness tracking app",
        tasks: [
            {
                name: "Design Workout Plans",
                dueDate: "2026-01-01",
                progress: 60,
                priority: "High",
                completed: false,
                assignedMembers: ["Mona"], // 1 member assigned
            },
            {
                name: "Integrate Wearable Devices",
                dueDate: "2026-01-05",
                progress: 30,
                priority: "Medium",
                completed: false,
                assignedMembers: ["Nina"], // 1 member assigned
            },
            {
                name: "Test App Usability",
                dueDate: "2026-01-10",
                progress: 90,
                priority: "Low",
                completed: true,
                assignedMembers: ["Mona", "Nina"], // 2 members assigned
            },
        ],
        members: ["Mona", "Nina", "Grace", "Hank", "Ivy", "Jack"], // Max 6 members
    },
    {
        name: "Project Theta",
        description: "Blockchain-based voting system",
        tasks: [
            {
                name: "Develop Smart Contracts",
                dueDate: "2026-02-01",
                progress: 40,
                priority: "High",
                completed: false,
                assignedMembers: ["Oscar"], // 1 member assigned
            },
            {
                name: "Create User Interface",
                dueDate: "2026-02-05",
                progress: 70,
                priority: "Medium",
                completed: true,
                assignedMembers: ["Paul"], // 1 member assigned
            },
            {
                name: "Test Security Features",
                dueDate: "2026-02-10",
                progress: 20,
                priority: "Low",
                completed: false,
                assignedMembers: ["Oscar", "Paul"], // 2 members assigned
            },
        ],
        members: ["Oscar", "Paul", "Quincy", "Rachel", "Steve", "Tina"], // Max 6 members
    },
    {
        name: "Project Iota",
        description: "Virtual reality game",
        tasks: [
            {
                name: "Design Game Levels",
                dueDate: "2026-03-01",
                progress: 50,
                priority: "High",
                completed: false,
                assignedMembers: ["Quincy"], // 1 member assigned
            },
            {
                name: "Develop VR Controls",
                dueDate: "2026-03-05",
                progress: 80,
                priority: "Medium",
                completed: true,
                assignedMembers: ["Rachel"], // 1 member assigned
            },
            {
                name: "Test Game Mechanics",
                dueDate: "2026-03-10",
                progress: 30,
                priority: "Low",
                completed: false,
                assignedMembers: ["Quincy", "Rachel"], // 2 members assigned
            },
        ],
        members: ["Quincy", "Rachel", "Alice", "Bob", "Charlie", "Dana"], // Max 6 members
    },
    {
        name: "Project Kappa",
        description: "Cloud storage solution",
        tasks: [
            {
                name: "Set Up Cloud Infrastructure",
                dueDate: "2026-04-01",
                progress: 90,
                priority: "High",
                completed: true,
                assignedMembers: ["Steve"], // 1 member assigned
            },
            {
                name: "Develop File Upload Feature",
                dueDate: "2026-04-05",
                progress: 60,
                priority: "Medium",
                completed: false,
                assignedMembers: ["Tina"], // 1 member assigned
            },
            {
                name: "Test Data Security",
                dueDate: "2026-04-10",
                progress: 40,
                priority: "Low",
                completed: false,
                assignedMembers: ["Steve", "Tina"], // 2 members assigned
            },
        ],
        members: ["Steve", "Tina", "Eve", "Frank", "Karen", "Leo"], // Max 6 members
    },
];

export default ProjectData;