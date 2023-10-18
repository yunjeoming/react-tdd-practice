import { fireEvent, render, screen } from '@testing-library/react';
import Counter from './Counter';

test('최초 counter는 0', () => {
  render(<Counter />);

  // screen object(= document.body)를 이용해서 원하는 엘리멘트에 접근
  const counterElement = screen.getByTestId('counter');

  // id가 counter인 엘리멘트의 텍스트가 0인지 테스트
  expect(counterElement).toHaveTextContent(0);
});

test('- 버튼의 text는 -', () => {
  render(<Counter />);
  const minusButton = screen.getByRole('button', { name: '-' });
  expect(minusButton).toHaveTextContent('-');
});

test('+ 버튼의 text는 +', () => {
  render(<Counter />);
  const plusButton = screen.getByRole('button', { name: '+' });
  expect(plusButton).toHaveTextContent('+');
});

test('+ 버튼 클릭 시 counter는 1로 변함', () => {
  render(<Counter />);
  const plusButton = screen.getByRole('button', { name: '+' });
  fireEvent.click(plusButton);
  const counterElement = screen.getByTestId('counter');
  expect(counterElement).toHaveTextContent('1');
});

test('- 버튼 클릭 시 counter는 -1로 변함', () => {
  render(<Counter />);
  const minusButton = screen.getByRole('button', { name: '-' });
  fireEvent.click(minusButton);
  const counterElement = screen.getByTestId('counter');
  expect(counterElement).toHaveTextContent('-1');
});

test('on/off 버튼은 파란색', () => {
  render(<Counter />);
  const onOffButton = screen.getByRole('button', { name: 'on/off' });
  expect(onOffButton).toHaveStyle({ backgroundColor: 'blue' });
});

test('on/off 버튼 클릭 시 +, - 버튼 비활성화', () => {
  render(<Counter />);
  const onOffButton = screen.getByRole('button', { name: 'on/off' });
  fireEvent.click(onOffButton);
  const plusButton = screen.getByRole('button', { name: '+' });
  const minusButton = screen.getByRole('button', { name: '-' });
  expect(plusButton).toBeDisabled();
  expect(minusButton).toBeDisabled();
});
