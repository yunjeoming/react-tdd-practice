// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// 테스트 시작 전에 서버를 실행
beforeAll(() => server.listen());

// 하나 테스트 끝나면 서버 리셋
afterEach(() => server.resetHandlers());

// 모든 테스트 끝나면 서버 제거
afterAll(() => server.close());
