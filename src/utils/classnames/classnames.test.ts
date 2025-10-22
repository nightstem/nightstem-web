import { describe, expect, it } from 'vitest';
import cn from '@/utils/classnames';

describe('cn (classnames utility)', () => {
  describe('basic functionality', () => {
    it('combines single class strings', () => {
      expect(cn('flex')).toBe('flex');
    });

    it('combines multiple class strings', () => {
      expect(cn('flex', 'items-center', 'justify-between')).toBe(
        'flex items-center justify-between',
      );
    });

    it('filters out falsy values', () => {
      expect(cn('flex', null, 'items-center', undefined, 'gap-4')).toBe(
        'flex items-center gap-4',
      );
    });

    it('handles empty strings', () => {
      expect(cn('flex', '', 'items-center')).toBe('flex items-center');
    });
  });

  describe('conditional classes', () => {
    it('includes classes based on boolean conditions', () => {
      const isActive = true;

      expect(cn('base', isActive && 'active')).toBe('base active');
    });

    it('excludes classes when condition is false', () => {
      const isActive = false;

      expect(cn('base', isActive && 'active')).toBe('base');
    });

    it('handles multiple conditional classes', () => {
      const isActive = true;
      const isDisabled = false;

      expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe(
        'base active',
      );
    });
  });

  describe('object syntax (clsx)', () => {
    it('handles object with boolean values', () => {
      expect(cn({ flex: true, 'items-center': true, hidden: false })).toBe(
        'flex items-center',
      );
    });

    it('handles mixed string and object arguments', () => {
      expect(cn('base', { active: true, disabled: false }, 'extra')).toBe(
        'base active extra',
      );
    });

    it('handles nested array syntax', () => {
      expect(cn(['flex', 'items-center'], ['justify-between'])).toBe(
        'flex items-center justify-between',
      );
    });
  });

  describe('tailwind class merging (tailwind-merge)', () => {
    it('merges conflicting Tailwind classes (width)', () => {
      expect(cn('w-32', 'w-64')).toBe('w-64');
    });

    it('merges conflicting Tailwind classes (padding)', () => {
      expect(cn('p-4', 'p-8')).toBe('p-8');
    });

    it('merges conflicting Tailwind classes (margin)', () => {
      expect(cn('m-2', 'm-4')).toBe('m-4');
    });

    it('merges conflicting flex properties', () => {
      expect(cn('flex-col', 'flex-row')).toBe('flex-row');
    });

    it('merges conflicting display properties', () => {
      expect(cn('block', 'flex')).toBe('flex');
    });

    it('preserves non-conflicting classes while merging conflicting ones', () => {
      expect(cn('w-32 items-center', 'w-64 justify-between')).toBe(
        'items-center w-64 justify-between',
      );
    });

    it('handles arbitrary Tailwind values', () => {
      expect(cn('w-[100px]', 'w-[200px]')).toBe('w-[200px]');
    });
  });

  describe('complex scenarios', () => {
    it('handles variant patterns with classes and conflicting overrides', () => {
      const baseClass = 'flex items-center gap-4';
      const isCompact = true;
      const customGap = 'gap-2';

      expect(cn(baseClass, isCompact && 'scale-90', customGap)).toBe(
        'flex items-center scale-90 gap-2',
      );
    });

    it('works with multiple levels of conditional nesting', () => {
      const isPrimary = true;
      const isLarge = false;
      const isActive = true;

      expect(
        cn(
          'btn',
          isPrimary && 'bg-blue-500',
          isLarge && 'text-lg',
          isActive && 'font-bold',
        ),
      ).toBe('btn bg-blue-500 font-bold');
    });

    it('handles responsive and modifier classes', () => {
      expect(cn('md:flex', 'lg:grid', 'hover:bg-red-500')).toBe(
        'md:flex lg:grid hover:bg-red-500',
      );
    });

    it('removes duplicates while preserving order', () => {
      expect(cn('flex', 'gap-4', 'flex', 'items-center')).toBe(
        'gap-4 flex items-center',
      );
    });
  });

  describe('edge cases', () => {
    it('handles no arguments', () => {
      expect(cn()).toBe('');
    });

    it('handles single falsy argument', () => {
      expect(cn(null)).toBe('');
      expect(cn(undefined)).toBe('');
      expect(cn(false)).toBe('');
    });

    it('handles empty array', () => {
      expect(cn([])).toBe('');
    });

    it('handles deeply nested arrays and objects', () => {
      expect(
        cn([['flex', { 'items-center': true }], { 'justify-between': true }]),
      ).toBe('flex items-center justify-between');
    });

    it('handles very long class list', () => {
      const classes = Array(50)
        .fill(null)
        .map((_, i) => `class-${i}`);
      const result = cn(...classes);

      expect(result).toContain('class-0');
      expect(result).toContain('class-49');
    });
  });

  describe('real-world button component pattern', () => {
    it('creates correct className for button with variants and states', () => {
      const variant = 'primary';
      const size = 'md';
      const isDisabled = false;
      const isLoading = false;

      const baseButtonClass =
        'inline-flex items-center justify-center rounded font-semibold transition-colors';

      const variantClass = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'border border-gray-300 text-gray-900 hover:bg-gray-50',
      }[variant];

      const sizeClass = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      }[size];

      const stateClass = cn(
        isDisabled && 'opacity-50 cursor-not-allowed',
        isLoading && 'pointer-events-none',
      );

      const result = cn(baseButtonClass, variantClass, sizeClass, stateClass);

      expect(result).toContain('inline-flex');
      expect(result).toContain('items-center');
      expect(result).toContain('bg-blue-500');
      expect(result).toContain('px-4');
      expect(result).toContain('py-2');
      expect(result).not.toContain('opacity-50');
    });
  });
});
