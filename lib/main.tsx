import { Breakpoint, breakpointComparisonRange, breakpointMap, breakpoints, breakpointToIndex, indexToBreakpoint } from "@ptolemy2002/bs-utils";
import { CSSProperties } from "react";
import { css, Interpolation } from "styled-components";

// Remove undefined from CSSProperties, as all these constants are guaranteed to
// exist.
export type RequiredCSSProperties = Required<CSSProperties>;

// Add a prop that allows for custom CSS to be added to a styled component instance without
// creating a new styled component.
export type WithCSSProp<T={}> = T & { $css?: Interpolation<Omit<T, "$css">> };

export function centerHorizontal() {
    return css`
        margin-left: auto;
        margin-right: auto;
    `;
}

export function alignLeft() {
    return css`
        margin-right: auto;
    `;
}

export function alignRight() {
    return css`
        margin-left: auto;
    `;
}

// Align top and bottom need to be specified on the parent element, so they are not included here.

export function paddingX(x: RequiredCSSProperties["paddingLeft"]) {
    return css`
        padding-left: ${x};
        padding-right: ${x};
    `;
}

export function paddingY(y: RequiredCSSProperties["paddingTop"]) {
    return css`
        padding-top: ${y};
        padding-bottom: ${y};
    `;
}

export function marginX(x: RequiredCSSProperties["marginLeft"]) {
    return css`
        margin-left: ${x};
        margin-right: ${x};
    `;
}

export function marginY(y: RequiredCSSProperties["marginTop"]) {
    return css`
        margin-top: ${y};
        margin-bottom: ${y};
    `;
}

export function allLinkPseudo(content: Interpolation<object>) {
    return css`
        &:visited,
        &:hover,
        &:active {
            ${content}
        }
    `;
}

export function minWidth(width: RequiredCSSProperties["width"], content: Interpolation<object>) {
    return css`
        @media (min-width: ${width}) {
            ${content}
        }
    `;
}

export function maxWidth(width: RequiredCSSProperties["width"], content: Interpolation<object>) {
    return css`
        @media (max-width: ${width}) {
            ${content}
        }
    `;
}

export function widthRange(
    minWidth: RequiredCSSProperties["width"],
    maxWidth: RequiredCSSProperties["width"] | null,
    content: Interpolation<object>
) {
    if (maxWidth === null) {
        return css`
            @media (min-width: ${minWidth}) {
                ${content}
            }
        `;
    } else {
      return css`
          @media (min-width: ${minWidth}) and (max-width: ${maxWidth}) {
              ${content}
          }
      `;
    }
}

export function bsBreakpointMin(breakpoint: Breakpoint | number, content: Interpolation<object>) {
    if (typeof breakpoint === "number") breakpoint = indexToBreakpoint(breakpoint);
    return minWidth(breakpointMap.get(breakpoint) + "px", content);
}

export function bsBreakpointMax(breakpoint: Breakpoint | number, content: Interpolation<object>) {
    const breakpointIndex = typeof breakpoint === "number" ? breakpoint : breakpointToIndex(breakpoint);
    const isLastBreakpoint = breakpointIndex === breakpoints.length - 1;

    return maxWidth(
        isLastBreakpoint ? 
            "100%"
        : 
            breakpointMap.get(breakpoints[breakpointIndex + 1])! - 1 + "px",
        content
    );
}

export function bsBreakpointSame(breakpoint: Breakpoint | number, content: Interpolation<object>) {
    const [minPixels, maxPixels] = breakpointComparisonRange(breakpoint, "same");

    return widthRange(
        minPixels + "px",
        maxPixels  ? maxPixels + "px" : null,
        content
    );
}

export interface StyledComponentProps<
    FunctionalProps,
    StyleProps,
    _StyleProps = {
        [
            K in `$${Exclude<keyof StyleProps, symbol>}`
        ]: K extends `$${infer S}` ?
            StyleProps[S & keyof StyleProps]
        : never;
    }
> {
    functional: FunctionalProps;
    style: _StyleProps;
    all: FunctionalProps & _StyleProps;
}