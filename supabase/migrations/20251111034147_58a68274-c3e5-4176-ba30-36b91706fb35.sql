-- Fix bookings insert policy to explicitly allow both authenticated and anon users
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
TO public
WITH CHECK (true);

-- Also ensure anon role specifically can insert
GRANT INSERT ON public.bookings TO anon;
GRANT INSERT ON public.bookings TO authenticated;