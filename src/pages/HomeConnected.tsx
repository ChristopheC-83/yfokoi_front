import DesktopContent from '@/components/desktop/DesktopContent'
import DesktopFriends from '@/components/desktop/DesktopFriends';
import DesktopLists from '@/components/desktop/DesktopLists'
import DesktopSharing from '@/components/desktop/DesktopSharing';
import useViewport from '@/hooks/useIsDesktop';

export default function HomeConnected() {

    
      const viewport = useViewport();

  return (

      
     <section className="flex justify-between w-full">
      {(viewport === "desktop" || viewport === "tablet") && <DesktopLists />}
      {(viewport === "desktop" || viewport === "tablet") && <DesktopContent />}
       {viewport === "desktop" && (
         <section className="flex flex-col">
           <DesktopSharing />
           <DesktopFriends />
         </section>
       )}
     </section>
    
  )
}
