import React from 'react';

type Props = {
  message: string;
};

const ErrorBanner = ({ message }: Props) => {
  const errorMessage = message || '에러 발생';
  return <div data-testid="error-banner">{errorMessage}</div>;
};

export default ErrorBanner;
