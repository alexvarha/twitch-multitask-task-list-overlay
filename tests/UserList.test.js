import { beforeEach, describe, expect, test } from "vitest";
import UserList from "../src/classes/UserList";
import User from "../src/classes/User";

describe("UserList", () => {
	/** @type UserList */
	let userList;

	beforeEach(() => {
		localStorage.clear();
		userList = new UserList();
	});

	describe("constructor", () => {
		beforeEach(() => {
			localStorage.clear();
		});

		test("should load an empty user list if localStorage dose not contain userList", () => {
			userList = new UserList();
			expect(userList.users).toEqual([]);
		});

		test("should load user list if localStorage contains userList", () => {
			localStorage.setItem(
				"userList",
				JSON.stringify([
					{
						username: "user1",
						tasks: [
							{ description: "Task 1", completionStatus: false },
						],
					},
				])
			);
			userList = new UserList();
			let user = userList.users[0];
			expect(user.username).toEqual("user1");
			expect(user.tasks[0].description).toEqual("Task 1");
			expect(user.tasks[0].completionStatus).toEqual(false);
		});
	});

	describe("getUser", () => {
		test("should return user by providing username", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			const user = userList.getUser("user1");
			expect(user.username).toEqual("user1");
			expect(user.userColor).toEqual("#ff0000");
			expect(user.tasks).toEqual([]);
		});

		test("should return undefined if user does not exist", () => {
			expect(userList.getUser("nonExistentUser")).toBeUndefined();
		});
	});

	describe("getAllUsers", () => {
		test("should return all users", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			userList.createUser("user2", { userColor: "#00ff00" });

			const [user1, user2] = userList.users;
			expect(user1.username).toEqual("user1");
			expect(user1.userColor).toEqual("#ff0000");
			expect(user1.tasks).toEqual([]);

			expect(user2.username).toEqual("user2");
			expect(user2.userColor).toEqual("#00ff00");
			expect(user2.tasks).toEqual([]);
		});

		test("should return an empty array if there are no users", () => {
			expect(userList.getAllUsers()).toEqual([]);
		});
	});

	describe("createUser", () => {
		test("should create a new user", () => {
			const user = userList.createUser("user1", { userColor: "#ff0000" });
			expect(user.username).toEqual("user1");
			expect(user.userColor).toEqual("#ff0000");
			expect(user.tasks).toEqual([]);
			expect(user).toBeInstanceOf(User);
		});

		test("should throw an error if user already exists", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			expect(() =>
				userList.createUser("user1", { userColor: "#ff0000" })
			).toThrow("user1 already exists");
		});
	});

	describe("addUserTasks", () => {
		test("should be able to add a single string description", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			const taskDesc = userList.addUserTasks(
				"user1",
				"A single task containing , comma in, description"
			);
			expect(taskDesc).toEqual([
				"A single task containing , comma in, description",
			]);
		});

		test("should be able to add multiple tasks if given an array of descriptions", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			const taskDesc = userList.addUserTasks("user1", [
				"Task 1",
				"Task 2 containing , comma in, description",
			]);
			expect(taskDesc).toEqual([
				"Task 1",
				"Task 2 containing , comma in, description",
			]);
		});

		test("should throw an error if user does not exist", () => {
			expect(() =>
				userList.addUserTasks("nonExistentUser", "Task 1")
			).toThrow("nonExistentUser does not exist");
		});
	});

	describe("editUserTask", () => {
		test("should edit a task for the user", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			userList.addUserTasks("user1", "Task 1");
			expect(userList.editUserTask("user1", 0, "Updated Task 1")).toEqual(
				"Updated Task 1"
			);
		});

		test("should throw an error if task does not exist", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			userList.addUserTasks("user1", "Task 1");
			expect(() =>
				userList.editUserTask("user1", 1, "Updated Task 1")
			).toThrow("Task index out of bounds");
		});

		test("should throw an error if user does not exist", () => {
			expect(() =>
				userList.editUserTask("nonExistentUser", 0, "Updated Task 1")
			).toThrow("nonExistentUser has no tasks");
		});
	});

	describe("completeUserTask", () => {
		test("should complete a task for the user", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			userList.addUserTasks("user1", "Task 1");
			expect(userList.completeUserTasks("user1", 0)).toEqual(["Task 1"]);
		});

		test("should be able to mark multiple tasks as complete if given an array of indices", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			userList.addUserTasks("user1", [
				"Task 1",
				"Task 2",
				"Task 3",
				"Task 4",
			]);
			userList.completeUserTasks("user1", [0, 2, 3]);
			expect(userList.checkUserTasks("user1")).toEqual(["Task 2"]);
		});

		test("should throw an error if task does not exist", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			userList.addUserTasks("user1", "Task 1");
			expect(() => userList.completeUserTasks("user1", 1)).toThrow(
				"Task index out of bounds"
			);
		});

		test("should throw an error if user does not exist", () => {
			expect(() =>
				userList.completeUserTasks("nonExistentUser", 0)
			).toThrow("nonExistentUser has no tasks");
		});
	});

	describe("deleteUserTask", () => {
		test("should delete a task if given a single index", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			userList.addUserTasks("user1", "Task 1");
			userList.addUserTasks("user1", "Task 2");
			expect(userList.deleteUserTasks("user1", 0)).toEqual(["Task 1"]);
		});

		test("should delete multiple tasks if given an array of indices", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			userList.addUserTasks("user1", "Task 1");
			userList.addUserTasks("user1", "Task 2");
			userList.addUserTasks("user1", "Task 3");
			expect(userList.deleteUserTasks("user1", [0, 2])).toEqual([
				"Task 1",
				"Task 3",
			]);
		});

		test("should throw an error if task does not exist", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			userList.addUserTasks("user1", "Task 1");
			expect(() => userList.deleteUserTasks("user1", [1])).toThrow(
				"Task index out of bounds"
			);
		});

		test("should throw an error if user does not exist", () => {
			expect(() =>
				userList.deleteUserTasks("nonExistentUser", [0])
			).toThrow("nonExistentUser has no tasks");
		});
	});

	describe("checkUserTasks", () => {
		test("should return all tasks for the user", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			userList.addUserTasks("user1", "Task 1");
			expect(userList.checkUserTasks("user1")).toEqual(["Task 1"]);
		});

		test("should throw an error if user does not exist", () => {
			expect(() => userList.checkUserTasks("nonExistentUser")).toThrow(
				"nonExistentUser has no tasks"
			);
		});
	});

	describe("clearUserList", () => {
		test("should clear all tasks", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			userList.addUserTasks("user1", "Task 1");
			userList.addUserTasks("user1", "Task 2");
			userList.clearUserList();
			expect(userList.users).toEqual([]);
		});
	});

	describe("clearDoneTasks", () => {
		test("should clear all done tasks for the user", () => {
			const user1 = userList.createUser("user1", {
				userColor: "#ff0000",
			});
			userList.addUserTasks("user1", [
				"user1-task 1",
				"user1-task 2",
				"user1-task 3",
			]);
			userList.completeUserTasks("user1", 0);

			const user2 = userList.createUser("user2", {
				userColor: "#ff0000",
			});
			userList.addUserTasks("user2", ["user2-task 1", "user2-task 2"]);
			userList.completeUserTasks("user2", 1);
			userList.completeUserTasks("user2", 0);

			userList.clearDoneTasks();
			expect(user1.tasks.length).toEqual(2);
			expect(user2.tasks.length).toEqual(0);
		});
	});

	describe("deleteUser", () => {
		test("should delete user by given username", () => {
			userList.createUser("user1", { userColor: "#ff0000" });
			userList.addUserTasks("user1", "Task 1");
			const user = userList.deleteUser("user1");
			expect(user.username).toEqual("user1");
			expect(user.userColor).toEqual("#ff0000");
			expect(user.tasks[0].description).toEqual("Task 1");
			expect(user).toBeInstanceOf(User);
		});

		test("should throw an error if user does not exist", () => {
			expect(() => userList.deleteUser("nonExistentUser")).toThrow(
				"User not found"
			);
		});
	});
});
