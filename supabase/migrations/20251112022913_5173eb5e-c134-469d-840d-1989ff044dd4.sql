-- Fix search_path for booking number functions to prevent security issues
ALTER FUNCTION generate_booking_number() SET search_path = public;
ALTER FUNCTION set_booking_number() SET search_path = public;