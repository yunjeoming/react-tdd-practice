import Type from '../Type';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils';
import OrderPage from '..';

test('상품 변경시 total 가격 변경', async () => {
  render(<Type orderType="products" />);
  const productsTotal = screen.getByText('상품 총 가격', { exact: false });
  expect(productsTotal).toHaveTextContent('0');

  // america 추가
  const americaInput = await screen.findByRole('spinbutton', { name: 'America' });
  userEvent.clear(americaInput);
  userEvent.type(americaInput, '1');
  expect(productsTotal).toHaveTextContent('1000');
});

test('옵션 변경시 total 가격 변경', async () => {
  render(<Type orderType="options" />);
  const optionsTotal = screen.getByText('옵션 총 가격', { exact: false });
  expect(optionsTotal).toHaveTextContent('0');

  const insuranceCheckbox = await screen.findByRole('checkbox', { name: 'Insurance' });
  userEvent.click(insuranceCheckbox);
  expect(optionsTotal).toHaveTextContent('500');

  const dinnerCheckbox = await screen.findByRole('checkbox', {
    name: 'Dinner',
  });

  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent('1000');
  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent('500');
});

describe('상품, 옵션의 총 가격', () => {
  test('상품 추가', async () => {
    render(<OrderPage />);

    const total = screen.getByText('Total Price', { exact: false });
    expect(total).toHaveTextContent('0');

    const americaInput = await screen.findByRole('spinbutton', { name: 'America' });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');
    // expect(total).toHaveTextContent('1000');
  });

  test('옵션 추가', async () => {
    render(<OrderPage />);

    const total = screen.getByText('Total Price', { exact: false });
    expect(total).toHaveTextContent('0');

    const insuranceCheckbox = await screen.findByRole('checkbox', { name: 'Insurance' });
    userEvent.click(insuranceCheckbox);
    expect(total).toHaveTextContent('500');
  });

  test('상품, 옵션 제거시 총 가격 변화', async () => {
    render(<OrderPage />);

    const total = screen.getByText('Total Price', { exact: false });
    expect(total).toHaveTextContent('0');

    const insuranceCheckbox = await screen.findByRole('checkbox', { name: 'Insurance' });
    userEvent.click(insuranceCheckbox);

    const americaInput = await screen.findByRole('spinbutton', { name: 'America' });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, '3');

    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');

    expect(total).toHaveTextContent('1500');
  });
});
