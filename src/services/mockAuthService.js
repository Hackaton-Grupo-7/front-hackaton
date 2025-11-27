// Datos de usuario de prueba
const mockUser = {
  id: "12345",
  username: "testuser",
  name: "Usuario de Prueba",
  email: "test@prueba.com",
  role: "USER",
  token: "fake-jwt-token-for-demo",
  refreshToken: "fake-refresh-token"
};

// Simular delay de red
const simulateNetworkDelay = () => new Promise(resolve => 
  setTimeout(resolve, Math.random() * 500 + 200)
);

export const mockAuthService = {
  async login({ username, password }) {
    await simulateNetworkDelay();
    
    if (username === "testuser" && password === "123456") {
      // Guardar en localStorage para persistencia
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      localStorage.setItem('mockToken', mockUser.token);
      
      return {
        success: true,
        data: mockUser,
        message: "Login exitoso (modo demo)"
      };
    } else if (username === "admin" && password === "admin123") {
      const adminUser = {
        ...mockUser,
        username: "admin",
        name: "Administrador",
        role: "ADMIN"
      };
      
      localStorage.setItem('mockUser', JSON.stringify(adminUser));
      localStorage.setItem('mockToken', adminUser.token);
      
      return {
        success: true,
        data: adminUser,
        message: "Login admin exitoso (modo demo)"
      };
    }
    
    throw new Error("Credenciales inválidas. Usa: testuser/123456 o admin/admin123");
  },

  async register(userData) {
    await simulateNetworkDelay();
    
    const newUser = {
      id: Date.now().toString(),
      username: userData.username,
      name: userData.name,
      email: userData.email,
      role: "USER",
      token: `fake-jwt-token-${Date.now()}`,
      refreshToken: `fake-refresh-${Date.now()}`
    };
    
    localStorage.setItem('mockUser', JSON.stringify(newUser));
    localStorage.setItem('mockToken', newUser.token);
    
    return {
      success: true,
      data: newUser,
      message: "Usuario registrado exitosamente (modo demo)"
    };
  },

  async logout() {
    await simulateNetworkDelay();
    
    localStorage.removeItem('mockUser');
    localStorage.removeItem('mockToken');
    
    return {
      success: true,
      message: "Logout exitoso (modo demo)"
    };
  },

  async refreshToken() {
    await simulateNetworkDelay();
    
    const storedUser = localStorage.getItem('mockUser');
    if (!storedUser) {
      throw new Error("No hay usuario autenticado");
    }
    
    const user = JSON.parse(storedUser);
    const updatedUser = {
      ...user,
      token: `refreshed-token-${Date.now()}`,
      refreshToken: `refreshed-refresh-${Date.now()}`
    };
    
    localStorage.setItem('mockUser', JSON.stringify(updatedUser));
    localStorage.setItem('mockToken', updatedUser.token);
    
    return {
      success: true,
      data: updatedUser
    };
  },

  getCurrentUser() {
    const storedUser = localStorage.getItem('mockUser');
    return storedUser ? JSON.parse(storedUser) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('mockToken');
  }
};
