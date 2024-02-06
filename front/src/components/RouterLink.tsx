import {forwardRef} from "react";
import {Link, LinkProps} from "react-router-dom";

export const RouterLink = forwardRef<any, LinkProps>(
    (props, ref) => (
        <Link
            ref={ref}
            {...props}
        />
    ),
);