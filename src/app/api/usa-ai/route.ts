import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('📥 Payload recebido na API /api/usa-ai:', JSON.stringify(body, null, 2));
    
    // Debug: verificar campos obrigatórios
    const requiredFields = [
      'firstName', 'lastName', 'email', 'country', 'phone', 'service',
      'migrateTo', 'academicBackground', 'occupation', 'leadSource',
      'subSource', 'language', 'nationality', 'annualIncome',
      'timeExperience', 'contactChannel'
    ];
    
    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      console.log('❌ Campos obrigatórios faltando:', missingFields);
    }
    
    // Verificação de campos obrigatórios básicos
    if (!body.firstName || !body.lastName || !body.email) {
      console.log('❌ Campos básicos faltando:', { firstName: !!body.firstName, lastName: !!body.lastName, email: !!body.email });
      return NextResponse.json(
        { message: "Missing required fields: firstName, lastName, email" },
        { status: 400 }
      );
    }

    let salesForceId;

    // Check if a specific seller ID was provided
    if (body.sellerId) {
      // Fetch seller data directly using the seller ID
      const sellerResponse = await fetch(
        `https://api.yellowvisa.com/api/get-seller/${body.sellerId}`,
        {
          method: "GET",
        }
      );

      if (!sellerResponse.ok) {
        return NextResponse.json(
          { message: `Failed to fetch seller with ID ${body.sellerId}` },
          { status: 404 }
        );
      }

      const sellerData = await sellerResponse.json();
      salesForceId = body.sellerId; // Use the provided seller ID directly
    } else {
      // Requisição para obter o lead owner based on language (original behavior)
      const leadOwnerResponse = await fetch(
        `https://api.yellowvisa.com/api/sellers?language=${body.language}`,
        {
          method: "GET",
        }
      );

      const resJsonOwner = await leadOwnerResponse.json();

      console.log('Lead owner response:', resJsonOwner);

      if (leadOwnerResponse.status !== 200) {
        return NextResponse.json(
          { message: "No lead owner found or failed to fetch" },
          { status: 404 }
        );
      }

      salesForceId = resJsonOwner.salesForceId;
    }

    // Garantir que todos os campos tenham valores válidos
    const payload = {
      firstName: body.firstName || '',
      lastName: body.lastName || '',
      email: body.email || '',
      country: body.country || 'USA',
      phone: body.phone || '',
      service: body.service || 'Visto Temporario de Trabalho',
      migrateTo: body.migrateTo || 'USA',
      academicBackground: body.academicBackground || 'Baccalaureate Degree (Nivel Superior / Bacharelado)',
      occupation: body.occupation || 'Professional',
      leadOwner: salesForceId,
      leadSource: body.leadSource || 'Website',
      subSource: body.subSource || 'AI Form',
      language: body.language || 'English - Ingles',
      nationality: body.nationality || 'USA',
      refer: body.refer || '',
      utm: body.utm || '',
      source: body.source || '',
      medium: body.medium || '',
      term: body.term || '',
      moreInfo: body.additionalInfo || 'Adultos',
      annualIncome: body.annualIncome || '$50,000 to $199,999',
      timeExperience: body.timeExperience || 'From 5 to 10 years',
      whatsapp: Boolean(body.whatsapp),
      contactChannel: body.contactChannel || 'Contact by email',
    };

    // Envio dos dados para a nova API
    const baseUrl = process.env.NEXT_PUBLIC_URL_API || 'https://api.yellowvisa.com/api';
    const endpoint = `${baseUrl}/usa`;
    const apiToken = process.env.YELLOW_VISA_API_TOKEN || "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a";
    
    console.log('🔑 Token sendo usado:', apiToken.substring(0, 10) + '...');
    console.log('🎯 Endpoint:', endpoint);
    console.log('📤 Payload para API externa:', JSON.stringify(payload, null, 2));
    
    const responseNewApi = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Api-Token": apiToken,
      },
      body: JSON.stringify(payload),
    });

    const responseData = await responseNewApi.json();

    // Sucesso - não importa o status da API externa
    return NextResponse.json(responseData, { status: 200 });
    
  } catch (error) {
    console.error('❌ Erro na API /api/usa-ai:', error);
    
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}
