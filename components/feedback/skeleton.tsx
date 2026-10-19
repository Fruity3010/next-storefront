interface Props {
  className?: string;
}

const Skeleton = ({ className = '' }: Props) => {
  return (
    <div
      aria-hidden
      className={`animate-pulse rounded-card bg-grey-100 ${className}`}
    />
  );
};

export default Skeleton;
