//Creates and displays a reusable card showing a value and its corresponding label
function StatCard({ label, value }) { 
  return (
    <div className="rounded-xl bg-cream p-4 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p>{label}</p>
    </div>
  );
}
export default StatCard;