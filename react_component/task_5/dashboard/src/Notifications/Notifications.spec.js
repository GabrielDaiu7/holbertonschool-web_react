import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";

describe("Notifications Component", () => {

    it("logs message when notification is clicked", () => {

        const notifications = [
            { id: 1, type: "default", value: "New course available" },
        ];

        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });

        render(
            <Notifications notifications={notifications} displayDrawer={true} />
        );

        const listItem = screen.getByText("New course available");

        fireEvent.click(listItem);

        expect(consoleSpy).toHaveBeenCalledWith(
            "Notification 1 has been marked as read"
        );

        consoleSpy.mockRestore();
    });

    it("does not re-render if notifications length stays the same", () => {

        const notifications = [
            { id: 1, type: "default", value: "Notification 1" },
        ];

        const { rerender } = render(
            <Notifications notifications={notifications} displayDrawer={true} />
        );

        const updatedNotifications = [
            { id: 1, type: "default", value: "Updated Notification 1" },
        ];

        rerender(
            <Notifications notifications={updatedNotifications} displayDrawer={true} />
        );

        expect(screen.queryByText("Updated Notification 1")).not.toBeInTheDocument();
    });

    it("re-renders if notifications length increases", () => {

        const notifications = [
            { id: 1, type: "default", value: "Notification 1" },
        ];

        const { rerender } = render(
            <Notifications notifications={notifications} displayDrawer={true} />
        );

        const updatedNotifications = [
            { id: 1, type: "default", value: "Notification 1" },
            { id: 2, type: "urgent", value: "Notification 2" },
        ];

        rerender(
            <Notifications notifications={updatedNotifications} displayDrawer={true} />
        );

        expect(screen.getByText("Notification 2")).toBeInTheDocument();
    });

});