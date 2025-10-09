export const getGuestNameFromURL = (): string => {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('guest') || params.get('name');
  return name ? decodeURIComponent(name) : '';
};