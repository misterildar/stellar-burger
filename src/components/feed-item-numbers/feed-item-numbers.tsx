import React, { FC, ReactNode } from 'react';

interface IFeedItemNumbers {
  text: string;
  className?: string;
  children: ReactNode;
}

const FeedItemNumbers: FC<IFeedItemNumbers> = ({
  text,
  className,
  children,
}) => {
  return (
    <div>
      <div>
        <p className='text text_type_main-medium'>{text}</p>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default FeedItemNumbers;
