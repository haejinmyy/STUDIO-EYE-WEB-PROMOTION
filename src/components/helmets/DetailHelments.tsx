import React from 'react';

type Props = {
  title: string;
  description?: string;
  keywords?: string;
};

const DetailHelments = ({ title, description, keywords }: Props) => {
  return (
    <>
      <title>{title}</title>
      {description && <meta name='description' content={description} />}
      {keywords && <meta name='keywords' content={keywords} />}
    </>
  );
};

export default DetailHelments;