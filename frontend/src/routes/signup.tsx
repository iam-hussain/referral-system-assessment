import { shouldNotBeLoggedIn } from '@/lib/middleware'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/signup')({
  beforeLoad: shouldNotBeLoggedIn,
  validateSearch: z.object({
    referralCode: z.string().optional(),
  }),
  component: SignUp,
})

function SignUp() {
  const search = Route.useSearch();
  const referralCode = search.referralCode;

  return <div> SignUp... referralCode:{referralCode}</div>
}
