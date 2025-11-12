import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactData {
  nom: string;
  email: string;
  telephone?: string;
  entreprise?: string;
  type_projet: string;
  budget?: string;
  delai_souhaite?: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { contactData }: { contactData: ContactData } = await req.json()

    // Préparer le contenu de l'email
    const emailSubject = '🆕 Nouvelle demande de contact via le site GND Consulting'
    
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🆕 Nouvelle Demande de Contact</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Site GND Consulting</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #1e293b; margin-bottom: 20px; font-size: 20px;">📋 Détails de la demande :</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #3b82f6;">👤 Nom :</strong> 
            <span style="color: #475569;">${contactData.nom}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #3b82f6;">📧 Email :</strong> 
            <a href="mailto:${contactData.email}" style="color: #8b5cf6; text-decoration: none;">${contactData.email}</a>
          </div>
          
          ${contactData.telephone ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #3b82f6;">📱 Téléphone :</strong> 
            <a href="tel:${contactData.telephone}" style="color: #8b5cf6; text-decoration: none;">${contactData.telephone}</a>
          </div>
          ` : ''}
          
          ${contactData.entreprise ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #3b82f6;">🏢 Entreprise :</strong> 
            <span style="color: #475569;">${contactData.entreprise}</span>
          </div>
          ` : ''}
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #3b82f6;">🎯 Type de projet :</strong> 
            <span style="color: #475569; background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-weight: 500;">${contactData.type_projet}</span>
          </div>
          
          ${contactData.budget ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #3b82f6;">💰 Budget estimé :</strong> 
            <span style="color: #475569; background: #ecfdf5; padding: 4px 8px; border-radius: 6px; font-weight: 500;">${contactData.budget}</span>
          </div>
          ` : ''}
          
          ${contactData.delai_souhaite ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #3b82f6;">⏰ Délai souhaité :</strong> 
            <span style="color: #475569; background: #fef3c7; padding: 4px 8px; border-radius: 6px; font-weight: 500;">${contactData.delai_souhaite}</span>
          </div>
          ` : ''}
          
          <div style="margin-top: 25px; padding: 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <strong style="color: #3b82f6; display: block; margin-bottom: 10px;">💬 Message :</strong>
            <p style="color: #475569; line-height: 1.6; margin: 0; white-space: pre-wrap;">${contactData.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%); border-radius: 8px; text-align: center;">
            <p style="color: #1e293b; margin: 0; font-size: 14px;">
              📅 <strong>Reçu le :</strong> ${new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          
          <div style="margin-top: 25px; text-align: center;">
            <a href="mailto:${contactData.email}" 
               style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); 
                      color: white; 
                      padding: 12px 24px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold;
                      display: inline-block;">
              📧 Répondre au client
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 12px;">
          <p>Email automatique généré par le site GND Consulting</p>
        </div>
      </div>
    `

    // Simuler l'envoi d'email (remplacer par votre service d'email réel)
    console.log('📧 Email à envoyer à gnd63consulting@gmail.com:')
    console.log('Sujet:', emailSubject)
    console.log('Corps:', emailBody)

    // Ici vous pouvez intégrer votre service d'email préféré :
    // - Resend
    // - SendGrid  
    // - SMTP
    // - etc.

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email envoyé avec succès',
        emailSent: true 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Erreur envoi email:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Erreur lors de l\'envoi de l\'email',
        emailSent: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
