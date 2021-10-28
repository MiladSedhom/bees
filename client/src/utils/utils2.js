import axios from "axios";

const request = async (method, dataType, data) => {
  const res = await axios({
    method: method,
    url: `http://localhost:5000/api/v1/${dataType}`,
    headers: {},
    data: data,
  });
  return res.data;
};

export { request };
