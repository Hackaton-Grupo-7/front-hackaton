export async function login({ username, password }) {
  if (username === "testuser" && password === "123456") {
    return {
      id: "12345",
      username: "testuser",
      email: "test@prueba.com",
      role: "USER",
      token: "fake-jwt-token"
    };
  }
  throw new Error("Invalid username or password (demo mode)");
}

export async function register({ username, name, email, password }) {
  return { id: "54321", username, name, email, role: "USER", token: "fake-jwt-token" };
}

export async function logout() {
  return { message: "Logged out (demo mode)" };
}

export async function refresh(refreshToken) {
  return { id: "12345", username: "testuser", token: "fake-jwt-token" };
}

