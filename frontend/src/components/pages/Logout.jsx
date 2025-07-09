function Logout() {
  localStorage.removeItem('token');      // Remove JWT
  localStorage.removeItem('role');       // Remove role (seller or customer)
  localStorage.removeItem('username');   // Remove username
  window.location.href = '/login';       // Redirect to login
}

export default Logout;
