import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateScopeonePage } from './update-scopeone.page';

describe('UpdateScopeonePage', () => {
  let component: UpdateScopeonePage;
  let fixture: ComponentFixture<UpdateScopeonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateScopeonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateScopeonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
