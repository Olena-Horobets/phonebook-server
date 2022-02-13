const loginUser = require("../controllers/users");

console.log(loginUser);
function sum(a, b) {
	return a + b;
}

// 1 test
test("adds 1 + 2 to equal 3", () => {
	expect(sum(1, 2)).toBe(3);
});

// 2 test
describe("Addition service test", () => {
	it("Add two valid numbers", () => {
		expect(1 + 1).toBe(2);
	});
	it("Add two valid numbers", () => {
		expect(1 + 1).not.toBe(3);
	});
});
