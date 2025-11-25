import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // ===========================================
  // BLOG POSTS
  // ===========================================
  console.log('📝 Criando posts do blog...');

  // Limpar posts duplicados (manter apenas o mais recente de cada slug)
  console.log('🧹 Limpando posts duplicados...');
  await prisma.$executeRaw`
    DELETE FROM blog_posts
    WHERE id NOT IN (
      SELECT DISTINCT ON (slug) id
      FROM blog_posts
      ORDER BY slug, created_at DESC
    )
  `;

  // Helper function para criar ou atualizar posts sem campos que não existem no banco
  async function upsertBlogPost(slug: string, data: {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    category?: string;
    status: string;
    isFeatured: boolean;
    publishedAt: Date;
    metaTitle: string;
    metaDescription: string;
    tags: string;
  }) {
    // Verificar se existe post com este slug
    const existing = await prisma.$queryRaw<Array<{ id: string }>>`
      SELECT id FROM blog_posts WHERE slug = ${slug} LIMIT 1
    `;

    if (existing.length > 0) {
      // Atualizar post existente
      await prisma.$executeRaw`
        UPDATE blog_posts 
        SET title = ${data.title},
            content = ${data.content},
            excerpt = ${data.excerpt},
            category = ${data.category || null},
            status = ${data.status},
            updated_at = NOW()
        WHERE slug = ${slug}
      `;
      return { id: existing[0].id, ...data };
    } else {
      // Criar novo post
      await prisma.$executeRaw`
        INSERT INTO blog_posts (id, title, slug, content, excerpt, category, status, created_at, updated_at)
        VALUES (gen_random_uuid(), ${data.title}, ${data.slug}, ${data.content}, ${data.excerpt}, ${data.category || null}, ${data.status}, NOW(), NOW())
      `;
      return { id: '', ...data };
    }
  }

  const blogPost1 = await upsertBlogPost('top-5-mitos-morar-eua-legalmente', {
    title: 'Top 5 mitos sobre morar nos EUA legalmente',
    slug: 'top-5-mitos-morar-eua-legalmente',
    content: `<div style="max-width: 800px; margin: 0 auto; line-height: 1.8; color: #333; padding: 20px;">
  <p style="font-size: 18px; margin-bottom: 40px; color: #555; line-height: 1.9;">Quando o assunto é imigração para os Estados Unidos, muitas informações incorretas circulam e acabam desencorajando brasileiros que têm potencial para conseguir um visto ou Green Card. Neste artigo, vamos desmistificar os 5 principais mitos sobre morar legalmente nos EUA e mostrar que o sonho americano pode estar mais próximo do que você imagina.</p>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Mito 1: "É impossível conseguir visto sem ter um parente nos EUA"</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">Este é talvez o mito mais comum e prejudicial. Muitos brasileiros acreditam que só é possível imigrar para os Estados Unidos através de parentesco, mas a realidade é bem diferente.</p>
    <p style="margin-bottom: 25px; line-height: 1.9;">Existem diversas categorias de visto que não dependem de parentesco:</p>
    <ul style="margin: 25px 0; padding-left: 30px; line-height: 1.9;">
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">EB-2 NIW (National Interest Waiver):</strong> Para profissionais com habilidades excepcionais cujo trabalho beneficia os interesses nacionais dos EUA. Não requer oferta de emprego.</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">EB-1A:</strong> Para pessoas com habilidades extraordinárias em ciências, artes, educação, negócios ou atletismo.</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">H-1B:</strong> Visto de trabalho temporário para profissionais especializados.</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">L-1:</strong> Para executivos, gerentes ou funcionários com conhecimento especializado transferidos de empresas multinacionais.</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">O-1:</strong> Para indivíduos com habilidades extraordinárias ou conquistas notáveis.</li>
    </ul>
    <p style="margin-bottom: 0; font-weight: 600; line-height: 1.9; color: #1a1a1a;">Na verdade, a maioria dos brasileiros que consegue residência permanente nos EUA não tem parentes americanos.</p>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Mito 2: "Preciso ser milionário para conseguir um Green Card"</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">Embora o visto EB-5 (investidor) exija um investimento significativo (a partir de $800.000), esta é apenas uma das muitas opções disponíveis.</p>
    <p style="margin-bottom: 0; line-height: 1.9;">A maioria dos brasileiros que consegue residência permanente nos EUA não são milionários. Profissionais qualificados, pesquisadores, professores, artistas e pessoas com habilidades excepcionais podem obter o Green Card sem investir grandes quantias. O importante é demonstrar seu valor através de suas qualificações, experiência e contribuições potenciais para os Estados Unidos.</p>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Mito 3: "O processo leva décadas"</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">Dependendo da categoria de visto escolhida, o processo pode ser muito mais rápido do que se imagina:</p>
    <ul style="margin: 25px 0; padding-left: 30px; line-height: 1.9;">
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">EB-1A:</strong> Pode ser aprovado em menos de um ano, com processamento premium disponível.</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">EB-2 NIW:</strong> Tempos de processamento relativamente rápidos quando bem documentado (geralmente entre 12 a 24 meses).</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">EB-1B (pesquisadores/professores):</strong> Processamento acelerado disponível.</li>
    </ul>
    <p style="margin-bottom: 0; line-height: 1.9;">O tempo de processamento varia muito dependendo da categoria, da qualidade da documentação e da estratégia utilizada. Com orientação adequada, muitos processos podem ser concluídos em tempo muito menor do que o imaginado.</p>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Mito 4: "Preciso falar inglês perfeitamente"</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">Embora o inglês seja importante e facilite a adaptação, não é necessário ser fluente para iniciar o processo de imigração. Muitos profissionais conseguem aprovação e melhoram o idioma durante o processo ou após chegar aos EUA.</p>
    <p style="margin-bottom: 0; line-height: 1.9;">O que realmente importa é demonstrar suas qualificações profissionais, experiência e o valor que você pode agregar aos Estados Unidos. Para algumas categorias de visto, como EB-1A e EB-2 NIW, a fluência em inglês não é um requisito formal.</p>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Mito 5: "Só engenheiros e médicos conseguem visto"</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">Embora essas profissões tenham alta demanda, não são as únicas com oportunidades. Profissionais de diversas áreas podem se qualificar:</p>
    <ul style="margin: 25px 0; padding-left: 30px; line-height: 1.9;">
      <li style="margin-bottom: 15px; padding-left: 10px;">Professores e pesquisadores acadêmicos</li>
      <li style="margin-bottom: 15px; padding-left: 10px;">Artistas, músicos e atletas</li>
      <li style="margin-bottom: 15px; padding-left: 10px;">Empresários e empreendedores</li>
      <li style="margin-bottom: 15px; padding-left: 10px;">Profissionais de tecnologia e ciência</li>
      <li style="margin-bottom: 15px; padding-left: 10px;">Pessoas com experiência excepcional em suas áreas, mesmo sem formação superior tradicional</li>
    </ul>
    <p style="margin-bottom: 0; line-height: 1.9;">O importante é entender que cada caso é único e que existem múltiplos caminhos para a residência permanente nos Estados Unidos. Com a orientação adequada de profissionais experientes e documentação correta, muitos brasileiros têm conseguido realizar o sonho americano, independentemente de sua área de atuação.</p>
  </div>

  <div style="margin: 50px 0; padding: 35px; background: #fff3e0; border-radius: 8px; border: 2px solid #ff6b35; box-shadow: 0 4px 12px rgba(255,107,53,0.15);">
    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #1a1a1a; line-height: 1.8;">Se você está considerando imigrar para os EUA, não deixe que mitos e informações incorretas te desencorajem. O primeiro passo é fazer uma avaliação profissional do seu perfil para identificar as melhores opções disponíveis para o seu caso específico.</p>
  </div>
</div>`,
    excerpt: 'Descubra os principais mitos que impedem brasileiros de realizar o sonho americano e como superá-los.',
    category: 'NOTÍCIAS',
      status: 'published',
    isFeatured: true,
    publishedAt: new Date('2025-01-11'),
    metaTitle: 'Top 5 mitos sobre morar nos EUA legalmente | Yellow Visa',
    metaDescription: 'Descubra os principais mitos que impedem brasileiros de realizar o sonho americano e aprenda como superá-los com informações reais sobre imigração.',
    tags: 'imigração, EUA, green card, visto, mitos'
  });

  const blogPost2 = await upsertBlogPost('minnesota-frio-esquentar-imigracao', {
    title: 'Minnesota | O frio que pode esquentar sua imigração',
    slug: 'minnesota-frio-esquentar-imigracao',
    content: `<div style="max-width: 800px; margin: 0 auto; line-height: 1.8; color: #333; padding: 20px;">
  <p style="font-size: 18px; margin-bottom: 40px; color: #555; line-height: 1.9;">Quando pensamos em imigração para os Estados Unidos, cidades como Nova York, Miami, Los Angeles e San Francisco geralmente vêm à mente primeiro. No entanto, Minnesota, conhecido como "A Terra dos 10.000 Lagos", está se tornando um destino cada vez mais atrativo para profissionais brasileiros que buscam qualidade de vida, oportunidades de carreira e um caminho mais acessível para o Green Card.</p>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Por que considerar Minnesota?</h2>
    <p style="margin-bottom: 0; line-height: 1.9;">Minnesota pode não ser o primeiro destino que vem à mente, mas o estado oferece uma combinação única de fatores que muitos brasileiros ainda não descobriram. Com uma economia diversificada e forte, baixa taxa de desemprego (geralmente abaixo da média nacional) e qualidade de vida consistentemente classificada entre as melhores do país, Minnesota representa uma oportunidade real para quem está disposto a pensar fora da caixa.</p>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Oportunidades de Trabalho e Carreira</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">O estado é lar de algumas das maiores e mais respeitadas empresas dos Estados Unidos:</p>
    <ul style="margin: 25px 0; padding-left: 30px; line-height: 1.9;">
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Target Corporation:</strong> Uma das maiores redes de varejo do país</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">3M:</strong> Multinacional de tecnologia e inovação</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Best Buy:</strong> Líder em eletrônicos e tecnologia</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">UnitedHealth Group:</strong> Maior empresa de saúde dos EUA</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">General Mills:</strong> Gigante da indústria alimentícia</li>
    </ul>
    <p style="margin-bottom: 0; line-height: 1.9;">A área de tecnologia também está em forte crescimento, especialmente na região metropolitana de Minneapolis-Saint Paul. O ecossistema de startups e empresas de tecnologia está se expandindo rapidamente, criando oportunidades significativas para profissionais de TI, engenharia de software, ciência de dados e áreas relacionadas.</p>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Qualidade de Vida Excepcional</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">Minnesota consistentemente aparece no topo dos rankings nacionais de qualidade de vida. O estado oferece:</p>
    <ul style="margin: 25px 0; padding-left: 30px; line-height: 1.9;">
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Educação de excelência:</strong> Sistema educacional público e privado reconhecido nacionalmente</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Segurança:</strong> Baixos índices de criminalidade comparados a outras grandes áreas metropolitanas</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Custo de vida:</strong> Significativamente mais acessível do que cidades como Nova York, San Francisco ou Boston</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Infraestrutura:</strong> Excelente sistema de transporte, saúde e serviços públicos</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Natureza:</strong> Abundância de parques, lagos e espaços ao ar livre</li>
    </ul>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Comunidade Brasileira em Crescimento</h2>
    <p style="margin-bottom: 0; line-height: 1.9;">Apesar do clima frio (que pode ser um desafio inicial), a comunidade brasileira em Minnesota está crescendo constantemente. Existem grupos de apoio, associações culturais, restaurantes brasileiros autênticos e eventos regulares que ajudam na adaptação e criam um senso de comunidade. A presença brasileira está se tornando mais visível, especialmente nas áreas de tecnologia e saúde.</p>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Vistos e Caminhos para o Green Card</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">Profissionais qualificados podem encontrar oportunidades através de:</p>
    <ul style="margin: 25px 0; padding-left: 30px; line-height: 1.9;">
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Visto H-1B:</strong> Para profissionais especializados, com muitas empresas dispostas a patrocinar</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">EB-2 e EB-3:</strong> Transição para Green Card através de patrocínio empregatício</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">EB-2 NIW:</strong> Para profissionais com habilidades excepcionais que beneficiam o interesse nacional</li>
    </ul>
    <p style="margin-bottom: 0; line-height: 1.9;">A demanda por profissionais qualificados no estado, especialmente em tecnologia, saúde e engenharia, facilita significativamente o processo de patrocínio para Green Card. Muitas empresas estão dispostas a investir no processo de imigração de profissionais talentosos.</p>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">O Clima: Um Desafio que Vale a Pena</h2>
    <p style="margin-bottom: 0; line-height: 1.9;">É verdade que os invernos em Minnesota são rigorosos, com temperaturas que podem chegar a -30°C. No entanto, os moradores se adaptam rapidamente, e o estado está preparado para o frio com excelente infraestrutura, sistemas de aquecimento eficientes e uma cultura que abraça as atividades de inverno. Os verões são agradáveis, com temperaturas amenas e muitos dias de sol.</p>
  </div>

  <div style="margin: 50px 0; padding: 35px; background: #fff3e0; border-radius: 8px; border: 2px solid #ff6b35; box-shadow: 0 4px 12px rgba(255,107,53,0.15);">
    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #1a1a1a; line-height: 1.8;">Se você está disposto a enfrentar os invernos rigorosos em troca de qualidade de vida, oportunidades de carreira e um caminho mais acessível para a residência permanente, Minnesota pode ser o lugar perfeito para construir uma nova vida nos Estados Unidos.</p>
  </div>
</div>`,
    excerpt: 'Conheça as oportunidades únicas que Minnesota oferece para imigrantes brasileiros.',
    category: 'DICAS DE DESTINO',
      status: 'published',
    isFeatured: false,
    publishedAt: new Date('2025-01-09'),
    metaTitle: 'Minnesota | O frio que pode esquentar sua imigração | Yellow Visa',
    metaDescription: 'Descubra por que Minnesota está se tornando um destino atrativo para imigrantes brasileiros, com oportunidades de trabalho e qualidade de vida.',
    tags: 'Minnesota, EUA, imigração, destino, trabalho'
  });

  const blogPost3 = await upsertBlogPost('checklist-documentos-portugal', {
    title: 'Checklist de documentos para Portugal',
    slug: 'checklist-documentos-portugal',
    content: `<div style="max-width: 800px; margin: 0 auto; line-height: 1.8; color: #333; padding: 20px;">
  <p style="font-size: 18px; margin-bottom: 40px; color: #555; line-height: 1.9;">Organizar a documentação necessária para imigrar para Portugal pode parecer uma tarefa complexa, mas com planejamento adequado e uma lista bem estruturada, o processo se torna muito mais simples. Este checklist completo vai te ajudar a garantir que você tenha todos os documentos necessários antes de iniciar seu processo de visto.</p>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Documentos Pessoais Essenciais</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">Estes são os documentos básicos que todo imigrante precisa ter em ordem:</p>
    <ul style="margin: 25px 0; padding-left: 30px; line-height: 1.9;">
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Passaporte válido:</strong> Com pelo menos 6 meses de validade restantes a partir da data prevista de entrada em Portugal</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Certidão de nascimento:</strong> Deve ser apostilada pela Convenção de Haia</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Certidão de casamento:</strong> Se aplicável, também precisa ser apostilada</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Certidão de óbito do cônjuge:</strong> Se você é viúvo(a), precisa da certidão apostilada</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">RG ou CNH:</strong> Para identificação adicional</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">CPF:</strong> Cadastro de Pessoa Física brasileiro</li>
    </ul>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Documentos de Formação e Profissional</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">Para comprovar sua qualificação profissional e acadêmica:</p>
    <ul style="margin: 25px 0; padding-left: 30px; line-height: 1.9;">
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Diplomas e certificados:</strong> Todos os diplomas de graduação, pós-graduação e cursos relevantes, apostilados e traduzidos</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Histórico escolar:</strong> Históricos acadêmicos completos, apostilados e traduzidos</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Carteira de trabalho:</strong> Ou comprovantes de experiência profissional (contratos, holerites, declarações)</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Cartas de recomendação:</strong> De empregadores anteriores, especialmente se você está buscando visto de trabalho</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Portfólio profissional:</strong> Se aplicável à sua área (design, arquitetura, etc.)</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Registros profissionais:</strong> Se você tem registro em conselhos profissionais (CRM, CREA, OAB, etc.)</li>
    </ul>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Documentos Financeiros</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">Essenciais para comprovar sua situação financeira:</p>
    <ul style="margin: 25px 0; padding-left: 30px; line-height: 1.9;">
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Extratos bancários:</strong> Dos últimos 6 a 12 meses de todas as contas bancárias</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Comprovante de renda:</strong> Holerites dos últimos 6 meses ou declaração de imposto de renda</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Comprovante de investimento:</strong> Se aplicando para Golden Visa ou visto D7</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Comprovante de aposentadoria:</strong> Se você é aposentado, precisa dos comprovantes de pagamento</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Extratos de investimentos:</strong> Ações, fundos, aplicações financeiras</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Comprovante de propriedades:</strong> Se você possui imóveis no Brasil</li>
    </ul>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Documentos de Saúde</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">Requisitos de saúde para entrada em Portugal:</p>
    <ul style="margin: 25px 0; padding-left: 30px; line-height: 1.9;">
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Atestado médico geral:</strong> Com declaração de que você não possui doenças contagiosas</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Cartão de vacinação:</strong> Com todas as vacinas em dia</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Seguro saúde internacional:</strong> Válido para Portugal, com cobertura mínima de €30.000</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Exames médicos:</strong> Alguns vistos podem exigir exames específicos</li>
    </ul>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 30px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Documentos por Tipo de Visto</h2>
    
    <div style="margin-bottom: 35px; padding: 25px; background: #ffffff; border-radius: 4px; border: 1px solid #e0e0e0;">
      <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 22px; color: #ff6b35; line-height: 1.3;">Visto D7 (Rendimentos Próprios)</h3>
      <p style="margin-bottom: 20px; line-height: 1.9;">Ideal para aposentados ou pessoas com rendimentos passivos:</p>
      <ul style="margin: 20px 0; padding-left: 30px; line-height: 1.9;">
        <li style="margin-bottom: 12px; padding-left: 10px;">Comprovante de rendimentos passivos (pensão, aluguéis, dividendos, royalties)</li>
        <li style="margin-bottom: 12px; padding-left: 10px;">Comprovante de alojamento em Portugal (contrato de aluguel ou compra)</li>
        <li style="margin-bottom: 12px; padding-left: 10px;">Extratos bancários comprovando rendimentos regulares</li>
        <li style="margin-bottom: 12px; padding-left: 10px;">Declaração de compromisso de não exercer atividade profissional remunerada em Portugal</li>
      </ul>
    </div>

    <div style="margin-bottom: 35px; padding: 25px; background: #ffffff; border-radius: 4px; border: 1px solid #e0e0e0;">
      <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 22px; color: #ff6b35; line-height: 1.3;">Golden Visa (Visto de Investimento)</h3>
      <p style="margin-bottom: 20px; line-height: 1.9;">Para investidores que desejam residência através de investimento:</p>
      <ul style="margin: 20px 0; padding-left: 30px; line-height: 1.9;">
        <li style="margin-bottom: 12px; padding-left: 10px;">Comprovante de investimento de €500.000 em imóvel (ou €350.000 em área de renovação urbana)</li>
        <li style="margin-bottom: 12px; padding-left: 10px;">Extrato bancário comprovando origem dos fundos</li>
        <li style="margin-bottom: 12px; padding-left: 10px;">Contrato de compra e venda do imóvel</li>
        <li style="margin-bottom: 12px; padding-left: 10px;">Certidão do registo predial</li>
        <li style="margin-bottom: 12px; padding-left: 10px;">Comprovante de transferência dos fundos para Portugal</li>
      </ul>
    </div>

    <div style="padding: 25px; background: #ffffff; border-radius: 4px; border: 1px solid #e0e0e0;">
      <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 22px; color: #ff6b35; line-height: 1.3;">Visto de Trabalho</h3>
      <p style="margin-bottom: 20px; line-height: 1.9;">Para profissionais com oferta de emprego em Portugal:</p>
      <ul style="margin: 20px 0; padding-left: 30px; line-height: 1.9;">
        <li style="margin-bottom: 12px; padding-left: 10px;">Contrato de trabalho ou promessa de contrato</li>
        <li style="margin-bottom: 12px; padding-left: 10px;">Autorização de trabalho do IEFP (Instituto do Emprego e Formação Profissional)</li>
        <li style="margin-bottom: 12px; padding-left: 10px;">Comprovante de qualificações profissionais</li>
        <li style="margin-bottom: 12px; padding-left: 10px;">Comprovante de que a vaga não pode ser preenchida por cidadão português ou da UE</li>
      </ul>
    </div>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Dicas Importantes para Organização</h2>
    <ul style="margin: 25px 0; padding-left: 30px; line-height: 1.9;">
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Apostilamento:</strong> Todos os documentos brasileiros precisam ser apostilados pela Convenção de Haia. O processo pode ser feito online ou presencialmente nos cartórios autorizados.</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Tradução:</strong> Documentos em português do Brasil devem ser traduzidos para português de Portugal por tradutor juramentado reconhecido em Portugal.</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Organização:</strong> Mantenha cópias de todos os documentos e organize-os em pastas separadas por categoria. Tenha também versões digitalizadas.</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Validade:</strong> Alguns documentos têm validade limitada (geralmente 3 a 6 meses), então verifique as datas antes de iniciar o processo.</li>
      <li style="margin-bottom: 15px; padding-left: 10px;"><strong style="color: #ff6b35; font-size: 16px;">Original e cópias:</strong> Prepare tanto os originais quanto cópias autenticadas de todos os documentos importantes.</li>
    </ul>
  </div>

  <div style="margin: 50px 0; padding: 35px; background: #fff3e0; border-radius: 8px; border: 2px solid #ff6b35; box-shadow: 0 4px 12px rgba(255,107,53,0.15);">
    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #1a1a1a; line-height: 1.8;">Lembre-se: cada caso é único e pode exigir documentos adicionais dependendo da sua situação específica. É sempre recomendável consultar um profissional especializado em imigração para Portugal para garantir que você tenha toda a documentação necessária para o seu caso.</p>
  </div>
</div>`,
      excerpt: 'Lista completa de documentos necessários para se mudar para Portugal.',
      category: 'NOTÍCIAS',
      status: 'published',
      isFeatured: false,
    publishedAt: new Date('2025-01-07'),
    metaTitle: 'Checklist completo de documentos para imigrar para Portugal | Yellow Visa',
    metaDescription: 'Lista completa e organizada de todos os documentos necessários para se mudar para Portugal, incluindo apostilamento e tradução.',
    tags: 'Portugal, documentos, checklist, imigração, visto'
  });

  const blogPost4 = await upsertBlogPost('carlos-marcia-sonho-realidade', {
    title: 'Carlos e Marcia | Nosso sonho virou realidade',
    slug: 'carlos-marcia-sonho-realidade',
    content: `<div style="max-width: 800px; margin: 0 auto; line-height: 1.8; color: #333; padding: 20px;">
  <p style="font-size: 18px; margin-bottom: 40px; color: #555; line-height: 1.9;">Esta é a história inspiradora de Carlos e Marcia, um casal de engenheiros brasileiros que transformou um encontro casual em uma nova vida nos Estados Unidos. Sua jornada mostra que com determinação, planejamento adequado e a orientação certa, é possível realizar o sonho de imigrar legalmente para os EUA.</p>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Um Encontro que Mudou Tudo</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">Carlos e Marcia se conheceram durante uma conferência de tecnologia em San Francisco, em 2021. Marcia estava nos Estados Unidos com visto F-1 (estudante), cursando mestrado em Ciência da Computação na prestigiosa Stanford University. Carlos, engenheiro de software formado pela USP, estava visitando o Vale do Silício para uma série de entrevistas de emprego.</p>
    <div style="margin: 25px 0; padding: 20px; background: #ffffff; border-radius: 4px; border-left: 3px solid #ff6b35;">
      <p style="margin: 0; font-style: italic; line-height: 1.9; color: #555;">"Foi um encontro completamente casual", relembra Marcia. "Estávamos ambos no coffee break da conferência, conversando sobre as últimas tendências em inteligência artificial. Nunca imaginei que aquele momento mudaria completamente o rumo das nossas vidas."</p>
    </div>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">O Início da Jornada</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">Após 6 meses de relacionamento à distância, com Carlos ainda no Brasil e Marcia em Stanford, as coisas começaram a se encaixar. Carlos recebeu uma oferta de trabalho na mesma empresa de tecnologia onde Marcia fazia estágio como engenheira de software.</p>
    <div style="margin: 25px 0; padding: 20px; background: #ffffff; border-radius: 4px; border-left: 3px solid #ff6b35;">
      <p style="margin: 0; font-style: italic; line-height: 1.9; color: #555;">"Foi uma oportunidade única", explica Carlos. "A empresa não só ofereceu uma posição interessante, mas também se comprometeu a patrocinar meu visto H-1B. Com o apoio deles e a orientação de profissionais especializados em imigração, o processo foi muito mais tranquilo do que eu imaginava."</p>
    </div>
    <p style="margin-top: 20px; margin-bottom: 0; line-height: 1.9;">Com o patrocínio da empresa, Carlos conseguiu o visto H-1B e se mudou para os Estados Unidos em 2022. "Foi um momento decisivo", conta Marcia. "Conseguimos estar juntos e nos apoiar mutuamente durante todo o processo."</p>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">O Processo de Imigração</h2>
    <div style="margin: 25px 0; padding: 20px; background: #ffffff; border-radius: 4px; border-left: 3px solid #ff6b35;">
      <p style="margin: 0; font-style: italic; line-height: 1.9; color: #555;">"O processo foi desafiador, mas tínhamos orientação adequada desde o início", conta Carlos. "A empresa nos ajudou com toda a documentação necessária e o processo de visto. Em 8 meses estávamos morando juntos em Mountain View, Califórnia, no coração do Vale do Silício."</p>
    </div>
    <p style="margin-top: 20px; margin-bottom: 0; line-height: 1.9;">Após 1 ano com visto H-1B, a empresa iniciou o processo de patrocínio para Green Card através da categoria EB-2. "Foi um processo longo, mas valeu a pena", diz Marcia. "Ter uma empresa que realmente investe no seu futuro faz toda a diferença."</p>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Vida nos Estados Unidos</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">Hoje, ambos são residentes permanentes (Green Card) e trabalham como engenheiros sênior em uma das maiores empresas de tecnologia do mundo. Eles se casaram em 2023 em uma cerimônia íntima em Napa Valley e planejam ter filhos em breve.</p>
    <div style="margin: 25px 0; padding: 20px; background: #ffffff; border-radius: 4px; border-left: 3px solid #ff6b35;">
      <p style="margin: 0; font-style: italic; line-height: 1.9; color: #555;">"A vida aqui é completamente diferente do que tínhamos no Brasil", explica Marcia. "Não só em termos financeiros, mas também na qualidade de vida, nas oportunidades de crescimento profissional e na segurança que sentimos."</p>
    </div>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">O Sonho Realizado</h2>
    <div style="margin: 25px 0; padding: 20px; background: #ffffff; border-radius: 4px; border-left: 3px solid #ff6b35;">
      <p style="margin: 0; font-style: italic; line-height: 1.9; color: #555;">"O processo de imigração foi desafiador, mas valeu cada momento", conta Marcia emocionada. "Hoje temos uma vida que nunca imaginamos possível no Brasil. Temos estabilidade financeira, qualidade de vida excepcional e a oportunidade de crescer profissionalmente em um ambiente que valoriza nossa expertise e investe no nosso desenvolvimento."</p>
    </div>
    <div style="margin: 25px 0; padding: 20px; background: #ffffff; border-radius: 4px; border-left: 3px solid #ff6b35;">
      <p style="margin: 0; font-style: italic; line-height: 1.9; color: #555;">Carlos complementa: "O mais importante foi não desistir quando as coisas ficaram difíceis. Muitas vezes pensamos em voltar para o Brasil, especialmente nos primeiros meses, mas sabíamos que estávamos no caminho certo. Hoje não nos arrependemos de nada. Cada desafio que enfrentamos nos tornou mais fortes."</p>
    </div>
  </div>

  <div style="margin: 50px 0; padding: 30px; background: #f8f9fa; border-left: 5px solid #ff6b35; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="margin-top: 0; margin-bottom: 25px; font-size: 26px; color: #1a1a1a; line-height: 1.3;">Dando de Volta</h2>
    <p style="margin-bottom: 20px; line-height: 1.9;">O casal agora dedica parte do seu tempo ajudando outros brasileiros que querem seguir o mesmo caminho. Eles participam de grupos de apoio, compartilham suas experiências em redes sociais e oferecem orientação informal sobre o processo de imigração.</p>
    <div style="margin: 25px 0; padding: 20px; background: #ffffff; border-radius: 4px; border-left: 3px solid #ff6b35;">
      <p style="margin: 0; font-style: italic; line-height: 1.9; color: #555;">"Queremos mostrar que é possível", diz Marcia. "Não é fácil, mas com planejamento, determinação e a orientação certa, o sonho americano pode se tornar realidade. Se nós conseguimos, outras pessoas também podem."</p>
    </div>
    <div style="margin: 25px 0; padding: 20px; background: #ffffff; border-radius: 4px; border-left: 3px solid #ff6b35;">
      <p style="margin: 0; font-style: italic; line-height: 1.9; color: #555;">Carlos finaliza: "A mensagem que queremos passar é: não desistam. O processo pode ser longo e desafiador, mas se você tem as qualificações e está disposto a investir no seu futuro, vale muito a pena. Hoje temos uma vida que supera todas as nossas expectativas."</p>
    </div>
  </div>
</div>`,
    excerpt: 'História inspiradora de um casal que conseguiu se mudar para os EUA e construir uma nova vida.',
      category: 'HISTÓRIAS DE IMIGRAÇÃO',
      status: 'published',
      isFeatured: false,
    publishedAt: new Date('2025-01-05'),
    metaTitle: 'Carlos e Marcia | Nosso sonho virou realidade | Yellow Visa',
    metaDescription: 'Conheça a história inspiradora de Carlos e Marcia, um casal que conseguiu se mudar para os EUA e construir uma nova vida através do processo de imigração.',
    tags: 'história, imigração, EUA, sucesso, casal'
  });

  console.log('✅ Posts do blog criados:');
  console.log(`   - ${blogPost1.title}`);
  console.log(`   - ${blogPost2.title}`);
  console.log(`   - ${blogPost3.title}`);
  console.log(`   - ${blogPost4.title}`);

  console.log('');
  console.log('✅ Seed concluído com sucesso! 🎉');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

