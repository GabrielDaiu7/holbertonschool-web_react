import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import App from "./App";

jest.mock("axios");

describe("App Component", () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: [
                { id: 1, type: "default", value: "New course available" },
                { id: 2, type: "urgent", value: "New resume available" },
            ],
        });
    });

    it("renders header, login section and footer", () => {
        render(<App />);

        expect(
            screen.getByRole("heading", { name: /school dashboard/i })
        ).toBeInTheDocument();
        expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
        expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
    });

    it("handles hide and display drawer actions", async () => {
        render(<App />);

        await screen.findByText("Your notifications");
        expect(
            screen.queryByText("Here is the list of notifications")
        ).not.toBeInTheDocument();

        await userEvent.click(screen.getByText("Your notifications"));
        expect(await screen.findByText("New course available")).toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: /close/i }));
        expect(
            screen.queryByText("Here is the list of notifications")
        ).not.toBeInTheDocument();
    });

    it("updates user state on logIn", async () => {
        render(<App />);

        await userEvent.type(screen.getByLabelText(/Email/i), "test@test.com");
        await userEvent.type(screen.getByLabelText(/Password/i), "password123");
        await userEvent.click(screen.getByRole("button", { name: "OK" }));

        expect(screen.getByText(/Course list/i)).toBeInTheDocument();
        expect(screen.getByText(/Welcome test@test.com/i)).toBeInTheDocument();
    });

    it("resets user state on logOut", async () => {
        render(<App />);

        await userEvent.type(screen.getByLabelText(/Email/i), "test@test.com");
        await userEvent.type(screen.getByLabelText(/Password/i), "password123");
        await userEvent.click(screen.getByRole("button", { name: "OK" }));
        await userEvent.click(screen.getByText(/logout/i));

        expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
        expect(screen.queryByText(/Welcome test@test.com/i)).not.toBeInTheDocument();
    });

    it("removes notification when marked as read", async () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
        render(<App />);

        await userEvent.click(screen.getByText("Your notifications"));
        await userEvent.click(await screen.findByText("New course available"));

        await waitFor(() => {
            expect(screen.queryByText("New course available")).not.toBeInTheDocument();
        });
        expect(consoleSpy).toHaveBeenCalledWith("Notification 1 has been marked as read");

        consoleSpy.mockRestore();
    });
});
