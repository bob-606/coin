export default function Transit({ left, right }) {
  return (
    <div className="transit">
      <div className="container transit-inner">
        <span className="transit-left">{left}</span>
        <span className="transit-right">{right} →</span>
      </div>
    </div>
  );
}
