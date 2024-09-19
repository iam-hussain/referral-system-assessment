import { shouldBeLoggedOut } from '@/lib/middleware'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signout')({
  beforeLoad: shouldBeLoggedOut,
  component: Logout,
})

function Logout() {
  return <div> Logging out...</div>
}
