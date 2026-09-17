const USER_KEY = "dnyanai_user";
const USERS_KEY = "dnyanai_users";

export const normalizeUser = (user) => {
  const allowedAgents = Array.isArray(user?.allowedAgents)
    ? user.allowedAgents
    : Array.isArray(user?.selectedAgents)
      ? user.selectedAgents
      : Array.isArray(user?.agents)
        ? user.agents
        : [];

  return {
    ...user,
    role: user?.role || user?.userRole || (user?.isAdmin ? "admin" : "user"),
    allowedAgents,
  };
};

const readUsers = () => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    if (Array.isArray(users)) return users.map(normalizeUser);
  } catch (error) {
    // Ignore malformed browser data and start with an empty account list.
  }

  const legacyUser = getCurrentUser();
  return legacyUser ? [legacyUser] : [];
};

export const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem(USER_KEY) || "null");
    return user ? normalizeUser(user) : null;
  } catch (error) {
    return null;
  }
};

export const saveUser = (user) => {
  const normalizedUser = normalizeUser(user);
  const users = readUsers();
  const existingIndex = users.findIndex(
    (item) =>
      item.email?.toLowerCase() === normalizedUser.email?.toLowerCase() ||
      item.username?.toLowerCase() === normalizedUser.username?.toLowerCase()
  );

  if (existingIndex >= 0) {
    users[existingIndex] = normalizedUser;
  } else {
    users.push(normalizedUser);
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser));
  return normalizedUser;
};

export const findUser = (identifier, password) => {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  return readUsers().find(
    (user) =>
      (user.email?.toLowerCase() === normalizedIdentifier ||
        user.username?.toLowerCase() === normalizedIdentifier) &&
      user.password === password
  );
};
