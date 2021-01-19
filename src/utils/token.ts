export function setUserInfoInStorage(data: { token: string; email: string }) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('email', data.email);
}

export function getUserInfoFromStorage() {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  return { token, email };
}

export function removeUserInfoFromStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
}
