// Workflow Manager Application
class WorkflowManager {
    constructor() {
        this.tasks = [];
        this.selectedColor = '#74b9ff';
        this.currentFilter = 'all';
        this.draggedElement = null;
        this.colorPickerTaskId = null;

        this.init();
    }

    init() {
        this.loadFromLocalStorage();
        this.setupEventListeners();
        this.renderTasks();
    }

    setupEventListeners() {
        // Add task button
        document.getElementById('addTaskBtn').addEventListener('click', () => this.addTask());

        // Enter key in input
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        // Color picker buttons
        document.querySelectorAll('.color-options .color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.color-options .color-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedColor = e.target.dataset.color;
            });
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderTasks();
            });
        });
    }

    addTask() {
        const input = document.getElementById('taskInput');
        const text = input.value.trim();

        if (text === '') {
            input.focus();
            return;
        }

        const task = {
            id: Date.now(),
            text: text,
            color: this.selectedColor,
            order: this.tasks.length
        };

        this.tasks.push(task);
        this.saveToLocalStorage();
        this.renderTasks();

        input.value = '';
        input.focus();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveToLocalStorage();
        this.renderTasks();
    }

    changeTaskColor(id, newColor) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.color = newColor;
            this.saveToLocalStorage();
            this.renderTasks();
        }
    }

    showColorPicker(id, currentColor) {
        const modal = document.getElementById('colorPickerModal');
        this.colorPickerTaskId = id;

        // Create modal if it doesn't exist
        if (!modal) {
            this.createColorPickerModal();
        }

        document.getElementById('colorPickerModal').classList.add('active');
    }

    createColorPickerModal() {
        const colors = [
            { color: '#ff6b6b', label: 'Red - Urgent' },
            { color: '#4ecdc4', label: 'Teal - In Progress' },
            { color: '#45b7d1', label: 'Blue - Information' },
            { color: '#96ceb4', label: 'Green - Complete' },
            { color: '#ffeaa7', label: 'Yellow - Review' },
            { color: '#dfe6e9', label: 'Gray - Low Priority' },
            { color: '#a29bfe', label: 'Purple - Idea' },
            { color: '#74b9ff', label: 'Light Blue - Default' }
        ];

        const modal = document.createElement('div');
        modal.id = 'colorPickerModal';
        modal.className = 'color-picker-modal';

        let gridHTML = '';
        colors.forEach(c => {
            gridHTML += `<button class="color-btn" data-color="${c.color}" style="background-color: ${c.color};" title="${c.label}"></button>`;
        });

        modal.innerHTML = `
            <div class="color-picker-content">
                <h3>Choose a color</h3>
                <div class="color-picker-grid">
                    ${gridHTML}
                </div>
                <button class="close-modal-btn">Cancel</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners for modal
        modal.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const newColor = e.target.dataset.color;
                this.changeTaskColor(this.colorPickerTaskId, newColor);
                this.closeColorPicker();
            });
        });

        modal.querySelector('.close-modal-btn').addEventListener('click', () => {
            this.closeColorPicker();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeColorPicker();
            }
        });
    }

    closeColorPicker() {
        const modal = document.getElementById('colorPickerModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');

        // Filter tasks
        let filteredTasks = this.tasks;
        if (this.currentFilter !== 'all') {
            filteredTasks = this.tasks.filter(task => task.color === this.currentFilter);
        }

        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <div class="empty-state-text">No tasks yet. Add one to get started!</div>
                </div>
            `;
            return;
        }

        taskList.innerHTML = '';

        filteredTasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    }

    createTaskElement(task) {
        const div = document.createElement('div');
        div.className = 'task-item';
        div.dataset.id = task.id;
        div.draggable = true;

        div.innerHTML = `
            <span class="drag-handle">⋮⋮</span>
            <div class="task-color" style="background-color: ${task.color};"></div>
            <div class="task-text">${this.escapeHtml(task.text)}</div>
            <div class="task-actions">
                <button class="delete-btn">×</button>
            </div>
        `;

        // Drag and drop events
        div.addEventListener('dragstart', (e) => this.handleDragStart(e));
        div.addEventListener('dragend', (e) => this.handleDragEnd(e));
        div.addEventListener('dragover', (e) => this.handleDragOver(e));
        div.addEventListener('drop', (e) => this.handleDrop(e));
        div.addEventListener('dragenter', (e) => this.handleDragEnter(e));
        div.addEventListener('dragleave', (e) => this.handleDragLeave(e));

        // Color change
        div.querySelector('.task-color').addEventListener('click', () => {
            this.showColorPicker(task.id, task.color);
        });

        // Delete button
        div.querySelector('.delete-btn').addEventListener('click', () => {
            this.deleteTask(task.id);
        });

        return div;
    }

    handleDragStart(e) {
        this.draggedElement = e.currentTarget;
        e.currentTarget.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
    }

    handleDragEnd(e) {
        e.currentTarget.classList.remove('dragging');

        // Remove all drag-over classes
        document.querySelectorAll('.task-item').forEach(item => {
            item.classList.remove('drag-over');
        });
    }

    handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    handleDragEnter(e) {
        if (e.currentTarget !== this.draggedElement) {
            e.currentTarget.classList.add('drag-over');
        }
    }

    handleDragLeave(e) {
        e.currentTarget.classList.remove('drag-over');
    }

    handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (this.draggedElement !== e.currentTarget) {
            const draggedId = parseInt(this.draggedElement.dataset.id);
            const droppedOnId = parseInt(e.currentTarget.dataset.id);

            this.reorderTasks(draggedId, droppedOnId);
        }

        return false;
    }

    reorderTasks(draggedId, droppedOnId) {
        const draggedIndex = this.tasks.findIndex(t => t.id === draggedId);
        const droppedIndex = this.tasks.findIndex(t => t.id === droppedOnId);

        if (draggedIndex !== -1 && droppedIndex !== -1) {
            const [draggedTask] = this.tasks.splice(draggedIndex, 1);
            this.tasks.splice(droppedIndex, 0, draggedTask);

            this.saveToLocalStorage();
            this.renderTasks();
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('workflowTasks', JSON.stringify(this.tasks));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('workflowTasks');
        if (stored) {
            try {
                this.tasks = JSON.parse(stored);
            } catch (e) {
                console.error('Error loading tasks from localStorage:', e);
                this.tasks = [];
            }
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.workflowManager = new WorkflowManager();
});
