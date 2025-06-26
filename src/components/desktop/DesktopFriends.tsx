
import type { User } from "@/types/User";


interface DesktopFriendsProps {
  user: User;
}

export default function DesktopFriends({user}: DesktopFriendsProps) {
  return (
    <div>
      DesktopFriends de {user.name}
    </div>
  )
}
