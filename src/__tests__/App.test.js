import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);
  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });
  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);
  const image = screen.getByAltText("My profile pic");
  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);
  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });
  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);
  const bio = screen.getByText(/lorem ipsum/i);
  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);
  const githubLink = screen.getByRole("link", { name: /github/i });
  const linkedinLink = screen.getByRole("link", { name: /linkedin/i });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );
  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);
  const nameInput = screen.getByPlaceholderText(/enter your name/i);
  const emailInput = screen.getByPlaceholderText(/enter your email/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);
  const coding = screen.getByRole("checkbox", { name: /coding/i });
  const design = screen.getByRole("checkbox", { name: /design/i });
  const writing = screen.getByRole("checkbox", { name: /writing/i });

  expect(coding).toBeInTheDocument();
  expect(design).toBeInTheDocument();
  expect(writing).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);
  expect(screen.getByRole("checkbox", { name: /coding/i })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: /design/i })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: /writing/i })).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);
  const nameInput = screen.getByPlaceholderText(/enter your name/i);
  const emailInput = screen.getByPlaceholderText(/enter your email/i);

  userEvent.type(nameInput, "Faith");
  userEvent.type(emailInput, "faith@example.com");

  expect(nameInput).toHaveValue("Faith");
  expect(emailInput).toHaveValue("faith@example.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);
  const coding = screen.getByRole("checkbox", { name: /coding/i });

  expect(coding).not.toBeChecked();
  userEvent.click(coding);
  expect(coding).toBeChecked();
  userEvent.click(coding);
  expect(coding).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);
  const nameInput = screen.getByPlaceholderText(/enter your name/i);
  const emailInput = screen.getByPlaceholderText(/enter your email/i);
  const submitButton = screen.getByRole("button", { name: /subscribe/i });

  userEvent.type(nameInput, "Faith");
  userEvent.type(emailInput, "faith@example.com");
  userEvent.click(submitButton);

  expect(screen.getByText(/thank you, faith/i)).toBeInTheDocument();
  expect(screen.getByText(/faith@example.com/i)).toBeInTheDocument();
});
