import { render, screen } from '@testing-library/react';
import SummaryPage from '.';

test('체크박스를 클릭해야 주문버튼이 활성화 됨', () => {
  render(<SummaryPage />);
  const checkbox = screen.getByRole('checkbox', {
    name: '주문내역을 확인하셨나요?',
  }) as HTMLInputElement;
  expect(checkbox.checked).toEqual(false);

  const confirmButton = screen.getByRole('button', {
    name: '주문 확인',
  });
  expect(confirmButton).toBeTruthy();
});
