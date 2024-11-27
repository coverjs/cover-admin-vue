import icon from '@/assets/logo.png';

export function useLogoToFavicon() {
  const favIcon = useFavicon();
  favIcon.value = icon;
}
