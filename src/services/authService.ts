
// Simple authentication service using localStorage

// User type definition
export interface User {
  id: string;
  email: string;
  name: string;
  password: string; // Note: In a real app, never store plain passwords
}

// Demo users
const DEMO_USERS: User[] = [
  { id: '1', email: 'user@example.com', password: 'password123', name: 'Demo User' },
  { id: '2', email: 'admin@example.com', password: 'admin123', name: 'Admin User' }
];

// Initialize users in localStorage if not already present
const initUsers = (): void => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(DEMO_USERS));
  }
};

// Get all users
export const getUsers = (): User[] => {
  initUsers();
  return JSON.parse(localStorage.getItem('users') || '[]');
};

// Login function - Fixed to properly match email and password
export const loginUser = (email: string, password: string): { success: boolean; user?: Omit<User, 'password'> } => {
  const users = getUsers();
  
  // Debug log
  console.log('Attempting login with:', { email, password });
  console.log('Available users:', users);
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    console.log('Login successful for user:', user.name);
    const { password, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  }
  
  console.log('Login failed: Invalid credentials');
  return { success: false };
};

// Register function
export const registerUser = (name: string, email: string, password: string): { success: boolean; error?: string } => {
  const users = getUsers();
  
  // Check if user already exists
  if (users.some(u => u.email === email)) {
    return { success: false, error: 'User with this email already exists' };
  }
  
  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password
  };
  
  // Add to users array
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  return { success: true };
};

// Logout function
export const logoutUser = (): void => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('authExpiry');
};
