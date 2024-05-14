"use server";

export const authenticate = async (formData) => {
  const { username, password } = formData;

  // Hardcoded credentials
  const hardcodedUsername = 'user';
  const hardcodedPassword = 'password';

  // Check if provided credentials match hardcoded ones
  if (username === hardcodedUsername && password === hardcodedPassword) {
    // If credentials match, sign in the user
    
    return '/dashboard';
    
  } else {
    // If credentials don't match, return error message
    return 'Invalid username or password';
  }
};
