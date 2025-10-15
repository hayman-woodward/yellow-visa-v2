import { ContactForm } from '@/components/contact-form';
import { YVText } from '@/components/YV';

export const metadata = {
  title: 'Contato | Fale com a Yellow Visa',
  description:
    'Tire suas dúvidas sobre vistos e imigração. Fale com nossa equipe pelo formulário, telefone ou email.',
};

export default function ContatoPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-6'>Entre em Contato</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div>
          <YVText variant='lead' className='mb-6'>
            Estamos aqui para ajudar! Entre em contato conosco através do
            formulário ao lado ou pelos nossos canais de atendimento.
          </YVText>

          <div className='space-y-4'>
            <div>
              <h3 className='font-semibold mb-2'>Telefone</h3>
              <YVText variant='muted'>(11) 9999-9999</YVText>
            </div>

            <div>
              <h3 className='font-semibold mb-2'>Email</h3>
              <YVText variant='muted'>contato@empresa.com</YVText>
            </div>

            <div>
              <h3 className='font-semibold mb-2'>Endereço</h3>
              <YVText variant='muted'>
                Rua das Empresas, 123
                <br />
                São Paulo, SP - 01234-567
              </YVText>
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
