import { homeStyles } from "../../../assets/dummyStyles";

const CarCardSkeleton = ({ index = 0, styles }) => {
  const localStyles = styles || homeStyles;


  const borderStyle =
    localStyles.borderGradients?.[
      index % (localStyles.borderGradients?.length || 1)
    ] || "";

  return (
    <div
      className={`${localStyles.card} border ${borderStyle} opacity-50 animate-pulse`}
      style={{
        clipPath:
          "polygon(0% 15%, 15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)",
      }}
    >
      <div className={localStyles.borderOverlay}></div>
      <div className={localStyles.imageContainer}>
        <div className="w-full h-full bg-gray-200" />
      </div>
      <div className={localStyles.content}>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
        <div className="grid grid-cols-4 gap-2">
          <div className="h-8 bg-gray-200 rounded" />
          <div className="h-8 bg-gray-200 rounded" />
          <div className="h-8 bg-gray-200 rounded" />
          <div className="h-8 bg-gray-200 rounded" />
        </div>
        <div className="h-10 bg-gray-200 rounded mt-4" />
      </div>
      <div className={localStyles.accentBlur}></div>
    </div>
  );
};

export default CarCardSkeleton;
