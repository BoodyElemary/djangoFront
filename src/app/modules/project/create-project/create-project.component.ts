import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { BackDjangoService } from 'src/app/services/Back-Django.service';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {


  newProjectData : any;
  creationForm: FormGroup;
  submitted = false;
  message: string = '';
  successMessage: boolean = false;
  errorMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private bacEndService: BackDjangoService
  ) {
    this.creationForm = this.fb.group(
      {
        title: ['', Validators.required],
        details: ['', Validators.required],
        category: ['',Validators.required],
        total_target: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        tags: ['',Validators.required],
        pictures: [null, Validators.required],
      },
    );
  }

  get formData() {
    return this.creationForm.controls;
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files;
      const picturesControl = this.creationForm.get('pictures');
      if (picturesControl) {
        picturesControl.setValue(file);
      }
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
      start_date: this.formData['end_date'].value,
      end_date: this.formData['end_date'].value,
      tags: this.formData['tags'].value,
      pictures: this.formData['pictures'].value,
    };
    console.log(requestBody);

    const formInfo = new FormData();
    formInfo.append('title', requestBody.title);
    formInfo.append('details', requestBody.details);
    formInfo.append('category', requestBody.category);
    formInfo.append('total_target', requestBody.total_target);
    formInfo.append('start_date', requestBody.start_date);
    formInfo.append('end_date', requestBody.end_date);
    formInfo.append('tags', requestBody.tags);

    const pictures = this.formData['pictures'].value;
    // for (let i = 0; i < pictures.length; i++) {
      formInfo.append('pictures', pictures);
    // }


    const formDataEntries: [string, string][] = [];
    formInfo.forEach((value, key) => {
      formDataEntries.push([key, value.toString()]);
    });

    console.log(formDataEntries);
    console.log(formInfo.getAll);


    this.bacEndService.addOneProject(formInfo).subscribe({
        next:(res)=>{this.newProjectData = res;
          console.log(this.newProjectData) },  
         })
  }
}
