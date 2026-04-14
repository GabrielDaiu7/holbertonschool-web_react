import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
    beforeEach(() => {
        render(<App />);
    });

    it("Renders Header component", () => {
        expect(screen.getByRole("heading", { name: /school dashboard/i })).toBeInTheDocument();
    });

    it("Renders Login Component", () => {
        expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
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
        render(<App />);
        const email = screen.getByLabelText(/Email/i);
        const password = screen.getByLabelText(/Password/i);
        const button = screen.getByRole("button");

        await userEvent.type(email, "test@test.com");
        await userEvent.type(password, "password123");
        await userEvent.click(button);

        expect(screen.getByText(/Course list/i)).toBeInTheDocument();
    });

    it("returns to Login after logout", async () => {
        cleanup();
        render(<App />);
        const email = screen.getByLabelText(/Email/i);
        const password = screen.getByLabelText(/Password/i);
        const button = screen.getByRole("button");

        await userEvent.type(email, "test@test.com");
        await userEvent.type(password, "password123");
        await userEvent.click(button);

        const logoutLink = screen.getByText(/logout/i);
        await userEvent.click(logoutLink);

        expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
    });

    it("removes notification when clicked and logs to console", async () => {
        cleanup();
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        render(<App />);

        const notificationTitle = screen.getByText("Your notifications");
        await userEvent.click(notificationTitle);

        const notification = screen.getByText("New course available");
        await userEvent.click(notification);

        expect(screen.queryByText("New course available")).not.toBeInTheDocument();
        expect(consoleSpy).toHaveBeenCalledWith("Notification 1 has been marked as read");

        consoleSpy.mockRestore();
    });
});