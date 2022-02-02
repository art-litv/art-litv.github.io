import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useEffectRedirect(path, observeValues) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(path);
  }, observeValues);
}
