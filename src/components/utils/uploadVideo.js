import { supabase } from '../../supabaseClient';

export const uploadVideo = async (file, userId) => {
  if (!file || !userId) return null;

  const fileName = `${userId}/${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from('videos') // your bucket name
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Video upload error:', error.message);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from('videos')
    .getPublicUrl(fileName);

  return publicUrlData?.publicUrl || null;
};
