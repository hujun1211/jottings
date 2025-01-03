import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return null
  }

  return (
    <div>
      <div>
        email:
        {user.email}
      </div>
      <div>
        name:
        {user.user_metadata.name}
      </div>
      <div>
        role:
        {user.role}
      </div>
    </div>
  )
}
