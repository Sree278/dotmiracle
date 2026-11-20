/** The original engraving, lifted from paper into a single gilt-ink impression. */
export default function FieldPlate() {
  return <figure className="hero-figure field-plate">
    <div className="hero-art-frame"><img className="hero-art" src="/images/kerala-gilt.webp" width="1440" height="793" fetchPriority="high" alt="A fine-line engraving of a houseboat and coconut palms on Kerala’s backwaters."/></div>
    <figcaption><span className="atlas-origin">FIG. 01</span><span className="atlas-place">Kerala backwaters, India</span></figcaption>
  </figure>;
}
