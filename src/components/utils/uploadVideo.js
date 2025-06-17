// utils/uploadVideo.js
import { supabase } from '../../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export async function uploadVideo(file, userId) {
  if (!file || !userId) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${uuidv4()}.${fileExt}`;
  const filePath = `videos/${fileName}`;

  // upload to supabase storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('videos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (uploadError) {
      console.error('Upload failed:', uploadError.message);
      return null;
    }
  
  // get public url 
  const {data: urlData, error: urlError } = supabase.storage
    .from('videos')
    .getPublicUrl(filePath);

  if (urlError) {
    console.error('Error getting public URL:', urlError.message);
    return null;
  }
  const videoUrl = urlData.publicUrl;
  return urlData.publicUrl;
}
