import React from 'react';
import AuthLayout from 'src/layouts/AuthLayout';
import LoginForm from 'src/container/auth/LoginForm';
import { IonPage } from '@ionic/react';

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
