import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseDonationsComponent } from './browse-donations.component';

describe('BrowseDonationsComponent', () => {
  let component: BrowseDonationsComponent;
  let fixture: ComponentFixture<BrowseDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrowseDonationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
