import { useCallback } from 'react';
import { Variable } from './VariableEditor';
import useLocalStorage from './useLocalStorage';

function safeParseNumber(value: string): number | string {
  return /^\d+(\.\d+)?$/.test(value) ? parseFloat(value) : value;
}

export function useList(
  key: string
): [
  Variable[],
  (id: number, value: string) => void,
  (id: number, name: string) => void,
  () => void,
  (id: number) => void
] {
  const [list, updateList] = useLocalStorage<Variable[]>(key, [
    {
      id: 0,
      name: 'a',
      value: 2,
    },
    {
      id: 1,
      name: 'b',
      value: 3,
    },
  ]);

  const updateValue = useCallback((id: number, value: string) => {
    updateList(list => {
      return list.map(item =>
        item.id === id
          ? {
              ...item,
              value: safeParseNumber(value),
            }
          : item
      );
    });
  }, []);

  const updateName = useCallback((id: number, name: string) => {
    updateList(list => {
      return list.map(item => (item.id === id ? { ...item, name } : item));
    });
  }, []);

  const addItem = useCallback(() => {
    updateList(list => {
      const id =
        list.length > 0 ? Math.max(...list.map(item => item.id)) + 1 : 0;
      return [...list, { id, name: '', value: '' }];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    updateList(list => {
      return list.filter(item => item.id !== id);
    });
  }, []);

  return [list, updateValue, updateName, addItem, removeItem];
}
