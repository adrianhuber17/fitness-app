export default function Login() {
  return (
    <div className="login">
      <h1>Log-in</h1>
      <form action="/login" method="post">
        <label htmlFor="ex_email">Email: </label>
        <input type="text" name="ex_email" id="ex_email" required />
        <br></br>
        <label htmlFor="ex_password">Password: </label>
        <input type="password" name="ex_password" id="ex_password" required />
        <br></br>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
