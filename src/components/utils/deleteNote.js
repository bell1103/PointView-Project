import { supabase } from '../../supabaseClient';

export const deleteNote = async (id) => {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);
  return { error };
};
