/**
 * GlassSelect
 *
 * Purpose:
 * - Custom dropdown select component
 * - Built using Radix UI for accessibility & keyboard support
 * - Styled with glassmorphism to match app design
 *
 * Why Radix UI?
 * - Fully accessible (ARIA, keyboard navigation)
 * - Headless (we control all styling)
 * - Production-ready dropdown behavior
 */

import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import styled from "styled-components";

/* ---------- Styled Components ---------- */

/**
 * Trigger
 * - The clickable select input
 * - Shows selected value + dropdown icon
 */
const Trigger = styled(Select.Trigger)`
  all: unset;
  width: 70%;
  padding: 10px 12px;
  border-radius: 10px;

  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};

  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

/**
 * Content
 * - Floating dropdown container
 * - Rendered in a portal to avoid clipping
 */
const Content = styled(Select.Content)`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 6px;

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

/**
 * Viewport
 * - Scrollable area for dropdown items
 */
const Viewport = styled(Select.Viewport)`
  max-height: 240px;
  overflow-y: auto;
`;

/**
 * Item
 * - Each selectable option
 * - Styled for hover & selected states
 */
const Item = styled(Select.Item)`
  all: unset;
  width: 180px;
  padding: 10px 12px;
  border-radius: 8px;

  font-size: 14px;
  color: ${({ theme }) => theme.text};

  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  /* Hover / keyboard highlight */
  &[data-highlighted] {
    background: ${({ theme }) => theme.primary}22;
  }

  /* Selected item */
  &[data-state="checked"] {
    background: ${({ theme }) => theme.primary};
    color: #fff;
  }
`;

/**
 * ItemIndicator
 * - Displays check icon for selected item
 */
const ItemIndicator = styled(Select.ItemIndicator)`
  display: flex;
  align-items: center;
`;

/**
 * Chevron icon for dropdown
 */
const Chevron = styled(ChevronDown)`
  width: 16px;
  height: 16px;
  opacity: 0.7;
`;

/* ---------- Component ---------- */

/**
 * GlassSelect Component
 *
 * Props:
 * - value: selected value
 * - onChange: callback when value changes
 * - placeholder: text when no value selected
 * - options: array of { label, value }
 */
const GlassSelect = ({
  value,
  onChange,
  placeholder,
  options,
}) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      {/* Select trigger */}
      <Trigger>
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <Chevron />
        </Select.Icon>
      </Trigger>

      {/* Dropdown rendered in portal */}
      <Select.Portal>
        <Content
          position="popper"
          side="bottom"
          align="start"
          sideOffset={8}
          collisionPadding={12}
        >
          <Viewport>
            {options.map((opt) => (
              <Item
                key={opt.value}
                value={opt.value}
              >
                <Select.ItemText>
                  {opt.label}
                </Select.ItemText>

                <ItemIndicator>
                  <Check size={14} />
                </ItemIndicator>
              </Item>
            ))}
          </Viewport>
        </Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default GlassSelect;
