import useSingletonViewport from "@/hooks/_internal/useSingletonViewport";

const useViewport = () => {
	const { viewport } = useSingletonViewport();

	return viewport;
};

export default useViewport;
