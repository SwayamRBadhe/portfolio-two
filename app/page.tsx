import Journey from "@/components/Journey";
export default function Page() {
  return <Journey year={new Date().getUTCFullYear()} />;
}
