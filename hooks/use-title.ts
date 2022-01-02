import { useRouter } from 'next/router'

const useTitle = (): string => {
  const router = useRouter()
  const paths = router.pathname.split('/')

  let title = 'Home'
  switch (paths[paths.length - 1]) {
    case 'albums':
      title = 'Albums'
      break
    case 'memos':
      title = 'Memos'
      break
    case 'settings':
      title = 'Settings'
      break
  }

  return title
}

export default useTitle
