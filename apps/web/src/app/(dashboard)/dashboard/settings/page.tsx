import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@aumveda/db'
import Topbar from '../../_components/Topbar'
import SettingsForm from './_components/SettingsForm'

export const metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/auth/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      profile: { select: { timezone: true, bio: true } },
    },
  })

  return (
    <>
      <Topbar title="Settings" />
      <div className="px-4 lg:px-8 py-6 max-w-lg mx-auto">
        <SettingsForm
          name={user?.name ?? ''}
          email={user?.email ?? ''}
          timezone={user?.profile?.timezone ?? 'Asia/Kolkata'}
          bio={user?.profile?.bio ?? ''}
        />
      </div>
    </>
  )
}
