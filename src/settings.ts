export const basePath =
  import.meta.env.BASE_URL || window.location.href.includes('github.') ? '/integrify-react/' : '/';
export const useHashRouter = window.location.href.includes('github.');
