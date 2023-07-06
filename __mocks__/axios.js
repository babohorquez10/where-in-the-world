import { data } from "./mockData";
const mockAxios = jest.genMockFromModule("axios");

mockAxios.get = jest.fn(() =>
  Promise.resolve({
    data,
  })
);

export default mockAxios;
