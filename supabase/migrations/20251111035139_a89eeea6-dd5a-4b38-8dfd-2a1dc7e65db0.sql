-- Drop existing insert policy
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

-- Create new policy that explicitly allows anonymous and authenticated users
CREATE POLICY "Allow public bookings without authentication"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Ensure both anon and authenticated roles have INSERT permission
GRANT INSERT ON public.bookings TO anon;
GRANT INSERT ON public.bookings TO authenticated;

-- Also grant USAGE on the sequence if it exists
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;