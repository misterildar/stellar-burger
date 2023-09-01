import React from 'react';

const Loader = ({ text }) => {
  return (
    <div className=' pt-30 pb-30'>
      <h1 className='text text_type_main-large'>{text}</h1>
    </div>
  );
};

export default Loader;
