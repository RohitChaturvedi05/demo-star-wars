import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
    it('should run without crashing', () => {
        const { container } = render(<Header />);
        expect(container).toMatchSnapshot();
    });
    it('should renders header text', () => {
        render(<Header />);
        const title = screen.getByText(/Demo Star Wars App/i);
        expect(title).toBeInTheDocument();
    });
    it('should call onDrawerToggle when toggle button is clicked', () => {
        const mockOnDrawerToggle = jest.fn();
        render(<Header onDrawerToggle={mockOnDrawerToggle} />);
        const toggleButton = screen.getByRole('button');
        fireEvent.click(toggleButton);
        expect(mockOnDrawerToggle).toHaveBeenCalledTimes(1);
    });
});
