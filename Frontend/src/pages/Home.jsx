const Home = ({ user }) => (
  <div className="text-center">
    <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}!</h1>
    <p>You are logged in as  <b>{user.role}</b>.</p>
  </div>
);

export default Home;