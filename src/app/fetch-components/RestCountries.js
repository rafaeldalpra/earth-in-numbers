import { useQuery } from "react-query";

const ApiCall = ({ endpoint, version, children }) => {
  const { isLoading, error, data } = useQuery(
    ["queryFeed", { endpoint }],
    (key, { endpoint }) =>
      fetch(`https://restcountries.eu/rest/v${version}/${endpoint}`, {
        method: "GET",
        headers: {},
      }).then((res) => res.json())
  );

  return children({ isLoading, error, json: data, data, doFetch: () => {} });
};

ApiCall.defaultProps = {
  version: 2,
};

export default ApiCall;
