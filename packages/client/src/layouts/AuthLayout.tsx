import React, { FC } from 'react';
import GridLayout from './GridLayout';

const AuthLayout: FC = props => {
  return (
    <div id="auth-layout-container">
      <GridLayout>{props.children}</GridLayout>
    </div>
  );
};

export default AuthLayout;
