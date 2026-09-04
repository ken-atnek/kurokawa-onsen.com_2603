/* =======================================
 * 黒川温泉観光協会 共通セレクトボックス
 * URL: src/components/common/SelectBox.tsx
 * Created: 2026-09-04
 * ======================================= */
'use client';

import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import styles from './SelectBox.module.scss';

export type SelectBoxOption = {
  value: string;
  label: string;
};

type Props = {
  name: string;
  value: string;
  options: SelectBoxOption[];
  onChange: (value: string) => void;
  className?: string;
  height?: string;
  listHeight?: string;
  valueFontSize?: string;
  labelFontSize?: string;
  position: 'left' | 'center' | 'right';
};

export default function SelectBox({
  name,
  value,
  options,
  onChange,
  className,
  height = '5.2rem',
  listHeight = '4.2rem',
  valueFontSize = '1.8rem',
  labelFontSize = '1.6rem',
  position,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);
  const style = {
    '--selectbox-height': height,
    '--selectbox-list-height': listHeight,
    '--selectbox-value-font-size': valueFontSize,
    '--selectbox-label-font-size': labelFontSize,
  } as CSSProperties;

  return (
    <div
      className={clsx(
        styles.selectbox,
        styles[`position-${position}`],
        value ? styles.isSelected : styles.isEmpty,
        isOpen && styles.isOpen,
        className
      )}
      style={style}
      data-selectbox
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        className={clsx(styles.selectboxHead, 'selectbox__head')}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <input
          type="hidden"
          name={name}
          value={value}
          data-selectbox-hidden
          readOnly
        />
        <span
          className={clsx(styles.selectboxValue, 'selectbox__value')}
          data-selectbox-value
        >
          {selectedOption?.label ?? '選択してください'}
        </span>
      </button>
      <div className={clsx(styles.listWrapper, 'list-wrapper')}>
        <ul className={clsx(styles.selectboxPanel, 'selectbox__panel')}>
          {options.map((option) => {
            const optionId = `${name}-${option.value}`;
            const handleSelect = () => {
              onChange(option.value);
              setIsOpen(false);
            };

            return (
              <li key={option.value}>
                <input
                  type="radio"
                  name={`${name}-radio`}
                  value={option.value}
                  id={optionId}
                  checked={option.value === value}
                  onChange={handleSelect}
                />
                <label
                  htmlFor={optionId}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect();
                  }}
                >
                  {option.label}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
