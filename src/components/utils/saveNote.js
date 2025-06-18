import { supabase } from '../../supabaseClient';

export const saveNote = async (note) => {
  const {
    id,
    title,
    body,
    date,
    user_id,      
    video_url,
    match_type,
  } = note;

  if (!user_id) return { error: 'Missing user_id' };

  // Validate or parse date input safely
  const parsedDate = date ? new Date(date) : null;
  if (date && isNaN(parsedDate)) return { error: 'Invalid date format' };


  const payload = {
    title,
    body,
    date: parsedDate? parsedDate.toISOString(): null,
    user_id,
    video_url,
    match_type,
  };
  

  if (id) {
    const { data, error } = await supabase
      .from('notes')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    console.log('Update result:', { data, error });
    return {data, error};

  } else {
    const { data, error } = await supabase
      .from('notes')
      .insert([payload])
      .select()
      .single(); 

    console.log('Insert result:', { data, error });
    return { data, error};
  }
  
};