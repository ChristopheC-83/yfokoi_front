import ChangeItemToDB from "@/services/items/chanteItemToDB";
import { useItemsStore } from "@/stores/items/useItemsStore";
import { useAuthStore } from "@/stores/users/useAuthStore";
import type { Item } from "@/types/Item";
import { useState } from "react";
import { toast } from "sonner";

interface PropsEditing {
  item: Item;
  onFinishEdit: () => void;
}

export default function ChangeItem({ item, onFinishEdit }: PropsEditing) {
  const { itemsByListId, setItemsForList } = useItemsStore();
  //   const User = useAuthStore((state) => state.user);
  const userId = Number(useAuthStore((state) => state.user?.id));

  const [newContent, setNewContent] = useState<string>(item.content);

  async function handleChangeItem(e: React.FormEvent) {
    e.preventDefault();

    console.log("handleChangeItem", item.id, newContent);

    const trimmedContent = newContent.trim();
    // Vérif : contenu non vide
    if (!trimmedContent) {
      console.error("Le contenu ne peut pas être vide.");
      toast.error("Le contenu ne peut pas être vide.");
      return;
    }

    if (await ChangeItemToDB(item.id, trimmedContent)) {
      setItemsForList(item.id_list, [
        ...itemsByListId[item.id_list].map((i) =>
          i.id === item.id
            ? {
                ...i,
                content: trimmedContent,
                updated_at: new Date(),
                updated_by: userId,
              }
            : i
        ),
      ]);
      toast.success("Élément modifié avec succès.");
      setNewContent("");
      onFinishEdit();
    } else {
      toast.error("Erreur lors de la modification.");
    }
  }

  return (
    <div className="flex items-center justify-start w-full">
      <form
        className="w-full flex items-center justify-start mr-2"
        onSubmit={handleChangeItem}
      >
        <input
          type="text"
          value={newContent}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded block  w-full p-2"
          placeholder="Modifier l'élément"
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button type="submit" className="text-4xl  cursor-pointer mb-1 ml-2">
          ✅
        </button>
      </form>
    </div>
  );
}
