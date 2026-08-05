type GearCardProps = {
  name: string;
  image: string;
  price: number;
  category: string;
};

export default function GearCard({
  name,
  image,
  price,
  category,
}: GearCardProps) {
  return (
    <div>
      <img src={image} alt={name} />

      <h3>{name}</h3>

      <p>{category}</p>

      <p>${price}/day</p>

      <button>
        Rent Now
      </button>
    </div>
  );
}