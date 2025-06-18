import { supabase } from '../../supabaseClient';

export async function fetchNotes() {
  const { data, error } = await supabase
    .from('notes')
    .select('id, title, body, date, user_id, video_url, match_type') // select video fields explicitly if needed
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching notes:', error);
    return { data: [], error };
  }

  return { data: data || [], error: null };
}
