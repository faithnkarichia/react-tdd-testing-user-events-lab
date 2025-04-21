import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((interest) => interest !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <h1>Hi, I'm Faith</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <section>
        <h2>Newsletter Signup</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </label>
          <br />
          <fieldset>
            <legend>Select your interests:</legend>
            <label>
              <input
                type="checkbox"
                value="Coding"
                onChange={handleCheckboxChange}
              />
              Coding
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="Design"
                onChange={handleCheckboxChange}
              />
              Design
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="Writing"
                onChange={handleCheckboxChange}
              />
              Writing
            </label>
          </fieldset>
          <br />
          <button type="submit">Subscribe</button>
        </form>

        {submitted && (
          <div>
            <h3>Thank you, {name}!</h3>
            <p>
              You have successfully subscribed with the email: <strong>{email}</strong>.
            </p>
            {interests.length > 0 && (
              <p>Your interests: {interests.join(", ")}</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
