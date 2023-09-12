import React from 'react';

const FeedItemNumbers = ({ text, children, classNumber }) => {
  return (
    <div>
      <div>
        <p className='text text_type_main-medium'>{text}</p>
        <div className={classNumber}>{children}</div>
      </div>
    </div>
  );
};

export default FeedItemNumbers;
