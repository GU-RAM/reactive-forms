import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender, Occupation, RegisterForm } from './app.model';
import { forbiddenWordsValidator } from './app.validator';
// import { forbiddenWordsValidator } from './app.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  occupation = Occupation;
  gender = Gender;

  form: FormGroup<RegisterForm> = this.buildForm();
  isSubmitted = false;

  handleSubmission() {
    this.isSubmitted = true;
    // console.log(this.form);
  }

  get plusButtonDisabled() {
    return this.form.controls.hobbies?.length === 5;
  }

  get removeButtonDisabled() {
    return this.form.controls.hobbies?.length === 1;
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
      hobbies: this.fb.array([this.fb.control(null)]),
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
    if (this.form.controls.hobbies.length === 5) {
      return;
    }
    this.form.controls.hobbies.push(this.fb.control(null));
  }

  removeHobbyControl(index: number) {
    this.form.controls.hobbies.removeAt(index);
  }

  private handleOccupation(occupation: Occupation | null) {
    switch (occupation) {
      case Occupation.Developer: {
        this.form.addControl('developerOf', this.fb.control(''));
        this.form.removeControl('managerOf');
        console.log(this.form);
        break;
      }
      case Occupation.Manager: {
        this.form.addControl('managerOf', this.fb.control(''));
        this.form.removeControl('developerOf');
        break;
      }
      case Occupation.Tester: {
        this.form.removeControl('managerOf');
        this.form.removeControl('developerOf');
        break;
      }
    }
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((x) => x);
    this.form.controls.occupation?.valueChanges.subscribe((occupation) =>
      this.handleOccupation(occupation)
    );
  }
}
