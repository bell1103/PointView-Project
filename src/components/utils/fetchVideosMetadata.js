import { supabase } from "../../supabaseClient";

export const  fetchVideosMetadata = async (user_id) => {

    if (!user_id) return [];

    const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user_id)
    .not('video_url', 'is', null);

    if (error) {
    console.error('Error fetching videos metadata:', error);
    return [];
  }
  return data;
  }
  