const SkeletonCollectionCard = () => (
  <div>
    <div className="grid grid-rows-2 grid-flow-col gap-1 aspect-[4/3] animate-pulse">
      <div className="col-span-5 row-span-2 bg-btn-hover rounded"></div>
      <div className="col-span-2 row-span-1 bg-btn-hover rounded"></div>
      <div className="col-span-2 row-span-1 bg-btn-hover rounded"></div>
    </div>
    <div className="py-2">
      <div className="h-5 bg-btn-hover rounded w-3/4 mb-2"></div>
    </div>
  </div>
);

export default SkeletonCollectionCard;
