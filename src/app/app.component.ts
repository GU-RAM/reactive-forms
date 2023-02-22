import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  hobbies: FormControl<string | null>;
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
    console.log(this.form);
  }

  constructor() {}

  private buildForm() {
    return new FormGroup<RegisterForm>({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10),
      ]),
      lastName: new FormControl('', [Validators.required]),
      hobbies: new FormControl(null),
      age: new FormControl(null, [
        Validators.required,
        Validators.min(10),
        Validators.max(80),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      occupation: new FormControl(null),
      gender: new FormControl(Gender.Male, [Validators.required]),
    });
  }

  ngOnInit() {
    this.buildForm;
  }
}
