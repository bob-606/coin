export const seedReviews = {
  "ee-2eur-2020-tartu": [
    { name: "Mark T.", country: "USA", rating: 5, date: "2026-09-14", title: "Perfect BU coin", text: "Arrived in a capsule, flawless. Tracking worked the whole way from the EU." },
    { name: "Jürgen K.", country: "Germany", rating: 5, date: "2026-09-20", title: "Fast to Munich", text: "Ordered Monday, in hand Thursday. Exactly as photographed." },
  ],
  "lv-2eur-flow": [
    { name: "Sarah L.", country: "UK", rating: 5, date: "2026-09-11", title: "Beautiful design", text: "The Flow design looks even better in hand. Great starter for my Latvia page." },
  ],
  "lt-2eur-2022-basketball": [
    { name: "Darius V.", country: "Lithuania", rating: 5, date: "2026-09-02", title: "For my son", text: "Bought for my son who plays basketball. He loved the story card included." },
    { name: "Tom H.", country: "USA", rating: 4, date: "2026-09-16", title: "Good coin", text: "Nice lustre, tiny contact mark on the rim — fairly priced, would buy again." },
  ],
  "eu-baltic-set-3x2eur": [
    { name: "Anna P.", country: "Australia", rating: 5, date: "2026-09-08", title: "Best value in the shop", text: "Three capsules plus the map print, gift-ready. Shipping to Sydney took 9 days." },
  ],
  "ussr-rouble-1980-olympics": [
    { name: "Robert D.", country: "USA", rating: 5, date: "2026-08-30", title: "History in hand", text: "My dad watched those Games. The coin sparked an hour of stories — worth every cent." },
    { name: "Elena S.", country: "France", rating: 5, date: "2026-09-12", title: "Sharp details", text: "Extra fine is accurate, maybe conservative. Very happy." },
  ],
  "ussr-5kopek-1974": [
    { name: "Chris B.", country: "UK", rating: 4, date: "2026-09-05", title: "Fun cheap coin", text: "Circulated as described. Added it to a larger order — great filler." },
  ],
  "kiautschou-5c-1909": [
    { name: "Heinrich M.", country: "Germany", rating: 5, date: "2026-09-19", title: "Rare and genuine", text: "Checked weight and edge against my reference — all correct. Serious seller." },
  ],
  "maria-theresa-thaler": [
    { name: "Fatima A.", country: "USA", rating: 5, date: "2026-09-03", title: "Gorgeous restrike", text: "Full mint bloom, no handling marks. My third purchase here." },
    { name: "Pavel N.", country: "Estonia", rating: 5, date: "2026-09-21", title: "Silver weight", text: "Big heavy coin, exactly 28g on my scale. Recommended." },
  ],
  "morgan-1889": [
    { name: "James W.", country: "USA", rating: 5, date: "2026-09-15", title: "Bright XF", text: "Better than the photos suggested. Finally a European seller with US coins." },
  ],
  "france-20fr-1908-rooster": [
    { name: "Claire D.", country: "France", rating: 5, date: "2026-09-22", title: "Impeccable", text: "Express courier, signature, discreet box. The rooster has full lustre. Merci!" },
  ],
  "russia-rouble-1898-nicholas2": [
    { name: "Igor V.", country: "Germany", rating: 4, date: "2026-09-09", title: "Honest Fine", text: "Even wear, all details clear as described. Fair price for the grade." },
  ],
  "ussr-5ruble-1980-archery-silver": [
    { name: "Nina K.", country: "Latvia", rating: 5, date: "2026-09-17", title: "Proof-like shine", text: "Mirrors on this one — beautiful. Came with both sides photographed, no surprises." },
  ],
  "roman-denarius-severus": [
    { name: "Marcus A.", country: "UK", rating: 5, date: "2026-09-24", title: "1800 years old!", text: "Holding a coin older than my country never gets old. Provenance ticket included as promised." },
  ],
};

export function loadUserReviews() {
  try {
    const raw = localStorage.getItem("ecv-reviews");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveUserReview(productId, review) {
  const all = loadUserReviews();
  all[productId] = [...(all[productId] || []), review];
  try { localStorage.setItem("ecv-reviews", JSON.stringify(all)); } catch {}
}
