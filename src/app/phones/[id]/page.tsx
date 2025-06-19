import { phoneService } from '@/services/phoneService';
import { notFound } from 'next/navigation';
import PhoneDetail from '@/components/PhoneDetail';

interface PhoneDetailPageProps {
  params: { id: string };
}

export default async function PhoneDetailPage({ params }: PhoneDetailPageProps) {
  const { id } = await params;
  const phone = await phoneService.getPhoneById(id);
  if (!phone) return notFound();

  const { name, basePrice, colorOptions, storageOptions } = phone;
  return (
    <PhoneDetail
      id={id}
      name={name}
      basePrice={basePrice}
      colorOptions={colorOptions}
      storageOptions={storageOptions}
    />
  );
}
