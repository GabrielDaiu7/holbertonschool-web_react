import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Notifications from "./Notifications";

describe("Notification Component", () => {
    beforeEach(() => {
        render(<Notifications />);
    });

    test("Has title", () => {
        // Get tile
        const titleElement = screen.getByText(/Here is the list of notifications/i);

        //assert existance of title
        expect(titleElement).toBeInTheDocument();
    });

    test("Contains button", () => {
        // Get tile
        const buttonElement = screen.getByRole("button");

        //assert existance of button
        expect(buttonElement).toBeInTheDocument();
    });

    test("Contains 3 li elements", () => {
        // Get tile
        const listElements = screen.getAllByRole("listitem");

        //assert number of li elements
        expect(listElements.length).toBe(3);

        //assert values of li elements
        expect(listElements[0].textContent).toMatch(/New course available/i);
        expect(listElements[1].textContent).toMatch(/New resume available/i);
        expect(listElements[2].textContent).toMatch(
            /Urgent requirement - complete by EOD/i
        );
    });

    test("Close button logs message", () => {
        cleanup();

        // Spy on console.log
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });

        // Render component
        render(<Notifications />);

        // Simulate click
        fireEvent.click(screen.getByRole("button", { name: /Close/i }));

        //assert message logged when button is clicked
        expect(logSpy).toHaveBeenCalledWith("Close button has been clicked");

        // Clean up
        logSpy.mockRestore();
    });
});