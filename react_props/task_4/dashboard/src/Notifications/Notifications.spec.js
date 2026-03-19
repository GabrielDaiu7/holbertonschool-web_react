/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
    test('renders with default type and correct styling', () => {
        render(<NotificationItem type="default" value="Test notification" />);

        const liElement = screen.getByText('Test notification');

        expect(liElement).toHaveAttribute('data-notification-type', 'default');

        expect(liElement).toHaveStyle('color: blue');
    });

    test('renders with urgent type and correct styling', () => {
        render(<NotificationItem type="urgent" value="Urgent notification" />);

        const liElement = screen.getByText('Urgent notification');

        expect(liElement).toHaveAttribute('data-notification-type', 'urgent');

        expect(liElement).toHaveStyle('color: red');
    });

    test('renders with html content', () => {
        const htmlContent = { __html: '<strong>Urgent requirement</strong>' };
        render(<NotificationItem type="urgent" html={htmlContent} />);

        const liElement = document.querySelector('li');

        expect(liElement).toHaveAttribute('data-notification-type', 'urgent');

        expect(liElement).toHaveStyle('color: red');

        expect(liElement.innerHTML).toContain('<strong>Urgent requirement</strong>');
    });
});