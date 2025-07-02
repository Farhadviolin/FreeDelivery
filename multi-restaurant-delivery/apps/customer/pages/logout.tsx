import React from 'react';
import { Button } from 'ui';

export default function Logout() {
  React.useEffect(() => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }, []);
  return <Button>Logout...</Button>;
}
