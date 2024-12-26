import type { FunctionComponent, SVGAttributes } from "react";
import { cn } from "~/utils/cn";
import styles from "./styles.module.css";

type Props = SVGAttributes<SVGSVGElement>;

const Spinner: FunctionComponent<Props> = ({ className, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    stroke="currentColor"
    className={cn("size-6", className)}
  >
    <g className={styles.svg}>
      <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3" />
    </g>
  </svg>
);

export default Spinner;
