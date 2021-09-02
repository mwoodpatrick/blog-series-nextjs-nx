
import { useEffect, useState } from "react";

/*
export interface ClientOnlyProps {}

export function ClientOnly(props: ClientOnlyProps) {
  return (
    <div>
      <h1>Welcome to ClientOnly!</h1>
    </div>
  );
}

export default ClientOnly;
*/

export function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}

export default ClientOnly;
