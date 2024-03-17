import React, { useState } from 'react';

function TodoPage() {
    const [tasksList, setTasksList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const openModal = (id = null) => {
        setIsModalOpen(true);
        if (id !== null) {
            const taskToEdit = tasksList.find(task => task.id === id);
            setTaskTitle(taskToEdit.title);
            setTaskDescription(taskToEdit.description);
            setSelectedTaskId(id);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTaskTitle('');
        setTaskDescription('');
        setSelectedTaskId(null);
    };

    const handleTaskAction = () => {
        const action = selectedTaskId ? updateTask : createTask;
        action();
    };

    const createTask = () => {
        setTasksList([...tasksList, { id: Date.now(), title: taskTitle, description: taskDescription }]);
        closeModal();
    };

    const updateTask = () => {
        const updatedTasks = tasksList.map(task =>
            task.id === selectedTaskId ? { ...task, title: taskTitle, description: taskDescription } : task
        );
        setTasksList(updatedTasks);
        closeModal();
    };

    const deleteTask = id => {
        setTasksList(tasksList.filter(task => task.id !== id));
    };

    return (
        <div className="p-4" style={{ background: 'linear-gradient(to bottom, #FFB6C1, #483D8B)' }}>
            <div className='flex justify-evenly'>
                <div className="mb-4 font-mono text-3xl">TASK MANAGER</div>
                <button
                    className="px-4 py-1 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
                    onClick={() => openModal()}
                >
                    Create Task
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="p-8 bg-white rounded shadow w-96">
                        <h2 className="mb-4 text-2xl font-bold">
                            {selectedTaskId ? 'Update Task' : 'Create Task'}
                        </h2>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                            placeholder="Title"
                            value={taskTitle}
                            onChange={e => setTaskTitle(e.target.value)}
                        />
                        <textarea
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                            placeholder="Description"
                            value={taskDescription}
                            onChange={e => setTaskDescription(e.target.value)}
                        ></textarea>
                        <div className="flex justify-between">
                            <button
                                className="px-4 py-2 text-white bg-red-500 rounded shadow hover:bg-red-600"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
                                onClick={handleTaskAction}
                            >
                                {selectedTaskId ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-8">
                {tasksList.map(task => (
                    <div key={task.id} className="flex justify-between p-4 mx-2 mb-4 bg-white border rounded-md shadow-lg lg:mx-32">
                        <div>
                            <h2 className="text-xl font-medium">{task.title}</h2>
                            <p className='font-light text-gray-600'>{task.description}</p>
                        </div>
                        <div className="flex justify-between mt-2 gap-x-5">
                            <button
                                className="px-4 py-2 text-white bg-yellow-500 rounded shadow hover:bg-yellow-600"
                                onClick={() => openModal(task.id)}
                            >
                                Update
                            </button>
                            <button
                                className="px-4 py-2 text-white bg-red-700 rounded shadow hover:bg-red-600"
                                onClick={() => deleteTask(task.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodoPage;
