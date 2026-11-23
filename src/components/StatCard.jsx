//Creates and displays a reusable card showing a value and its corresponding label
function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl bg-amber-100 p-4 text-center"> 
      {Icon && <Icon className="mx-auto mb-2 text-clay" size={28} />}
      <p className="text-2xl font-bold">{value}</p> 
      <p className="text-gray-600">{label}</p> 
    </div>
  );
}
export default StatCard;