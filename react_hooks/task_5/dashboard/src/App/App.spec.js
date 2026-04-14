import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockAxios from "jest-mock-axios";
import App from "./App";

const notificationsPayload = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", value: "Latest notification" },
];

const coursesPayload = [
    { id: 1, name: "ES6", credit: "60" },
    { id: 2, name: "Webpack", credit: "20" },
];

describe("App Component", () => {
    afterEach(() => {
        cleanup();
        mockAxios.reset();
    });

    it("fetches notifications on initial render", async () => {
        render(<App />);

        await waitFor(() => {
            expect(mockAxios.get).toHaveBeenCalledWith("/notifications.json");
        });

        mockAxios.mockResponse({ data: notificationsPayload });
        mockAxios.mockResponse({ data: coursesPayload });

        await userEvent.click(screen.getByText("Your notifications"));
        expect(await screen.findByText("New course available")).toBeInTheDocument();
    });

    it("fetches courses whenever user state changes", async () => {
        render(<App />);

        await waitFor(() => {
            expect(mockAxios.get).toHaveBeenCalledWith("/courses.json");
        });

        mockAxios.mockResponse({ data: notificationsPayload });
        mockAxios.mockResponse({ data: coursesPayload });

        const initialCourseCalls = mockAxios.get.mock.calls.filter(
            ([url]) => url === "/courses.json"
        ).length;

        await userEvent.type(screen.getByLabelText(/Email/i), "test@test.com");
        await userEvent.type(screen.getByLabelText(/Password/i), "password123");
        await userEvent.click(screen.getByRole("button", { name: "OK" }));

        await waitFor(() => {
            const afterLoginCalls = mockAxios.get.mock.calls.filter(
                ([url]) => url === "/courses.json"
            ).length;
            expect(afterLoginCalls).toBeGreaterThan(initialCourseCalls);
        });
        mockAxios.mockResponse({ data: coursesPayload });

        await userEvent.click(screen.getByText(/logout/i));

        await waitFor(() => {
            const afterLogoutCalls = mockAxios.get.mock.calls.filter(
                ([url]) => url === "/courses.json"
            ).length;
            expect(afterLogoutCalls).toBeGreaterThan(initialCourseCalls + 1);
        });
    });

    it("shows/hides notifications and removes a notification when clicked", async () => {
        render(<App />);

        mockAxios.mockResponse({ data: notificationsPayload });
        mockAxios.mockResponse({ data: coursesPayload });

        await userEvent.click(screen.getByText("Your notifications"));
        expect(await screen.findByText("New course available")).toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: /close/i }));
        expect(
            screen.queryByText("Here is the list of notifications")
        ).not.toBeInTheDocument();

        await userEvent.click(screen.getByText("Your notifications"));
        await userEvent.click(await screen.findByText("New course available"));

        await waitFor(() => {
            expect(screen.queryByText("New course available")).not.toBeInTheDocument();
        });
    });
});
