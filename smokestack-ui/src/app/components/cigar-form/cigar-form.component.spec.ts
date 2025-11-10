import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CigarFormComponent } from './cigar-form.component';

describe('CigarFormComponent', () => {
  let component: CigarFormComponent;
  let fixture: ComponentFixture<CigarFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CigarFormComponent]
    });
    fixture = TestBed.createComponent(CigarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
