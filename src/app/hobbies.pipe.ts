import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hobbies',
})
export class HobbiesPipe implements PipeTransform {
  hobbies = [
    'Hiking',
    'Reading',
    'Meditation',
    'Gym',
    'Yoga',
    'Drawing',
    'Singing',
  ];

  transform(): string[] {
    return this.hobbies;
  }
}
