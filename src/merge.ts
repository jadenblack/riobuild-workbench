import type { JsonObject, JsonValue } from './types';

function isObject(value: JsonValue | undefined): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cloneValue<T extends JsonValue | undefined>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cloneValue(item) as JsonValue) as T;
  }

  if (isObject(value)) {
    const clone: JsonObject = {};
    for (const [key, child] of Object.entries(value)) {
      const clonedChild = cloneValue(child);
      if (clonedChild !== undefined) {
        clone[key] = clonedChild;
      }
    }
    return clone as T;
  }

  return value;
}

export function mergeTemplate(
  current: JsonObject = {},
  template: JsonObject = {},
): JsonObject {
  const merged: JsonObject = cloneValue(current) ?? {};

  for (const [key, templateValue] of Object.entries(template)) {
    const currentValue = merged[key];

    if (isObject(currentValue) && isObject(templateValue)) {
      merged[key] = mergeTemplate(currentValue, templateValue);
      continue;
    }

    if (Array.isArray(currentValue) && Array.isArray(templateValue)) {
      const allScalar = [...currentValue, ...templateValue].every(
        (item) => !Array.isArray(item) && !isObject(item),
      );

      if (allScalar) {
        merged[key] = Array.from(
          new Set([...currentValue, ...templateValue]),
        ) as JsonValue[];
      } else {
        merged[key] = cloneValue(templateValue) as JsonValue;
      }
      continue;
    }

    merged[key] = cloneValue(templateValue) as JsonValue;
  }

  return merged;
}

function normalize(value: JsonValue | undefined): JsonValue | undefined {
  if (Array.isArray(value)) {
    return value.map((item) => normalize(item) as JsonValue);
  }

  if (isObject(value)) {
    const normalized: JsonObject = {};
    for (const key of Object.keys(value).sort()) {
      const normalizedValue = normalize(value[key]);
      if (normalizedValue !== undefined) {
        normalized[key] = normalizedValue;
      }
    }
    return normalized;
  }

  return value;
}

export function getDiffPaths(
  before: JsonValue | undefined,
  after: JsonValue | undefined,
  prefix = '',
): string[] {
  if (JSON.stringify(normalize(before)) === JSON.stringify(normalize(after))) {
    return [];
  }

  if (isObject(before) && isObject(after)) {
    const keys = Array.from(
      new Set([...Object.keys(before), ...Object.keys(after)]),
    ).sort();

    return keys.flatMap((key) =>
      getDiffPaths(
        before[key],
        after[key],
        prefix.length > 0 ? `${prefix}.${key}` : key,
      ),
    );
  }

  return [prefix];
}
