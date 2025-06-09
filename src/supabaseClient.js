import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qabnmqpimswwnnjgcfzf.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhYm5tcXBpbXN3d25uamdjZnpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNTEzNTIsImV4cCI6MjA2NDgyNzM1Mn0.LyoBNQ77xJ1sd_RCMn1OigAFnSHqLYnmhoX5hlX8_XE'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
