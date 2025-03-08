const notifications = [
    {
        user_id: 1,
        sent_by: "Alice",
        project_id: 101,
        task_id: 201,
        type: "Task Assigned",
        message: "You have been assigned to the task 'Design UI'.",
        status: "unread",
        created_at: "2025-03-04T10:30:00Z"
    },
    {
        user_id: 2,
        sent_by: "Bob",
        project_id: 102,
        task_id: 202,
        type: "Task Completed",
        message: "Bob has completed the task 'Implement Backend'.",
        status: "read",
        created_at: "2025-03-03T14:15:00Z"
    },
    {
        user_id: 3,
        sent_by: "Charlie",
        project_id: 103,
        task_id: 203,
        type: "Comment",
        message: "Charlie commented on 'Write Documentation'.",
        status: "unread",
        created_at: "2025-03-02T18:45:00Z"
    },
    {
        user_id: 4,
        sent_by: "Dana",
        project_id: 104,
        task_id: 204,
        type: "Task Due Soon",
        message: "Reminder: The task 'Review Code' is due tomorrow.",
        status: "unread",
        created_at: "2025-03-01T09:00:00Z"
    },
    {
        user_id: 5,
        sent_by: "Eve",
        project_id: 105,
        task_id: 205,
        type: "Project Update",
        message: "Eve has updated the project 'Project Beta'.",
        status: "read",
        created_at: "2025-02-28T22:10:00Z"
    }
];

export default notifications;
