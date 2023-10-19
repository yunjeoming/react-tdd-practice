import React from 'react';

type Props = {
  name: string;
};

const Options = ({ name }: Props) => {
  return (
    <form>
      <input type="checkbox" id={`${name} option`} />
      <label htmlFor={`${name} option`}>{name}</label>
    </form>
  );
};

export default Options;
