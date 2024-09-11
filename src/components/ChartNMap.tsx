import LineGraph from "./LineGraph";
import Map from "./Map";

function ChartNMap() {
  return (
    <div className="flex flex-1 flex-col gap-10 items-center justify-center">
      <LineGraph />
      <div
        className="flex
      items-center justify-center"
      >
        <Map />
      </div>
    </div>
  );
}

export default ChartNMap;
