import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    
    // Verificação de campos obrigatórios básicos
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        { message: "Missing required fields: firstName, lastName, email" },
        { status: 400 }
      );
    }

    let salesForceId;
    let sellerPhone;
    const championId = body.championId; // Capturar championId do body

    // Check if a specific seller ID was provided via URL parameter
    if (body.sellerId) {
      // Fetch seller data directly using the seller ID (SEM ROLETA)
      const sellerResponse = await fetch(
        `https://api.yellowvisa.com/api/get-seller/${body.sellerId}`,
        {
          method: "GET",
        }
      );

      if (sellerResponse.ok) {
        const sellerData = await sellerResponse.json();
        salesForceId = body.sellerId;
        sellerPhone = sellerData.phone; // Capturar phone do seller
      }
    } else {
      // Requisição para obter o lead owner based on language (COM ROLETA)
      const leadOwnerResponse = await fetch(
        `https://api.yellowvisa.com/api/sellers?language=${body.language}`,
        {
          method: "GET",
        }
      );

      if (leadOwnerResponse.ok) {
        const resJsonOwner = await leadOwnerResponse.json();
        salesForceId = resJsonOwner.salesForceId;
        
        // Buscar também o phone do seller selecionado pela roleta
        const sellerPhoneResponse = await fetch(
          `https://api.yellowvisa.com/api/get-seller/${salesForceId}`,
          { method: "GET" }
        );
        
        if (sellerPhoneResponse.ok) {
          const sellerPhoneData = await sellerPhoneResponse.json();
          sellerPhone = sellerPhoneData.phone;
        }
      }
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
      refer: championId || body.refer || '', // Champion tem prioridade
      utm: body.utm || '',
      source: body.source || '',
      medium: body.medium || '',
      term: body.term || '',
      campaign: body.campaign || '',
      moreInfo: body.additionalInfo || '',
      annualIncome: body.annualIncome || '$50,000 to $199,999',
      timeExperience: body.timeExperience || 'From 5 to 10 years',
      whatsapp: Boolean(body.whatsapp),
      contactChannel: body.contactChannel || 'Contact by email',
    };

    // Envio dos dados para a nova API
    const baseUrl = process.env.NEXT_PUBLIC_URL_API || 'https://api.yellowvisa.com/api';
    const endpoint = `${baseUrl}/usa`;
    const apiToken = process.env.YELLOW_VISA_API_TOKEN || "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a";
    
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
    // Adicionar sellerPhone na resposta para o frontend usar
    return NextResponse.json({ 
      ...responseData, 
      sellerPhone: sellerPhone 
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}
