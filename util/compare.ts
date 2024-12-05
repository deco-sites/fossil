export function is_two_string_arrays_equal(
  list_a: string[],
  list_b: string[],
): boolean {
  if (list_a.length !== list_b.length) {
    return false;
  }

  for (let i = 0; i < list_a.length; i++) {
    if (list_a[i] !== list_b[i]) {
      return false;
    }
  }

  return true;
}
