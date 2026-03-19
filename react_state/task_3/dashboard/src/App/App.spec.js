import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
    beforeEach(() => {
        render(<App />);
    });

    it("Renders Header component", () => {
        expect(
            screen.getByRole("heading", { name: /school dashboard/i })
        ).toBeInTheDocument();
    });

    it("Renders Login Component", () => {
        expect(
            screen.getByText(/Login to access the full dashboard/i)
        ).toBeInTheDocument();
    });

    it("Renders Footer Component", () => {
        expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
    });

    it("Login is rendered when user is not logged in", () => {
        cleanup();
        const { container } = render(<App />);
        expect(container.querySelector(".App-body")).toBeInTheDocument();
    });

    it("CourseList is rendered after successful login", async () => {
        cleanup();
        const { container } = render(<App />);

        const email = screen.getByLabelText(/Email/i);
        const password = screen.getByLabelText(/Password/i);
        const button = screen.getByRole("button");

        await userEvent.type(email, "test@test.com");
        await userEvent.type(password, "password123");
        await userEvent.click(button);

        expect(container.querySelector("#CourseList")).toBeInTheDocument();
    });

 
    it("returns to Login after logout", async () => {
        cleanup();
        render(<App />);

        const email = screen.getByLabelText(/Email/i);
        const password = screen.getByLabelText(/Password/i);
        const button = screen.getByRole("button");

        // login
        await userEvent.type(email, "test@test.com");
        await userEvent.type(password, "password123");
        await userEvent.click(button);

        // logout
        const logoutLink = screen.getByText(/logout/i);
        await userEvent.click(logoutLink);

        // back to login screen
        expect(
            screen.getByText(/Login to access the full dashboard/i)
        ).toBeInTheDocument();
    });
});