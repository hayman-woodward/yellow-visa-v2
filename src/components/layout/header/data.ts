// Dados mockados - depois virão do backend
export const menuData = {
  vistosDestinos: [
    {
      id: 'todos-vistos',
      title: 'Todos os vistos',
      href: '/vistos',
      items: [
        { id: 'eb-2-niw', label: 'EB-2 NIW', href: '/vistos/eb-2-niw' },
        { id: 'eb-1a', label: 'EB-1A', href: '/vistos/eb-1a' },
        { id: 'eb-1b', label: 'EB-1B', href: '/vistos/eb-1b' },
        { id: 'eb-1c', label: 'EB-1C', href: '/vistos/eb-1c' },
        { id: 'eb-2', label: 'EB-2', href: '/vistos/eb-2' },
        { id: 'eb-3', label: 'EB-3', href: '/vistos/eb-3' },
        { id: 'eb-5', label: 'EB-5', href: '/vistos/eb-5' },
        {
          id: 'visto-riqueza',
          label: 'Visto de Riqueza',
          href: '/vistos/visto-riqueza'
        }
      ]
    },
    // {
    //   id: 'vistos-especiais',
    //   title: 'Vistos especiais',
    //   items: [
    //     { id: 'advogados', label: 'Advogados', href: '/vistos/advogados' },
    //     { id: 'dentistas', label: 'Dentistas', href: '/vistos/dentistas' },
    //     {
    //       id: 'engenheiros',
    //       label: 'Engenheiros',
    //       href: '/vistos/engenheiros'
    //     },
    //     {
    //       id: 'empreendedores',
    //       label: 'Empreendedores',
    //       href: '/vistos/empreendedores'
    //     },
    //     { id: 'medicos', label: 'Médicos', href: '/vistos/medicos' },
    //     { id: 'pilotos', label: 'Pilotos', href: '/vistos/pilotos' },
    //     { id: 'ti', label: 'Profissionais de TI', href: '/vistos/ti' }
    //   ]
    // },
    {
      id: 'todos-destinos',
      title: 'Todos os destinos',
      href: '/destinos',
      items: [
        {
          id: 'estados-unidos',
          label: 'Estados Unidos',
          href: '/destinos/estados-unidos'
        },
        { id: 'portugal', label: 'Portugal', href: '/destinos/portugal' }
      ]
    }
  ],
  dicasNoticias: [
    {
      id: 'todas-dicas',
      title: 'Todas as dicas e notícias',
      href: '/blog',
      items: [
        { 
          id: 'noticias', 
          label: 'Notícias', 
          href: '/blog/noticias',
          description: 'Acompanhe as principais novidades, atualizações e insights exclusivos sobre o mundo da imigração e vistos para diversos países.'
        },
        { 
          id: 'destinos', 
          label: 'Destinos', 
          href: '/blog/locais',
          description: 'Descubra os melhores lugares para morar, trabalhar e investir pelo mundo com nossos guias completos e dicas de quem já vive lá.'
        }
      ]
    }
  ]
};
