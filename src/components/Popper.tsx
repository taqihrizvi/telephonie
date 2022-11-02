import React from 'react';
import Tippy, { useSingleton } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface IPropType {
  tooltip?: string;
}

const Popper = ({ tooltip }: IPropType) => {
  const [source, target] = useSingleton({
    overrides: ['placement'],
  });

  return (
    <>
      <Tippy singleton={source} delay={300} />

      <Tippy content={<span>{tooltip}</span>} singleton={target} placement="left">
        <button onClick={(e: any) => e.preventDefault()}>
          <img src="/Assests/info.svg" />
        </button>
      </Tippy>
    </>
  );
};

export default Popper;
