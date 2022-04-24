const mongoose = require("mongoose");

const app = require("./app");

let { DB_HOST, PORT } = process.env;
if (PORT === null || PORT === "") PORT = 8000;

mongoose
	.connect(DB_HOST)
	.then(() =>
		app.listen(PORT, () => {
			console.log(`Server running. Use our API on port: ${PORT}`);
		})
	)
	.catch((error) => {
		console.log(error.message);
		process.exit(1);
	});
