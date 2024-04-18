import Task from "./Task.js";
/**
 * @class User
 * @property {string} username - The username of the user
 * @property {string} nameColor - The color of the username
 * @property {Task[]} tasks - The tasks of the user
 * @method validateUsername - Validate the username of the user
 * @method addTask - Add tasks to the user
 * @method editTask - Edit the task at the specified index
 * @method completeTask - Mark the task at index as complete
 * @method deleteTask - Delete the task at the specified index
 * @method clearDoneTasks - Clear all completed tasks
 * @method getTask - Get the task at the specified index
 * @method getTasks - Get all tasks of the user
 * @method validateTaskIndex - Validates the task index
 */
export default class User {
	/**
	 * @constructor
	 * @param {string} username - The username of the user
	 * @param {{nameColor: string}} options - The username of the user
	 */
	constructor(username, options) {
		this.username = this.validateUsername(username);
		this.nameColor = options?.nameColor || "";
		this.tasks = [];
	}

	/**
	 * Validate the username of the user
	 * @param {string} username - The username of the user
	 * @returns {string} - The username of the user
	 * @throws {Error} - If the username is invalid
	 */
	validateUsername(username) {
		if (typeof username !== "string") {
			throw new Error("Username must be of type string");
		}
		username = username.trim();
		if (username.length === 0) {
			throw new Error("Username invalid");
		}
		return username;
	}

	/**
	 * Add tasks to the user
	 * @param {Task} task - The Task to add
	 * @returns {Task} - The Task that was added
	 */
	addTask(task) {
		this.tasks.push(task);
		return task;
	}

	/**
	 * Edit the task at the specified index
	 * @param {number} index - The index of the task to get
	 * @param {string} description - The new task description
	 * @throws {Error} If the index is out of bounds
	 * @returns {Task} - The task that was edited
	 */
	editTask(index, description) {
		let task = this.getTask(index);
		task.setDescription(description);
		return task;
	}

	/**
	 * Mark the task at the specified index as complete
	 * @param {number} index - The index of the task to complete
	 * @throws {Error} If the index is out of bounds
	 * @returns {Task} - The task that was completed
	 */
	completeTask(index) {
		let task = this.getTask(index);
		task.setCompletionStatus(true);
		return task;
	}

	/**
	 * Delete the task at the specified index
	 * @param {number[]} indices - The indices of the tasks to delete
	 * @returns {Task[]}	The task that was removed
	 */
	deleteTask(indices) {
		if (!Array.isArray(indices)) {
			indices = [indices];
		}
		indices.forEach((index) => this.validateTaskIndex(index));
		const taskForDeletion = [];
		this.tasks = this.tasks.filter((task, i) => {
			if (indices.includes(i)) {
				taskForDeletion.push(task);
			} else {
				return true;
			}
		});

		return taskForDeletion;
	}

	/**
	 * Clear all completed tasks
	 * @returns {Task[]} - The tasks that were cleared
	 */
	clearDoneTasks() {
		/** @type Task[] */
		this.tasks = this.tasks.filter((task) => !task.isComplete());
		return this.tasks;
	}

	/**
	 * Get the task at the specified index
	 * @param {number} index - The index of the task to get
	 * @returns {Task} - The task at the specified index
	 */
	getTask(index) {
		this.validateTaskIndex(index);
		return this.tasks[index];
	}

	/**
	 * Get the tasks of the user
	 * @returns {Task[]} - The tasks of the user
	 */
	getTasks() {
		return this.tasks;
	}

	/**
	 * Validates the task index.
	 * @param {number} index - The index of the task.
	 * @throws {Error} If the index is out of bounds.
	 * @returns {boolean}
	 */
	validateTaskIndex(index) {
		if (typeof index !== "number" || isNaN(index)) {
			throw new Error("Task index must be a number");
		}
		if (index < 0 || index >= this.tasks.length) {
			throw new Error("Task index out of bounds");
		}
		return true;
	}
}