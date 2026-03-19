/* eslint-disable */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

let container = null;

describe("Login Component", () => {
    beforeEach(() => {
        const rendered = render(<Login />);
        container = rendered.container;
    });

    it("Login has correct text", () => {
        const loginText = screen.getByText(/Login to access the full dashboard/i);
        expect(loginText).toBeInTheDocument();
    });

    it("renders two input elements, two labels and button", () => {
        const inputElements = container.querySelectorAll("input");
        const inputLength = inputElements.length;

        const labelElements = container.querySelectorAll("label");
        const labelsLength = labelElements.length;

        const button = screen.getByRole("button");

        expect(inputLength).toEqual(3); // email, password, submit
        expect(labelsLength).toEqual(2);
        expect(button).toBeInTheDocument();
    });

    it("Labels have correct values", () => {
        const email = screen.getByLabelText(/Email/i);
        const password = screen.getByLabelText(/Password/i);

        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
    });

    it("Button has correct value", () => {
        const button = screen.getByRole("button");
        expect(button.textContent).toBe("OK");
    });

    it("On label click triggers focus", async () => {
        const emailLabel = screen.getByLabelText(/Email/i);
        const inputField = screen.getByRole("textbox", { name: /email/i });

        await userEvent.click(emailLabel);
        expect(inputField).toHaveFocus();
    });

    // ✅ NEW TESTS

    it("submit button is disabled by default", () => {
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
    });

    it("button becomes enabled with valid email and password", async () => {
        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const button = screen.getByRole("button");

        // Initially disabled
        expect(button).toBeDisabled();

        // Type valid email
        await userEvent.type(emailInput, "test@test.com");

        // Still disabled (password not valid yet)
        expect(button).toBeDisabled();

        // Type valid password (>= 8 chars)
        await userEvent.type(passwordInput, "password123");

        // Now enabled
        expect(button).toBeEnabled();
    });
});