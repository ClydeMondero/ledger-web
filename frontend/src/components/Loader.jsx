import { ThreeDots } from "react-loader-spinner";
import { useModalStore } from "../store/FormModalStore";

const Loader = () => {
  const { isPending } = useModalStore();

  return isPending ? (
    <div className="absolute inset-0 z-[100] flex justify-center items-center backdrop-blur-xs">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4f7ed4"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  ) : null;
};

export default Loader;
