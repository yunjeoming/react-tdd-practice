import { render, screen } from '@testing-library/react';
import Type from './Type';
import { rest } from 'msw';
import { server } from '../../mocks/server';

test('서버로부터 이미지 가져오기', async () => {
  render(<Type orderType="products" />);

  const productImages = (await screen.findAllByRole('img', {
    name: /product$/i,
  })) as HTMLImageElement[];
  expect(productImages).toHaveLength(2);

  const altText = productImages.map((elem) => elem.alt);
  expect(altText).toEqual(['America product', 'England product']);
});

test('제품 데이터 가져올 때 에러 처리', async () => {
  server.resetHandlers(rest.get('http://localhost:5001/products', (req, res, ctx) => res(ctx.status(500))));

  render(<Type orderType="products" />);
  const errorBanner = await screen.findByTestId('error-banner');
  expect(errorBanner).toHaveTextContent('에러가 발생했습니다.');
});

test('서버로부터 옵션 가져오기', async () => {
  render(<Type orderType="options" />);

  const checkboxes = await screen.findAllByRole('checkbox');
  expect(checkboxes).toHaveLength(2);
});
