import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid #8b5cf6; /* purple accent */
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Loader = () => (
  <LoaderWrapper>
    <Spinner />
  </LoaderWrapper>
);

export default Loader;
