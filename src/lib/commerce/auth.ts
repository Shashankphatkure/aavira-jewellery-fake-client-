export type MockUser = { name: string; email: string };

const KEY = "aavira-user";

export function getMockUser(): MockUser | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as MockUser) : null;
  } catch {
    return null;
  }
}

export function setMockUser(user: MockUser) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(user));
  } catch {
    // ignore storage errors
  }
}

export function clearMockUser() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore storage errors
  }
}
