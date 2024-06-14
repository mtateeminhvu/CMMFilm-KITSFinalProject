import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  margin-top: 1px;
  padding: 0 !important;
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  /* border: 0.6px solid; */
  /* border-style: solid;*/
  border-width: ${(props) => (props.boderColor ? `1px ` : "0px")};
  border-color: ${(props) =>
    props.boderColor ? `1px solid ${props.boderColor}` : "none"};
  /* border-color: ${(props) =>
    props.boderColor ? ` ${props.boderColor}` : "none"}; */

  background-color: ${(props) => props.bgColor};

  border-radius: ${(props) => props.borderRadius + "px"};
  font-weight: 500;
  line-height: 21px;
  color: ${(props) => props.textColor};
  font-size: ${(props) => props.fontSize}px;
  img {
    margin-right: 8px;
  }
`;
export const Button = ({
  label,
  width,
  height,
  textColor,
  bgColor,
  boderColor,
  percent,
  fontSize,
  borderRadius,
  children,
  type,
  id,
  className,
  borderImage,
  onClick,
  ...rest
}) => {
  return (
    <StyledButton
      percent={percent}
      width={width}
      height={height}
      textColor={textColor}
      bgColor={bgColor}
      boderColor={boderColor}
      fontSize={fontSize}
      borderRadius={borderRadius}
      type={type}
      id={id}
      className={className}
      borderImage={borderImage}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};
Button.defaultProps = {
  bgColor: "#FFFFFF",
  textColor: "#5429FF",
  width: "128px",
  height: "46px",
  borderRadius: "40px",
  fontSize: 16,
};
