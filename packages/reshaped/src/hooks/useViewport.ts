import useSingletonViewport from "@/hooks/_internal/useSingletonViewport.js";

const useViewport = () => {
	const { viewport } = useSingletonViewport();

	return viewport;
};

export default useViewport;
