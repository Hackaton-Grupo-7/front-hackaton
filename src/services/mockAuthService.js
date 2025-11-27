export async function login({ username, password }) {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (username === "testuser" && password === "123456") {
    const mockUser = {
      id: "12345",
      username: "testuser",
      name: "Usuario de Prueba",
      email: "test@prueba.com",
      role: "USER",
      token: "fake-jwt-token-for-demo",
      tokenType: "Bearer",
      refreshToken: "fake-refresh-token"
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', mockUser.token);
    localStorage.setItem('tokenType', mockUser.tokenType);
    localStorage.setItem('refreshToken', mockUser.refreshToken);
    
    return mockUser;
  } else if (username === "admin" && password === "admin123") {
    const adminUser = {
      id: "67890",
      username: "admin",
      name: "Administrador",
      email: "admin@prueba.com",
      role: "ADMIN",
      token: "fake-admin-token",
      tokenType: "Bearer", 
      refreshToken: "fake-admin-refresh"
    };
    
    localStorage.setItem('user', JSON.stringify(adminUser));
    localStorage.setItem('token', adminUser.token);
    localStorage.setItem('tokenType', adminUser.tokenType);
    localStorage.setItem('refreshToken', adminUser.refreshToken);
    
    return adminUser;
  }
  
  throw new Error("Credenciales inválidas. Usa: testuser/123456 o admin/admin123");
}

export async function register(userData) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newUser = {
    id: Date.now().toString(),
    username: userData.username,
    name: userData.name || userData.username,
    email: userData.email,
    role: "USER",
    token: `fake-jwt-token-${Date.now()}`,
    tokenType: "Bearer",
    refreshToken: `fake-refresh-${Date.now()}`
  };
  
  localStorage.setItem('user', JSON.stringify(newUser));
  localStorage.setItem('token', newUser.token);
  localStorage.setItem('tokenType', newUser.tokenType);
  localStorage.setItem('refreshToken', newUser.refreshToken);
  
  return newUser;
}
