import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Import the back icon
import ProjectData from '../database/ProjectData'; // Import your project data

const TaskDetailsPage = () => {
    const { taskId } = useParams(); // Get the taskId from the URL
    const navigate = useNavigate();
    const [comment, setComment] = useState(''); // State for comments
    const [commentsList, setCommentsList] = useState([]); // State for submitted comments
    const [files, setFiles] = useState([]); // State for uploaded files
    const [progress, setProgress] = useState(ProjectData.progress || 0); // Local state for progress

    // Handle file upload with improved validation and removal
    const handleFileUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        const newFiles = [];

        uploadedFiles.forEach((file) => {
            if (file.size > 10 * 1024 * 1024) {
                alert(`File "${file.name}" exceeds 10MB and was not uploaded.`);
                return;
            }
            
            // Prevent duplicate files
            if (files.some((f) => f.name === file.name)) {
                alert(`File "${file.name}" is already uploaded.`);
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                newFiles.push({
                    name: file.name,
                    type: file.type,
                    content: event.target.result, // Store base64 content
                });

                // Update state only after all files are processed
                setFiles((prevFiles) => [...prevFiles, ...newFiles]);
            };
            reader.onerror = () => {
                alert(`Error reading file "${file.name}"`);
            };
            reader.readAsDataURL(file);
        });
    };

    // Function to remove a file from the uploaded list
    const handleRemoveFile = (fileName) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    };

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

    // Handle comment submission
    const handleCommentSubmit = () => {
        if (comment.trim()) {
            const memberName = "Alice"; // Replace with the actual member's name (e.g., from a logged-in user or dropdown)
            const commentTime = new Date().toLocaleTimeString(); // Get the current time
            setCommentsList([...commentsList, { text: comment, member: memberName, time: commentTime }]);
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

    // Handle back navigation with confirmation dialog
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
            backgroundColor: '#121212', // Dark Gray
            color: '#fff', // White
            width: '100%',
            minHeight: '100vh',
            padding: '20px',
            position: 'relative', // Ensure the back icon is positioned correctly
        },
        heading: {
            color: '#FFCC00', // Gold
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
        },
        backIcon: {
            cursor: 'pointer',
            marginRight: '20px',
            fontSize: '24px',
            color: '#fff', // White
            transition: 'color 0.3s',
            ':hover': {
                color: '#007bff', // Sky Blue
            },
        },
        taskName: {
            color: '#fff', // White
            marginBottom: '15px',
            fontSize: '28px',
            fontWeight: 'bold',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff', // Sky Blue
            color: '#fff', // White
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
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light Gray with opacity
            padding: '10px',
            borderRadius: '5px',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            {/* Back Icon at the top-left corner */}
            <div style={styles.heading}>
                <FaArrowLeft
                    style={styles.backIcon}
                    onClick={handleBack}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#007bff')} // Sky Blue
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')} // White
                />
                <h1>Task Details</h1>
            </div>

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
                    color: task.priority === 'High' ? '#ff4444' : // Coral
                        task.priority === 'Medium' ? '#ffcc00' : // Gold
                        '#00c851', // Teal
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
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light Gray with opacity
                        color: '#fff', // White
                        border: '1px solid rgba(255, 255, 255, 0.2)', // Light Gray with opacity
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
                        backgroundColor: '#007bff', // Sky Blue
                        color: '#fff', // White
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
                                <strong>{comment.member}</strong> ({comment.time}): {comment.text}
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
                        backgroundColor: task.completed ? '#00c851' : '#007bff', // Teal or Sky Blue
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

            {/* Display Uploaded Files */}
            {files.length > 0 && (
                <div style={styles.fileGrid}>
                    {files.map((file, index) => (
                        <div key={index} style={styles.fileItem}>
                            {file.type.startsWith('image/') ? (
                                <img src={file.content} alt={file.name} style={{ width: '100%', borderRadius: '5px' }} />
                            ) : file.type === "application/pdf" ? (
                                <iframe
                                    src={file.content}
                                    title={file.name}
                                    style={{ width: "100%", height: "150px", border: "1px solid #ccc", borderRadius: "5px" }}
                                />
                            ) : (
                                <p style={{ color: '#ccc' }}>{file.name}</p>
                            )}        
                            <button
                                style={{
                                    marginTop: '5px',
                                    backgroundColor: '#ff4444', // Coral
                                    color: '#fff', // White
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleRemoveFile(file.name)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskDetailsPage;