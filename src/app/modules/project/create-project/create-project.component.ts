import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { BackDjangoService } from 'src/app/services/Back-Django.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent {
  newProjectData: any;
  creationForm: FormGroup;
  submitted = false;
  message: string = '';
  successMessage: boolean = false;
  errorMessage: boolean = false;
  addOnBlur: boolean = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: any[] = [];
  tags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private bacEndService: BackDjangoService
  ) {
    this.creationForm = this.fb.group({
      title: ['', Validators.required],
      details: ['', Validators.required],
      category: ['', Validators.required],
      total_target: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      pictures: [null, Validators.required],
    });
  }
  pushTagsToArray() {
    this.tags.push(this.fruits[this.fruits.length - 1].name);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({ name: value });
      this.pushTagsToArray();
      console.log(this.tags);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
      this.tags.splice(index, 1);
      console.log(this.tags);
    }
  }

  edit(fruit: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }

  get formData() {
    return this.creationForm.controls;
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      const pictureList = [];
      for (const key in files) {
        if (Object.prototype.hasOwnProperty.call(files, key)) {
          const element = files[key];
          pictureList.push(element);
        }
      }
      const picturesControl = this.creationForm.get('pictures');
      if (picturesControl) {
        picturesControl.setValue(pictureList);
      }
      console.log(files);
      console.log(typeof files);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.creationForm.invalid) {
      return;
    }

    const requestBody = {
      title: this.formData['title'].value,
      details: this.formData['details'].value,
      category: this.formData['category'].value,
      total_target: this.formData['total_target'].value,
      start_time: this.formData['start_time'].value,
      end_time: this.formData['end_time'].value,
      tags: this.tags,
      pictures: this.formData['pictures'].value,
    };
    console.log(requestBody);

    const formInfo = new FormData();
    formInfo.append('title', requestBody.title);
    formInfo.append('details', requestBody.details);
    formInfo.append('category', requestBody.category);
    formInfo.append('total_target', requestBody.total_target);
    formInfo.append('start_time', requestBody.start_time);
    formInfo.append('end_time', requestBody.end_time);
    requestBody.tags.forEach((tag) => {
      formInfo.append('tags', tag);
    });
    // formInfo.append('pictures', requestBody.pictures);
    requestBody.pictures.forEach((image: any) => {
      formInfo.append('pictures', image);
    });

    // const pictures = this.formData['pictures'].value;
    // for (let i = 0; i < pictures.length; i++) {
    //   formInfo.append('pictures', pictures);
    // }

    // const formDataEntries: [string, string][] = [];
    // formInfo.forEach((value, key) => {
    //   formDataEntries.push([key, value.toString()]);
    // });

    // console.log(formDataEntries);
    console.log(formInfo);
    console.log(formInfo.get('pictures'));

    this.bacEndService.addOneProject(formInfo).subscribe({
      next: (res: any) => {
        this.newProjectData = res;
        console.log(this.newProjectData.message);
        this.successMessage = this.newProjectData.message;
      },
    });
  }
}
