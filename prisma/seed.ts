import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // ===========================================
  // DESTINOS
  // ===========================================
  console.log('📍 Criando destinos...');

  const portugal = await prisma.destino.upsert({
    where: { slug: 'portugal' },
    update: {},
    create: {
      name: 'Portugal',
      slug: 'portugal',
      description:
        'Portugal é um destino atraente para imigrantes que buscam qualidade de vida, segurança e oportunidades na Europa. Com um clima agradável, custo de vida acessível e programas de visto facilitados, o país oferece excelentes opções para profissionais, empreendedores e investidores.',
      country: 'Portugal',
      continent: 'Europa',
      highlights:
        'Golden Visa, D7 Visa, cidadania facilitada, qualidade de vida, sistema de saúde',
      status: 'published'
    }
  });

  const eua = await prisma.destino.upsert({
    where: { slug: 'estados-unidos' },
    update: {},
    create: {
      name: 'Estados Unidos',
      slug: 'estados-unidos',
      description:
        'Os Estados Unidos são o destino número 1 para profissionais qualificados que buscam oportunidades de carreira e crescimento. Com economia forte, salários competitivos e um sistema de imigração voltado para talentos, os EUA oferecem diversos caminhos para o green card.',
      country: 'Estados Unidos',
      continent: 'América do Norte',
      highlights:
        'Green Card, salários altos, oportunidades de carreira, tecnologia, empreendedorismo',
      status: 'published'
    }
  });

  const lisboa = await prisma.destino.upsert({
    where: { slug: 'lisboa' },
    update: {},
    create: {
      name: 'Lisboa',
      slug: 'lisboa',
      description:
        'Lisboa, capital de Portugal, combina história e modernidade. Centro tecnológico em crescimento, qualidade de vida excepcional, clima mediterrâneo e excelente infraestrutura para expatriados.',
      country: 'Portugal',
      continent: 'Europa',
      highlights:
        'Tecnologia, startups, custo de vida acessível, praias próximas',
      status: 'published'
    }
  });

  const porto = await prisma.destino.upsert({
    where: { slug: 'porto' },
    update: {},
    create: {
      name: 'Porto',
      slug: 'porto',
      description:
        'Cidade histórica no norte de Portugal, conhecida pelo vinho do Porto. Economia em crescimento, especialmente nas áreas de tecnologia e turismo.',
      country: 'Portugal',
      continent: 'Europa',
      highlights: 'Vinho, arquitetura histórica, tecnologia, universidades',
      status: 'published'
    }
  });

  const coimbra = await prisma.destino.upsert({
    where: { slug: 'coimbra' },
    update: {},
    create: {
      name: 'Coimbra',
      slug: 'coimbra',
      description:
        'Cidade universitária histórica, lar de uma das universidades mais antigas da Europa. Centro cultural e educacional importante de Portugal.',
      country: 'Portugal',
      continent: 'Europa',
      highlights:
        'Universidade de Coimbra, patrimônio UNESCO, educação de qualidade',
      status: 'published'
    }
  });

  const braga = await prisma.destino.upsert({
    where: { slug: 'braga' },
    update: {},
    create: {
      name: 'Braga',
      slug: 'braga',
      description:
        'Uma das cidades mais antigas de Portugal, conhecida por sua história religiosa e arquitetura barroca. Cidade jovem e dinâmica com crescimento tecnológico.',
      country: 'Portugal',
      continent: 'Europa',
      highlights: 'História milenar, Bom Jesus do Monte, tecnologia',
      status: 'published'
    }
  });

  const aveiro = await prisma.destino.upsert({
    where: { slug: 'aveiro' },
    update: {},
    create: {
      name: 'Aveiro',
      slug: 'aveiro',
      description:
        'Conhecida como a "Veneza Portuguesa", Aveiro é uma cidade costeira charmosa com canais e moliceiros. Forte presença universitária e setor tecnológico em crescimento.',
      country: 'Portugal',
      continent: 'Europa',
      highlights: 'Canais, universidade, praias, ovos moles',
      status: 'published'
    }
  });

  const faro = await prisma.destino.upsert({
    where: { slug: 'faro' },
    update: {},
    create: {
      name: 'Faro',
      slug: 'faro',
      description:
        'Porta de entrada para o Algarve, Faro oferece praias paradisíacas, clima ensolarado durante todo o ano e qualidade de vida excepcional.',
      country: 'Portugal',
      continent: 'Europa',
      highlights: 'Praias, sol, golfe, turismo',
      status: 'published'
    }
  });

  const funchal = await prisma.destino.upsert({
    where: { slug: 'funchal' },
    update: {},
    create: {
      name: 'Funchal',
      slug: 'funchal',
      description:
        'Capital da Ilha da Madeira, paraíso subtropical com clima ameno, natureza exuberante e qualidade de vida única. Popular entre nômades digitais.',
      country: 'Portugal',
      continent: 'Europa',
      highlights: 'Ilha, natureza, clima tropical, vinho da Madeira',
      status: 'published'
    }
  });

  // Estados Unidos - Cidades
  const miami = await prisma.destino.upsert({
    where: { slug: 'miami' },
    update: {},
    create: {
      name: 'Miami',
      slug: 'miami',
      description:
        'Hub internacional de negócios e cultura latina nos EUA. Clima tropical, sem imposto estadual, forte comunidade brasileira e oportunidades para empreendedores.',
      country: 'Estados Unidos',
      continent: 'América do Norte',
      highlights:
        'Negócios internacionais, sem imposto de renda estadual, praias',
      status: 'published'
    }
  });

  const orlando = await prisma.destino.upsert({
    where: { slug: 'orlando' },
    update: {},
    create: {
      name: 'Orlando',
      slug: 'orlando',
      description:
        'Capital mundial dos parques temáticos e centro de tecnologia emergente. Sem imposto de renda estadual, custo de vida moderado e grande comunidade brasileira.',
      country: 'Estados Unidos',
      continent: 'América do Norte',
      highlights: 'Parques temáticos, tecnologia, turismo, família',
      status: 'published'
    }
  });

  const boston = await prisma.destino.upsert({
    where: { slug: 'boston' },
    update: {},
    create: {
      name: 'Boston',
      slug: 'boston',
      description:
        'Centro educacional e tecnológico dos EUA, lar de Harvard e MIT. Excelente para pesquisadores, acadêmicos e profissionais de tecnologia.',
      country: 'Estados Unidos',
      continent: 'América do Norte',
      highlights: 'Harvard, MIT, tecnologia, medicina, educação',
      status: 'published'
    }
  });

  const austin = await prisma.destino.upsert({
    where: { slug: 'austin' },
    update: {},
    create: {
      name: 'Austin',
      slug: 'austin',
      description:
        'Capital tecnológica do Texas, conhecida por sua cultura vibrante, sem imposto de renda estadual. Hub de startups e empresas de tecnologia.',
      country: 'Estados Unidos',
      continent: 'América do Norte',
      highlights: 'Tecnologia, startups, música, sem imposto estadual',
      status: 'published'
    }
  });

  const seattle = await prisma.destino.upsert({
    where: { slug: 'seattle' },
    update: {},
    create: {
      name: 'Seattle',
      slug: 'seattle',
      description:
        'Centro tecnológico do noroeste dos EUA, sede de Amazon e Microsoft. Natureza exuberante, qualidade de vida alta e oportunidades em tech.',
      country: 'Estados Unidos',
      continent: 'América do Norte',
      highlights: 'Amazon, Microsoft, tecnologia, natureza, café',
      status: 'published'
    }
  });

  const sanFrancisco = await prisma.destino.upsert({
    where: { slug: 'san-francisco' },
    update: {},
    create: {
      name: 'San Francisco',
      slug: 'san-francisco',
      description:
        'Coração do Vale do Silício, epicentro da inovação tecnológica mundial. Ideal para profissionais de tech, startups e empreendedores.',
      country: 'Estados Unidos',
      continent: 'América do Norte',
      highlights: 'Vale do Silício, tecnologia, startups, inovação',
      status: 'published'
    }
  });

  console.log('✅ Destinos criados:');
  console.log(
    `   Europa: ${portugal.name}, ${lisboa.name}, ${porto.name}, ${coimbra.name}, ${braga.name}, ${aveiro.name}, ${faro.name}, ${funchal.name}`
  );
  console.log(
    `   América do Norte: ${eua.name}, ${miami.name}, ${orlando.name}, ${boston.name}, ${austin.name}, ${seattle.name}, ${sanFrancisco.name}`
  );

  // ===========================================
  // HISTÓRIAS
  // ===========================================
  console.log('📖 Criando histórias...');

  const historia1 = await prisma.historia.upsert({
    where: { slug: 'carlos-e-marcia' },
    update: {},
    create: {
      title: 'Carlos e Marcia',
      slug: 'carlos-e-marcia',
      content: `Carlos e Marcia se conheceram durante uma conferência de tecnologia em San Francisco. Marcia estava nos EUA com visto F-1 (estudante) cursando mestrado em Ciência da Computação na Stanford University.

Carlos, engenheiro brasileiro, estava visitando o Vale do Silício para uma entrevista de emprego. O encontro foi casual, mas transformou suas vidas para sempre.

Após 6 meses de relacionamento à distância, Carlos conseguiu uma oferta de trabalho na mesma empresa onde Marcia fazia estágio. Com o apoio da empresa, ele conseguiu o visto H-1B e se mudou para os EUA.

Hoje, 3 anos depois, ambos são cidadãos americanos e trabalham como engenheiros sênior em uma das maiores empresas de tecnologia do mundo. Eles se casaram em 2022 e planejam ter filhos em breve.

"O processo de imigração foi desafiador, mas valeu cada momento. Hoje temos uma vida que nunca imaginamos possível no Brasil", conta Marcia.`,
      authorName: 'Equipe Yellow Visa',
      country: 'Estados Unidos',
      status: 'published',
      imageUrl:
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop&crop=faces'
    }
  });

  const historia2 = await prisma.historia.upsert({
    where: { slug: 'silvio-nascimento' },
    update: {},
    create: {
      title: 'Silvio Nascimento',
      slug: 'silvio-nascimento',
      content: `Silvio sempre sonhou em ter seu próprio negócio, mas no Brasil enfrentava burocracias e dificuldades que o desanimavam. Em 2020, durante a pandemia, decidiu que era hora de mudar de vida.

Após pesquisar sobre o Golden Visa português, Silvio viu uma oportunidade única: investir €500.000 em uma startup de tecnologia e obter residência permanente em Portugal.

"O processo foi muito mais simples do que imaginava. Em 6 meses já estava morando em Lisboa com minha família", relata Silvio.

Sua startup, focada em soluções de inteligência artificial para pequenas empresas, cresceu rapidamente no mercado europeu. Hoje, 2 anos depois, ele já tem 15 funcionários e está expandindo para outros países da UE.

"Portugal me deu a estabilidade e o ambiente de negócios que eu precisava. Minha filha de 8 anos fala português e inglês fluentemente, e minha esposa conseguiu retomar a carreira de designer aqui", conta orgulhoso.

Silvio já está no processo de obter a cidadania portuguesa, que deve sair em 2025.`,
      authorName: 'Equipe Yellow Visa',
      country: 'Portugal',
      status: 'published',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=faces'
    }
  });

  const historia3 = await prisma.historia.upsert({
    where: { slug: 'otavio-rosana-lila-pacoca' },
    update: {},
    create: {
      title: 'Otávio, Rosana, Lila e Paçoca',
      slug: 'otavio-rosana-lila-pacoca',
      content: `Otávio e Rosana sempre foram apaixonados por animais. No Brasil, eles resgataram Lila e Paçoca, dois huskies siberianos que se tornaram parte da família.

Quando surgiu a oportunidade de Otávio trabalhar como engenheiro de software em Toronto, a primeira preocupação foi: "E os nossos cães?".

"Descobrimos que o Canadá tem um processo muito bem estruturado para trazer pets. Foi mais fácil do que imaginávamos", conta Rosana.

O casal optou pelo visto de trabalho temporário (LMIA) e, após 1 ano, conseguiu a residência permanente através do Express Entry. Lila e Paçoca foram vacinados, microchipados e passaram por quarentena de 30 dias antes de chegar ao Canadá.

"Foi emocionante ver eles se adaptando à neve. Lila e Paçoca adoram o inverno canadense!", brinca Otávio.

Hoje, a família mora em uma casa com quintal grande em Mississauga, onde os cães podem brincar livremente. Rosana conseguiu transferir sua licença de veterinária e trabalha em uma clínica local.

"O Canadá nos deu qualidade de vida, segurança e a possibilidade de crescer profissionalmente. E o melhor: nossos filhos de quatro patas estão felizes aqui", finaliza Rosana.`,
      authorName: 'Equipe Yellow Visa',
      country: 'Canadá',
      status: 'published',
      imageUrl:
        'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=600&fit=crop&crop=faces'
    }
  });

  const historia4 = await prisma.historia.upsert({
    where: { slug: 'ana-paula-eb2-niw' },
    update: {},
    create: {
      title: 'Ana Paula - EB-2 NIW',
      slug: 'ana-paula-eb2-niw',
      content: `Ana Paula sempre foi apaixonada por ciência. Doutora em Biotecnologia pela USP, ela desenvolveu uma técnica revolucionária para diagnóstico precoce de câncer de mama.

"Quando publiquei minha pesquisa, recebi várias ofertas de universidades americanas. Mas o que realmente me chamou atenção foi a possibilidade de obter residência permanente através do EB-2 NIW", explica Ana Paula.

O National Interest Waiver (NIW) é um programa que permite profissionais com habilidades excepcionais obterem o Green Card sem precisar de oferta de emprego, desde que seu trabalho beneficie os interesses nacionais dos EUA.

"Minha pesquisa tem potencial para salvar milhares de vidas. Isso foi fundamental para aprovação do meu caso", conta.

O processo durou 8 meses, incluindo coleta de evidências, cartas de recomendação de especialistas internacionais e comprovação do impacto nacional de sua pesquisa.

Hoje, Ana Paula trabalha como pesquisadora sênior no MIT e sua técnica já está sendo testada em hospitais de todo o país.

"O EB-2 NIW me deu a liberdade de escolher onde trabalhar e focar no que realmente importa: salvar vidas através da ciência", finaliza.`,
      authorName: 'Equipe Yellow Visa',
      country: 'Estados Unidos',
      status: 'published',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=600&fit=crop&crop=faces'
    }
  });

  const historia5 = await prisma.historia.upsert({
    where: { slug: 'joao-maria-golden-visa' },
    update: {},
    create: {
      title: 'João e Maria - Golden Visa',
      slug: 'joao-maria-golden-visa',
      content: `João e Maria se aposentaram em 2020, após 35 anos de trabalho no setor bancário. Com os filhos já casados e morando fora do Brasil, eles decidiram que era hora de realizar um sonho antigo: viver na Europa.

"Pesquisamos vários países, mas Portugal nos conquistou pela receptividade, clima e custo de vida acessível", conta Maria.

O casal optou pelo Golden Visa através da compra de imóvel no valor de €500.000. Escolheram um apartamento de 3 quartos no centro histórico de Porto.

"O processo foi surpreendentemente simples. Em 4 meses já tínhamos a residência temporária", relata João.

Hoje, eles vivem uma vida tranquila em Porto, aproveitando a rica cultura portuguesa, a gastronomia local e as viagens pela Europa.

"Nos sentimos em casa aqui. Os portugueses são muito acolhedores e sempre nos tratam como família", diz Maria emocionada.

O casal já está no processo de obter a cidadania portuguesa e planeja passar o resto da vida em Portugal.

"Investir no Golden Visa foi a melhor decisão que tomamos. Hoje temos qualidade de vida, segurança e a liberdade de viajar por toda a Europa", finaliza João.`,
      authorName: 'Equipe Yellow Visa',
      country: 'Portugal',
      status: 'published',
      imageUrl:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&crop=faces'
    }
  });

  console.log(
    `✅ Histórias criadas: ${historia1.title}, ${historia2.title}, ${historia3.title}, ${historia4.title}, ${historia5.title}`
  );

  // ===========================================
  // VISTOS
  // ===========================================
  console.log('📄 Criando vistos...');

  const eb2niw = await prisma.visto.upsert({
    where: { slug: 'eb-2-niw' },
    update: {},
    create: {
      title: 'EB-2 NIW',
      slug: 'eb-2-niw',
      description:
        'O EB-2 NIW (National Interest Waiver) é um visto de green card para profissionais com habilidades excepcionais cujo trabalho beneficia os interesses nacionais dos EUA. Não requer oferta de emprego.',
      country: 'Estados Unidos',
      vistoType: 'trabalho',
      status: 'published'
    }
  });

  const eb1a = await prisma.visto.upsert({
    where: { slug: 'eb-1a' },
    update: {},
    create: {
      title: 'EB-1A',
      slug: 'eb-1a',
      description:
        'O EB-1A é destinado a indivíduos com habilidades extraordinárias em ciências, artes, educação, negócios ou atletismo. É a categoria mais rápida para green card.',
      country: 'Estados Unidos',
      vistoType: 'trabalho',
      status: 'published'
    }
  });

  const eb1b = await prisma.visto.upsert({
    where: { slug: 'eb-1b' },
    update: {},
    create: {
      title: 'EB-1B',
      slug: 'eb-1b',
      description:
        'O EB-1B é para professores e pesquisadores destacados com pelo menos 3 anos de experiência em ensino ou pesquisa. Requer oferta de emprego permanente.',
      country: 'Estados Unidos',
      vistoType: 'trabalho',
      status: 'published'
    }
  });

  const eb1c = await prisma.visto.upsert({
    where: { slug: 'eb-1c' },
    update: {},
    create: {
      title: 'EB-1C',
      slug: 'eb-1c',
      description:
        'O EB-1C é para executivos e gerentes de empresas multinacionais que estão sendo transferidos para os EUA. Requer relacionamento entre empresa no exterior e nos EUA.',
      country: 'Estados Unidos',
      vistoType: 'trabalho',
      status: 'published'
    }
  });

  const eb2 = await prisma.visto.upsert({
    where: { slug: 'eb-2' },
    update: {},
    create: {
      title: 'EB-2',
      slug: 'eb-2',
      description:
        'O EB-2 é para profissionais com grau avançado (mestrado ou superior) ou habilidades excepcionais. Requer certificação de trabalho (PERM) do Departamento do Trabalho.',
      country: 'Estados Unidos',
      vistoType: 'trabalho',
      status: 'published'
    }
  });

  const eb3 = await prisma.visto.upsert({
    where: { slug: 'eb-3' },
    update: {},
    create: {
      title: 'EB-3',
      slug: 'eb-3',
      description:
        'O EB-3 é para trabalhadores qualificados, profissionais e outros trabalhadores. Requer oferta de emprego permanente e certificação PERM.',
      country: 'Estados Unidos',
      vistoType: 'trabalho',
      status: 'published'
    }
  });

  const eb5 = await prisma.visto.upsert({
    where: { slug: 'eb-5' },
    update: {},
    create: {
      title: 'EB-5',
      slug: 'eb-5',
      description:
        'O EB-5 é o visto de investidor que permite obter green card através de investimento mínimo de $800,000 em área rural ou de alto desemprego, ou $1,050,000 em outras áreas.',
      country: 'Estados Unidos',
      vistoType: 'investidor',
      status: 'published'
    }
  });

  const vistoRiqueza = await prisma.visto.upsert({
    where: { slug: 'visto-riqueza' },
    update: {},
    create: {
      title: 'Visto de Riqueza',
      slug: 'visto-riqueza',
      description:
        'O Visto de Riqueza (Golden Visa) oferece residência através de investimento em imóveis, fundos ou criação de empregos. Popular em Portugal, Espanha e outros países europeus.',
      country: 'Portugal',
      vistoType: 'investidor',
      status: 'published'
    }
  });

  console.log('✅ Vistos criados:');
  console.log(`   - ${eb2niw.title}`);
  console.log(`   - ${eb1a.title}`);
  console.log(`   - ${eb1b.title}`);
  console.log(`   - ${eb1c.title}`);
  console.log(`   - ${eb2.title}`);
  console.log(`   - ${eb3.title}`);
  console.log(`   - ${eb5.title}`);
  console.log(`   - ${vistoRiqueza.title}`);

  // ===========================================
  // BLOG POSTS
  // ===========================================
  console.log('📝 Criando posts do blog...');

  const blogPost1 = await prisma.blogPost.upsert({
    where: { slug: 'top-5-mitos-morar-eua-legalmente' },
    update: {},
    create: {
      title: 'Top 5 mitos sobre morar nos EUA legalmente',
      slug: 'top-5-mitos-morar-eua-legalmente',
      content: 'Conteúdo completo do artigo sobre mitos dos EUA...',
      excerpt: 'Descubra os principais mitos que impedem brasileiros de realizar o sonho americano e como superá-los.',
      category: 'NOTÍCIAS',
      status: 'published',
      isFeatured: true,
      publishedAt: new Date('2024-01-15'),
      metaTitle: 'Top 5 mitos sobre morar nos EUA legalmente',
      metaDescription: 'Descubra os principais mitos que impedem brasileiros de realizar o sonho americano.'
    }
  });

  const blogPost2 = await prisma.blogPost.upsert({
    where: { slug: 'minnesota-frio-esquentar-imigracao' },
    update: {},
    create: {
      title: 'Minnesota | O frio que pode esquentar sua imigração',
      slug: 'minnesota-frio-esquentar-imigracao',
      content: 'Conteúdo completo sobre Minnesota...',
      excerpt: 'Conheça as oportunidades únicas que Minnesota oferece para imigrantes brasileiros.',
      category: 'DICAS DE DESTINO',
      status: 'published',
      isFeatured: false,
      publishedAt: new Date('2024-01-10'),
      metaTitle: 'Minnesota | O frio que pode esquentar sua imigração',
      metaDescription: 'Conheça as oportunidades únicas que Minnesota oferece para imigrantes brasileiros.'
    }
  });

  const blogPost3 = await prisma.blogPost.upsert({
    where: { slug: 'checklist-documentos-portugal' },
    update: {},
    create: {
      title: 'Checklist de documentos para Portugal',
      slug: 'checklist-documentos-portugal',
      content: 'Conteúdo completo do checklist...',
      excerpt: 'Lista completa de documentos necessários para se mudar para Portugal.',
      category: 'NOTÍCIAS',
      status: 'published',
      isFeatured: false,
      publishedAt: new Date('2024-01-05'),
      metaTitle: 'Checklist de documentos para Portugal',
      metaDescription: 'Lista completa de documentos necessários para se mudar para Portugal.'
    }
  });

  const blogPost4 = await prisma.blogPost.upsert({
    where: { slug: 'carlos-marcia-sonho-realidade' },
    update: {},
    create: {
      title: 'Carlos e Marcia | Nosso sonho virou realidade',
      slug: 'carlos-marcia-sonho-realidade',
      content: 'Conteúdo completo da história...',
      excerpt: 'História inspiradora de um casal que conseguiu se mudar para os EUA.',
      category: 'HISTÓRIAS DE IMIGRAÇÃO',
      status: 'published',
      isFeatured: false,
      publishedAt: new Date('2024-01-01'),
      metaTitle: 'Carlos e Marcia | Nosso sonho virou realidade',
      metaDescription: 'História inspiradora de um casal que conseguiu se mudar para os EUA.'
    }
  });

  console.log('✅ Posts do blog criados:');
  console.log(`   - ${blogPost1.title}`);
  console.log(`   - ${blogPost2.title}`);
  console.log(`   - ${blogPost3.title}`);
  console.log(`   - ${blogPost4.title}`);

  // ===========================================
  // FAQ GROUPS
  // ===========================================
  console.log('❓ Criando FAQ groups...');

  const guiaDoImigrante = await prisma.faqGroup.upsert({
    where: { slug: 'guia-do-imigrante' },
    update: {
      title: 'Guia do Imigrante',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre o destino',
      status: 'published',
      order: 0
    },
    create: {
      title: 'Guia do Imigrante',
      slug: 'guia-do-imigrante',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre o destino',
      status: 'published',
      order: 0
    }
  });

  // Remove existing questions to avoid duplicates
  await prisma.faqQuestion.deleteMany({ where: { groupId: guiaDoImigrante.id } });

  // Create the 7 questions from Figma
  await prisma.faqQuestion.createMany({
    data: [
      {
        groupId: guiaDoImigrante.id,
        question: 'É seguro fazer um processo de imigração 100% online?',
        link: '/faq/seguranca-online',
        order: 0,
        status: 'published'
      },
      {
        groupId: guiaDoImigrante.id,
        question: 'Quem analisa meus dados: humanos ou robôs?',
        link: '/faq/analise-dados',
        order: 1,
        status: 'published'
      },
      {
        groupId: guiaDoImigrante.id,
        question: 'Vocês trabalham com advogados reais?',
        link: '/faq/advogados-reais',
        order: 2,
        status: 'published'
      },
      {
        groupId: guiaDoImigrante.id,
        question: 'Como sei se a empresa é confiável?',
        link: '/faq/confiabilidade',
        order: 3,
        status: 'published'
      },
      {
        groupId: guiaDoImigrante.id,
        question: 'Meus dados ficam protegidos durante o processo?',
        link: '/faq/protecao-dados',
        order: 4,
        status: 'published'
      },
      {
        groupId: guiaDoImigrante.id,
        question: 'Tenho acesso ao meu histórico e documentos?',
        link: '/faq/acesso-historico',
        order: 5,
        status: 'published'
      },
      {
        groupId: guiaDoImigrante.id,
        question: 'Como posso falar com um humano se precisar?',
        link: '/faq/contato-humano',
        order: 6,
        status: 'published'
      }
    ]
  });

  console.log('✅ FAQ group criado: Guia do Imigrante com 7 perguntas');

  // ===========================================
  // FAQ GROUP - CUSTO, TAXAS E FORMAS DE PAGAMENTO
  // ===========================================
  console.log('💰 Criando FAQ group - Custo, taxas e formas de pagamento...');

  const custoTaxasPagamento = await prisma.faqGroup.upsert({
    where: { slug: 'custo-taxas-formas-pagamento' },
    update: {
      title: 'Custo, taxas e formas de pagamento',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre custos e pagamentos',
      status: 'published',
      order: 1
    },
    create: {
      title: 'Custo, taxas e formas de pagamento',
      slug: 'custo-taxas-formas-pagamento',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre custos e pagamentos',
      status: 'published',
      order: 1
    }
  });

  // Remove existing questions to avoid duplicates
  await prisma.faqQuestion.deleteMany({ where: { groupId: custoTaxasPagamento.id } });

  // Create the 6 questions from the image
  await prisma.faqQuestion.createMany({
    data: [
      {
        groupId: custoTaxasPagamento.id,
        question: 'Quanto custa um processo de visto ou Green Card?',
        link: '/faq/custo-processo-visto',
        order: 0,
        status: 'published'
      },
      {
        groupId: custoTaxasPagamento.id,
        question: 'Quais taxas o governo americano cobra?',
        link: '/faq/taxas-governo-americano',
        order: 1,
        status: 'published'
      },
      {
        groupId: custoTaxasPagamento.id,
        question: 'Posso parcelar ou pagar aos poucos?',
        link: '/faq/parcelamento-pagamento',
        order: 2,
        status: 'published'
      },
      {
        groupId: custoTaxasPagamento.id,
        question: 'É seguro pagar por um processo digital?',
        link: '/faq/seguranca-pagamento-digital',
        order: 3,
        status: 'published'
      },
      {
        groupId: custoTaxasPagamento.id,
        question: 'O valor inclui advogado ou serviços extras?',
        link: '/faq/inclusao-advogado-servicos',
        order: 4,
        status: 'published'
      }
    ]
  });

  console.log('✅ FAQ group criado: Custo, taxas e formas de pagamento com 5 perguntas');

  // ===========================================
  // FAQ GROUP - VISTO NEGADO: RISCOS E RECOMEÇO
  // ===========================================
  console.log('❌ Criando FAQ group - Visto negado: riscos e recomeço...');

  const vistoNegado = await prisma.faqGroup.upsert({
    where: { slug: 'visto-negado-riscos-recomeco' },
    update: {
      title: 'Visto negado: riscos e recomeço',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre vistos negados',
      status: 'published',
      order: 2
    },
    create: {
      title: 'Visto negado: riscos e recomeço',
      slug: 'visto-negado-riscos-recomeco',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre vistos negados',
      status: 'published',
      order: 2
    }
  });

  // Remove existing questions to avoid duplicates
  await prisma.faqQuestion.deleteMany({ where: { groupId: vistoNegado.id } });

  // Create the 7 questions from the image
  await prisma.faqQuestion.createMany({
    data: [
      {
        groupId: vistoNegado.id,
        question: 'Por que um visto pode ser negado?',
        link: '/faq/por-que-visto-negado',
        order: 0,
        status: 'published'
      },
      {
        groupId: vistoNegado.id,
        question: 'O que fazer se meu visto for recusado?',
        link: '/faq/o-que-fazer-visto-recusado',
        order: 1,
        status: 'published'
      },
      {
        groupId: vistoNegado.id,
        question: 'Posso aplicar de novo depois de uma negativa?',
        link: '/faq/aplicar-novo-depois-negativa',
        order: 2,
        status: 'published'
      },
      {
        groupId: vistoNegado.id,
        question: 'Visto negado afeta futuras tentativas?',
        link: '/faq/visto-negado-afeta-futuras-tentativas',
        order: 3,
        status: 'published'
      },
      {
        groupId: vistoNegado.id,
        question: 'Tem como recorrer de uma decisão negativa?',
        link: '/faq/recorrer-decisao-negativa',
        order: 4,
        status: 'published'
      },
      {
        groupId: vistoNegado.id,
        question: 'Já tendo o visto negado, ainda posso tentar outro tipo?',
        link: '/faq/tentar-outro-tipo-visto-negado',
        order: 5,
        status: 'published'
      },
      {
        groupId: vistoNegado.id,
        question: 'O que é o "perfil de alto risco"?',
        link: '/faq/perfil-alto-risco',
        order: 6,
        status: 'published'
      }
    ]
  });

  console.log('✅ FAQ group criado: Visto negado: riscos e recomeço com 7 perguntas');

  // ===========================================
  // FAQ GROUP - VIDA APÓS A APROVAÇÃO
  // ===========================================
  console.log('🎉 Criando FAQ group - Vida após a aprovação...');

  const vidaAposAprovacao = await prisma.faqGroup.upsert({
    where: { slug: 'vida-apos-aprovacao' },
    update: {
      title: 'Vida após a aprovação',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre vida após aprovação',
      status: 'published',
      order: 3
    },
    create: {
      title: 'Vida após a aprovação',
      slug: 'vida-apos-aprovacao',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre vida após aprovação',
      status: 'published',
      order: 3
    }
  });

  // Remove existing questions to avoid duplicates
  await prisma.faqQuestion.deleteMany({ where: { groupId: vidaAposAprovacao.id } });

  // Create the 7 questions from the image
  await prisma.faqQuestion.createMany({
    data: [
      {
        groupId: vidaAposAprovacao.id,
        question: 'Depois que recebo o visto, o que acontece?',
        link: '/faq/depois-recebo-visto-que-acontece',
        order: 0,
        status: 'published'
      },
      {
        groupId: vidaAposAprovacao.id,
        question: 'Posso trabalhar com qualquer empresa?',
        link: '/faq/trabalhar-qualquer-empresa',
        order: 1,
        status: 'published'
      },
      {
        groupId: vidaAposAprovacao.id,
        question: 'Meus filhos têm acesso à escola pública?',
        link: '/faq/filhos-acesso-escola-publica',
        order: 2,
        status: 'published'
      },
      {
        groupId: vidaAposAprovacao.id,
        question: 'O Green Card é para sempre?',
        link: '/faq/green-card-para-sempre',
        order: 3,
        status: 'published'
      },
      {
        groupId: vidaAposAprovacao.id,
        question: 'Posso perder meu status de residente legal?',
        link: '/faq/perder-status-residente-legal',
        order: 4,
        status: 'published'
      },
      {
        groupId: vidaAposAprovacao.id,
        question: 'Quando posso pedir cidadania?',
        link: '/faq/quando-pedir-cidadania',
        order: 5,
        status: 'published'
      },
      {
        groupId: vidaAposAprovacao.id,
        question: 'Posso mudar de país depois da aprovação?',
        link: '/faq/mudar-pais-depois-aprovacao',
        order: 6,
        status: 'published'
      }
    ]
  });

  console.log('✅ FAQ group criado: Vida após a aprovação com 7 perguntas');

  // ===========================================
  // FAQ GROUP - SEGURANÇA E CONFIABILIDADE DO PROCESSO DIGITAL
  // ===========================================
  console.log('🔒 Criando FAQ group - Segurança e confiabilidade do processo digital...');

  const segurancaConfiabilidade = await prisma.faqGroup.upsert({
    where: { slug: 'seguranca-confiabilidade-processo-digital' },
    update: {
      title: 'Segurança e confiabilidade do processo digital',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre segurança digital',
      status: 'published',
      order: 4
    },
    create: {
      title: 'Segurança e confiabilidade do processo digital',
      slug: 'seguranca-confiabilidade-processo-digital',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre segurança digital',
      status: 'published',
      order: 4
    }
  });

  // Remove existing questions to avoid duplicates
  await prisma.faqQuestion.deleteMany({ where: { groupId: segurancaConfiabilidade.id } });

  // Create the 7 questions from the image
  await prisma.faqQuestion.createMany({
    data: [
      {
        groupId: segurancaConfiabilidade.id,
        question: 'É seguro fazer um processo de imigração 100% online?',
        link: '/faq/seguro-processo-imigracao-online',
        order: 0,
        status: 'published'
      },
      {
        groupId: segurancaConfiabilidade.id,
        question: 'Quem analisa meus dados: humanos ou robôs?',
        link: '/faq/quem-analisa-dados-humanos-robos',
        order: 1,
        status: 'published'
      },
      {
        groupId: segurancaConfiabilidade.id,
        question: 'Vocês trabalham com advogados reais?',
        link: '/faq/trabalham-advogados-reais',
        order: 2,
        status: 'published'
      },
      {
        groupId: segurancaConfiabilidade.id,
        question: 'Como sei se a empresa é confiável?',
        link: '/faq/como-saber-empresa-confiavel',
        order: 3,
        status: 'published'
      },
      {
        groupId: segurancaConfiabilidade.id,
        question: 'Meus dados ficam protegidos durante o processo?',
        link: '/faq/dados-protegidos-durante-processo',
        order: 4,
        status: 'published'
      },
      {
        groupId: segurancaConfiabilidade.id,
        question: 'Tenho acesso ao meu histórico e documentos?',
        link: '/faq/acesso-historico-documentos',
        order: 5,
        status: 'published'
      },
      {
        groupId: segurancaConfiabilidade.id,
        question: 'Como posso falar com um humano se precisar?',
        link: '/faq/falar-humano-se-precisar',
        order: 6,
        status: 'published'
      }
    ]
  });

  console.log('✅ FAQ group criado: Segurança e confiabilidade do processo digital com 7 perguntas');

  // ===========================================
  // FAQ GROUP - VISTOS E TIPOS DE IMIGRAÇÃO
  // ===========================================
  console.log('📋 Criando FAQ group - Vistos e tipos de imigração...');

  const vistosTiposImigracao = await prisma.faqGroup.upsert({
    where: { slug: 'vistos-tipos-imigracao' },
    update: {
      title: 'Vistos e tipos de imigração',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre vistos e imigração',
      status: 'published',
      order: 5
    },
    create: {
      title: 'Vistos e tipos de imigração',
      slug: 'vistos-tipos-imigracao',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre vistos e imigração',
      status: 'published',
      order: 5
    }
  });

  // Remove existing questions to avoid duplicates
  await prisma.faqQuestion.deleteMany({ where: { groupId: vistosTiposImigracao.id } });

  // Create the 7 questions from the image
  await prisma.faqQuestion.createMany({
    data: [
      {
        groupId: vistosTiposImigracao.id,
        question: 'Qual é o melhor visto para morar legalmente nos EUA?',
        link: '/faq/melhor-visto-morar-eua',
        order: 0,
        status: 'published'
      },
      {
        groupId: vistosTiposImigracao.id,
        question: 'Qual a diferença entre os vistos EB-1, EB-2 e EB-3?',
        link: '/faq/diferenca-eb1-eb2-eb3',
        order: 1,
        status: 'published'
      },
      {
        groupId: vistosTiposImigracao.id,
        question: 'O que é o visto de nômade digital e quem pode aplicar?',
        link: '/faq/visto-nomade-digital',
        order: 2,
        status: 'published'
      },
      {
        groupId: vistosTiposImigracao.id,
        question: 'Posso aplicar para um Green Card diretamente do Brasil?',
        link: '/faq/green-card-diretamente-brasil',
        order: 3,
        status: 'published'
      },
      {
        groupId: vistosTiposImigracao.id,
        question: 'Quais são os vistos mais rápidos para empreendedores?',
        link: '/faq/vistos-rapidos-empreendedores',
        order: 4,
        status: 'published'
      },
      {
        groupId: vistosTiposImigracao.id,
        question: 'Qual visto usar para trabalhar nos EUA sem oferta de emprego?',
        link: '/faq/visto-trabalhar-eua-sem-oferta',
        order: 5,
        status: 'published'
      },
      {
        groupId: vistosTiposImigracao.id,
        question: 'Portugal realmente aceita brasileiros com visto D7?',
        link: '/faq/portugal-aceita-brasileiros-d7',
        order: 6,
        status: 'published'
      }
    ]
  });

  console.log('✅ FAQ group criado: Vistos e tipos de imigração com 7 perguntas');

  // ===========================================
  // FAQ GROUP - PROCESSO DE APLICAÇÃO E DOCUMENTAÇÃO
  // ===========================================
  console.log('📄 Criando FAQ group - Processo de aplicação e documentação...');

  const processoAplicacaoDocumentacao = await prisma.faqGroup.upsert({
    where: { slug: 'processo-aplicacao-documentacao' },
    update: {
      title: 'Processo de aplicação e documentação',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre aplicação e documentos',
      status: 'published',
      order: 6
    },
    create: {
      title: 'Processo de aplicação e documentação',
      slug: 'processo-aplicacao-documentacao',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre aplicação e documentos',
      status: 'published',
      order: 6
    }
  });

  // Remove existing questions to avoid duplicates
  await prisma.faqQuestion.deleteMany({ where: { groupId: processoAplicacaoDocumentacao.id } });

  // Create the 7 questions from the image
  await prisma.faqQuestion.createMany({
    data: [
      {
        groupId: processoAplicacaoDocumentacao.id,
        question: 'Quais documentos preciso para iniciar o processo de imigração?',
        link: '/faq/documentos-iniciar-processo-imigracao',
        order: 0,
        status: 'published'
      },
      {
        groupId: processoAplicacaoDocumentacao.id,
        question: 'Quanto tempo leva o processo de aplicação?',
        link: '/faq/tempo-processo-aplicacao',
        order: 1,
        status: 'published'
      },
      {
        groupId: processoAplicacaoDocumentacao.id,
        question: 'Como saber se meu currículo/profissão é qualificado?',
        link: '/faq/curriculo-profissao-qualificado',
        order: 2,
        status: 'published'
      },
      {
        groupId: processoAplicacaoDocumentacao.id,
        question: 'Preciso traduzir meus documentos? Tem que ser juramentado?',
        link: '/faq/traduzir-documentos-juramentado',
        order: 3,
        status: 'published'
      },
      {
        groupId: processoAplicacaoDocumentacao.id,
        question: 'Posso aplicar sozinho ou preciso de um advogado?',
        link: '/faq/aplicar-sozinho-ou-advogado',
        order: 4,
        status: 'published'
      },
      {
        groupId: processoAplicacaoDocumentacao.id,
        question: 'É possível acompanhar o status do processo online?',
        link: '/faq/acompanhar-status-processo-online',
        order: 5,
        status: 'published'
      },
      {
        groupId: processoAplicacaoDocumentacao.id,
        question: 'O que é o RFE (Request for Evidence)?',
        link: '/faq/o-que-e-rfe-request-evidence',
        order: 6,
        status: 'published'
      }
    ]
  });

  console.log('✅ FAQ group criado: Processo de aplicação e documentação com 7 perguntas');

  // ===========================================
  // FAQ GROUP - ELEGIBILIDADE E PERFIS APROVADOS
  // ===========================================
  console.log('✅ Criando FAQ group - Elegibilidade e perfis aprovados...');

  const elegibilidadePerfisAprovados = await prisma.faqGroup.upsert({
    where: { slug: 'elegibilidade-perfis-aprovados' },
    update: {
      title: 'Elegibilidade e perfis aprovados',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre elegibilidade',
      status: 'published',
      order: 7
    },
    create: {
      title: 'Elegibilidade e perfis aprovados',
      slug: 'elegibilidade-perfis-aprovados',
      description: 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição',
      sectionTitle: 'Perguntas frequentes sobre elegibilidade',
      status: 'published',
      order: 7
    }
  });

  // Remove existing questions to avoid duplicates
  await prisma.faqQuestion.deleteMany({ where: { groupId: elegibilidadePerfisAprovados.id } });

  // Create the 7 questions from the image
  await prisma.faqQuestion.createMany({
    data: [
      {
        groupId: elegibilidadePerfisAprovados.id,
        question: 'Como saber se sou elegível para um visto?',
        link: '/faq/como-saber-elegivel-visto',
        order: 0,
        status: 'published'
      },
      {
        groupId: elegibilidadePerfisAprovados.id,
        question: 'É preciso ser formado para morar fora legalmente?',
        link: '/faq/preciso-ser-formado-morar-fora',
        order: 1,
        status: 'published'
      },
      {
        groupId: elegibilidadePerfisAprovados.id,
        question: 'Posso aplicar com ensino médio ou técnico?',
        link: '/faq/aplicar-ensino-medio-tecnico',
        order: 2,
        status: 'published'
      },
      {
        groupId: elegibilidadePerfisAprovados.id,
        question: 'Profissionais da saúde têm prioridade?',
        link: '/faq/profissionais-saude-tem-prioridade',
        order: 3,
        status: 'published'
      },
      {
        groupId: elegibilidadePerfisAprovados.id,
        question: 'Pessoas autônomas também podem aplicar?',
        link: '/faq/pessoas-autonomas-podem-aplicar',
        order: 4,
        status: 'published'
      },
      {
        groupId: elegibilidadePerfisAprovados.id,
        question: 'Existe idade mínima ou máxima para aplicar?',
        link: '/faq/idade-minima-maxima-aplicar',
        order: 5,
        status: 'published'
      },
      {
        groupId: elegibilidadePerfisAprovados.id,
        question: 'Posso aplicar mesmo com dívidas ou nome sujo no Brasil?',
        link: '/faq/aplicar-com-dividas-nome-sujo',
        order: 6,
        status: 'published'
      }
    ]
  });

  console.log('✅ FAQ group criado: Elegibilidade e perfis aprovados com 7 perguntas');

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
