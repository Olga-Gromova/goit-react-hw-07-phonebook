import { CirclesWithBar } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div>
      <CirclesWithBar
        height="100"
        width="100"
        color="#713abe"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  );
};
