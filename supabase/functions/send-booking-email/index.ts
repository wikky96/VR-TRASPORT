import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Product {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

interface BookingEmailRequest {
  userName: string;
  phoneNumber: string;
  products: Product[];
  bookingId: string;
  timestamp: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userName, phoneNumber, products, bookingId, timestamp }: BookingEmailRequest = await req.json();

    console.log("Sending booking email for:", bookingId);

    // Build products list HTML
    const productsHtml = products.map(p => 
      `<li style="margin: 8px 0;"><strong>${p.name}</strong>: ${p.quantity} ${p.unit}</li>`
    ).join('');

    // Send email using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Vrtransports49 <vrtransports49@vrtransports.com>",
        to: ["vrtransport49@gmail.com"],
        subject: "🚛 New Booking Received - VR Transport",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px; }
              .booking-details { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
              .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
              .label { font-weight: bold; color: #555; }
              .value { color: #333; }
              ul { list-style: none; padding: 0; }
              .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">🚛 New Booking Received</h1>
                <p style="margin: 5px 0 0 0;">VR Transport</p>
              </div>
              <div class="content">
                <div class="booking-details">
                  <h2 style="margin-top: 0; color: #667eea;">Booking Details</h2>
                  
                  <div class="detail-row">
                    <span class="label">Booking ID:</span>
                    <span class="value">${bookingId}</span>
                  </div>
                  
                  <div class="detail-row">
                    <span class="label">Customer Name:</span>
                    <span class="value">${userName || 'Not provided'}</span>
                  </div>
                  
                  <div class="detail-row">
                    <span class="label">Phone Number:</span>
                    <span class="value">${phoneNumber}</span>
                  </div>
                  
                  <div class="detail-row">
                    <span class="label">Booking Date:</span>
                    <span class="value">${timestamp}</span>
                  </div>
                  
                  <div class="detail-row" style="border-bottom: none;">
                    <span class="label">Payment Status:</span>
                    <span class="value" style="color: #f59e0b;">Unpaid</span>
                  </div>
                  
                  <div class="detail-row" style="border-bottom: none;">
                    <span class="label">Delivery Status:</span>
                    <span class="value" style="color: #f59e0b;">Undelivered</span>
                  </div>
                </div>

                <div class="booking-details">
                  <h3 style="margin-top: 0; color: #667eea;">Order Items</h3>
                  <ul>
                    ${productsHtml}
                  </ul>
                </div>

                <div class="booking-details">
                  <h3 style="margin-top: 0; color: #667eea;">Contact Information</h3>
                  <p style="margin: 8px 0;"><strong>Company:</strong> VR Transport</p>
                  <p style="margin: 8px 0;"><strong>Phone:</strong> +91 80566 55272</p>
                  <p style="margin: 8px 0;"><strong>Email:</strong> vrtransport49@gmail.com</p>
                </div>

                <p style="margin-top: 20px; padding: 15px; background: #e0e7ff; border-left: 4px solid #667eea; border-radius: 4px;">
                  <strong>Action Required:</strong> Please review this booking in your admin dashboard and contact the customer to confirm the order.
                </p>
              </div>
              <div class="footer">
                <p>This is an automated notification from VR Transport booking system.</p>
                <p style="margin-top: 8px;">📞 +91 80566 55272 | 📧 vrtransport49@gmail.com</p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      throw new Error(`Resend API error: ${errorText}`);
    }

    const emailData = await emailResponse.json();

    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify(emailData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending booking email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
