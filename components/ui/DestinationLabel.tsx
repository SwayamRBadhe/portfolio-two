import { destinations } from "@/data/navigation";
export default function Label({ index }: { index: number }) {
  return (
    <div className="destination-label">
      <span className="tiny-orbit" />
      <span>
        DESTINATION {String(index + 1).padStart(2, "0")}
        <br />
        <strong>{destinations[index].name}</strong>
      </span>
    </div>
  );
}
