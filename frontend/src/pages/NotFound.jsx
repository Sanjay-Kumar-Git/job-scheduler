import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Code = styled.h1`
  font-size: 5rem;
  margin-bottom: 8px;
`;

const Text = styled.p`
  font-size: 1.1rem;
  opacity: 0.7;
  margin-bottom: 24px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: #8b5cf6;
  color: white;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Code>404</Code>
      <Text>Oops! The page you’re looking for doesn’t exist.</Text>
      <Button onClick={() => navigate("/")}>
        Go back home
      </Button>
    </Wrapper>
  );
};

export default NotFound;
