import type { User } from '@/types/User';


interface DesktopSharingProps {
  user: User;
}

export default function DesktopSharing({user}: DesktopSharingProps) {
  return (
    <div>
      DesktopSharing de {user.name}
    </div>
  )
}
