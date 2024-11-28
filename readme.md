# Task Management Application

A responsive, feature-rich task management application built with React, TypeScript, and Next.js.

## Features

- ✅ Add, edit, and delete tasks
- ✅ Task status management (Pending, In Progress, Completed)
- ✅ Due date tracking with overdue highlighting
- ✅ Filter tasks by status
- ✅ Search tasks by title
- ✅ Responsive design
- ✅ Efficient handling of large task lists with virtualization
- ✅ Comprehensive test coverage

## Technologies Used

- React 18 with TypeScript
- Next.js 14
- Context API for state management
- Jest and React Testing Library for testing
- Tailwind CSS for styling
- react-window for list virtualization

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/aaronreal25/todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Run tests:
```bash
npm test
```

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
├── context/             # Context API related files
├── types/               # TypeScript type definitions
└── __tests__/           # Test files
```

## Key Architectural Decisions

### State Management
Chose Context API over Redux or other state management solutions because:
- Appropriate scale for the application's needs
- Built into React, reducing bundle size
- Simpler implementation for this scope
- Easy to test and maintain

### Performance Optimizations
- Used React.memo for components that don't need frequent re-renders
- Implemented virtualization using react-window for efficient handling of large lists
- Memoized filtered tasks using useMemo
- Used callback functions with useCallback to prevent unnecessary re-renders

### Testing Strategy
- Unit tests for all components using Jest and React Testing Library
- Snapshot tests to ensure UI consistency
- High test coverage focusing on core functionality
- Mock Context API for isolated component testing

## Code Review Questions

### State Management
The Context API was chosen because:
- The application has a relatively simple state structure
- Context provides a clean way to avoid prop drilling
- The app's size doesn't warrant the complexity of Redux
- Easy to test and mock in unit tests

For scaling to a larger application:
- Could split context into smaller, more focused contexts
- Implement caching strategies for performance
- Add middleware pattern for side effects
- Consider switching to more robust solutions like Redux or Zustand if needed

### Performance Optimization
Techniques used:
1. React.memo for components to prevent unnecessary re-renders
2. useMemo for expensive computations like task filtering
3. useCallback for event handlers
4. Virtualization for large lists

### Testing Strategy
Guidelines for test coverage:
1. Focus on user interactions and core functionality
2. Test edge cases and error states
3. Ensure good coverage of state management
4. Include snapshot tests for UI consistency
5. Mock external dependencies appropriately

### Code Structure
The project structure follows these principles:
1. Separation of concerns
2. Component modularity
3. Clear file organization
4. Consistent naming conventions
5. Logical grouping of related files