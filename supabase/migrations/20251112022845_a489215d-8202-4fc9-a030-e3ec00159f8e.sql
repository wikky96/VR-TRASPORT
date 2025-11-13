-- Add booking_number column to bookings table and create sequence for VRT format
-- This will generate booking IDs in format VRT0000000001, VRT0000000002, etc.

ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS booking_number TEXT;

-- Create a sequence starting from 1
CREATE SEQUENCE IF NOT EXISTS bookings_number_seq START WITH 1;

-- Create a function to generate VRT booking numbers
CREATE OR REPLACE FUNCTION generate_booking_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  next_num INTEGER;
  booking_num TEXT;
BEGIN
  -- Get the next sequence number
  next_num := nextval('bookings_number_seq');
  
  -- Format as VRT with 10 digits (VRT0000000001)
  booking_num := 'VRT' || LPAD(next_num::TEXT, 10, '0');
  
  RETURN booking_num;
END;
$$;

-- Create a trigger to auto-generate booking number on insert
CREATE OR REPLACE FUNCTION set_booking_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.booking_number IS NULL THEN
    NEW.booking_number := generate_booking_number();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_set_booking_number ON public.bookings;
CREATE TRIGGER trigger_set_booking_number
BEFORE INSERT ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION set_booking_number();