import React from "react";

import { SingletonRTLContext } from "./_internal/useSingletonRTL";

const useRTL = () => React.useContext(SingletonRTLContext).rtl;

export default useRTL;
