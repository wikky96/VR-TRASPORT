import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingRequest {
  user_name: string;
  phone_number: string;
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    unit: string;
  }>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingRequest = await req.json();
    console.log('Received booking request:', bookingData);

    // Create Supabase client with service role key to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Insert booking into database
    const { data: booking, error: dbError } = await supabaseAdmin
      .from('bookings')
      .insert({
        user_name: bookingData.user_name,
        phone_number: bookingData.phone_number,
        products: bookingData.products
      })
      .select('*, booking_number')
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    console.log('Booking created successfully:', booking.booking_number);

    // Send email notification
    const { error: emailError } = await supabaseAdmin.functions.invoke('send-booking-email', {
      body: {
        userName: bookingData.user_name,
        phoneNumber: bookingData.phone_number,
        products: bookingData.products,
        bookingId: booking.booking_number || booking.id,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      }
    });

    if (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the booking if email fails
    }

    return new Response(
      JSON.stringify({ success: true, booking }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in create-booking function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to create booking',
        details: error.details || error.hint || null
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
