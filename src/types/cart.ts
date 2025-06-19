import { Phone } from './phone';
import { PhoneDetail } from './phoneDetail';

export interface CartItem extends Pick<Phone, 'id' | 'name'> {
  storage: PhoneDetail['storageOptions'][number];
  color: Pick<PhoneDetail['colorOptions'][number], 'name' | 'imageUrl'>;
  quantity: number;
}
