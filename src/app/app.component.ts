import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { forbiddenWordsValidator } from './app.validator';

enum Occupation {
  Developer = 'Developer',
  Manager = 'Manager',
  Tester = 'Tester',
}
enum Gender {
  Male = 'Male',
  Female = 'Female',
}

interface RegisterForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  hobbies: FormArray<FormControl<string | null>>;
  age: FormControl<number | null>;
  email: FormControl<string | null>;
  occupation?: FormControl<Occupation | null>;
  gender: FormControl<Gender | null>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  occupation = Occupation;
  gender = Gender;

  form: FormGroup = this.buildForm();
  isSubmitted = false;

  handleSubmission() {
    this.isSubmitted = true;
    console.log(this.form.controls['hobbies']);
  }

  hobbies = [
    'Hiking',
    'Reading',
    'Meditation',
    'Gym',
    'Yoga',
    'Drawing',
    'Singing',
  ];

  constructor(private fb: FormBuilder) {}

  private buildForm() {
    return this.fb.group<RegisterForm>({
      firstName: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
        forbiddenWordsValidator(),
      ]),
      lastName: this.fb.control('', [Validators.required]),
      hobbies: this.fb.array([this.fb.control('')]),
      age: this.fb.control(null, [
        Validators.required,
        Validators.min(10),
        Validators.max(80),
      ]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      occupation: this.fb.control(null),
      gender: this.fb.control(Gender.Male, [Validators.required]),
    });
  }

  addHobbyControl() {
    console.log('adding');
  }

  ngOnInit() {
    this.buildForm;
    this.form.valueChanges.subscribe((x) => console.log(x));
  }
}
