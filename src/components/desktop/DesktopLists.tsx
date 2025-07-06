import { useUserContextStore } from "@/stores/users/useUserContextStore";
import { useListsStore } from "@/stores/lists/useListsStore";
import DesktopListsItem from "./components/lists/DesktopListsItem";
import type { User } from "@/types/User";
import { useInitLists } from "@/hooks/lists/useInitLists";
import { updateSelectedListIdFromApi } from "@/services/userContext/updateUserContext";
import CreateListForm from "./components/lists/CreateListForm";

interface DesktopListsProps {
  user: User;
}

export default function DesktopLists({ user }: DesktopListsProps) {
  const { ownedLists, accessLists } = useListsStore();
  const { selectedListId, setSelectedListId } = useUserContextStore();
  const { loading, error } = useInitLists();

  async function changeSelectedList(id: number | null) {
    if (await updateSelectedListIdFromApi(id)) {
      setSelectedListId(id);
      // console.log("Liste sélectionnée changée :", id);
    }
  }

  return (
    <div className="p-3 w-[240px] shrink-0">


      <h1 className="text-center bg-amber-100 text-slate-900 rounded-full px-3 py-2 text-xl font-bold">
        Créer une Liste :
      </h1>
      <CreateListForm/>
      <h1 className="text-center bg-amber-100 text-slate-900 rounded-full px-3 py-2 text-xl font-bold">
        Mes Listes :
      </h1>

      {loading && <p className="text-slate-600 italic">Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {ownedLists.map((list) => (
        <DesktopListsItem
          key={`owned-${list.id}`}
          id={list.id}
          name={list.name}
          ownerName={user.name}
          ownedList={true}
          onClick={() => changeSelectedList(list.id)}
          isSelected={selectedListId === list.id}
          isOwnedList={true}
        />
      ))}

      <h1 className="text-center bg-amber-100 text-slate-900 rounded-full px-4 py-3 text-xl font-bold mt-5">
        Listes Accessibles :
      </h1>

      {accessLists.map((list) => (
        <DesktopListsItem
          key={`access-${list.id}`}
          id={list.id}
          name={list.name}
          ownerName={list.author_name}
          ownedList={false}
          onClick={() => changeSelectedList(list.id)}
          isSelected={selectedListId === list.id}
          isOwnedList={false}
        />
      ))}
    </div>
  );
}
