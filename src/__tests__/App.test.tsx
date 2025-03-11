import { render } from '@testing-library/react';
import { App } from '../app/App';

describe('App', () => {
    it('should run without crashing', () => {
        const { container } = render(<App />);
        expect(container).toMatchSnapshot();
    });
});
