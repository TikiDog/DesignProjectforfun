// Workflow Manager Application with Columns, Dates, and People
class WorkflowManager {
    constructor() {
        this.tasks = [];
        this.selectedColor = '#74b9ff';
        this.draggedElement = null;
        this.colorPickerTaskId = null;
        this.columns = ['todo', 'in-progress', 'review', 'done'];
        this.peopleColors = {}; // Map of person name to their assigned color

        this.init();
    }

    init() {
        this.loadFromLocalStorage();
        this.setupEventListeners();
        this.renderTasks();
    }

    getPersonColor(personName) {
        if (!personName) return null;

        // If this person doesn't have a color yet, assign the currently selected color
        if (!this.peopleColors[personName]) {
            this.peopleColors[personName] = this.selectedColor;
            this.saveToLocalStorage();
        }

        return this.peopleColors[personName];
    }

    setupEventListeners() {
        // Add task button
        document.getElementById('addTaskBtn').addEventListener('click', () => this.addTask());

        // Add sample data button
        document.getElementById('addSampleDataBtn').addEventListener('click', () => this.addSampleData());

        // Enter key in input
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        // Color picker buttons
        document.querySelectorAll('.color-options .color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target.closest('.color-btn');
                if (!target) return;

                document.querySelectorAll('.color-options .color-btn').forEach(b => b.classList.remove('active'));
                target.classList.add('active');
                this.selectedColor = target.dataset.color;
            });
        });

        // Setup drag and drop for columns
        document.querySelectorAll('.column-tasks').forEach(column => {
            column.addEventListener('dragover', (e) => this.handleColumnDragOver(e));
            column.addEventListener('drop', (e) => this.handleColumnDrop(e));
            column.addEventListener('dragenter', (e) => this.handleColumnDragEnter(e));
            column.addEventListener('dragleave', (e) => this.handleColumnDragLeave(e));
        });
    }

    addSampleData() {
        if (this.tasks.length > 0) {
            if (!confirm('This will add sample tasks. Continue?')) {
                return;
            }
        }

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        const formatDate = (date) => date.toISOString().split('T')[0];

        const sampleTasks = [
            {
                id: Date.now() + 1,
                text: 'Review quarterly reports',
                person: 'Sarah',
                color: '#ff6b6b',
                column: 'todo',
                createdDate: formatDate(today),
                dueDate: formatDate(tomorrow),
                order: 0
            },
            {
                id: Date.now() + 2,
                text: 'Update client presentation',
                person: 'John',
                color: '#ffeaa7',
                column: 'in-progress',
                createdDate: formatDate(today),
                dueDate: formatDate(nextWeek),
                order: 0
            },
            {
                id: Date.now() + 3,
                text: 'Schedule team meeting',
                person: 'Mike',
                color: '#74b9ff',
                column: 'review',
                createdDate: formatDate(today),
                dueDate: formatDate(nextWeek),
                order: 0
            },
            {
                id: Date.now() + 4,
                text: 'Finalize budget proposal',
                person: 'Sarah',
                color: '#ff6b6b',
                column: 'done',
                createdDate: formatDate(today),
                dueDate: null,
                order: 0
            }
        ];

        // Add people colors
        this.peopleColors['Sarah'] = '#ff6b6b';
        this.peopleColors['John'] = '#ffeaa7';
        this.peopleColors['Mike'] = '#74b9ff';

        this.tasks.push(...sampleTasks);
        this.saveToLocalStorage();
        this.renderTasks();
    }

    addTask() {
        const input = document.getElementById('taskInput');
        const personInput = document.getElementById('personInput');
        const dueDateInput = document.getElementById('dueDateInput');
        const text = input.value.trim();
        const personName = personInput.value.trim();

        if (text === '') {
            input.focus();
            return;
        }

        // Get or assign color for this person
        let taskColor = this.selectedColor;
        if (personName) {
            taskColor = this.getPersonColor(personName);
        }

        const task = {
            id: Date.now(),
            text: text,
            person: personName || null,
            color: taskColor,
            column: 'todo',
            createdDate: new Date().toISOString().split('T')[0],
            dueDate: dueDateInput.value || null,
            order: this.tasks.filter(t => t.column === 'todo').length
        };

        this.tasks.push(task);
        this.saveToLocalStorage();
        this.renderTasks();

        input.value = '';
        personInput.value = '';
        dueDateInput.value = '';
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

    updateDueDate(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        const newDate = prompt('Enter new due date (YYYY-MM-DD):', task.dueDate || '');
        if (newDate !== null) {
            task.dueDate = newDate || null;
            this.saveToLocalStorage();
            this.renderTasks();
        }
    }

    renderTasks() {
        // Render tasks in each column
        this.columns.forEach(columnId => {
            const columnElement = document.querySelector(`.column-tasks[data-column="${columnId}"]`);
            const columnTasks = this.tasks
                .filter(task => task.column === columnId)
                .sort((a, b) => a.order - b.order);

            // Update task count
            const countElement = columnElement.parentElement.querySelector('.task-count');
            countElement.textContent = columnTasks.length;

            // Clear column
            columnElement.innerHTML = '';

            // Add tasks
            if (columnTasks.length === 0) {
                columnElement.innerHTML = '<div class="empty-state" style="padding: 20px; font-size: 0.9rem; color: #b2bec3;">Drop tasks here</div>';
            } else {
                columnTasks.forEach(task => {
                    const taskElement = this.createTaskElement(task);
                    columnElement.appendChild(taskElement);
                });
            }
        });
    }

    createTaskElement(task) {
        const div = document.createElement('div');
        div.className = 'task-item';
        div.dataset.id = task.id;
        div.draggable = true;

        // Check if due date is overdue
        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
        const dueDateClass = isOverdue ? 'task-date overdue' : 'task-date';

        // Format dates
        const createdDateStr = this.formatDate(task.createdDate);
        const dueDateStr = task.dueDate ? this.formatDate(task.dueDate) : 'No due date';

        // Person badge
        const personBadge = task.person
            ? `<div class="task-person" style="background-color: ${task.color};">
                 <span class="task-person-icon">👤</span>
                 <span>${this.escapeHtml(task.person)}</span>
               </div>`
            : '';

        div.innerHTML = `
            <div class="task-header">
                <span class="drag-handle">⋮⋮</span>
                <div class="task-content">
                    <div class="task-color" style="background-color: ${task.color};"></div>
                    <div class="task-text">${this.escapeHtml(task.text)}</div>
                </div>
                <div class="task-actions">
                    <button class="delete-btn">×</button>
                </div>
            </div>
            ${personBadge}
            <div class="task-dates">
                <div class="task-date">
                    <span class="date-label">Created:</span>
                    <span>${createdDateStr}</span>
                </div>
                <div class="${dueDateClass}" data-type="due">
                    <span class="date-label">Due:</span>
                    <span>${dueDateStr}</span>
                </div>
            </div>
        `;

        // Drag and drop events
        div.addEventListener('dragstart', (e) => this.handleDragStart(e));
        div.addEventListener('dragend', (e) => this.handleDragEnd(e));

        // Color change
        div.querySelector('.task-color').addEventListener('click', () => {
            this.showColorPicker(task.id, task.color);
        });

        // Due date change
        const dueDateElement = div.querySelector('.task-date[data-type="due"]');
        if (dueDateElement) {
            dueDateElement.addEventListener('click', () => {
                this.updateDueDate(task.id);
            });
        }

        // Delete button
        div.querySelector('.delete-btn').addEventListener('click', () => {
            this.deleteTask(task.id);
        });

        return div;
    }

    formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    handleDragStart(e) {
        this.draggedElement = e.currentTarget;
        e.currentTarget.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', e.currentTarget.dataset.id);
    }

    handleDragEnd(e) {
        e.currentTarget.classList.remove('dragging');

        // Remove all drag-over classes
        document.querySelectorAll('.column-tasks').forEach(column => {
            column.classList.remove('drag-over');
        });
    }

    handleColumnDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    handleColumnDragEnter(e) {
        if (e.currentTarget.classList.contains('column-tasks')) {
            e.currentTarget.classList.add('drag-over');
        }
    }

    handleColumnDragLeave(e) {
        if (e.currentTarget.classList.contains('column-tasks')) {
            e.currentTarget.classList.remove('drag-over');
        }
    }

    handleColumnDrop(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        const taskId = parseInt(e.dataTransfer.getData('text/plain'));
        const targetColumn = e.currentTarget.dataset.column;

        if (!taskId || !targetColumn) return;

        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        // Update task column
        task.column = targetColumn;

        // Reorder within new column
        const columnTasks = this.tasks.filter(t => t.column === targetColumn);
        columnTasks.forEach((t, index) => {
            t.order = index;
        });

        this.saveToLocalStorage();
        this.renderTasks();

        return false;
    }

    saveToLocalStorage() {
        localStorage.setItem('workflowTasks', JSON.stringify(this.tasks));
        localStorage.setItem('workflowPeopleColors', JSON.stringify(this.peopleColors));
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

        const storedPeople = localStorage.getItem('workflowPeopleColors');
        if (storedPeople) {
            try {
                this.peopleColors = JSON.parse(storedPeople);
            } catch (e) {
                console.error('Error loading people colors from localStorage:', e);
                this.peopleColors = {};
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
