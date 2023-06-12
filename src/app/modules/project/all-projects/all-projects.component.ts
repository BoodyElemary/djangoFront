import { Component } from '@angular/core';
import { BackDjangoService } from 'src/app/services/Back-Django.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css'],
})
export class AllProjectsComponent {
  allProjectsData: any;
  searchQuery: string = '';

  constructor(private allProjectsService: BackDjangoService) {}

  ngOnInit(): void {
    this.allProjectsService.getAllProjects().subscribe({
      next: (res: any) => {
        this.allProjectsData = res;
        console.log(this.allProjectsData);
      },
    });
  }

  get filteredProjects(): any[] {
    if (!this.searchQuery) {
      return this.allProjectsData?.data || [];
    }

    const searchLower = this.searchQuery.toLowerCase();
    return (
      this.allProjectsData?.data?.filter((project: any) =>
        project.title.toLowerCase().includes(searchLower)
      ) || []
    );
  }
}
