import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const unsafedWords = ['cudisitva1', 'cudisitva2', 'cudisitva3'];

export function forbiddenWordsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isUnsaferWord = unsafedWords.includes(control.value);
    return isUnsaferWord ? { isUnsafe: control.value } : null;
  };
}
