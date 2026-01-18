import useSingletonViewport from "@/hooks/_private/useSingletonViewport";

const useViewport = () => {
	const { viewport } = useSingletonViewport();

	return viewport;
};

export default useViewport;
