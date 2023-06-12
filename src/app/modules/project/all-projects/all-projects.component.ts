import { Component } from '@angular/core';
import { BackDjangoService } from 'src/app/services/Back-Django.service';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css'],
})
export class AllProjectsComponent {
  allProjectsData: any;
  myControl = new FormControl('');
  searchQuery: string = '';
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  tagsSearchQuery: string = '';

  constructor(private allProjectsService: BackDjangoService) {}

  ngOnInit(): void {
    this.allProjectsService.getAllProjects().subscribe({
      next: (res: any) => {
        this.allProjectsData = res;
        console.log(this.allProjectsData);
      },
    });
    this.allProjectsService.getAllTags().subscribe({
      next: (res: any) => {
        console.log(res);
        for (const key in res.data) {
          if (Object.prototype.hasOwnProperty.call(res.data, key)) {
            const element = res.data[key];
            this.options.push(element.name);
            console.log(this.options);
          }
        }
      },
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  get filteredProjects() {
    if (!this.searchQuery && !this.tagsSearchQuery) {
      return this.allProjectsData?.data || [];
    }

    const searchLower = this.searchQuery.toLowerCase();
    const searchLowerTags = this.tagsSearchQuery.toLowerCase();
    if (this.tagsSearchQuery) {
      return (
        this.allProjectsData?.data?.filter((project: any) =>
          project.tags.some((tag: any) =>
            tag.name.toLowerCase().includes(searchLowerTags)
          )
        ) || []
      );
    } else if (this.searchQuery) {
      return (
        this.allProjectsData?.data?.filter((project: any) =>
          project.title.toLowerCase().includes(searchLower)
        ) || []
      );
    }
  }

  filteredProjectsWithTags() {
    console.log(this.searchQuery);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
