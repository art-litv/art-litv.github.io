import { useNavigate, useSearchParams } from 'react-router-dom';
import { stringify } from 'qs';

export default function useRedirectedSubmit(redirectUrl) {
  const navigate = useNavigate();
  const [currentParams] = useSearchParams();

  const filterEmptyParam = obj => Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));

  return event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const queryParams = {
      ...Object.fromEntries(currentParams),
      ...Object.fromEntries(formData),
    };
    const redirectPath = redirectUrl + `?${stringify(filterEmptyParam(queryParams))}`;
    navigate(redirectPath);
  };
}
