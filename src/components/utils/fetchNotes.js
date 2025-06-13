import { supabase } from '../../supabaseClient';

export const fetchNotes = async (user_id) => {
  if (!user_id) return [];

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user_id)
    .order('date', { ascending: false });

  if (error) {
    console.error("Error fetching notes:", error);
    return [];
  }

  return data.map((note) => ({
    ...note,
    })); 

  };
