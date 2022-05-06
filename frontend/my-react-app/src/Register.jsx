export default function Register() {
  return (
    <div className="register">
      <h1>Register Account</h1>
      <form action="/create-account" method="post">
        <label htmlFor="email">Email: </label>
        <input type="text" name="email" id="email" required />
        <br></br>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" required />
        <br></br>
        <label htmlFor="first_name">First Name: </label>
        <input type="text" name="first_name" id="first_name" required />
        <br></br>
        <label htmlFor="last_name">Last Name: </label>
        <input type="text" name="last_name" id="last_name" required />
        <br></br>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
