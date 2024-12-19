# React Styled Component Utils
A number of utility functions for working with styled components in React.

Each utility function is exported as a named export from the library, so you can import them with this syntax:

```javascript
// ES6
import { utilityFunction } from 'react-styled-component-utils';
// CommonJS
const { utilityFunction } = require('react-styled-component-utils');
```

## Type Reference
```typescript
import { Breakpoint } from "@ptolemy2002/bs-utils";
import { CSSProperties } from "react";
import { Interpolation } from "styled-components";
type RequiredCSSProperties = Required<CSSProperties>;
type WithCSSProp<T={}> = T & { $css?: Interpolation<Omit<T, "$css">> };
interface StyledComponentProps<
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
```

## Types
The following types are available in the library:

### RequiredCSSProperties
A type that represents the same as React's `CSSProperties` type, but with all properties required. This helps with referencing them as constants.

### WithCSSProp<T>
A type that represents an object with a `$css` property that can be used to add additional styles to a styled component instance without creating a brand new styled component. The type parameter `T` is the type of the styled component's props.

### StyledComponentProps
A type that represents the props of a styled component. The type parameter `FunctionalProps` is the type of the props the component itself takes and `StyleProps` is the type of the props that are used to style the component and therefore won't be passed to the underlying component (indicated by adding a "$" prefix to the property name). Do not specify `_StyleProps` as it is internal and calculated automatically. Props that already have a "$" prefix will be left with the same name: no additional "$" will be added.

## Functions
The following functions are available in the library:

### centerHorizontal
Centers the child element horizontally within its parent using a common CSS trick that involves setting margin left and right to auto. Unfortunately, this does not work with height, so there are no vertical alignment functions.

#### Parameters
- None

#### Returns
A `RuleSet` that can be used to center the child element horizontally within its parent.

### alignLeft
Aligns the child element to the left of its parent using a common CSS trick that involves setting margin right to auto.

#### Parameters
- None

#### Returns
A `RuleSet` that can be used to align the child element to the left of its parent.

### alignRight
Aligns the child element to the right of its parent using a common CSS trick that involves setting margin left to auto.

#### Parameters
- None

#### Returns
A `RuleSet` that can be used to align the child element to the right of its parent.

### paddingX
A shorthand function for setting padding on the left and right sides of an element.

#### Parameters
- `padding` (`RequiredCSSProperties["padding"]`): The padding to apply to the left and right sides of the element.

#### Returns
A `RuleSet` that can be used to apply the padding to the left and right sides of the element.

### paddingY
A shorthand function for setting padding on the top and bottom sides of an element.

#### Parameters
- `padding` (`RequiredCSSProperties["padding"]`): The padding to apply to the top and bottom sides of the element.

#### Returns
A `RuleSet` that can be used to apply the padding to the top and bottom sides of the element.

### marginX
A shorthand function for setting margin on the left and right sides of an element.

#### Parameters
- `margin` (`RequiredCSSProperties["margin"]`): The margin to apply to the left and right sides of the element.

#### Returns
A `RuleSet` that can be used to apply the margin to the left and right sides of the element.

### marginY
A shorthand function for setting margin on the top and bottom sides of an element.

#### Parameters
- `margin` (`RequiredCSSProperties["margin"]`): The margin to apply to the top and bottom sides of the element.

#### Returns
A `RuleSet` that can be used to apply the margin to the top and bottom sides of the element.

### allLinkPsuedo
Apply a set of styles to all link pseudo classes.

#### Parameters
- `content` (`Interpolation<object>`): The styles to apply to all link pseudo classes.

### minWidth
A shorthand function for cxreating a media query that applies only when the viewport is at least a certain width.

#### Parameters
- `width` (`RequiredCSSProperties["width"]`): The minimum width of the viewport for the media query to apply.
- `content` (`Interpolation<object>`): The styles to apply when the viewport is at least the specified width.

#### Returns
A `RuleSet` that can be used to apply the styles only when the viewport is at least the specified width.

### maxWidth
A shorthand function for creating a media query that applies only when the viewport is at most a certain width.

#### Parameters
- `width` (`RequiredCSSProperties["width"]`): The maximum width of the viewport for the media query to apply.
- `content` (`Interpolation<object>`): The styles to apply when the viewport is at most the specified width.

#### Returns
A `RuleSet` that can be used to apply the styles only when the viewport is at most the specified width.

### widthRange
A shorthand function for creating a media query that applies only when the viewport is between two widths.

#### Parameters
- `minWidth` (`RequiredCSSProperties["width"]`): The minimum width of the viewport for the media query to apply.
- `maxWidth` (`RequiredCSSProperties["width"] | null`): The maximum width of the viewport for the media query to apply or `null` if there is no maximum width.
- `content` (`Interpolation<object>`): The styles to apply when the viewport is between the specified widths.

#### Returns
A `RuleSet` that can be used to apply the styles only when the viewport is between the specified widths.

### bsBreakpointMin
A shorthand function for creating a media query that applies only when the viewport is at least a certain Bootstrap breakpoint.

#### Parameters
- `breakpoint` (`Breakpoint | number`): The Bootstrap breakpoint for the media query to apply or the index of it in the `Breakpoint` array.
- `content` (`Interpolation<object>`): The styles to apply when the viewport is at least the specified Bootstrap breakpoint.

#### Returns
A `RuleSet` that can be used to apply the styles only when the viewport is at least the specified Bootstrap breakpoint.

### bsBreakpointMax
A shorthand function for creating a media query that applies only when the viewport is at most a certain Bootstrap breakpoint.

#### Parameters
- `breakpoint` (`Breakpoint | number`): The Bootstrap breakpoint for the media query to apply or the index of it in the `Breakpoint` array.
- `content` (`Interpolation<object>`): The styles to apply when the viewport is at most the specified Bootstrap breakpoint.

#### Returns
A `RuleSet` that can be used to apply the styles only when the viewport is at most the specified Bootstrap breakpoint.

### bsBreakpointSame
A shorthand function for creating a media query that applies only when the viewport is at a certain Bootstrap breakpoint.

#### Parameters
- `breakpoint` (`Breakpoint | number`): The Bootstrap breakpoint for the media query to apply or the index of it in the `Breakpoint` array.
- `content` (`Interpolation<object>`): The styles to apply when the viewport is at the specified Bootstrap breakpoint.

#### Returns
A `RuleSet` that can be used to apply the styles only when the viewport is at the specified Bootstrap breakpoint.

## Peer Dependencies
- `@ptolemy2002/bs-utils^1.0.0`
- `styled-components^6.1.13`
- `polished^4.3.1`

## Commands
The following commands exist in the project:

- `npm run build` - Builds the library
- `npm run dev` - Starts the development server
- `npm run lint` - Lints the project
- `npm run uninstall` - Uninstalls all dependencies for the library and clears the cache
- `npm run reinstall` - Uninstalls, clears the cache, and then reinstalls all dependencies for the library
- `npm run release` - Publishes the library to npm without changing the version
- `npm run release-patch` - Publishes the library to npm with a patch version bump
- `npm run release-minor` - Publishes the library to npm with a minor version bump
- `npm run release-major` - Publishes the library to npm with a major version bump