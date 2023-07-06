import { setRegionFilter } from "@/reducers/countries.actions";
import { selectRegionFilter } from "@/reducers/countries.selectors";
import { useAppDispatch } from "@/utils/hooks";
import { useSelector } from "react-redux";

export default function RegionFilter() {
  const dispatch = useAppDispatch();
  const regionFilter = useSelector(selectRegionFilter);

  const handleRegionFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;

    dispatch(setRegionFilter(value));
  };

  return (
    <select
      className="py-4 px-4 md:px-10 rounded-md drop-shadow md:w-auto w-1/2"
      value={regionFilter}
      onChange={handleRegionFilterChange}
    >
      <option value="">Filter by Region</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
}
