import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpirationPage } from './expiration.page';

describe('ExpirationPage', () => {
  let component: ExpirationPage;
  let fixture: ComponentFixture<ExpirationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpirationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
