import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "./Footer";
import AppContext from "../Context/context";
import { getCurrentYear } from "../utils/utils";

describe("Footer Component", () => {
    it("renders copyright", () => {
        const year = getCurrentYear();
        render(<Footer />);
        expect(
            screen.getByText(`Copyright ${year} - Holberton School`, {
                exact: false,
            })
        ).toBeInTheDocument();
    });

    it("does NOT display welcome/logout when logged out", () => {
        const contextValue = {
            user: { isLoggedIn: false },
        };
        render(
            <AppContext.Provider value={contextValue}>
                <Footer />
            </AppContext.Provider>
        );
        expect(screen.queryByText(/Welcome/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
    });

    it("displays welcome/logout when logged in", () => {
        const contextValue = {
            user: {
                email: "test@test.com",
                password: "password123",
                isLoggedIn: true,
            },
            logOut: jest.fn(),
        };
        render(
            <AppContext.Provider value={contextValue}>
                <Footer />
            </AppContext.Provider>
        );

        expect(screen.getByText(/Welcome test@test.com/i)).toBeInTheDocument();
        expect(screen.getByText(/logout/i)).toBeInTheDocument();
    });

    it("calls logOut when logout link is clicked", async () => {
        const mockLogOut = jest.fn();
        const contextValue = {
            user: {
                email: "test@test.com",
                password: "password123",
                isLoggedIn: true,
            },
            logOut: mockLogOut,
        };

        render(
            <AppContext.Provider value={contextValue}>
                <Footer />
            </AppContext.Provider>
        );

        await userEvent.click(screen.getByText(/logout/i));
        expect(mockLogOut).toHaveBeenCalled();
    });
});
