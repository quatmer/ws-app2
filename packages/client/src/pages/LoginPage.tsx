import React from 'react';
import AuthLayout from 'src/layouts/AuthLayout';
import LoginForm from 'src/container/auth/LoginForm';

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
