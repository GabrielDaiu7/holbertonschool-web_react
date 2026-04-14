import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

describe("Header Component", () => {
    it("Renders correct text", () => {
        render(<Header user={{ isLoggedIn: false }} />);

        const heading = screen.getByRole("heading", {
            level: 1,
            name: /School Dashboard/i,
        });
        expect(heading).toBeInTheDocument();
    });

    it("Renders an image", () => {
        render(<Header user={{ isLoggedIn: false }} />);

        const image = screen.getByAltText(/holberton logo/i);
        expect(image).toBeInTheDocument();
    });

    it("does not render logoutSection when user is not logged in", () => {
        render(<Header user={{ isLoggedIn: false }} />);

        const logoutSection = screen.queryByText(/Welcome/i);
        expect(logoutSection).not.toBeInTheDocument();
    });

    it("renders logoutSection when user is logged in", () => {
        const user = {
            email: "test@test.com",
            password: "password123",
            isLoggedIn: true
        };

        render(<Header user={user} logOut={jest.fn()} />);

        const logoutSection = screen.getByText(/Welcome test@test.com/i);
        expect(logoutSection).toBeInTheDocument();

        const logoutLink = screen.getByText(/logout/i);
        expect(logoutLink).toBeInTheDocument();
    });

    it("calls logOut function when logout link is clicked", async () => {
        const user = {
            email: "test@test.com",
            password: "password123",
            isLoggedIn: true
        };
        const mockLogOut = jest.fn();

        render(<Header user={user} logOut={mockLogOut} />);

        const logoutLink = screen.getByText(/logout/i);
        await userEvent.click(logoutLink);

        expect(mockLogOut).toHaveBeenCalled();
    });
});
