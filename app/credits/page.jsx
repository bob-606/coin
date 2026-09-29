import Link from "next/link";

const credits = [
  ["ee-tartu.jpg", "Estland 2020-2 Tartu-Frieden", "Wikimedia Commons"],
  ["lv-flow.png", "Latvia commemorative Flow coin", "Wikimedia Commons"],
  ["lt-basketball.png", "LT 2€ 2022 Basket-ball", "Wikimedia Commons"],
  ["euro-maps.png", "Maps commemorative 2 euro coins issues 2019", "Wikimedia Commons"],
  ["ussr-1ruble-olympics.jpg", "USSR Olympics 1 ruble Cu-Ni", "Wikimedia Commons"],
  ["ussr-5kopek-1974.jpg", "5 kopeks USSR 1974", "Wikimedia Commons"],
  ["kiautschou-5c-1909.jpg", "5 Cents Kiautschou 1909 (MA-Shops)", "Wikimedia Commons"],
  ["maria-theresa.jpg", "Maria-Theresien-Taler", "Wikimedia Commons"],
  ["morgan-1889.jpg", "1889 Morgan dollar obverse", "Wikimedia Commons"],
  ["france-20fr-rooster.jpg", "20 Francs 1908 Marianne / Rooster", "Wikimedia Commons"],
  ["russia-nicholas2-rouble.jpg", "Nicholas II Coin (1898 rouble)", "Wikimedia Commons"],
  ["ussr-5ruble-1980-silver.jpg", "1980 Moscow Olympics 5 ruble Archery silver", "Wikimedia Commons"],
  ["severus-denarius.jpg", "Denarius of Septimius Severus (FindID 67893)", "Wikimedia Commons / Portable Antiquities"],
];

const logoCredits = [
  ["eesti-pank.svg", "Seal of the Bank of Estonia", "Wikimedia Commons"],
  ["latvijas-banka.png", "Latvijas Banka logo", "Wikimedia Commons (PD-textlogo)"],
  ["lietuvos-bankas.svg", "Lietuvos Bankas logo", "English Wikipedia (fair use, trademark of the Bank of Lithuania)"],
  ["ecb.svg", "ECB logo", "Wikimedia Commons"],
  ["monnaie-de-paris.svg", "Monnaie de Paris logo", "French Wikipedia (fair use, trademark of Monnaie de Paris)"],
  ["munze-oesterreich.svg", "Münze Österreich logo", "Wikimedia Commons"],
  ["us-mint.svg", "US Mint logo", "Wikimedia Commons (US public domain)"],
];

export default function CreditsPage() {
  return (
    <div className="container section">
      <h2>Photo credits</h2>
      <p className="muted">
        Product photos are used from Wikimedia Commons under Creative Commons licences
        (CC BY / CC BY-SA). Full licence terms and authors are on each file page on Commons.
        Replace with your own coin photos before going live.
      </p>
      <div className="panel" style={{ marginTop: 14 }}>
        <table className="table">
          <tbody>
            {credits.map(([file, title, src]) => (
              <tr key={file}><td>{file}</td><td>{title} — {src}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 style={{ marginTop: 28 }}>Logo credits</h2>
      <p className="muted">
        Institution logos in the “Sourcing from” strip belong to their respective owners
        and are shown for identification only. Replace with partner logos before going live.
      </p>
      <div className="panel" style={{ marginTop: 14 }}>
        <table className="table">
          <tbody>
            {logoCredits.map(([file, title, src]) => (
              <tr key={file}><td>{file}</td><td>{title} — {src}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 12 }}>
        <Link href="/shop" className="btn btn-primary">Back to shop</Link>
      </div>
    </div>
  );
}
