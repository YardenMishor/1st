import { createClient } from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL,key=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const authConfigured=!!(url&&key);
export const cloud=authConfigured?createClient(url,key):null;
export async function readBoard(){const {data,error}=await cloud.from('board_state').select('tasks,done_count').maybeSingle();if(error)throw error;return data||{tasks:[],done_count:0}}
export async function writeBoard(user,tasks,doneCount){const {error}=await cloud.from('board_state').upsert({user_id:user.id,tasks,done_count:doneCount,updated_at:new Date().toISOString()});if(error)throw error}
