import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CigarService, Cigar } from '../../services/cigar.service';

@Component({
  selector: 'app-cigar-form',
  templateUrl: './cigar-form.component.html'
})
export class CigarFormComponent implements OnInit {
  cigar: Cigar = { name: '', brand: '', strength: '', price: 0 };
  isEdit = false;

  constructor(
    private cigarService: CigarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.cigarService.getById(+id).subscribe({
        next: data => (this.cigar = data),
        error: err => console.error('Error loading cigar', err)
      });
    }
  }

  onSubmit() {
    if (this.isEdit) {
      this.cigarService.update(this.cigar.id!, this.cigar).subscribe({
        next: () => this.router.navigate(['/']),
        error: err => console.error('Error updating cigar', err)
      });
    } else {
      this.cigarService.create(this.cigar).subscribe({
        next: () => this.router.navigate(['/']),
        error: err => console.error('Error creating cigar', err)
      });
    }
  }
}
