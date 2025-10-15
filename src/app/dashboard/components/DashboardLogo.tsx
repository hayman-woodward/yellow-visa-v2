import { YVLogo, YVText } from '@/components/YV';

export function DashboardLogo() {
  return (
    <div>
      <div className='scale-75 origin-left dashboard-logo-filter'>
        <YVLogo />
      </div>
      <YVText className='text-[#FFBD1A] text-xs mt-2 font-medium'>
        Dashboard Admin
      </YVText>
    </div>
  );
}
