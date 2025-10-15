import { YVBreadcrumbs, YVGallery, YVText, YVTitle } from '@/components/YV';
import Image from 'next/image';

const galleryItems = [
  {
    id: '1',
    src: '/imgs/home/profissional.jpg',
    alt: 'Profissional',
    title: 'Profissional',
    description: ''
  },
  {
    id: '2',
    src: '/imgs/home/estudante.jpg',
    alt: 'Estudante',
    title: 'Estudante',
    description: ''
  },
  {
    id: '3',
    src: '/imgs/home/turista.jpg',
    alt: 'Turista',
    title: 'Turista',
    description: ''
  }
];

export default function Vistos() {
  return (
    <div className='bg-white px-4 md:px-20 mx-auto'>
      <div className='max-w-[1248px] mx-auto pt-10 md:pt-20 pb-5 md:pb-10 px-4 md:px-0 relative'>
        <div className='absolute inset-0 top-40 z-0 rounded-3xl pointer-events-none md:hidden'>
          <svg width="1440" height="712" viewBox="0 0 1440 712" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M550.951 712C541.796 712 532.606 711.747 523.397 711.224C486.653 709.148 450.647 702.974 416.354 692.865C381.411 682.576 349.28 668.496 320.844 651.04C290.893 632.645 265.718 610.875 246.021 586.325C174.371 497.06 154.44 408.932 136.834 331.184C125.769 282.246 115.299 236.034 92.899 197.602C68.607 155.903 31.7185 125.883 -23.2088 103.12C-48.0414 92.8303 -73.3246 86.6206 -98.3914 84.653C-121.116 82.8659 -144.254 84.5266 -167.159 89.5991C-206.318 98.2639 -245.657 116.911 -284.095 145.054C-350.988 194.028 -392.112 255.277 -392.526 255.89C-398.942 265.548 -411.971 268.165 -421.63 261.739C-431.271 255.313 -433.902 242.279 -427.505 232.604C-425.703 229.878 -382.489 165.289 -309.901 111.839C-266.651 79.9956 -221.924 58.7309 -176.926 48.6761C-119.962 35.9317 -62.8545 41.1667 -7.17035 64.2547C26.2041 78.0822 53.6497 94.3286 76.7704 113.897C97.9808 131.858 115.101 152.292 129.139 176.409C154.782 220.437 165.937 269.718 177.741 321.887C186.319 359.777 195.185 398.949 210.214 439.042C227.082 484.008 249.481 523.577 278.711 559.988C295.38 580.765 316.933 599.34 342.757 615.207C368.022 630.732 396.765 643.296 428.157 652.538C491.23 671.113 561.421 674.958 625.809 663.387C652.3 658.621 677.583 651.311 700.974 641.653C725.212 631.634 747.431 619.088 767.056 604.322C809.441 572.425 839.427 530.726 856.187 480.38C862.314 461.967 867.305 443.717 871.162 425.774C848.239 423.554 826.416 419.293 805.873 413.011C771.958 402.632 742.007 386.945 716.85 366.384C693.495 347.286 675.204 324.848 662.517 299.684C654.84 284.466 649.506 268.707 646.641 252.822C643.776 236.882 643.469 221.177 645.722 206.158C648.065 190.634 653.093 176.211 660.661 163.322C668.572 149.855 679.078 138.374 691.873 129.222C737.303 96.7114 791.672 97.4515 837.301 131.208C876.135 159.946 904.14 209.083 916.16 269.592C923.314 305.568 924.593 344.596 920.16 385.356C922.142 385.302 924.143 385.23 926.143 385.14C970.348 383.226 1018.41 373.894 1068.94 357.376C1160.12 327.591 1230.33 302.464 1289.87 278.31C1349.14 254.266 1398.31 230.979 1444.62 205.039C1535.3 154.242 1610.39 95.6103 1724.03 6.85059L1727.09 4.44972C1736.23 -2.69871 1749.42 -1.05601 1756.56 8.09615C1763.69 17.2483 1762.05 30.4621 1752.92 37.6105L1749.85 40.0114C1520.7 218.975 1443.5 279.267 1081.97 397.361C1027.8 415.051 975.989 425.07 927.963 427.146C923.152 427.344 918.376 427.489 913.655 427.525C909.312 449.277 903.437 471.372 896.012 493.648C886.065 523.523 871.883 551.16 853.844 575.801C836.76 599.141 816.036 620.027 792.267 637.916C769.831 654.795 744.494 669.128 716.994 680.482C690.846 691.277 662.679 699.436 633.252 704.743C606.437 709.563 578.847 712 550.933 712H550.951ZM762.911 147.418C746.854 147.418 731.177 152.798 716.327 163.43C700.451 174.803 690.396 191.735 687.278 212.422C684.052 233.777 688.593 258.02 700.018 280.711C709.894 300.297 724.905 318.656 743.412 333.783C764.317 350.878 789.474 364.001 818.145 372.756C836.85 378.479 856.907 382.288 878.1 384.147C882.533 346.437 881.542 310.569 875.018 277.769C869.864 251.847 861.448 228.596 849.969 208.685C839.391 190.327 826.759 175.633 812.396 165.001C797.457 153.953 781.022 147.87 764.893 147.418C764.226 147.4 763.56 147.382 762.893 147.382L762.911 147.418Z" fill="url(#paint0_linear_1317_9872)" />
            <defs>
              <linearGradient id="paint0_linear_1317_9872" x1="-431" y1="356" x2="1761" y2="356" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFBD1A" />
                <stop offset="1" stop-color="#FF6700" />
              </linearGradient>
            </defs>
          </svg>

        </div>
        <div className='absolute inset-0 top-10 z-0 rounded-3xl pointer-events-none md:hidden'>
          <Image
            src='/svgs/home-vistos-laco.svg'
            alt='Laço decorativo'
            width={1969}
            height={640}
            className='top-0 left-0'
            priority
          />
        </div>
        <div data-aos="fade-right" data-aos-delay="200" data-aos-duration="800">
          <YVBreadcrumbs
            className='pb-4 md:pb-5'
            items={[{ label: 'Vistos', href: '/vistos' }]}
          />
        </div>

        <div className='relative grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-15 items-start'>
          <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
            <YVTitle
              variant='heading'
              title='Cada jornada é única. A gente facilita a sua.'
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
            <YVText variant='body' className='leading-relaxed max-w-[80%]'>
              Aqui, o visto é só o começo de um novo capítulo feito sob medida para você. Seja para estudar, trabalhar ou só viver uma grande história.

            </YVText>
          </div>
        </div>
      </div>

      {/* Gallery positioned to overlap */}
      <div className='max-w-[1248px] mx-auto pb-10 md:pb-0 relative z-10 mb-[-230px] px-4 md:px-0'>
        <YVGallery
          items={galleryItems}
          showTitles={true}
          darkMode
          isMobileCarousel
          enableAnimations={true}
        />
      </div>
    </div>
  );
}
