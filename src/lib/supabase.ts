import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.SUPABASE_URL as string,
  import.meta.env.SUPABASE_SERVICE_KEY as string,
  { db: { schema: 'links' } }
)
