import { FormArray, FormControl } from '@angular/forms';

export enum Occupation {
  Developer = 'Developer',
  Manager = 'Manager',
  Tester = 'Tester',
}
export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export interface RegisterForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  hobbies: FormArray<FormControl>;
  age: FormControl<number | null>;
  email: FormControl<string | null>;
  occupation?: FormControl<Occupation | null>;
  gender: FormControl<Gender | null>;
  developerOf?: FormControl<string | null>;
  managerOf?: FormControl<string | null>;
}
