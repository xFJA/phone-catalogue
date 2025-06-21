import { phoneService } from '@/services/phoneService';
import { notFound } from 'next/navigation';
import PhoneDetail from '@/components/PhoneDetail';
import styles from './PhoneDetailPage.module.scss';
import SimilarItemsSection from '@/components/SimilarItemsSection/SimilarItemsSection';

interface PhoneDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PhoneDetailPage({ params }: PhoneDetailPageProps) {
  const { id } = await params;
  const phone = await phoneService.getPhoneById(id);
  if (!phone) return notFound();

  const {
    name,
    basePrice,
    colorOptions,
    storageOptions,
    brand,
    specs,
    description,
    similarProducts,
  } = phone;
  return (
    <div className={styles['phone-detail-page']}>
      <PhoneDetail
        id={id}
        name={name}
        basePrice={basePrice}
        colorOptions={colorOptions}
        storageOptions={storageOptions}
      />
      <div className={styles['specifications']}>
        <h2 className={styles['specifications__title']}>SPECIFICATIONS</h2>
        <table className={styles['specifications__table']}>
          <tbody>
            <tr>
              <th>BRAND</th>
              <td>{brand}</td>
            </tr>
            <tr>
              <th>NAME</th>
              <td>{name}</td>
            </tr>
            <tr>
              <th>DESCRIPTION</th>
              <td>{description}</td>
            </tr>
            <tr>
              <th>SCREEN</th>
              <td>{specs.screen}</td>
            </tr>
            <tr>
              <th>RESOLUTION</th>
              <td>{specs.resolution}</td>
            </tr>
            <tr>
              <th>PROCESSOR</th>
              <td>{specs.processor}</td>
            </tr>
            <tr>
              <th>MAIN CAMERA</th>
              <td>{specs.mainCamera}</td>
            </tr>
            <tr>
              <th>SELFIE CAMERA</th>
              <td>{specs.selfieCamera}</td>
            </tr>
            <tr>
              <th>BATTERY</th>
              <td>{specs.battery}</td>
            </tr>
            <tr>
              <th>OS</th>
              <td>{specs.os}</td>
            </tr>
            <tr>
              <th>SCREEN REFRESH RATE</th>
              <td>{specs.screenRefreshRate}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SimilarItemsSection similarProducts={similarProducts} />
    </div>
  );
}
