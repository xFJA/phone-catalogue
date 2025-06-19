import { phoneService } from '@/services/phoneService';
import { notFound } from 'next/navigation';
import styles from './PhoneDetail.module.scss';
import Image from 'next/image';
import { formatPrice } from '@/utils/format';

interface PhoneDetailPageProps {
  params: { id: string };
}

export default async function PhoneDetailPage({ params }: PhoneDetailPageProps) {
  const { id } = await params;
  const phone = await phoneService.getPhoneById(id);
  if (!phone) return notFound();

  const { name, basePrice, colorOptions } = phone;
  return (
    <main className={styles['phone-detail']}>
      <div className={styles['phone-detail__product-info-container']}>
        <div className={styles['phone-detail__image-container']}>
          <Image src={colorOptions[0].imageUrl} alt={`TBD`} fill priority={false} />
        </div>
        <div className={styles['phone-detail__form']}>
          <h1 className={styles['phone-detail__name']}>{name}</h1>
          <span className={styles['phone-detail__price']}>From {formatPrice(basePrice)}</span>
        </div>
      </div>
    </main>
  );
}
