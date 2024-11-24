

// const Todo = require('../models/todo');

// // Create a new To-Do
// exports.createTodo = async (req, res) => {
//     const { title, description, status } = req.body;
//     try {
//         const newTodo = new Todo({
//             title,
//             description,
//             status
//         });
//         await newTodo.save();
//         res.status(201).json(newTodo);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating To-Do', error });
//     }
// };

// // Get all To-Dos
// exports.getTodos = async (req, res) => {
//     try {
//         const todos = await Todo.find();
//         res.status(200).json(todos);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching To-Dos', error });
//     }
// };

// // Get a single To-Do by ID
// exports.getTodoById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const todo = await Todo.findById(id);
//         if (!todo) {
//             return res.status(404).json({ message: 'To-Do not found' });
//         }
//         res.status(200).json(todo);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching To-Do', error });
//     }
// };

// // Update a To-Do
// exports.updateTodo = async (req, res) => {
//     const { id } = req.params;
//     const { title, description, status } = req.body;
//     try {
//         const updatedTodo = await Todo.findByIdAndUpdate(
//             id,
//             { title, description, status },
//             { new: true }
//         );
//         if (!updatedTodo) {
//             return res.status(404).json({ message: 'To-Do not found' });
//         }
//         res.status(200).json(updatedTodo);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating To-Do', error });
//     }
// };

// // Delete a To-Do
// exports.deleteTodo = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedTodo = await Todo.findByIdAndDelete(id);
//         if (!deletedTodo) {
//             return res.status(404).json({ message: 'To-Do not found' });
//         }
//         res.status(200).json({ message: 'To-Do deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting To-Do', error });
//     }
// };



const Todo = require('../models/todo');

// Create a new To-Do
// controllers/todoController.js

exports.createTodo = async (req, res) => {
    const { title, description, status } = req.body;

    try {
        const newTodo = new Todo({
            title,
            description,
            status,
            userId: req.user._id // Associate the note with the logged-in user
        });

        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating To-Do', error });
    }
};


// Get all To-Dos
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching To-Dos', error });
    }
};

// Get a single To-Do by ID
exports.getTodoById = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'To-Do not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching To-Do', error });
    }
};

// Update a To-Do
exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        // Only update if the note belongs to the logged-in user
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            { title, description, status },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'To-Do not found or unauthorized' });
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating To-Do', error });
    }
};


// Delete a To-Do
exports.deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        // Only delete if the note belongs to the logged-in user
        const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId: req.user._id });
        if (!deletedTodo) {
            return res.status(404).json({ message: 'To-Do not found or unauthorized' });
        }
        res.status(200).json({ message: 'To-Do deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting To-Do', error });
    }
};


exports.getTodos = async (req, res) => {
    try {
        // Fetch only the notes belonging to the logged-in user
        const todos = await Todo.find({ userId: req.user._id });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching To-Dos', error });
    }
};

exports.getTodoById = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findOne({ _id: id, userId: req.user._id }); // Ensure user ownership
        if (!todo) {
            return res.status(404).json({ message: 'To-Do not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching To-Do', error });
    }
};
