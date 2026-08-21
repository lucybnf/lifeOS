import {
  createContext,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type RouterValue = {
  path: string;
  navigate: (path: string) => void;
};

const RouterContext = createContext<RouterValue | null>(null);
const normalizeHash = () => window.location.hash.replace(/^#/, "") || "/";

export function AppRouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(normalizeHash);

  useEffect(() => {
    const handleHashChange = () => setPath(normalizeHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const value = useMemo(
    () => ({
      path,
      navigate: (nextPath: string) => {
        if (nextPath === path) return;
        window.location.hash = nextPath;
      },
    }),
    [path],
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export function useAppRouter() {
  const context = useContext(RouterContext);
  if (!context)
    throw new Error("useAppRouter debe usarse dentro de AppRouterProvider.");
  return context;
}

export function AppLink({
  to,
  children,
  className,
  onClick,
  ...props
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  const { navigate } = useAppRouter();
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(to);
    onClick?.();
  };
  return (
    <a href={`#${to}`} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
