import {
  centerHorizontal, alignLeft, alignRight,
  RequiredCSSProperties, paddingX, paddingY, marginX, marginY,
  allLinkPseudo, bsBreakpointMin, bsBreakpointMax,
  bsBreakpointSame,
  WithCSSProp,
  StyledComponentProps,
  StyledComponentPropsWithCSS
} from "@ptolemy2002/react-styled-component-utils";
import styled, { css } from "styled-components";

function App({className}: {className?: string}) {
  return (
    <div className={className}>
      <h1>App</h1>

      <div className="ch-container">
        <p className="content">
          Centered horizontally
        </p>
      </div>

      <div className="al-container">
        <p className="content">
          Aligned left
        </p>
      </div>

      <div className="ar-container">
        <p className="content">
          Aligned right
        </p>
      </div>

      <div className="px-container">
        <p className="content">
          Padding X 10px
        </p>
      </div>

      <div className="py-container">
        <p className="content">
          Padding Y 10px
        </p>
      </div>

      <div className="mx-container">
          <div className="placeholder" />
          <p className="content">Margin X 10px</p>
          <div className="placeholder" />
      </div>

      <div className="my-container">
          Margin Y 10px
      </div>

      <div className="query-container">
        Different colors based on screen width
      </div>

      <a className="all-link-pseudo" href="#">Red on all pseudo classes</a>

      <Child $css={css`color: lightblue;`}/>
    </div>
  );
}

function _Child({className}: {className?: string}) {
  return (
    <div className={className}>
      Child
    </div>
  );
}

const Child = styled(_Child).attrs<WithCSSProp>((props) => ({
  $css: props.$css ?? null
}))`
  ${({$css}) => $css}
`;
function containerStyles(color: RequiredCSSProperties["backgroundColor"]) {
  return css`
    background-color: ${color};
    width: 500px;
    height: 100px;
  `;
}

export default styled(App)`
  .ch-container {
    ${containerStyles("red")}
    .content {
      width: fit-content;
      height: fit-content;
      ${centerHorizontal()}
    }
  }

  .al-container {
    ${containerStyles("blue")}
    .content {
      width: fit-content;
      height: fit-content;
      ${alignLeft()}
    }
  }

  .ar-container {
    ${containerStyles("green")}
    .content {
      width: fit-content;
      height: fit-content;
      ${alignRight()}
    }
  }

  .px-container {
    ${containerStyles("yellow")}
    ${paddingX("10px")}

    .content {
      margin: 0;
      background-color: white;
      width: 100%;
      height: 100%;
    }
  }

  .py-container {
    ${containerStyles("purple")}
    ${paddingY("10px")}

    .content {
      margin: 0;
      background-color: white;
      width: 100%;
      height: 100%;
    }
  }

  .mx-container {
    ${containerStyles("orange")}
    display: flex;
    flex-direction: row;

    .placeholder {
      background-color: black;
      width: 10px;
    }

    .content {
      margin: 0;
      background-color: white;
      width: fit-content;
      height: 100%;
      ${marginX("10px")}
    }
  }

  .my-container {
    ${containerStyles("pink")}
    ${marginY("10px")}
  }

  .query-container {
    ${bsBreakpointMin("md", css`
      background-color: blue;
    `)}

    ${bsBreakpointMax("xl", css`
      color: purple;
    `)}

    ${bsBreakpointSame("xs", css`
      color: red;
      `)}
  }

  .all-link-pseudo {
    ${allLinkPseudo(css`
      color: red;
    `)}
  }
`;

type StyledComponentPropsTest = StyledComponentPropsWithCSS<{
  className: string;
}, {
  color: string,
  show: boolean
}>;

// eslint-disable-next-line
const TestProps: StyledComponentPropsTest["all"] = {
  className: "test",
  $color: "red",
  $show: true,
  $css: css`color: blue;`
};