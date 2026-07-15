import { useHubReviews } from '../../hooks/useHub';
import GlassPanel from '../ui/GlassPanel';

interface Props {
  itemId: string;
  type: 'pack' | 'plugin';
}

const Reviews = ({ itemId, type }: Props) => {
  const { reviews, isLoading } = useHubReviews(itemId, type);

  return (
    <GlassPanel className="p-6">
      <h2 className="text-lg font-semibold mb-4">Avaliações da Comunidade</h2>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-white/5 animate-pulse" />
          ))}
        </div>
      )}

      {!isLoading && reviews.length === 0 && (
        <p className="text-sm text-gray-500">Nenhuma avaliação ainda. Seja o primeiro!</p>
      )}

      {!isLoading && reviews.map((review) => (
        <div key={review.id} className="border-b border-white/5 last:border-0 py-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">{review.author}</span>
            <span className="text-yellow-500 text-sm">★ {review.rating}</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">{review.comment}</p>
        </div>
      ))}
    </GlassPanel>
  );
};

export default Reviews;