# Sample Agent Outputs

This directory contains example outputs from each Schema.ICU agent to help you understand the response formats.

## Code Generator

**Query:** "Create a debounce function in JavaScript"

**Output:**
```javascript
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

**Reasoning:** "A debounce function that delays execution until after a specified wait time has elapsed since the last invocation. Uses closure to maintain timeout state and spread operator for flexible arguments."

---

## Schema Generator

**Query:** "Create schema for user profile with name, email, and age"

**Output:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "integer",
      "minimum": 0
    }
  },
  "required": ["name", "email", "age"]
}
```

---

## Terminal Agent

**Query:** "Find all JavaScript files modified in the last 7 days"

**Output:**
```bash
find . -name "*.js" -type f -mtime -7
```

**Reasoning:** "Uses find command with name pattern, file type filter, and modification time constraint."

---

## Project Planner

**Query:** "Build a task management API"

**Output:**
```json
{
  "projectName": "Task Management API",
  "projectDescription": "RESTful API for managing tasks with user authentication",
  "tasks": [
    {
      "taskName": "Database Schema Design",
      "taskDescription": "Design MongoDB/PostgreSQL schemas for users and tasks",
      "estimatedTimeHours": 4
    },
    {
      "taskName": "User Authentication Module",
      "taskDescription": "Implement JWT-based authentication with bcrypt password hashing",
      "estimatedTimeHours": 8
    },
    {
      "taskName": "Task CRUD Endpoints",
      "taskDescription": "Create REST endpoints for task creation, reading, updating, and deletion",
      "estimatedTimeHours": 12
    },
    {
      "taskName": "Testing & Documentation",
      "taskDescription": "Write unit tests and API documentation",
      "estimatedTimeHours": 6
    }
  ]
}
```

**Total Time:** 30 hours (3.75 days)

---

## Box Designer

**Query:** "Design a modular authentication component"

**Output:**
```json
{
  "name": "AuthenticationModule",
  "description": "Modular authentication system following Alan Kay principles with pluggable credential stores, hashers, and token services",
  "inputs": [
    {
      "name": "credentials",
      "type": "object",
      "description": "User credentials (username/email and password)"
    },
    {
      "name": "config",
      "type": "object",
      "description": "Authentication configuration including token lifetime and hashing parameters"
    }
  ],
  "outputs": [
    {
      "name": "authenticate",
      "type": "function",
      "description": "Validates credentials and returns authentication token"
    },
    {
      "name": "refreshToken",
      "type": "function",
      "description": "Refreshes access tokens using valid refresh token"
    }
  ],
  "dependencies": [
    "JWT or JOSE library for token generation",
    "Bcrypt/Argon2 for password hashing",
    "Pluggable storage backend for credentials"
  ]
}
```

---

## Prompt Improver

**Input:** "make a function"

**Output:** "Create a reusable JavaScript function that accepts parameters, performs a specific operation, includes input validation, proper error handling, and returns a meaningful result. Specify the function's purpose, expected parameters with types, return value, and any edge cases to handle."

---

## Tool Choice

**Query:** "I need to generate a REST API endpoint"

**Output:**
```json
{
  "chosenTool": "codeGenerator",
  "reasoning": "codeGenerator is best suited for producing production-ready endpoint code with proper structure, error handling, and validation",
  "alternativeTools": [
    {
      "tool": "schemaGenerator",
      "score": 0.6,
      "rationale": "Useful for defining request/response schemas"
    },
    {
      "tool": "terminalAgent",
      "score": 0.5,
      "rationale": "Can scaffold project structure via CLI commands"
    }
  ]
}
```

---

## GitHub Agent

**Query:** "Create a new branch called feature/new-ui"

**Output:**
```json
{
  "githubCommands": [
    {
      "command": "git fetch origin",
      "reasoning": "Update local refs from remote"
    },
    {
      "command": "git switch -c feature/new-ui origin/main",
      "reasoning": "Create new branch from origin/main"
    },
    {
      "command": "git push -u origin feature/new-ui",
      "reasoning": "Push branch and set upstream tracking"
    }
  ]
}
```

---

## Response Structure

All agents return responses in this format:

```json
{
  "success": true,
  "data": {
    // Agent-specific data fields
    "code": "...",
    "reasoning": "...",
    "missingContext": []
  },
  "timestamp": "2025-12-10T01:35:27.559Z",
  "signature": {
    "hash": "c03b9f1fd2e20e7409eb6129123ead7e...",
    "signature": "H/2Ta+cjlj5zkh3o99vkeNAqayJThNpp...",
    "publicKey": "03657602c4a3d56d97b3e1e754582f19...",
    "signedAt": "2025-12-10T01:35:27.603Z"
  }
}
```

**Key Fields:**
- `success`: Boolean indicating if request was successful
- `data`: Agent-specific response data
- `timestamp`: ISO 8601 timestamp
- `signature`: Cryptographic signature for verification (BSV-based)
