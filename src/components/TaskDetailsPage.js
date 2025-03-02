import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectData from '../components/ProjectData'; // Import your project data

const TaskDetailsPage = () => {
    const { taskId } = useParams(); // Get the taskId from the URL
    const navigate = useNavigate();
    const [comment, setComment] = useState(''); // State for comments
    const [commentsList, setCommentsList] = useState([]); // State for submitted comments
    const [files, setFiles] = useState([]); // State for uploaded files
    const [progress, setProgress] = useState(ProjectData.progress || 0); // Local state for progress


    // Find the task by taskId
    let task = null;
    let projectName = '';
    for (const project of ProjectData) {
        task = project.tasks.find((t) => t.name === taskId);
        if (task) {
            projectName = project.name;
            break;
        }
    }

    if (!task) {
        return <h2 style={{ color: 'white' }}>Task not found</h2>;
    }

    const handleProgressChange = (e) => {
        const newProgress = parseInt(e.target.value, 10);
        setProgress(newProgress);
        // Update the task's progress in ProjectData (if needed)
        const updatedProjectData = ProjectData.map((project) => {
            const updatedTasks = project.tasks.map((t) => {
                if (t.name === taskId) {
                    return { ...t, progress: newProgress };
                }
                return t;
            });
            return { ...project, tasks: updatedTasks };
        });
        console.log(updatedProjectData); // For debugging
    };

    // Handle file upload with error handling
    const handleFileUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        uploadedFiles.forEach((file) => {
            if (file.size > 10 * 1024 * 1024) { // Limit file size to 10MB
                alert('File size exceeds 10MB');
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                setFiles((prevFiles) => [
                    ...prevFiles,
                    {
                        name: file.name,
                        type: file.type,
                        content: event.target.result, // Store file content (e.g., base64 URL)
                    },
                ]);
            };
            reader.onerror = () => {
                alert('Error reading file');
            };
            reader.readAsDataURL(file); // Read file as base64 URL
        });
    };

    // Handle comment submission
    const handleCommentSubmit = () => {
        if (comment.trim()) {
            setCommentsList([...commentsList, comment]);
            setComment(''); // Clear the textarea
        }
    };

    // Handle marking task as completed
    const handleMarkAsCompleted = () => {
        const updatedProjectData = ProjectData.map((project) => {
            const updatedTasks = project.tasks.map((t) => {
                if (t.name === taskId) {
                    return { ...t, completed: !t.completed };
                }
                return t;
            });
            return { ...project, tasks: updatedTasks };
        });
        // Update ProjectData (you might need to use a state management solution like Redux or Context API)
        console.log(updatedProjectData); // For debugging
        alert(task.completed ? 'Task marked as incomplete' : 'Task marked as completed');
    };

    // Handle back button with confirmation dialog
    const handleBack = () => {
        if (comment.trim() || files.length > 0) {
            const confirmBack = window.confirm('You have unsaved changes. Are you sure you want to leave?');
            if (confirmBack) {
                navigate(-1);
            }
        } else {
            navigate(-1);
        }
    };

    // Styles for responsive design
    const styles = {
        container: {
            backgroundColor: '#121212',
            color: '#fff',
            minHeight: '100vh',
            padding: '20px',
        },
        heading: {
            color: 'orange',
            marginBottom: '20px',
        },
        taskName: {
            color: '#fff',
            marginBottom: '15px',
            fontSize: '28px',
            fontWeight: 'bold',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            flex: 1, // Make buttons equal width
        },
        fileGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '20px',
        },
        fileItem: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '10px',
            borderRadius: '5px',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Task Details</h1>

            {/* Task Name */}
            <h2 style={styles.taskName}>{task.name}</h2>

            {/* Project Name */}
            <p style={{ color: '#ccc', marginBottom: '15px', fontSize: '18px' }}>
                <strong>Project:</strong> {projectName}
            </p>

            {/* Due Date */}
            <p style={{ color: '#ccc', marginBottom: '15px', fontSize: '18px' }}>
                <strong>Due Date:</strong> {task.dueDate}
            </p>

            {/* Progress */}
            <div style={{ marginBottom: '15px' }}>
                <strong>Progress:</strong>
                <div style={{
                    width: '100%',
                    height: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '5px',
                    marginTop: '5px',
                }}>
                    <div style={{
                        width: `${task.progress || 0}%`,
                        height: '100%',
                        backgroundColor: '#007bff',
                        borderRadius: '5px',
                    }}></div>
                </div>
                <span style={{ color: '#ccc', fontSize: '14px' }}>{task.progress || 0}% Complete</span>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <strong>Progress:</strong>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    style={{ width: '100%', marginTop: '5px' }}
                />
                <span style={{ color: '#ccc', fontSize: '14px' }}>{progress}% Complete</span>
            </div>

            {/* Priority */}
            <p style={{ color: '#ccc', marginBottom: '15px', fontSize: '18px' }}>
                <strong>Priority:</strong>
                <span style={{
                    color: task.priority === 'High' ? '#ff4444' :
                        task.priority === 'Medium' ? '#ffcc00' : '#00c851',
                    marginLeft: '8px',
                }}>
                    {task.priority || 'Low'}
                </span>
            </p>

            {/* Assigned Members */}
            <p style={{ color: '#ccc', marginBottom: '15px', fontSize: '18px' }}>
                <strong>Assigned Members:</strong> {task.assignedMembers.join(', ')}
            </p>

            {/* Task Description (Optional) */}
            <p style={{ color: '#ccc', marginBottom: '15px', fontSize: '18px' }}>
                <strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            {/* Comments Textarea */}
            <div style={{ marginBottom: '15px' }}>
                <strong>Comments:</strong>
                <textarea
                    style={{
                        width: '100%',
                        height: '100px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '5px',
                        padding: '10px',
                        marginTop: '5px',
                    }}
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    style={{
                        marginTop: '10px',
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                    onClick={handleCommentSubmit}
                >
                    Submit Comment
                </button>
            </div>

            {/* Display Comments */}
            {commentsList.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <strong>Comments:</strong>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {commentsList.map((comment, index) => (
                            <li key={index} style={{ color: '#ccc', marginBottom: '10px' }}>
                                {comment}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                    style={{
                        ...styles.button,
                        backgroundColor: task.completed ? '#00c851' : '#007bff',
                    }}
                    onClick={handleMarkAsCompleted}
                >
                    {task.completed ? 'Completed' : 'Mark as Completed'}
                </button>
                <label style={styles.button}>
                    Attach File
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        multiple
                    />
                </label>
            </div>

            {/* Display Uploaded Files in Grid Format */}
            {files.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <strong>Uploaded Files:</strong>
                    <div style={styles.fileGrid}>
                        {files.map((file, index) => (
                            <div key={index} style={styles.fileItem}>
                                <div style={{ color: '#ccc', marginBottom: '5px' }}>
                                    {file.name}
                                </div>
                                {file.type.startsWith('image/') ? (
                                    <img
                                        src={file.content}
                                        alt={file.name}
                                        style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '5px' }}
                                    />
                                ) : file.type === 'application/pdf' ? (
                                    <iframe
                                        src={file.content}
                                        title={file.name}
                                        style={{ width: '100%', height: '500px', border: 'none' }}
                                    />
                                ) : (
                                    <a
                                        href={file.content}
                                        download={file.name}
                                        style={{ color: '#007bff', textDecoration: 'none' }}
                                    >
                                        Download {file.name}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Back Button */}
            <button
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#555',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={handleBack}
            >
                Back
            </button>
        </div>
    );
};

export default TaskDetailsPage;