import { supabase } from '../../supabaseClient';

export const saveNote = async (note) => {
  const {
    id,
    title,
    body,
    date,
    video_url = '',
    user_id,
  } = note;

  if (!user_id) return { error: 'Missing user_id' };

  // Validate or parse date input safely
  const parsedDate = date ? new Date(date) : null;
  if (date && isNaN(parsedDate)) return { error: 'Invalid date format' };


  const payload = {
    title,
    body,
    date: parsedDate? parsedDate.toISOString(): null,
    video_url,
    user_id,
  };
  

  if (id) {
    const { data, error } = await supabase
      .from('notes')
      .update(payload)
      .eq('id', id)
      .select();
    console.log('Update result:', { data, error });
    return { error, data: data?.[0] || null };
  } else {
    const { data, error } = await supabase
      .from('notes')
      .insert([payload])
      .select();
    console.log('Insert result:', { data, error });
    return { error, data: data?.[0] || null };
  }
  
};