import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NotificationItem from "./NotificationItem";

describe("NotificationItem Component", () => {
   
    it("Color is blue when type is default", () => {
        const type = "default";
        const value = "New course available";

        render(<NotificationItem type={type} value={value} />);

        const listElement = screen.getByRole("listitem");

        expect(listElement).toHaveStyle({ color: "blue" });

        expect(listElement).toHaveAttribute("data-notification-type", "default");
    });

    it("Color is red when type is urgent", () => {
        const type = "urgent";
        const value = "New resume available";

        render(<NotificationItem type={type} value={value} />);

        const listElement = screen.getByRole("listitem");

        expect(listElement).toHaveStyle({ color: "red" });

        expect(listElement).toHaveAttribute("data-notification-type", "urgent");
    });
});