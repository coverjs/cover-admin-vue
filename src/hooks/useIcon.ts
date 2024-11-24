import icon from '@/assets/logo.png'

export function useLogo() {
  const favIcon = useFavicon()
  favIcon.value = icon
}
