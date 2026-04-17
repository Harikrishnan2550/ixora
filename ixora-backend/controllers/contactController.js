export const sendContactEmail = async (req, res) => {
  try {
    // 1. Extract data from the frontend
    const { 
      targetEmail, 
      subject, 
      customerName, 
      name,         
      phone, 
      email, 
      address,      
      plan,         
      message       
    } = req.body;

    // 2. Normalize the name
    const leadName = customerName || name || "New Website Lead";

    // 3. Build the HTML email
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 24px; text-align: center;">
          <h2 style="color: #f97316; margin: 0; text-transform: uppercase; letter-spacing: 2px;">New System Enquiry</h2>
        </div>
        <div style="padding: 32px; background-color: #ffffff; color: #334155; line-height: 1.6;">
          <p><strong>Client Name:</strong> ${leadName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
    `;

    if (plan) {
      htmlContent += `<p><strong>Selected Package:</strong> <span style="color: #f97316; font-weight: bold;">${plan}</span></p>`;
    }
    if (address) {
      htmlContent += `<p><strong>Installation Site:</strong> ${address}</p>`;
    }
    if (message) {
      htmlContent += `<p><strong>Project Requirements:</strong><br/> <span style="color: #475569;">${message}</span></p>`;
    }

    htmlContent += `
        </div>
        <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
          Automated transmission from Ixora Tech Web Platform
        </div>
      </div>
    `;

    // 4. Send to Brevo
    // Node.js 18+ has fetch built-in, so this will work natively
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: { 
          email: "no-reply@protechautomationsolar.com", // Must be verified in Brevo
          name: "Ixora Tech Portal" 
        },
        to: [{ 
          email: targetEmail, // Routes to info@protechautomationsolar.com
          name: "Protech Engineering" 
        }],
        replyTo: { 
          email: email, 
          name: leadName 
        },
        subject: subject,
        htmlContent: htmlContent
      })
    });

    const responseData = await brevoResponse.json();

    if (!brevoResponse.ok) {
      console.error("Brevo API Error:", responseData);
      return res.status(400).json({ success: false, message: 'Mail provider rejected the payload.' });
    }

    res.status(200).json({ success: true, message: 'Enquiry transmitted successfully.' });

  } catch (error) {
    console.error("Backend Transmission Error:", error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};