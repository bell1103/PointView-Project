import { supabase } from '../../supabaseClient';

export const saveNote = async (note) => {
  const {
    id,
    title,
    body,
    video_url = '',
    lastModified,
    user_id,
  } = note;

  if (!user_id) return { error: 'Missing user_id' };

  const payload = {
    title,
    body,
    video_url,
    last_modified: typeof lastModified === 'number'
      ? lastModified
      : new Date(lastModified).getTime(), 
    user_id,
  };

  if (id) {
    // Update existing note
    const { error } = await supabase
      .from('notes')
      .update(payload)
      .eq('id', id);
    return { error, data: null };

  } else {
    // Insert new note
    const { data, error } = await supabase
      .from('notes')
      .insert([payload])
      .select(); // Select returns the new row, including generated ID
    return { error, data: data?.[0] };
  }
};
