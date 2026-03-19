import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
    beforeEach(() => {
        // Render app component
        render(<App />);
    });

    // Test if app component renders Header component
    it("Renders Header component", () => {
        const heading = screen.getByRole("heading", {
            level: 1,
            name: /school dashboard/i,
        });
        expect(heading).toBeInTheDocument();
    });

    // Test if app component renders Login component
    it("Renders Login Component", () => {
        const loginText = screen.getByText(/Login to access the full dashboard/i);
        expect(loginText).toBeInTheDocument();
    });

    // Test if app component renders Footer component
    it("Renders Footer Component", () => {
        expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
    });
});