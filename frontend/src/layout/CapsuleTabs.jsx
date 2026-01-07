import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Tabs = styled.div`
  position: relative;
  display: flex;
  padding: 6px;
  width: 200px;
  gap: 6px;
  border-radius: 999px;

  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.border};
`;

const Capsule = styled.div`
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 6px;
  width: calc(50% - 6px);
  border-radius: 999px;

  background: ${({ theme }) => theme.primary};

  transform: translateX(${({ index }) => (index === 0 ? "0%" : "100%")});
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);

  /* subtle depth */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
`;

const TabButton = styled.button`
  flex: 1;
  position: relative;
  z-index: 1;

  padding: 8px 0;
  border-radius: 999px;
  border: none;
  background: transparent;
  cursor: pointer;

  font-weight: 600;
  font-size: 14px;

  color: ${({ active, theme }) =>
    active ? theme.background : theme.text};

  overflow: hidden;

  transition: color 0.25s ease;

  /* LIQUID LAYER */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.primary};
    border-radius: 999px;

    transform: scaleY(0);
    transform-origin: bottom;
    transition:
      transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
      border-radius 0.45s ease;

    z-index: -1;
  }

  &:hover {
    color: ${({ theme }) => theme.background};
  }

  &:hover::before {
    transform: scaleY(1);
    border-radius: 999px 999px 700px 700px;
  }
`;


const tabs = [
  { label: "Create Job", path: "/" },
  { label: "Jobs", path: "/jobs" },
];

const CapsuleTabs = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(pathname.startsWith("/jobs") ? 1 : 0);
  }, [pathname]);

  return (
    <Tabs>
      {/* stable capsule */}
      <Capsule index={activeIndex} />

      {tabs.map((tab, index) => (
        <TabButton
          key={tab.path}
          active={index === activeIndex}
          onClick={() => navigate(tab.path)}
        >
          {tab.label}
        </TabButton>
      ))}
    </Tabs>
  );
};

export default CapsuleTabs;
