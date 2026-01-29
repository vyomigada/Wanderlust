const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
const raw = document.getElementById("bookingsData")?.value;
const bookedRanges = raw ? JSON.parse(raw) : [];

console.log("Booked ranges:", bookedRanges);

function isOverlapping(start, end) {
  return bookedRanges.some((b) => {
    const bookedStart = new Date(b.startDate);
    const bookedEnd = new Date(b.endDate);
    return start < bookedEnd && end > bookedStart;
  });
}

checkOut?.addEventListener("change", () => {
  const start = new Date(checkIn.value);
  const end = new Date(checkOut.value);

  if (isOverlapping(start, end)) {
    alert("❌ These dates are already booked");
    checkOut.value = "";
  }
});
