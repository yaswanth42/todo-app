# My Todo List (React)

I built a clean, modern Todo List to keep track of tasks quickly. It supports adding items, marking them complete, editing inline, deleting, and filtering by status — all with a polished dark/light responsive theme.

## Features

- Add new tasks with a simple form
- Mark tasks complete/incomplete
- Edit tasks inline with Save/Cancel
- Delete tasks
- Filters: All | Active | Completed
- Clear all completed tasks
- Persists to localStorage
- Accessible keyboard/focus states, and motion-safe animations

## Tech Stack

- React (Create React App)
- Modern CSS (custom properties, gradients, subtle animations)

## Project Structure

```
todo-list/
	public/
	src/
		App.js
		App.css
		index.js
		components/
			TodoWrapper.js   # state & UI container
			TodoForm.js      # add new tasks
			EditToForm.js    # edit tasks inline
			TodoItem.js      # single task item
```

## Getting Started

From the project folder:

```powershell
cd .\todo-list
npm install
npm start
```

Then open the app in your browser. If something is already running on port 3000, it will offer another port (e.g. 3001).

## How I designed it

- I created theme tokens (CSS variables) and a gradient background with a glassy card for the main content.
- The UI uses small, intentional animations and clear focus states.
- I exposed simple utility classes in `App.css` (like `btn`, `input`, `todo-item`) so the JSX stays clean.
- Todo data is stored in `localStorage` under `todos-v1`.

## Commands

- Start dev server: `npm start`
- Production build: `npm run build`

## Troubleshooting

- Start script not found: Make sure you run commands inside the `todo-list` folder, not the parent.
- Port already in use: The dev server will prompt to use another port. Choose “yes”.
- Windows casing issues: I use `TodoItem.js` (PascalCase). Avoid keeping duplicate files that differ only by case (e.g., `Todo.js`, `todo.js`).

## License

This project is for personal use and learning.
