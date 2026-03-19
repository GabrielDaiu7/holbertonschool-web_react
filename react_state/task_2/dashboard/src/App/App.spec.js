import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
    beforeEach(() => {
        render(<App />);
    });

    it("Renders Header component", () => {
        const heading = screen.getByRole("heading", {
            level: 1,
            name: /school dashboard/i,
        });
        expect(heading).toBeInTheDocument();
    });

    it("Renders Login Component", () => {
        const loginText = screen.getByText(
            /Login to access the full dashboard/i
        );
        expect(loginText).toBeInTheDocument();
    });

    it("Renders Footer Component", () => {
        expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
    });

    it("Login is rendered when user is not logged in", () => {
        cleanup();

        const { container } = render(<App />);
        const loginComponent = container.querySelector(".App-body");

        expect(loginComponent).toBeInTheDocument();
    });

  
    it("CourseList is rendered after successful login", async () => {
        cleanup();

        const { container } = render(<App />);

        const email = screen.getByLabelText(/Email/i);
        const password = screen.getByLabelText(/Password/i);
        const button = screen.getByRole("button");

        // Fill valid inputs
        await userEvent.type(email, "test@test.com");
        await userEvent.type(password, "password123");

        // Submit form
        await userEvent.click(button);

        const courseList = container.querySelector("#CourseList");
        expect(courseList).toBeInTheDocument();
    });
});