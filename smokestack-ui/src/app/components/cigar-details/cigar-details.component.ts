import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CigarService, Cigar } from '../../services/cigar.service';

@Component({
  selector: 'app-cigar-details',
  templateUrl: './cigar-details.component.html'
})
export class CigarDetailsComponent implements OnInit {
  cigar?: Cigar;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cigarService: CigarService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cigarService.getById(+id).subscribe({
        next: data => (this.cigar = data),
        error: err => console.error('Error fetching cigar details', err)
      });
    }
  }

  back() {
    this.router.navigate(['/']);
  }
}
