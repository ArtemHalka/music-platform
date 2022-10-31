import React from 'react';
import MainLayout from "../layouts/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      <div className='center'>
        <h1>Welcome</h1>
        <h3>Here you can listen the best music from the whole world</h3>
      </div>
      <style jsx>
        {`
          .center {
            margin-top: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </MainLayout>
  );
};

export default Index;
