
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/', {
	dbName: 'yourDB-name',
	useNewUrlParser: true,
	useUnifiedTopology: true
}, err => err ? console.log(err) :
	console.log('Connected to yourDB-name database'));

// Schema for users of app
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();

//For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 3000");
app.use(express.json());
app.use(cors());
// app.get("/", (req, resp) => {

// 	resp.send("App is Working");
// 	// You can check backend is working or not by
// 	// entering http://localhost:3000
	
// 	// If you see App is working means
// 	// backend working properly
// });

app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete result.password;
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});
app.listen(3000);



// import express from 'express';
// import mongoose from 'mongoose';
// const app = express();

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mydatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);
//   });

// // Define the User schema and model
// const userSchema = new mongoose.Schema({
//   // Define the user schema fields
//   // For example:
//   name: String,
//   email: String,
// });

// const User = mongoose.model('User', userSchema);

// app.use(express.json());

// app.post('/register', async (req, res) => {
//   try {
//     const user = new User(req.body);
//     let result = await user.save();
//     result = result.toObject();
//     if (result) {
//       delete result.password;
//       res.send(result);
//       console.log(result);
//     } else {
//       console.log('User already registered');
//     }
//   } catch (e) {
//     console.error(e);
//     res.status(500).send('Something went wrong');
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
