import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CigarService, Cigar } from '../../services/cigar.service';

@Component({
  selector: 'app-cigar-list',
  templateUrl: './cigar-list.component.html'
})
export class CigarListComponent implements OnInit {
  cigars: Cigar[] = [];

  constructor(private cigarService: CigarService, private router: Router) {}

  ngOnInit(): void {
    this.loadCigars();
  }

  loadCigars() {
    this.cigarService.getAll().subscribe({
      next: data => (this.cigars = data),
      error: err => console.error('Error loading cigars', err)
    });
  }

  deleteCigar(id: number) {
    if (confirm('Are you sure you want to delete this cigar?')) {
      this.cigarService.delete(id).subscribe({
        next: () => this.loadCigars(),
        error: err => console.error('Error deleting cigar', err)
      });
    }
  }

  editCigar(id: number) {
    this.router.navigate(['/cigars/edit', id]);
  }

  viewCigar(id: number) {
    this.router.navigate(['/cigars', id]);
  }
}
