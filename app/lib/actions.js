"use server";

import { serialize } from 'cookie';

export const authenticate = async (formData) => {
  const { username, password } = formData;
  
  // Hardcoded credentials
  const hardcodedUsername = 'user';
  const hardcodedPassword = 'password';

  if (username === hardcodedUsername && password === hardcodedPassword) {
    
    const token = 'login@123'; 
    const cookieSerialized = serialize('token', token, {
      httpOnly: true,
    });
    return { redirect: '/dashboard', cookieSerialized };
  } else {
 
    return 'Invalid username or password';
  }
};

export const isAuthenticated = (cookies) => {
  const token = cookies && cookies.token;
  return !!token;
};