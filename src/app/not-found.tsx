import { Metadata } from 'next'
import Link from 'next/link'
import { YVButton, YVText, YVLogo } from '@/components/YV'

export const metadata: Metadata = {
  title: '404 - Página não encontrada | Yellow Visa',
  description: 'A página que você está procurando não foi encontrada.',
  robots: 'noindex, nofollow',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-YV  flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
       
        <div className="mb-12">
          <YVLogo className="justify-center" />
        </div>

       
        <h1 className="text-8xl font-black text-[#0F0005] mb-4">
          404
        </h1>

     
        <h2 className="text-xl font-medium text-[#0F0005] mb-3">
          Página não encontrada
        </h2>

      
        <YVText
          variant="body"
          className="text-gray-600 mb-8"
        >
          A página que você está procurando não existe.
        </YVText>

        {/* Botão */}
        <div className="flex justify-center">
        <Link href="/">
          <YVButton            
            variant="primary"
            size="xl"
          >
            Voltar ao início
          </YVButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
