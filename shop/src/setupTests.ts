// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// 테스트 시작 전에 서버를 실행
beforeAll(() => server.listen());

// 리셋
afterEach(() => server.resetHandlers());

// 테스트 끝나고 서버 제거
afterEach(() => server.close());
