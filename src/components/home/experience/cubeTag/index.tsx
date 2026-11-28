import "./index.css";

interface CubeTagProps {
  name: string;
  isOpen: boolean;
  onClick: () => void;
}

const CubeTag = ({ name, isOpen, onClick }: CubeTagProps) => {
  return (
    <button
      className="information-cube-tag"
      onClick={onClick}
      type="button"
      aria-label={isOpen ? "Back" : "Explore experience"}
    >
      <span className="information-cube-tag__dot" aria-hidden="true" />
      <span>{isOpen ? "Back" : name}</span>
      <span className="information-cube-tag__arrow" aria-hidden="true">
        ↗
      </span>
    </button>
  );
};

export default CubeTag;
