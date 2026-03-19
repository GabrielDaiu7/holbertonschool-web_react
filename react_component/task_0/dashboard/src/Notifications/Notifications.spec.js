/* eslint-disable */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Notifications from "./Notifications";

describe("Notifications Component", () => {
    describe("When displayDrawer is false", () => {
        it("should display only the title, not the drawer content", () => {
            render(<Notifications displayDrawer={false} />);

            expect(screen.getByText("Your notifications")).toBeInTheDocument();

            expect(screen.queryByText("Here is the list of notifications")).not.toBeInTheDocument();
            expect(screen.queryByText("No new notification for now")).not.toBeInTheDocument();
            expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
            expect(screen.queryByRole("list")).not.toBeInTheDocument();
        });
    });

    describe("When displayDrawer is true", () => {
        it("should display the drawer content with notifications", () => {
            const notifications = [
                { id: 1, type: "default", value: "New course available" },
                { id: 2, type: "urgent", value: "New resume available" }
            ];

            render(<Notifications notifications={notifications} displayDrawer={true} />);

            expect(screen.getByText("Your notifications")).toBeInTheDocument();

            expect(screen.getByText("Here is the list of notifications")).toBeInTheDocument();
            expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
            expect(screen.getByRole("list")).toBeInTheDocument();

            expect(screen.getByText("New course available")).toBeInTheDocument();
            expect(screen.getByText("New resume available")).toBeInTheDocument();
        });

        it("should display 'No new notification for now' when notifications array is empty", () => {
            render(<Notifications notifications={[]} displayDrawer={true} />);

            expect(screen.getByText("Your notifications")).toBeInTheDocument();

            expect(screen.getByText("No new notification for now")).toBeInTheDocument();

            expect(screen.queryByText("Here is the list of notifications")).not.toBeInTheDocument();
            expect(screen.queryByRole("list")).not.toBeInTheDocument();

            expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
        });
    });

    describe("NotificationItem styling", () => {
        it("should have blue color when type is default", () => {
            const { container } = render(
                <Notifications
                    notifications={[{ id: 1, type: "default", value: "Test" }]}
                    displayDrawer={true}
                />
            );

            const listItem = container.querySelector('[data-notification-type="default"]');
            expect(listItem).toHaveStyle({ color: "blue" });
        });

        it("should have red color when type is urgent", () => {
            const { container } = render(
                <Notifications
                    notifications={[{ id: 1, type: "urgent", value: "Test" }]}
                    displayDrawer={true}
                />
            );

            const listItem = container.querySelector('[data-notification-type="urgent"]');
            expect(listItem).toHaveStyle({ color: "red" });
        });
    });
});