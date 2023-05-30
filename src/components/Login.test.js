import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Authorization from "./Login";
import { register } from "../services/profileService";
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';


jest.mock("../services/profileService", () => ({
  login: jest.fn(),
  register: jest.fn(),
}));

describe("Authorization component", () => {
  let queryClient;

  beforeAll(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    jest.resetAllMocks();
    queryClient.clear();
  });

  test("renders login form initially", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Authorization />
      </QueryClientProvider>
    );

    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  test("displays register form when 'Register' button is clicked", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Authorization />
      </QueryClientProvider>
    );

    const registerButton = screen.getByRole("button", { name: "Register" });
    expect(registerButton).toBeInTheDocument();

    userEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
    });

    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
  });
  
  test("displays success message on successful registration", async () => {
    register.mockResolvedValueOnce({ message: "Registration successful!" });
  
    render(
      <QueryClientProvider client={queryClient}>
        <Authorization />
      </QueryClientProvider>
    );
  
    const registerButton = screen.getByRole("button", { name: "Register" });
    expect(registerButton).toBeInTheDocument();
  
    userEvent.click(registerButton);
  
    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
    });
  
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const ageInput = screen.getByLabelText("Age");
    const phoneInput = screen.getByLabelText("Phone Number");
  
    const modal = screen.queryByRole("dialog");
    const registerButtonInModal = within(modal).getByRole("button", { name: "Register" });
  
    userEvent.type(nameInput, "John Doe");
    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password");
    userEvent.type(ageInput, "30");
    userEvent.type(phoneInput, "1234567890");
    userEvent.click(registerButtonInModal);
  
    await waitFor(() => {
      expect(screen.getAllByText("Registration successful!")).toHaveLength(1);
    });
  });
  
    
});
