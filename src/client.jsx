import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = 'https://jmekldiuaroxfhsoecat.supabase.co';
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

export const supabase = createClient(PROJECT_URL, PROJECT_KEY);
