import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
    beforeEach(() => {
        // Render app component
        render(<App />);
    });

    test("h1 element with the text School Dashboard is rendered", () => {
        const heading = screen.getByRole("heading", { name: /School Dashboard/i });
        expect(heading).toBeInTheDocument();
    });

    test("the text content within the 2 p elements in the app-body and app-footer divs matches", () => {
        const divbody = screen.getByText(/Login to access the full dashboard/i);
        const divfooter = screen.getByText(/Copyright 2025 - holberton School/i);

        expect(divbody).toBeInTheDocument();
        expect(divfooter).toBeInTheDocument();
    });

    test("an img element is rendered", () => {
        const image = screen.getByAltText(/holberton logo/i);
        expect(image).toBeInTheDocument();
    });

    test("renders two input elements", () => {
        //Get input elements
        const inputElements = screen.getAllByRole("textbox");
        const inputLength = inputElements.length;

        // Assert element
        expect(inputLength).toEqual(1);
    });

    test("renders two label elements with text 'email' & 'password'", () => {
        // Get labels
        const email = screen.getByLabelText(/Email/i);
        const password = screen.getByLabelText(/Password/i);

        // Assert elements and values
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
    });

    test("renders two button with text 'OK'", () => {
        //Get button
        const buttons = screen.getAllByRole("button");

        // Assert text content of button
        expect(buttons[1].textContent).toBe("OK");
    });
});