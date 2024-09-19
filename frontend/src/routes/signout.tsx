import { shouldBeLoggedOut } from '@/lib/middleware'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signout')({
  beforeLoad: shouldBeLoggedOut,
  component: SignOut,
})

function SignOut() {
  return <div> Signing out...</div>
}
