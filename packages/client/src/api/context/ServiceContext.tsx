import React, { createContext, FC, useContext, useEffect } from 'react';
import { AuthService } from './services/auth.service';
import { useDispatch } from 'react-redux';

type Services = {
  Auth: AuthService;
};

const ServiceContext = createContext<Services>({} as Services);

export const ServiceProvider: FC = props => {
  console.log('Service Provider init');
  useEffect(() => {
    console.log('Service Provider effect init');
    return () => {
      console.log('Service Provider effect destroy');
    };
  }, []);

  const dispatch = useDispatch();

  const services: Services = {
    Auth: new AuthService(dispatch),
  };

  return <ServiceContext.Provider value={services}>{props.children}</ServiceContext.Provider>;
};

export const useServices = () => useContext(ServiceContext);
