import type { FunctionComponent, SVGAttributes } from "react";
import { cn } from "~/utils/cn";

type Props = SVGAttributes<SVGSVGElement>;

const Facebook: FunctionComponent<Props> = ({ className, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 666.667 666.667"
    className={cn("size-6", className)}
  >
    <defs>
      <clipPath id="a" clipPathUnits="userSpaceOnUse">
        <path d="M0 700h700V0H0Z" />
      </clipPath>
    </defs>
    <g clipPath="url(#a)" transform="matrix(1.33333 0 0 -1.33333 -133.333 800)">
      <path
        fill="#0866ff"
        d="M600 350c0 138.071-111.929 250-250 250S100 488.071 100 350c0-117.245 80.715-215.622 189.606-242.638v166.242h-51.552V350h51.552v32.919c0 85.092 38.508 124.532 122.048 124.532 15.838 0 43.167-3.105 54.347-6.211v-69.254c-5.901.621-16.149.932-28.882.932-40.993 0-56.832-15.528-56.832-55.9V350h81.659l-14.028-76.396h-67.631V101.831C504.073 116.782 600 222.182 600 350"
      />
      <path
        fill="#fff"
        d="M447.918 273.604 461.947 350h-81.66v27.019c0 40.372 15.839 55.899 56.832 55.899 12.733 0 22.98-.31 28.882-.931v69.253c-11.18 3.106-38.51 6.212-54.347 6.212-83.54 0-122.048-39.441-122.048-124.533v-32.92h-51.552v-76.395h51.552V107.362A250.559 250.559 0 0 1 350 100c10.254 0 20.358.632 30.288 1.83v171.774Z"
      />
    </g>
  </svg>
);

export default Facebook;
