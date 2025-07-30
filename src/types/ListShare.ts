export interface ListShare {
  id_list: number;
  author_id: number;
  author_name: string;
  user_id: number;
  access_level: 1 | 2 | 3 | 4; 
}

//  1 : lecture
//  2 lecture et ajouter des notes
//  3 lecture, ajouter des notes et modifier ses notes
//  4 : lecture, ajouter des notes et modifier toutes les notes 