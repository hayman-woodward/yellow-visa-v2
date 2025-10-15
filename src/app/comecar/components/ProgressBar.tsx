'use client';

interface ProgressBarProps {
  etapaAtual: number;
  totalEtapas: number;
  titulo: string;
}

export default function ProgressBar({ etapaAtual, totalEtapas, titulo }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-gray-600">{titulo}</span>
      </div>

      {/* Progress Stepper com círculos */}
      <div className="relative flex items-center justify-between mb-8">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>

        {/* Progress Line */}
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 -translate-y-1/2 z-10 transition-all duration-500"
          style={{ width: `${((etapaAtual - 1) / (totalEtapas - 1)) * 100}%` }}
        ></div>

        {/* Step Circles */}
        {Array.from({ length: totalEtapas }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < etapaAtual;
          const isCurrent = stepNumber === etapaAtual;

          return (
            <div key={stepNumber} className="relative z-20">
              {/* Circle - Pixel Perfect */}
              <div
                className={`
                  flex flex-col justify-center items-center transition-all duration-300
                  w-5 h-5 px-3 py-1 gap-1
                  ${isCompleted || isCurrent
                    ? 'bg-gradient-to-r from-[#C04] to-[#4FA3CC] bg-[length:100%_100%]'
                    : 'bg-[#0F0005]'
                  }
                `}
                style={{
                  borderRadius: '499.5px',
                  backgroundImage: isCompleted || isCurrent
                    ? 'linear-gradient(90deg, #C04 0%, #4FA3CC 100%), linear-gradient(90deg, #FFBD1A 0%, #FF6700 100%)'
                    : 'none',
                  backgroundColor: '#0F0005'
                }}
              >
                <span className="text-white text-xs font-bold">
                  {stepNumber}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
