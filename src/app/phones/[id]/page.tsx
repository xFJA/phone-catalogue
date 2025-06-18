import { phoneService } from '@/services/phoneService';
import { notFound } from 'next/navigation';

interface PhoneDetailPageProps {
  params: { id: string };
}

export default async function PhoneDetailPage({ params }: PhoneDetailPageProps) {
  const phone = await phoneService.getPhoneById(params.id);
  if (!phone) return notFound();

  // Render a simple detail view for now
  return (
    <main style={{ padding: '2rem' }}>
      <h1>
        {phone.brand} {phone.name}
      </h1>
      <p>{phone.description}</p>
      <div>
        <strong>Base Price:</strong> €{phone.basePrice}
      </div>
      <div>
        <strong>Rating:</strong> {phone.rating}
      </div>
      <div>
        <strong>Specs:</strong>
        <ul>
          <li>Screen: {phone.specs.screen}</li>
          <li>Resolution: {phone.specs.resolution}</li>
          <li>Processor: {phone.specs.processor}</li>
          <li>Main Camera: {phone.specs.mainCamera}</li>
          <li>Selfie Camera: {phone.specs.selfieCamera}</li>
          <li>Battery: {phone.specs.battery}</li>
          <li>OS: {phone.specs.os}</li>
          <li>Refresh Rate: {phone.specs.screenRefreshRate}</li>
        </ul>
      </div>
      <div>
        <strong>Colors:</strong>
        <ul>
          {phone.colorOptions.map((color) => (
            <li key={color.hexCode}>
              <span
                style={{
                  background: color.hexCode,
                  display: 'inline-block',
                  width: 16,
                  height: 16,
                  marginRight: 8,
                }}
              />
              {color.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Storage Options:</strong>
        <ul>
          {phone.storageOptions.map((option) => (
            <li key={option.capacity}>
              {option.capacity} - €{option.price}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Similar Products:</strong>
        <ul>
          {phone.similarProducts.map((sp) => (
            <li key={sp.id}>
              {sp.brand} {sp.name} - €{sp.basePrice}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
